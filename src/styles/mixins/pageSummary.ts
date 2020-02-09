import { css } from 'styled-components'

import { media } from './media'

export const pageSummary = css`
  margin-top: var(--s5);
  width: 32ch;
  line-height: 1.4;
  font-size: var(--f5);

  ${media.sm} {
    font-size: 1.35rem;
  }
`
