export const linkInline = css`
  background-image: linear-gradient(var(--light-purple), var(--light-purple)),
    linear-gradient(var(--light-purple), var(--light-purple));
  background-position: 0% 100%, 0% 100%;
  background-repeat: no-repeat;
  background-size: 0% 0.15em, 100% 0.15em;
  padding-top: 0.08em;
  padding-bottom: 0.08em;
  text-decoration: none;
  transition: color 0.05s ease-in-out, background-size 0;

  &:hover {
    background-size: 0% 150%, 100% 150%;
    color: white;
  }
`

///////////////////////////////////////////////////////////////////////////////////

import { css } from 'styled-components'
