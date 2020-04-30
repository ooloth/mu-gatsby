import { css } from 'styled-components'

import { media } from './media'

export const pageHeadline = css`
  margin-top: var(--s7);
  line-height: var(--lh1);
  font-size: 3.4rem;
  font-weight: 900;

  ${media.custom('375px')} {
    font-size: 4rem;
  }

  ${media.sm} {
    padding-top: var(--s1);
    font-size: 4.5rem;
  }
`
