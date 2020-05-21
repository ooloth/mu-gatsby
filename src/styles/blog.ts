import { css } from 'styled-components'

import { copy } from './mixins/copy'
import { linkInline } from './mixins/linkInline'
import {
  aspectRatioParent,
  ratio16x9,
  aspectRatioChild,
} from './mixins/aspectRatios'

export const h2 = css`
  h2 {
    margin-top: var(--s7);
    margin-bottom: var(--s4);
    font-weight: 900;
    font-size: var(--f7);
  }
`

export const h3 = css`
  h3 {
    margin-top: var(--s7);
    margin-bottom: var(--s4);
    font-weight: 900;
    font-size: var(--f6);
  }
`

export const p = css`
  p {
    ${copy};
    margin-top: var(--s4);
    margin-bottom: var(--s4);
  }
`

export const a = css`
  /* Don't add purple underline to images that are links */
  a:not(.gatsby-resp-image-link) {
    ${linkInline};
  }
`

export const ul = css`
  ul {
    margin-top: var(--s4);
    margin-bottom: var(--s4);
    padding-left: 1.1rem;
    list-style-type: disc;
  }
`

export const ol = css`
  ol {
    margin-top: var(--s4);
    margin-bottom: var(--s4);
    padding-left: 1.1rem;
    list-style-type: decimal;
  }
`

export const li = css`
  li {
    margin-top: 0.3rem;
    line-height: var(--lh2);
  }

  /* Paragraphs within list items are inline */
  li p {
    display: inline;
  }
`

export const img = css`
  img {
    display: block;
    margin-top: var(--s7);
    margin-bottom: var(--s7);
    box-shadow: var(--shadow2);
    border-radius: var(--r2);
    width: 100%;
  }

  /* .gatsby-resp-image-wrapper {
    box-shadow: var(--shadow2);
    overflow: hidden;
    border-radius: var(--r2);
  } */
`

export const figure = css`
  figure {
    margin-top: var(--s6);
    margin-bottom: var(--s6);
  }

  figcaption {
    padding-top: var(--s2);
    text-align: center;
    font-size: var(--f2);
    color: var(--black70);
  }
`

export const iframe = css`
  div[data-id='iframe-container'] {
    ${aspectRatioParent};
    ${ratio16x9};
    margin-top: var(--s6);
    margin-bottom: var(--s6);

    iframe {
      ${aspectRatioChild};
      box-shadow: var(--shadow2);
      border-radius: var(--r2);
      background-color: black;
    }
  }
`

export const pre = css`
  /* Give code blocks vertical space */
  pre {
    margin-top: var(--s2);
    margin-bottom: var(--s2);
    padding: var(--s3) var(--s2) var(--s2) 0;
  }
`

export const code = css`
  code {
    display: inline-block;
    font-size: 0.85em !important;
    margin: 0 0.05em;
    border-radius: var(--r2);
    padding: 0.1em 0.25em 0.25em;
    line-height: 1.3;
    /* white-space: normal; */
  }

  /* Don't apply link styles inside code blocks */
  code a {
    background: none !important;
    font-weight: normal !important;
  }
`

export const selection = css`
  ::selection {
    background-color: var(--purple);
    color: white;
  }
`

export const gatsbyPluginTwitter = css`
  /* gatsby-plugin-twitter */
  .twitter-tweet {
    margin-top: var(--s6) !important;
    margin-bottom: var(--s6) !important;
    box-shadow: var(--shadow2);
    border-radius: var(--r2);
  }
`
