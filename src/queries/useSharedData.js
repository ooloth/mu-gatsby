function useSharedData() {
  const { sharedYaml } = useStaticQuery(
    graphql`
      query {
        sharedYaml {
          avatar {
            file {
              childImageSharp {
                fluid(maxWidth: 60, quality: 80) {
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
    `,
  )

  return sharedYaml
}

///////////////////////////////////////////////////////////////////////////////////

import { useStaticQuery, graphql } from 'gatsby'

export default useSharedData
