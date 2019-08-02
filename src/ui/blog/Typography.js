export const H2 = styled.h2`
  margin-top: var(--s7);
  margin-bottom: var(--s4);
  font-weight: 900;
  font-size: var(--f7);
`

export const H3 = styled.h3`
  margin-top: var(--s7);
  margin-bottom: var(--s4);
  font-weight: 900;
  font-size: var(--f6);
`

export const P = styled.p`
  ${copy}
  margin-top: var(--s4);
  margin-bottom: var(--s4);
`

export const A = styled(Link)`
  /* Don't add purple underline to images */
  &:not(.gatsby-resp-image-link) {
    ${linkInline}
  }
`

export const UL = styled.ul`
  margin-top: var(--s4);
  margin-bottom: var(--s4);
  padding-left: 1.1rem;
  list-style-type: disc;
`

export const OL = styled.ol`
  margin-top: var(--s4);
  margin-bottom: var(--s4);
  padding-left: 1.1rem;
  list-style-type: decimal;
`

export const LI = styled.li`
  margin-top: 0.3rem;
  line-height: var(--lh2);
`

///////////////////////////////////////////////////////////////////////////////////

import styled from 'styled-components'

import { Link } from '../elements'
import { copy, linkInline, purpleUnderline } from '../../styles'
