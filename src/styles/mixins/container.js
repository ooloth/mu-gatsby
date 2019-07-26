export const container = css`
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--s4);
  padding-right: var(--s4);
  max-width: var(--s17);

  ${media.md`
    padding-left: var(--s6);
    padding-right: var(--s6);
  `}

  ${media.xl`
    padding-left: var(--s8);
    padding-right: var(--s8);
  `}
`

///////////////////////////////////////////////////////////////////////////////////

import { css } from 'styled-components'

import { media } from './media'
