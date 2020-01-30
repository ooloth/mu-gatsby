import { css } from 'styled-components'

// NOTE: these are NOT needed for Gatsby Image (do this instead: https://github.com/gatsbyjs/gatsby/issues/3720#issuecomment-360946044)

export const aspectRatioParent = css`
  position: relative;
  height: 0;
`

export const aspectRatioChild = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  width: 100% !important;
  height: 100% !important;
`

///////////////////////////////////////////////////////////////////////////////////

export const ratio2x1 = css`
  padding-bottom: 50%;
`
export const ratio1x2 = css`
  padding-bottom: 200%;
`

export const ratio16x9 = css`
  padding-bottom: 56.25%;
`
export const ratio9x16 = css`
  padding-bottom: 177.77%;
`

export const ratio4x3 = css`
  padding-bottom: 75%;
`
export const ratio3x4 = css`
  padding-bottom: 133.33%;
`

export const ratio6x4 = css`
  padding-bottom: 66.6%;
`
export const ratio4x6 = css`
  padding-bottom: 150%;
`

export const ratio8x5 = css`
  padding-bottom: 62.5%;
`
export const ratio5x8 = css`
  padding-bottom: 160%;
`

export const ratio7x5 = css`
  padding-bottom: 71.42%;
`
export const ratio5x7 = css`
  padding-bottom: 140%;
`

export const ratio1x1 = css`
  padding-bottom: 100%;
`
