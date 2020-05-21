import fetch from 'node-fetch'

import { albums } from '../../src/data/likes/albums'
import { podcasts } from '../../src/data/likes/podcasts'
import { books } from '../../src/data/likes/books'

import { Actions, SourceNodesArgs } from 'gatsby'
import crypto from 'crypto'
import shortid from 'shortid'

// Avoid numbers to prevent clashes with numeric DEV.to article IDs
shortid.characters(
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_-',
)

function createBookNode(createNode: Actions['createNode'], book: BookNode) {
  createNode({
    // Data for the node.
    coverUrl: book.coverUrl,
    link: book.link,
    publishDate: book.releaseDate,
    title: book.name,

    // Required fields.
    id: shortid.generate(),
    parent: undefined,
    children: [],
    internal: {
      type: `Book`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(book))
        .digest(`hex`),
    },
  })
}

function createAlbumNode(createNode: Actions['createNode'], album: AlbumNode) {
  createNode({
    // Data for the node.
    artist: album.artist,
    name: album.name,
    releaseDate: album.releaseDate,
    link: album.link,
    coverUrl: album.coverUrl,

    // Required fields.
    id: shortid.generate(),
    parent: undefined,
    children: [],
    internal: {
      type: `Album`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(album))
        .digest(`hex`),
    },
  })
}

function createPodcastNode(
  createNode: Actions['createNode'],
  podcast: PodcastNode,
) {
  createNode({
    // Data for the node.
    artist: podcast.artist,
    name: podcast.name,
    releaseDate: podcast.releaseDate,
    link: podcast.link,
    coverUrl: podcast.coverUrl,

    // Required fields.
    id: shortid.generate(),
    parent: undefined,
    children: [],
    internal: {
      type: `Podcast`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(podcast))
        .digest(`hex`),
    },
  })
}

interface LikesNode {
  id: string
  link: string
  releaseDate: string
}

interface BookNode extends LikesNode {
  coverUrl: string
  name: string
}

interface AlbumNode extends LikesNode {
  artist: string
  coverUrl: string
  name: string
}

interface PodcastNode extends LikesNode {
  artist: string
  coverUrl: string
  name: string
}

const dummyNode: LikesNode = {
  id: 'GENERATE ME EACH TIME',
  link: 'https://www.google.ca',
  releaseDate: '2020-01-01',
}

const dummyBookNode: BookNode = {
  ...dummyNode,
  coverUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
  name: 'Name',
}

const dummyAlbumNode: AlbumNode = {
  ...dummyNode,
  artist: 'Artist',
  coverUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
  name: 'Name',
}

const dummyPodcastNode: PodcastNode = {
  ...dummyNode,
  artist: 'Artist',
  coverUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
  name: 'Name',
}

function createDummyNodes(createNode: Actions['createNode']) {
  for (let i of Array(10).keys()) {
    createBookNode(createNode, { ...dummyBookNode, id: shortid.generate() + i })
    createAlbumNode(createNode, { ...dummyAlbumNode, id: shortid.generate() })
    createPodcastNode(createNode, { ...dummyPodcastNode, id: shortid.generate() })
  }
}

async function createItunesNodes(
  albumData: Array<AlbumNode>,
  podcastData: Array<PodcastNode>,
  bookData: Array<BookNode>,
  createNode: Actions['createNode'],
) {
  // Don't waste time fetching + optimizing images in development
  if (process.env.LIKES_IMAGES === 'dummy') {
    createDummyNodes(createNode)
    return
  }

  // In production, fetch + process all Likes data
  for (let book of bookData) {
    createBookNode(createNode, book)
  }

  for (let album of albumData) {
    createAlbumNode(createNode, album)
  }

  for (let podcast of podcastData) {
    createPodcastNode(createNode, podcast)
  }
}

interface ITunesItem {
  date: string
  id: number
  name: string
}

type ITunesMedium = 'ebook' | 'music' | 'podcast'
type ITunesEntity = 'album' | 'ebook' | 'podcast'

// FIXME: separate by result type
interface ITunesResult {
  artistName?: string
  artworkUrl100: string
  collectionId?: number
  collectionViewUrl?: string
  date: string
  name: string
  trackId: number
  trackViewUrl?: string
}

interface ITunesAlbumResult extends ITunesResult {}
interface ITunesBookResult extends ITunesResult {}
interface ITunesPodcastResult extends ITunesResult {}

type Result = ITunesAlbumResult | ITunesBookResult | ITunesPodcastResult

interface FormattedResult {
  artist: string
  name: string
  id: string
  releaseDate: string
  link: string
  coverUrl: string
}

async function searchiTunesAPI(
  items: Array<ITunesItem>,
  medium: ITunesMedium,
  entity: ITunesEntity,
): Promise<FormattedResult[]> {
  const stringOfItemIDs: string = items.map(item => item.id).join(',')
  let formattedResults: Array<FormattedResult>

  // See: https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/#lookup
  try {
    const response = await fetch(
      `https://itunes.apple.com/lookup?id=${stringOfItemIDs}&country=CA&media=${medium}&entity=${entity}&sort=recent`,
    )

    const data = await response.json()

    formattedResults = data.results.map((result: Result) => {
      if (!result) {
        return null
      }

      const resultID: number = result.collectionId || result.trackId
      const matchingItem: ITunesItem | undefined = items.find(
        item => item.id === resultID,
      )

      if (!matchingItem) {
        console.log('No matching item...')
        console.log('matchingItem', matchingItem)
        console.log('result', result)
        console.log('resultID', resultID)
        return null
      }

      const artist = result.artistName
      const name = matchingItem.name
      const id = resultID
      const releaseDate = matchingItem.date
      const link = result.collectionViewUrl || result.trackViewUrl
      // See image srcset URLs used on books.apple.com:
      const coverUrl = result.artworkUrl100.replace('100x100bb', '400x0w')

      if (!name || !id || !releaseDate || !link || !coverUrl) {
        console.log(`Removed iTunes result:`, result)
        return null
      }

      return { artist, name, id, releaseDate, link, coverUrl }
    })
    return formattedResults
  } catch (error) {
    console.log('searchiTunesAPI error', error)
    return []
  }
}

exports.sourceNodes = async ({ actions }: SourceNodesArgs) => {
  const { createNode } = actions

  const albumData = await searchiTunesAPI(albums, 'music', 'album')
  const podcastData = await searchiTunesAPI(podcasts, 'podcast', 'podcast')
  const bookData = await searchiTunesAPI(books, 'ebook', 'ebook')

  await Promise.all([albumData, podcastData, bookData])

  createItunesNodes(albumData, podcastData, bookData, createNode)
}
