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

          navLinks {
            href
            text
          }

          socialLinks {
            platform
            href
            srText
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
