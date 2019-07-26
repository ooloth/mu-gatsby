/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// Urgent polyfills (needed before first render)
///////////////////////////////////////////////////////////////////////////////////

export const onClientEntry = () => {
  // TODO: delete if not using:
  // IntersectionObserver polyfill for gatsby-image (Safari, IE)
  // if (typeof window.IntersectionObserver === `undefined`) {
  //   require(`intersection-observer`)
  //   console.log(`👍 IntersectionObserver is polyfilled`)
  // }
  // TODO: delete if not using:
  // Babel-polyfill for IE (includes everything except fetch)
  // if (!loadjs.isDefined(`babel-polyfill`)) {
  //   if (typeof window.Symbol === `undefined`) {
  //     loadjs(
  //       `https://unpkg.com/@babel/polyfill`,
  //       `babel-polyfill`,
  //       console.log(`babel-polyfill is loaded`)
  //     )
  //   }
  // }
  // TODO: delete if not using:
  // For React Spring, polyfill Array.from, Object.entries, Set
  // if (!loadjs.isDefined(`polyfill-io`)) {
  //   if (typeof Array.from === `undefined`) {
  //     loadjs(
  //       `https://polyfill.io/v3/polyfill.min.js?flags=gated&features=default%2CArray.prototype.fill`,
  //       `polyfill-io`,
  //       console.log(`Array.from, Object.entries, and Set are polyfilled`)
  //     )
  //   }
  // }
  // TODO: remove if not using
  // Scroll Behaviour polyfill (Safari, IE)
  // if (typeof document.documentElement.style.scrollBehavior === `undefined`) {
  //   const smoothScroll = require(`smoothscroll-polyfill`)
  //   smoothScroll.polyfill()
  //   console.log(`👍 Scroll Behavior is polyfilled`)
  // }
  // TODO: enable if supporting IE, otherwise remove
  // Object-fit/Object-position polyfill for gatsby-image (IE)
  // const testImg = document.createElement(`img`)
  // if (
  //   typeof testImg.style.objectFit === `undefined` ||
  //   typeof testImg.style.objectPosition === `undefined`
  // ) {
  //   require(`object-fit-images`)()
  //   console.log(`👍 Object-fit/Object-position are polyfilled`)
  // }
}

// Non-urgent polyfills and scripts (needed after first render)
///////////////////////////////////////////////////////////////////////////////////

import loadjs from 'loadjs'

export const onInitialClientRender = () => {
  // A11Y: Detect keyboard vs. mouse vs. touch input (for focus styling)
  if (!loadjs.isDefined(`what-input`)) {
    loadjs(
      `https://unpkg.com/what-input@5.1.3/dist/what-input.js`,
      `what-input`,
      () => console.log(`👍 What-input is loaded`)
    )
  }

  // TODO: delete any parts I'm not using:
  // GSAP for site-wide animations
  if (!loadjs.isDefined(`gsap`)) {
    loadjs(
      [
        `https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.1/TweenLite.min.js`,
        // `https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.1/TweenMax.min.js`,
        `https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.1/plugins/CSSPlugin.min.js`,
        // `https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.1/TimelineMax.min.js`,
        `https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.1/TimelineLite.min.js`
      ],
      `gsap`,
      () => console.log(`👍 GSAP is loaded`)
    )
  }

  // TODO: delete if not using:
  // GSAP's scrollToPlugin for sitewide smooth-scrolling
  // if (!loadjs.isDefined(`scrollToPlugin`)) {
  //   loadjs(
  //     `https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.0/plugins/ScrollToPlugin.min.js`,
  //     `scrollToPlugin`,
  //     () => console.log(`👍 scrollToPlugin is loaded`)
  //   )
  // }
  // TODO: delete if not using:
  // Google Analytics (using ga-lite to allow caching)
  // See: https://github.com/jehna/ga-lite
  // Don't waste any time on this on localhost
  // if (window.location.hostname !== 'localhost') {
  //   if (!loadjs.isDefined(`ga-lite`)) {
  //     loadjs(
  //       `https://cdn.jsdelivr.net/npm/ga-lite@2/dist/ga-lite.min.js`,
  //       `ga-lite`,
  //       () => {
  //         // https://developers.google.com/analytics/devguides/collection/analyticsjs/cookies-user-id#automatic_cookie_domain_configuration
  //         galite('create', 'UA-XXXXXXX-X', 'auto') // auto prevents tracking on localhost
  //         galite('send', 'pageview')
  //         // See: https://github.com/jehna/ga-lite#onunload-tracking
  //         window.addEventListener('unload', () => {
  //           galite('send', 'timing', 'JS Dependencies', 'unload')
  //         })
  //       }
  //     )
  //   }
  // }

  // TODO: delete if not using:
  // Babel-polyfill for IE (includes everything except fetch)
  // if (!loadjs.isDefined(`babel-polyfill`)) {
  //   if (typeof window.Symbol === `undefined`) {
  //     loadjs(
  //       `https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.0.0/polyfill.min.js`,
  //       `babel-polyfill`,
  //       console.log(`babel-polyfill is loaded`)
  //     )
  //   }
  // }

  // TODO: delete if not using:
  // Fetch polyfill for IE
  // if (typeof window.fetch === `undefined`) {
  //   loadjs(
  //     `https://cdnjs.cloudflare.com/ajax/libs/fetch/2.0.4/fetch.min.js`,
  //     `fetch`,
  //     () => console.log(`👍 Fetch is polyfilled`)
  //   )
  // }
}

// TODO: delete if not using:
// Add React Context
///////////////////////////////////////////////////////////////////////////////////

// See: https://github.com/fabe/gatsby-universal/blob/master/gatsby-browser.js

// import React from 'react'
// import AppProvider from './src/store/provider'

// // React Context in Browser
// export const wrapRootElement = ({ element }) => {
//   return <AppProvider>{element}</AppProvider>
// }
