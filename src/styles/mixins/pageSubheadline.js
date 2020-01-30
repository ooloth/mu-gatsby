import { css } from 'styled-components'

import { media } from './media'

export const pageSubheadline = css`
  letter-spacing: -1px;
  font-size: 2.45rem;
  font-weight: 900;

  @media screen and (min-width: 375px) {
    font-size: 2.95rem;
  }

  ${media.sm`
    font-size: 3.35rem;
  `}
`
