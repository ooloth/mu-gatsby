function Bottom() {
  const { title } = useSiteMetadata()

  return (
    <Footer>
      <Text>
        &copy; {new Date().getFullYear()} {title}
      </Text>
    </Footer>
  )
}

///////////////////////////////////////////////////////////////////////////////////

const Footer = styled.footer`
  ${container}
  margin-top: var(--s8);
  padding-bottom: var(--s4);
  width: 100%;
`

const Text = styled.small`
  ${copy}
  display: block;
  margin-top: var(--s2);
  font-size: var(--f2);
`

///////////////////////////////////////////////////////////////////////////////////

import React from 'react'
import styled from 'styled-components'

import { Link } from './elements'
import useSiteMetadata from '../queries/useSiteMetadata'
import { container, copy } from '../styles'

export default Bottom
