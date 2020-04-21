import { useStaticQuery, graphql } from 'gatsby'

interface Review {
  link: string
  quotation: string
  source: string
}

interface Title {
  lang: string
  text: string
}

interface Gig {
  description: string
  id: string
  link: string
  reviews: Review[]
  tags: string[]
  title: Title
}

function useAirtableData(): Gig[] {
  const { topics } = useStaticQuery(
    graphql`
      {
        topics: allAirtableTopics {
          nodes {
            id
            data {
              Category
              Difficulty
              Learning_Resources {
                id
                data {
                  Link
                  Source {
                    id
                    data {
                      Link
                      Price
                    }
                  }
                  Format
                  Language
                }
              }
              Name
              Notes
              Practice_Problems {
                id
              }
              Priority
              Skills {
                id
              }
            }
          }
        }
      }
    `,
  )

  return topics.nodes
}

export default useAirtableData
