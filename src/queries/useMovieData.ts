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

interface Movie {
  id: string
  link: string
  poster: GatsbyImageFixedWithWebp
  releaseDate: string
  title: string
}

function useMovieData(): Movie[] {
  const { allMovie } = useStaticQuery(
    graphql`
      {
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
      }
    `,
  )

  return allMovie.nodes
}

export default useMovieData
