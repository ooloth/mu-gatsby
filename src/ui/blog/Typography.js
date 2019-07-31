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
  ${linkInline}
`

export const UL = styled.ul`
  transform: translateY(-0.1rem);
  margin-top: var(--s2);
  margin-bottom: var(--s4);
  padding-left: var(--s4);
  list-style-type: disc;
`

export const OL = styled.ol`
  transform: translateY(-0.1rem);
  margin-top: var(--s2);
  margin-bottom: var(--s4);
  padding-left: var(--s4);
  list-style-type: decimal;
`

export const LI = styled.li`
  padding-top: 0.25rem;
  line-height: var(--lh2);
`

///////////////////////////////////////////////////////////////////////////////////

import styled from 'styled-components'

import { Link } from '../elements'
import { copy, linkInline } from '../../styles'
