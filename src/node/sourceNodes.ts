import { Actions, SourceNodesArgs } from 'gatsby'
import crypto from 'crypto'
import shortid from 'shortid'

import fetchTMDBData from './fetchTMDBData'
import fetchiTunesData from './fetchiTunesData'

function createTvShowNode(createNode: Actions['createNode'], show: TvShowNode) {
  createNode({
    // Data for the node.
    title: show.title,
    releaseDate: show.releaseDate,
    link: show.link,
    posterUrl: show.posterUrl,

    // Required fields.
    id: String(show.id),
    parent: undefined,
    children: [],
    internal: {
      type: `TvShow`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(show))
        .digest(`hex`),
    },
  })
}

function createMovieNode(createNode: Actions['createNode'], movie: MovieNode) {
  createNode({
    // Data for the node.
    title: movie.title,
    releaseDate: movie.releaseDate,
    link: movie.link,
    posterUrl: movie.posterUrl,

    // Required fields.
    id: String(movie.id),
    parent: undefined,
    children: [],
    internal: {
      type: `Movie`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(movie))
        .digest(`hex`),
    },
  })
}

function createBookNode(createNode: Actions['createNode'], book: BookNode) {
  createNode({
    // Data for the node.
    coverUrl: book.coverUrl,
    link: book.link,
    publishDate: book.releaseDate,
    title: book.name,

    // Required fields.
    id: String(book.id),
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
    id: String(album.id),
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
    id: String(podcast.id),
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

interface TvShowNode extends LikesNode {
  posterUrl: string
  title: string
}

interface MovieNode extends LikesNode {
  posterUrl: string
  title: string
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

const dummyTvShowNode: TvShowNode = {
  ...dummyNode,
  posterUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
  title: 'Title',
}

const dummyMovieNode: MovieNode = {
  ...dummyNode,
  posterUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
  title: 'Title',
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
    createTvShowNode(createNode, { ...dummyTvShowNode, id: shortid.generate() })
    createMovieNode(createNode, { ...dummyMovieNode, id: shortid.generate() })
    createBookNode(createNode, { ...dummyBookNode, id: shortid.generate() + i })
    createAlbumNode(createNode, { ...dummyAlbumNode, id: shortid.generate() })
    createPodcastNode(createNode, { ...dummyPodcastNode, id: shortid.generate() })
  }
}

async function sourceNodes({ actions }: SourceNodesArgs) {
  const { createNode } = actions

  // Don't waste time fetching + optimizing images in development
  if (process.env.NODE_ENV !== 'production') {
    createDummyNodes(createNode)
    return
  }

  // In production, fetch + process all Likes data
  const [tvData, movieData] = await fetchTMDBData()
  const [albumData, podcastData, bookData] = await fetchiTunesData()

  for (let show of tvData) {
    createTvShowNode(createNode, show)
  }

  for (let movie of movieData) {
    createMovieNode(createNode, movie)
  }

  for (let book of bookData) {
    createBookNode(createNode, book)
  }

  for (let album of albumData) {
    createAlbumNode(createNode, album)
  }

  for (let podcast of podcastData) {
    createPodcastNode(createNode, podcast)
  }

  return
}

export { sourceNodes }
