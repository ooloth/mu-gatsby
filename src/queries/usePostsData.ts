import { useStaticQuery, graphql } from 'gatsby'

interface Frontmatter {
  datePublished: string
  dateUpdated: string
  description: string
  devLink: string
  linkSharedOnTwitter: string
  slug: string
  title: string
  topics: string[]
}

interface Post {
  node: {
    frontmatter: Frontmatter
    id: string
    timeToRead: string
  }
}

function usePostsData(): Post[] {
  const { allMdx } = useStaticQuery(
    graphql`
      query {
        allMdx(
          filter: { frontmatter: { published: { eq: true } } }
          sort: { order: DESC, fields: [frontmatter___datePublished] }
        ) {
          edges {
            node {
              id
              timeToRead
              frontmatter {
                datePublished(formatString: "MMMM DD, YYYY")
                dateUpdated(formatString: "MMMM DD, YYYY")
                description
                devLink
                linkSharedOnTwitter
                slug
                title
                topics
              }
            }
          }
        }
      }
    `,
  )

  return allMdx.edges
}

export default usePostsData
