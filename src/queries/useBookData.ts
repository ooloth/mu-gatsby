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

interface Book {
  cover: GatsbyImageFixedWithWebp
  id: string
  link: string
  publishDate: string
  title: string
}

function useBookData(): Book[] {
  const { allBook } = useStaticQuery(
    graphql`
      {
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
      }
    `,
  )

  return allBook.nodes
}

export default useBookData
