export const inlineLink = css`
  display: inline-flex;
  border-top: 0.12em solid transparent;
  border-bottom: 0.12em solid black;
  line-height: 1;
  text-decoration: none;
  transition: all 0.05s;

  &:hover {
    border-top-color: black;
    background-color: black;
    color: white;
  }
`

///////////////////////////////////////////////////////////////////////////////////

import { css } from 'styled-components'
