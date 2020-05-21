import fetch from 'node-fetch'

import { Actions, SourceNodesArgs } from 'gatsby'
import crypto from 'crypto'
import shortid from 'shortid'

const { TMDB_READ_ACCESS_TOKEN, TMDB_TV_LIST_ID, TMDB_MOVIE_LIST_ID } = process.env

// Avoid numbers to prevent clashes with numeric DEV.to article IDs
shortid.characters(
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_-',
)

const createTvShowNode = (
  createNode: Actions['createNode'],
  show: TvShowNode,
): void =>
  createNode({
    // Data for the node.
    title: show.title,
    releaseDate: show.releaseDate,
    link: show.link,
    posterUrl: show.posterUrl,

    // Required fields.
    id: shortid.generate(),
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

const createMovieNode = (
  createNode: Actions['createNode'],
  movie: MovieNode,
): void =>
  createNode({
    // Data for the node.
    title: movie.title,
    releaseDate: movie.releaseDate,
    link: movie.link,
    posterUrl: movie.posterUrl,

    // Required fields.
    id: shortid.generate(),
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

const createDummyNodes = (createNode: Actions['createNode']): void => {
  for (let i of Array(10).keys()) {
    createTvShowNode(createNode, { ...dummyTvShowNode, id: shortid.generate() })
    createMovieNode(createNode, { ...dummyMovieNode, id: shortid.generate() })
  }
}

const createTMDBNodes = async (
  tvData: Array<TvShowNode>,
  movieData: Array<MovieNode>,
  createNode: Actions['createNode'],
) => {
  // Don't waste time fetching + optimizing images in development
  if (process.env.LIKES_IMAGES === 'dummy') {
    createDummyNodes(createNode)
    return
  }

  // In production, fetch + process all Likes data
  for (let show of tvData) {
    createTvShowNode(createNode, show)
  }

  for (let movie of movieData) {
    createMovieNode(createNode, movie)
  }
}

interface FormattedResult {
  id: string
  posterUrl: string
  releaseDate: string
  link: string
  title: string
}

async function fetchTMDBListData(
  listId: string | undefined,
  api: 'tv' | 'movie',
): Promise<FormattedResult[]> {
  if (!listId) {
    console.log('fetchTMDBListData error: listId is undefined')
    return []
  }

  let items = []
  let page = 1
  let totalPages = 999 // will be updated after the first API response

  // FIXME: specify variable and return types from here down...
  const fetch20Items = async () =>
    await fetch(
      // See: https://www.themoviedb.org/talk/55aa2a76c3a3682d63002fb1?language=en
      // See: https://developers.themoviedb.org/4/list/get-list
      `https://api.themoviedb.org/4/list/${listId}?sort_by=primary_release_date.desc&page=${page}`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${TMDB_READ_ACCESS_TOKEN}`,
        },
      },
    )

  do {
    try {
      const response = await fetch20Items()
      const data = await response.json()
      totalPages = data.total_pages

      if (data.results && data.results.length > 0) {
        for (let result of data.results) {
          const title = result.title || result.name
          const id = result.id
          const releaseDate = result.release_date || result.first_air_date
          const posterUrl = `https://image.tmdb.org/t/p/original${result.poster_path}`
          const link = `https://www.themoviedb.org/${api}/${id}`

          if (!title || !id || !releaseDate || !result.poster_path) {
            console.log(`Removed TMDB result:`, title || result)
            continue
          }

          items.push({ title, id, releaseDate, posterUrl, link })
        }
      }
    } catch (error) {
      console.log('fetchTMDBListData error', error)
    }

    page++
  } while (page <= totalPages)

  return await Promise.all(items)
}

exports.sourceNodes = async ({ actions }: SourceNodesArgs) => {
  const { createNode } = actions

  const tvData = await fetchTMDBListData(TMDB_TV_LIST_ID, 'tv')
  const movieData = await fetchTMDBListData(TMDB_MOVIE_LIST_ID, 'movie')

  await Promise.all([tvData, movieData])

  createTMDBNodes(tvData, movieData, createNode)
}
