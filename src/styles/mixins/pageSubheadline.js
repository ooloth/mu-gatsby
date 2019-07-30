export const pageSubheadline = css`
  line-height: var(--lh1);
  ${'' /* font-size: 2.5rem; */}
  font-size: 2.35rem;
  font-weight: 900;

  @media screen and (min-width: 375px) {
    ${'' /* font-size: 3rem; */}
    font-size: 2.75rem;
  }

  ${media.sm`
    /* font-size: 3.6rem; */
    font-size: 3.3rem;
  `}
`

///////////////////////////////////////////////////////////////////////////////////

import { css } from 'styled-components'

import { media } from './media'
