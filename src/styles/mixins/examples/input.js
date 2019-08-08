export const input = css`
  ${purpleGradient}
  display: block;
  padding: var(--s2) var(--s3);
  line-height: normal;
  color: white;

  &::placeholder {
    opacity: 0.8;
    color: white;
  }
`

///////////////////////////////////////////////////////////////////////////////////

import { css } from 'styled-components'

import { purpleGradient } from './purpleGradient'
