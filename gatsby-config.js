// Mimic node's stack trace to make debugging easier
require('source-map-support').install()

// Support importing TS files in gatsby-[config|node|ssr|browser]
require('ts-node').register()

// Access environment variables
require('dotenv').config()

// Get the originally uploaded DEV post cover images
const getOriginalImgIndex = imageUrl =>
  imageUrl.indexOf('https://dev-to-uploads') >= 0
    ? imageUrl.indexOf('https://dev-to-uploads')
    : imageUrl.indexOf('https://thepracticaldev')

const getOriginalImgUrl = imageUrl =>
  imageUrl.substring(getOriginalImgIndex(imageUrl))

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
      country: `CA`,
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
      `https://www.instagram.com/ooloth/`,
    ],
    structuredDataType: `Person`,
    twitterSite: `@ooloth`,
    twitterCreator: `@ooloth`,
    googleSearchConsoleSiteVerification:
      process.env.GOOGLE_SITE_VERIFICATION_SEARCH_CONSOLE,
    gSuiteSiteVerification: process.env.GOOGLE_SITE_VERIFICATION_GSUITE,
    blogPage: {
      title: `Michael Uloth | Writes`,
      description: `Coding tips and walk-throughs to help future me get unstuck.`,
      url: `https://www.michaeluloth.com/writes`,
    },
    likesPage: {
      title: `Michael Uloth | Likes`,
      description: `Fun stuff that makes me happy.`,
      url: `https://www.michaeluloth.com/likes`,
    },
    operaPage: {
      title: `Michael Uloth | Sings`,
      description: `Concerts and operas I've been lucky enough to perform.`,
      url: `https://www.michaeluloth.com/sings`,
    },
    websitesPage: {
      title: `Michael Uloth | Codes`,
      description: `Sites I've built for fun and profit.`,
      url: `https://www.michaeluloth.com/codes`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: `DevArticle`,
        imagePath: `cover_image`,
        name: `image`,
        prepareUrl: url => getOriginalImgUrl(url),
      },
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: `TvShow`,
        imagePath: `posterUrl`,
        name: `poster`,
      },
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: `Movie`,
        imagePath: `posterUrl`,
        name: `poster`,
      },
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: `Book`,
        imagePath: `coverUrl`,
        name: `cover`,
      },
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: `Album`,
        imagePath: `coverUrl`,
        name: `cover`,
      },
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: `Podcast`,
        imagePath: `coverUrl`,
        name: `cover`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-svgr`,
    'gatsby-plugin-typescript',
    `gatsby-source-dev`, // my custom source plugin
    `gatsby-source-itunes`, // my custom source plugin
    `gatsby-source-tmdb`, // my custom source plugin
    `gatsby-transformer-sharp`,
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        commonmark: true,
        footnotes: true,
        gfm: true,
        pedantic: false,
        plugins: [
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              theme: 'Dracula',
              extensions: ['theme-dracula'],
              injectStyles: false, // importing css file instead
              inlineCode: {
                marker: '•',
              },
            },
          },
          `gatsby-remark-unwrap-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              linkImagesToOriginal: false,
              maxWidth: 1000,
              quality: 80,
              showCaptions: true,
              withWebp: true,
            },
          },
          {
            resolve: `gatsby-remark-smartypants`,
            options: {
              dashes: `oldschool`,
            },
          },
          `gatsby-remark-a11y-emoji`,
        ],
      },
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
            serialize: ({ query: { allDevArticle } }) => {
              return allDevArticle.nodes.map(node => {
                return Object.assign({}, node.article, {
                  title: node.article.title,
                  description: node.article.description,
                  date: node.article.published_at,
                  url: node.article.canonical_url,
                  guid: node.article.canonical_url,
                  custom_elements: [{ 'content:encoded': node.article.body_html }],
                })
              })
            },
            query: `
              {
                allDevArticle(sort: {order: DESC, fields: published_at}) {
                  nodes {
                    body_html
                    canonical_url
                    description
                    published_at(formatString: "MMM DD, YYYY")
                    title
                  }
                }
              }
            `,
            output: `/rss.xml`,
            title: `Michael Uloth's Blog`,
          },
        ],
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-robots-txt`,
      // Disable crawlers for Netlify deploy-previews:
      options: {
        resolveEnv: () => process.env.NODE_ENV,
        env: {
          production: {
            policy: [{ userAgent: `*` }],
          },
          'branch-deploy': {
            policy: [{ userAgent: `*`, disallow: [`/`] }],
            sitemap: null,
            host: null,
          },
          'deploy-preview': {
            policy: [{ userAgent: `*`, disallow: [`/`] }],
            sitemap: null,
            host: null,
          },
        },
      },
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
        icon: `src/images/michael-uloth-circle.png`,
      },
    },
    // bust old service worker versions in Safari showing the old site 🧨
    `gatsby-plugin-remove-serviceworker`,
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
        head: true, // https://csswizardry.com/2018/11/css-and-network-performance/
        anonymize: true,
        respectDNT: true,
      },
    },
    {
      resolve: `gatsby-plugin-netlify`, // must come last
      options: {
        headers: {
          // First one is required for the HSTS list:
          '/*': [
            `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`,
          ],
          '/*.html': [`Cache-Control: public,max-age=0,must-revalidate`],
          '/*.js': [`Cache-Control: public,max-age=0,must-revalidate`],
          '/sw.js': [`Cache-Control: max-age=0,no-cache,no-store,must-revalidate`],
          '/icons/*': [`Cache-Control: public,max-age=31536000,immutable`],
          '/static/*': [`Cache-Control: public,max-age=31536000,immutable`],
        },
      },
    },
  ],
}
