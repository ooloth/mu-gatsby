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

function useGigsData(): Gig[] {
  const { allGigsYaml } = useStaticQuery(
    graphql`
      query {
        allGigsYaml {
          nodes {
            id
            title {
              text
              lang
            }
            link
            description
            tags
            reviews {
              quotation
              source
              link
            }
          }
        }
      }
    `,
  )

  return allGigsYaml.nodes
}

export default useGigsData
