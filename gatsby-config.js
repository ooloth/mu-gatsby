// Use environment variables for Google Analytics + Search Console
require(`dotenv`).config()

// Robots.txt variables
const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = `https://www.michaeluloth.com`,
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV
} = process.env
const isNetlifyProduction = NETLIFY_ENV === `production`
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL

module.exports = {
  siteMetadata: {
    // set unused properties to `` (removing the line breaks the query)
    title: `Michael Uloth`,
    jobTitle: `Web Developer and Opera Singer`,
    description: `Hi! 👋 I'm Michael. I'm a web developer and opera singer currently working for ecobee in Toronto. This site includes links to my recent articles, videos, websites and opera projects. Feel free to get in touch if you'd like to work together.`,
    siteUrl: `https://www.michaeluloth.com`, // no trailing slash
    lang: `en`,
    locale: `en_CA`,
    email: `hello@michaeluloth.com`,
    telephone: `+`,
    address: {
      street: ``,
      locality: `Toronto`,
      region: `ON`,
      postalCode: ``,
      country: `CA`
    },
    socialLinks: [
      `https://www.youtube.com/user/michaeluloth`,
      `https://twitter.com/ooloth`,
      `https://www.linkedin.com/in/michael-uloth-848a1b98`,
      `https://github.com/ooloth`,
      `https://stackoverflow.com/users/8802485/ooloth`,
      `https://dev.to/ooloth`,
      `https://www.freecodecamp.org/news/author/ooloth/`,
      `https://medium.com/@michaeluloth`,
      `https://www.facebook.com/michaeluloth`,
      `https://www.instagram.com/ooloth/`
    ],
    structuredDataType: `Person`,
    twitterSite: `@ooloth`,
    twitterCreator: `@ooloth`,
    facebookAppId: ``,
    googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION_STRING, // for Google Search Console
    blogPage: {
      title: `Blog | Michael Uloth`,
      description: `Coding tips and walk-throughs to help future me get unstuck.`,
      url: `https://www.michaeluloth.com/blog`
    },
    websitesPage: {
      title: `Websites | Michael Uloth`,
      description: `Sites I've built for fun and profit.`,
      url: `https://www.michaeluloth.com/websites`
    },
    operaPage: {
      title: `Opera | Michael Uloth`,
      description: `Concerts and operas I've been lucky enough to perform.`,
      url: `https://www.michaeluloth.com/opera`
    }
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`
      }
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-yaml`,
    `gatsby-plugin-svgr`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          // `gatsby-remark-a11y-emoji`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1000,
              showCaptions: true,
              withWebp: true
            }
          },
          {
            resolve: `gatsby-remark-smartypants`,
            options: {
              dashes: `oldschool`
            }
          }
        ]
      }
    },
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-twitter`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  title: edge.node.frontmatter.title,
                  description: edge.node.frontmatter.description,
                  date: edge.node.frontmatter.datePublished,
                  url: `${site.siteMetadata.siteUrl}/${
                    edge.node.frontmatter.slug
                  }`,
                  guid: `${site.siteMetadata.siteUrl}/${
                    edge.node.frontmatter.slug
                  }`,
                  custom_elements: [{ 'content:encoded': edge.node.html }]
                })
              })
            },
            query: `
              {
                allMdx(
                  filter: { frontmatter: { published: { ne: false } } },
                  sort: { order: DESC, fields: [frontmatter___datePublished] }
                ) {
                  edges {
                    node {
                      frontmatter {
                        slug
                        title
                        description
                        datePublished
                      }
                      html
                    }
                  }
                }
              }
            `,
            output: `/rss.xml`,
            title: `Michael Uloth's RSS Feed`
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`
      // options: {
      //   exclude: [`/lab`, `/lab/*`]
      // }
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      // Disable crawlers for Netlify deploy-previews:
      options: {
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{ userAgent: `*` }]
          },
          'branch-deploy': {
            policy: [{ userAgent: `*`, disallow: [`/`] }],
            sitemap: null,
            host: null
          },
          'deploy-preview': {
            policy: [{ userAgent: `*`, disallow: [`/`] }],
            sitemap: null,
            host: null
          }
        }
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Michael Uloth`,
        short_name: `M. Uloth`,
        start_url: `/`,
        // For splash screen when app launches:
        background_color: `#964cf0`,
        // For tool bar and task switcher:
        theme_color: `#964cf0`,
        display: `minimal-ui`,
        // Multiple icons will be generated for various devices.
        // Multiple favicons will be generated and added to each HTML page.
        // This path is relative to the root of the site.
        icon: `src/images/michael-uloth-circle.png`
      }
    }
    // `gatsby-plugin-offline`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: 'TRACKING_CODE_HERE',
    //     head: true, // Puts tracking script in the head instead of the body
    //     anonymize: true, // Setting this parameter is optional
    //     respectDNT: true // Setting this parameter is also optional
    //   }
    // },
    // `gatsby-plugin-netlify-cache`,
    // {
    //   resolve: `gatsby-plugin-netlify`, // must come last
    //   options: {
    //     headers: {
    //        // First one is required for the HSTS list:
    //       '/*': [
    //        `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
    //      ],
    //       '/*.html': [`Cache-Control: public, max-age=0, must-revalidate`],
    //       '/*.js': [`Cache-Control: public, max-age=0, must-revalidate`],
    //       '/sw.js': [`Cache-Control: max-age=0, no-cache, no-store, must-revalidate`],
    //       '/icons/*': [`Cache-Control: public,max-age=31536000,immutable`],
    //       '/static/*': [`Cache-Control: public,max-age=31536000,immutable`],
    //       '/subfont/*': [`Cache-Control: public,max-age=31536000,immutable`]
    //     }
    //   }
    // },
    // `gatsby-plugin-subfont`
  ]
}
