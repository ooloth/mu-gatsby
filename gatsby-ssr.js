/*
 *
 * Fallback content if JS is disabled
 *
 */

// TODO: only implement this if Lighthouse tells me to
// See: https://github.com/gatsbyjs/gatsby/issues/9085#issuecomment-429580470

// const React = require('react')

// exports.onRenderBody = ({ setPreBodyComponents }) => {
//   setPreBodyComponents([
//     <noscript key="noscript">
//       Please enable JavaScript in your browser to view this site.
//     </noscript>
//   ])
// }

/*
 *
 * Add React Context
 *
 */

// See: https://github.com/fabe/gatsby-universal/blob/master/gatsby-ssr.js

// import React from 'react'
// import { renderToString } from 'react-dom/server'
// import AppProvider from './src/store/provider'

// export const replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
//   // Include React Context in SSR/build (NOTE: this is required)
//   const ConnectedBody = () => <AppProvider>{bodyComponent}</AppProvider>
//   replaceBodyHTMLString(renderToString(<ConnectedBody />))
// }
