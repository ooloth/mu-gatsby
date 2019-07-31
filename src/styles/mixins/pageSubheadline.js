export const pageSubheadline = css`
  line-height: var(--lh1);
  font-size: 2.55rem;
  font-weight: 900;

  @media screen and (min-width: 375px) {
    font-size: 2.95rem;
  }

  ${media.sm`
    font-size: 3.35rem;
  `}
`

///////////////////////////////////////////////////////////////////////////////////

import { css } from 'styled-components'

import { media } from './media'
