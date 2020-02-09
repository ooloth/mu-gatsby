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
  const { allWebsitesYaml } = useStaticQuery(
    graphql`
      {
        allWebsitesYaml {
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

  return allWebsitesYaml.nodes
}

export default useWebsitesData
