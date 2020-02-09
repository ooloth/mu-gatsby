import { css } from 'styled-components'

import { media } from './media'
import { purpleUnderline } from './purpleUnderline'

export const projectTitle = css`
  ${purpleUnderline}
  line-height: 1.4;
  font-size: 1.65rem;
  font-weight: 900;

  ${media.custom('375px')} {
    font-size: 1.7rem;
  }

  ${media.sm} {
    font-size: 1.75rem;
  }

  ${media.md} {
    font-size: 1.8rem;
  }

  ${media.lg} {
    font-size: 1.85rem;
  }
`
