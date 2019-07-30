function useOperaData() {
  const { allOperaYaml } = useStaticQuery(
    graphql`
      query {
        allOperaYaml {
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
    `
  )

  return allOperaYaml.nodes
}

///////////////////////////////////////////////////////////////////////////////////

import { useStaticQuery, graphql } from 'gatsby'

export default useOperaData
