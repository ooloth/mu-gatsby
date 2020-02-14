import fetch from 'node-fetch'

import { albums } from '../data/likes/albums'
import { podcasts } from '../data/likes/podcasts'
import { books } from '../data/likes/books'

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

async function fetchiTunesData() {
  const albumData = await searchiTunesAPI(albums, 'music', 'album')
  const podcastData = await searchiTunesAPI(podcasts, 'podcast', 'podcast')
  const bookData = await searchiTunesAPI(books, 'ebook', 'ebook')

  return Promise.all([albumData, podcastData, bookData])
}

export default fetchiTunesData
