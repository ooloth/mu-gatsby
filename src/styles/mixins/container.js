import { css } from 'styled-components'

import { media } from './media'

export const container = css`
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--s3);
  padding-right: var(--s3);
  max-width: var(--s17);

  ${media.sm} {
    padding-left: var(--s4);
    padding-right: var(--s4);
  }

  ${media.md} {
    padding-left: var(--s6);
    padding-right: var(--s6);
  }

  ${media.xl} {
    padding-left: var(--s7);
    padding-right: var(--s7);
  }
`
