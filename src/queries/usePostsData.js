function usePostsData() {
  const { allMdx } = useStaticQuery(
    graphql`
      query {
        allMdx(
          filter: { frontmatter: { published: { ne: false } } }
          sort: { order: DESC, fields: [frontmatter___date] }
        ) {
          edges {
            node {
              id
              timeToRead
              fields {
                title
                date(formatString: "MMMM DD, YYYY")
                description
                slug
              }
              # frontmatter {
              # banner {
              #   childImageSharp {
              #     sizes(maxWidth: 720) {
              #       ...GatsbyImageSharpSizes
              #     }
              #   }
              # }
              # keywords
              # }
            }
          }
        }
      }
    `
  )

  return allMdx.edges
}

///////////////////////////////////////////////////////////////////////////////////

import { useStaticQuery, graphql } from 'gatsby'

export default usePostsData

/*

import usePostsData from '../queries/usePostsData'

const posts = usePostsData()

*/
