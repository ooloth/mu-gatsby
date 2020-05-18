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

interface Article {
  node: {
    frontmatter: Frontmatter
    id: string
    timeToRead: string
  }
}

function useDevArticles(): Article[] {
  const { allDevArticles } = useStaticQuery(
    graphql`
      {
        allDevArticles {
          edges {
            node {
              article {
                id
                title
                description
                type_of
                readable_publish_date
                slug
                path
                url
                comments_count
                positive_reactions_count
                published_timestamp
                social_image
                canonical_url
                created_at
                edited_at
                crossposted_at
                published_at
                last_comment_at
                tag_list
                tags
                user {
                  github_username
                  name
                  profile_image
                  profile_image_90
                  username
                  website_url
                }
                body_markdown
                body_html
              }
            }
            previous {
              article {
                id
              }
            }
            next {
              article {
                id
              }
            }
          }
        }
      }
    `,
  )

  return allDevArticles.edges
}

export default useDevArticles
