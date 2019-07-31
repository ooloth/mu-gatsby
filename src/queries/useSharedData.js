function useSharedData() {
  const { sharedYaml } = useStaticQuery(
    graphql`
      query {
        sharedYaml {
          avatar {
            file {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            objPos
          }

          socialLinks {
            platform
            href
          }
        }
      }
    `
  )

  return sharedYaml
}

///////////////////////////////////////////////////////////////////////////////////

import { useStaticQuery, graphql } from 'gatsby'

export default useSharedData
