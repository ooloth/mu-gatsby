import { useStaticQuery, graphql } from 'gatsby'

// See: gatsby/packages/gatsby-transformer-sharp/src/fragments.js
interface GatsbyImageFixedWithWebp {
  childImageSharp: {
    fixed: {
      base64: string
      aspectRatio: number
      height: number
      src: string
      srcSet: string
      srcWebp: string
      srcSetWebp: string
      width: number
    }
  }
}

interface LikesItem {
  id: string
  link: string
}

interface Album extends LikesItem {
  artist: string
  cover: GatsbyImageFixedWithWebp
  name: string
  releaseDate: string
}

interface Book extends LikesItem {
  cover: GatsbyImageFixedWithWebp
  publishDate: string
  title: string
}

interface Movie extends LikesItem {
  poster: GatsbyImageFixedWithWebp
  releaseDate: string
  title: string
}

interface Podcast extends LikesItem {
  artist: string
  cover: GatsbyImageFixedWithWebp
  name: string
  releaseDate: string
}

interface TvShow extends LikesItem {
  poster: GatsbyImageFixedWithWebp
  releaseDate: string
  title: string
}

interface LikesData {
  albums: Album[]
  books: Book[]
  movies: Movie[]
  podcasts: Podcast[]
  tvShows: TvShow[]
}

function useLikesData(): LikesData {
  const { allTvShow, allMovie, allBook, allAlbum, allPodcast } = useStaticQuery(
    graphql`
      query {
        allTvShow(sort: { fields: releaseDate, order: DESC }) {
          nodes {
            id
            link
            poster {
              childImageSharp {
                fixed(width: 200, height: 300, quality: 80) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
            releaseDate(formatString: "YYYY")
            title
          }
        }

        allMovie(sort: { fields: releaseDate, order: DESC }) {
          nodes {
            id
            link
            poster {
              childImageSharp {
                fixed(width: 200, height: 300, quality: 80) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
            releaseDate(formatString: "YYYY")
            title
          }
        }

        allBook(sort: { fields: publishDate, order: DESC }) {
          nodes {
            cover {
              childImageSharp {
                fixed(width: 200, height: 300, quality: 80) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
            id
            link
            publishDate(formatString: "YYYY")
            title
          }
        }

        allAlbum(sort: { fields: releaseDate, order: DESC }) {
          nodes {
            artist
            cover {
              childImageSharp {
                fixed(width: 200, height: 200, quality: 80) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
            id
            link
            name
            releaseDate(formatString: "YYYY")
          }
        }

        allPodcast(sort: { fields: releaseDate, order: DESC }) {
          nodes {
            artist
            cover {
              childImageSharp {
                fixed(width: 200, height: 200, quality: 80) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
            id
            link
            name
            releaseDate(formatString: "YYYY")
          }
        }
      }
    `,
  )

  const albums: Album[] = allAlbum.nodes
  const books: Book[] = allBook.nodes
  const movies: Movie[] = allMovie.nodes
  const podcasts: Podcast[] = allPodcast.nodes
  const tvShows: TvShow[] = allTvShow.nodes

  return { albums, books, movies, podcasts, tvShows }
}

export default useLikesData
