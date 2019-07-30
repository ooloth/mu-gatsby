export const pageSummary = css`
  margin-top: var(--s5);
  max-width: 28ch;
  ${'' /* max-width: 23ch; */}
  line-height: 1.4;
  font-size: var(--f5);

  ${media.sm`
    font-size: 1.35rem;
  `}
`

///////////////////////////////////////////////////////////////////////////////////

import { css } from 'styled-components'

import { media } from './media'
