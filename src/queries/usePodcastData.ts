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

interface Podcast {
  artist: string
  cover: GatsbyImageFixedWithWebp
  id: string
  link: string
  name: string
  releaseDate: string
}

function usePodcastData(): Podcast[] {
  const { allPodcast } = useStaticQuery(
    graphql`
      {
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

  return allPodcast.nodes
}

export default usePodcastData
