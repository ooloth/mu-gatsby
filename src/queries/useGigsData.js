function useGigsData() {
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

///////////////////////////////////////////////////////////////////////////////////

import { useStaticQuery, graphql } from 'gatsby'

export default useGigsData
