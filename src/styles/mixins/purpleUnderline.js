import { css } from 'styled-components'

import { purpleGradient } from './purpleGradient'

export const purpleUnderline = css`
  ${purpleGradient}
  background-position: 0% 100%;
  background-size: 100% 0.25em;
  padding-top: 0.12em;
  text-decoration: none;

  &:hover {
    background-size: 100% 150%;
    color: white;
  }
`
