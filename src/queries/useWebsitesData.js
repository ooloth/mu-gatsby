function useWebsitesData() {
  const { allWebsitesYaml } = useStaticQuery(
    graphql`
      query {
        allWebsitesYaml {
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
    `
  )

  return allWebsitesYaml.nodes
}

///////////////////////////////////////////////////////////////////////////////////

import { useStaticQuery, graphql } from 'gatsby'

export default useWebsitesData
