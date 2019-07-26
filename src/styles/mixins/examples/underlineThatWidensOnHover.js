// From Alison Moritz's links

export const underlineThatWidensOnHover = css`
  display: inline-block;
  position: relative;
  z-index: 0;
  line-height: var(--lh2);

  /* Reset default element styles */
  border: none;
  background: transparent;
  text-decoration: none;

  &:after {
    content: '';
    display: block;
    position: absolute;
    bottom: -0.1em;
    left: 0;
    z-index: -1;
    border-radius: var(--r5);
    background-color: var(--pink);
    width: 2.5rem;
    max-width: 90%;
    height: 0.25em;
    transform-origin: bottom;
    transition: all 0.2s ease-in-out;
  }

  &:hover {
    &:after {
      max-width: 100%;
      width: 100%;
    }
  }
`

///////////////////////////////////////////////////////////////////////////////////

import { css } from 'styled-components'
