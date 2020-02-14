import { useStaticQuery, graphql } from 'gatsby'

export interface WebsiteData {
  description: string
  id: string
  link: string
  repo: string
  title: string
  tools: string[]
}

function useWebsitesData(): WebsiteData[] {
  const { allSitesYaml } = useStaticQuery(
    graphql`
      {
        allSitesYaml {
          nodes {
            description
            id
            link
            repo
            title
            tools
          }
        }
      }
    `,
  )

  return allSitesYaml.nodes
}

export default useWebsitesData
