function useNavbarData() {
  const { navbarYaml } = useStaticQuery(
    graphql`
      query {
        navbarYaml {
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

  return navbarYaml
}

///////////////////////////////////////////////////////////////////////////////////

import { useStaticQuery, graphql } from 'gatsby'

export default useNavbarData
