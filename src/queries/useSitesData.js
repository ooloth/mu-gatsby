function useSitesData() {
  const { allSitesYaml } = useStaticQuery(
    graphql`
      query {
        allSitesYaml {
          nodes {
            id
            title
            link
            repo
            description
            tools
          }
        }
      }
    `,
  )

  return allSitesYaml.nodes
}

///////////////////////////////////////////////////////////////////////////////////

import { useStaticQuery, graphql } from 'gatsby'

export default useSitesData
