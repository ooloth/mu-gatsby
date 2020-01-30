import { useStaticQuery, graphql } from 'gatsby'

function useSiteMetadata() {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            jobTitle
            description
            siteUrl
            lang
            locale
            email
            telephone
            address {
              street
              locality
              region
              postalCode
              country
            }
            socialLinks
            structuredDataType
            twitterSite
            twitterCreator
            googleSearchConsoleSiteVerification
            gSuiteSiteVerification
            blogPage {
              title
              description
              url
            }
            operaPage {
              title
              description
              url
            }
            websitesPage {
              title
              description
              url
            }
            likesPage {
              title
              description
              url
            }
          }
        }
      }
    `,
  )

  return site.siteMetadata
}

export default useSiteMetadata
