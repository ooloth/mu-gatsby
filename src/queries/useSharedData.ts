import { useStaticQuery, graphql } from 'gatsby'

import { Platform } from '../ui/Bottom'

// See: gatsby/packages/gatsby-transformer-sharp/src/fragments.js
interface GatsbyImageFluidWithWebp {
  childImageSharp: {
    fluid: {
      base64: string
      aspectRatio: number
      src: string
      srcSet: string
      srcWebp: string
      srcSetWebp: string
      sizes: string
    }
  }
}

interface Avatar {
  file: GatsbyImageFluidWithWebp
  objPos: string
}

export interface NavLink {
  href: string
  text: string
}

export interface SocialLink {
  href: string
  platform: Platform
  srText: string
}

interface SharedData {
  avatar: Avatar
  navLinks: NavLink[]
  socialLinks: SocialLink[]
}

function useSharedData(): SharedData {
  const { sharedYaml } = useStaticQuery(
    graphql`
      {
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

export default useSharedData
