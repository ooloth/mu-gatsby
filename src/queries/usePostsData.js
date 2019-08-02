function usePostsData() {
  const { allMdx } = useStaticQuery(
    graphql`
      query {
        allMdx(
          filter: { frontmatter: { published: { ne: false } } }
          sort: { order: DESC, fields: [frontmatter___datePublished] }
        ) {
          edges {
            node {
              id
              timeToRead
              fields {
                title
                slug
                description
                # featuredImg
                topics
                linkSharedOnTwitter
                devLink
                datePublished(formatString: "MMMM DD, YYYY")
                dateUpdated(formatString: "MMMM DD, YYYY")
              }
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
