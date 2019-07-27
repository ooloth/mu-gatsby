// Variables for gatsby-plugin-robots-txt:
// const {
//   NODE_ENV,
//   URL: NETLIFY_SITE_URL = `https://www.example.com`,
//   DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
//   CONTEXT: NETLIFY_ENV = NODE_ENV
// } = process.env
// const isNetlifyProduction = NETLIFY_ENV === `production`
// const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL

module.exports = {
  siteMetadata: {
    // TODO: set unused properties to `` (removing the line breaks the query)
    title: `Michael Uloth`,
    jobTitle: ``,
    description: `Site description (70-156 characters)`,
    siteUrl: `https://www.client.com`, // no trailing slash
    lang: `en`,
    locale: `en_CA`,
    email: `email@client.com`,
    telephone: `+18001234567`,
    address: {
      street: `305 Healey Rd., Unit A`,
      locality: `Toronto`,
      region: `ON`,
      postalCode: `L7K 5C1`,
      country: `CA`
    },
    socialLinks: [
      `https://www.youtube.com/user`,
      `https://twitter.com/user`,
      `https://www.facebook.com/user`,
      `https://www.instagram.com/user`,
      `https://medium.com/user`,
      `https://github.com/user`
    ],
    structuredDataType: `LocalBusiness`, // or Person
    twitterSite: `@handle`,
    twitterCreator: `@ooloth`,
    facebookAppId: ``,
    googleSiteVerification: ``, // for Google Search Console
    blogPage: {
      title: `Add Second Page Title`,
      description: `Add second page description (50-300 characters)`,
      url: `https://www.michaeluloth.com/blog`
    },
    websitesPage: {
      title: `Add Second Page Title`,
      description: `Add second page description (50-300 characters)`,
      url: `https://www.michaeluloth.com/websites`
    },
    operaPage: {
      title: `Add Second Page Title`,
      description: `Add second page description (50-300 characters)`,
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
    `gatsby-plugin-mdx`,
    // {
    //   resolve: `gatsby-mdx`,
    //   options: {
    //     extensions: ['.mdx', '.md'],
    //     gatsbyRemarkPlugins: [
    //       {
    //         resolve: 'gatsby-remark-images',
    //         options: {
    //           maxWidth: 1035,
    //           sizeByPixelDensity: true,
    //         },
    //       },
    //       {
    //         resolve: `gatsby-remark-prismjs`,
    //         options: {
    //           classPrefix: 'language-',
    //           inlineCodeMarker: null,
    //           aliases: {},
    //         },
    //       },
    //     ],
    //   }
    // },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-yaml`,
    `gatsby-plugin-svgr`
    // `gatsby-plugin-webpack-bundle-analyzer`
    // `gatsby-plugin-sitemap`,
    // {
    //   resolve: `gatsby-plugin-robots-txt`,
    //   // Disable crawlers for Netlify deploy-previews:
    //   options: {
    //     resolveEnv: () => NETLIFY_ENV,
    //     env: {
    //       production: {
    //         policy: [{ userAgent: `*` }]
    //       },
    //       'branch-deploy': {
    //         policy: [{ userAgent: `*`, disallow: [`/`] }],
    //         sitemap: null,
    //         host: null
    //       },
    //       'deploy-preview': {
    //         policy: [{ userAgent: `*`, disallow: [`/`] }],
    //         sitemap: null,
    //         host: null
    //       }
    //     }
    //   }
    // },
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `J. Patrick Raftery`,
    //     short_name: `JP Raftery`,
    //     start_url: `/`,
    //     // For splash screen when app launches:
    //     background_color: `#3047ff`,
    //     // For tool bar and task switcher:
    //     theme_color: `#3047ff`,
    //     display: `minimal-ui`,
    //     // Multiple icons will be generated for various devices.
    //     // Multiple favicons will be generated and added to each HTML page.
    //     // This path is relative to the root of the site.
    //     icon: `src/images/favicon.png`
    //   }
    // },
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
