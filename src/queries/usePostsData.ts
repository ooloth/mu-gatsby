import { useStaticQuery, graphql } from 'gatsby'

interface PostNode {
  node: {
    id: string
  }
}

function usePostsData(): any {
  const { allDevArticle }: any = useStaticQuery(
    graphql`
      {
        allDevArticle(sort: { order: DESC, fields: published_at }) {
          nodes {
            canonical_url
            childMarkdownRemark {
              html
            }
            collection_id
            comments_count
            created_at
            description
            edited_at(formatString: "MMM DD, YYYY")
            id
            image {
              childImageSharp {
                fluid(maxWidth: 1000, quality: 80) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            positive_reactions_count
            published_at(formatString: "MMM DD, YYYY")
            social_image
            tags
            title
          }
        }
      }
    `,
  )

  return allDevArticle.nodes
}

export default usePostsData
