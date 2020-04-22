import { useStaticQuery, graphql } from 'gatsby'

// TODO: update types for this query
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

// TODO: save common query portion as a fragment
function useAirtableTopics(): any {
  const { basicTopics, dataStructureTopics, algorithmTopics } = useStaticQuery(
    graphql`
      {
        basicTopics: allAirtableTopics(
          filter: { data: { Category: { eq: "Algorithms" } } }
          sort: { fields: data___Order, order: ASC }
        ) {
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

        dataStructureTopics: allAirtableTopics(
          filter: { data: { Category: { eq: "Data Structures" } } }
          sort: { fields: data___Order, order: ASC }
        ) {
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

        algorithmTopics: allAirtableTopics(
          filter: { data: { Category: { eq: "Algorithms" } } }
          sort: { fields: data___Order, order: ASC }
        ) {
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

  // TODO: drill down to data here?
  const basics = basicTopics.nodes
  const dataStructures = dataStructureTopics.nodes
  const algorithms = algorithmTopics.nodes

  return { basics, dataStructures, algorithms }
}

export default useAirtableTopics
