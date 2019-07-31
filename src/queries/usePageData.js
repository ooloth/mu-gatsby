function usePageData() {
  const { blogYaml, websitesYaml, operaYaml } = useStaticQuery(
    graphql`
      query {
        blogYaml {
          headline
          emoji {
            icon
            label
          }
          summary
        }

        websitesYaml {
          headline
          emoji {
            icon
            label
          }
          summary
        }

        operaYaml {
          headline
          emoji {
            icon
            label
          }
          summary
        }
      }
    `
  )

  return { blogYaml, websitesYaml, operaYaml }
}

///////////////////////////////////////////////////////////////////////////////////

import { useStaticQuery, graphql } from 'gatsby'

export default usePageData
