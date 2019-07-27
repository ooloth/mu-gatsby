export const pageHeadline = css`
  margin-top: var(--s7);
  line-height: var(--lh1);
  font-size: 4.25rem;
  font-weight: 900;

  @media screen and (min-width: 375px) {
    font-size: 4.8rem;
  }

  ${media.sm`
    padding-top: var(--s1);
    font-size: 5.4rem;
  `}
`

///////////////////////////////////////////////////////////////////////////////////

import { css } from 'styled-components'

import { media } from './media'
