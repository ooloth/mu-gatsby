import React from 'react'
import styled from 'styled-components'
import Image from 'gatsby-image'

import { Link, SkipNav, SrText } from './elements'
import useSharedData from '../queries/useSharedData'
import { container } from '../styles'

const Nav = styled.nav`
  ${container};
  display: flex;
  justify-content: space-between;
  padding-top: var(--s4);
  width: 100%;
`

const Avatar = styled(Image)`
  box-shadow: var(--shadow1);
  border-radius: var(--r100);
  width: var(--s7);
`

function Top() {
  const { avatar } = useSharedData()

  return (
    <>
      <SkipNav href="#main-content" />
      <Nav id="top">
        <h1>
          <Link href="/">
            <SrText>Michael Uloth</SrText>
            <Avatar
              fluid={{ ...avatar.file.childImageSharp.fluid, aspectRatio: 1 / 1 }}
              alt="" // don't announce this image
              imgStyle={{ objectPosition: avatar.objPos }}
            />
          </Link>
        </h1>
      </Nav>
    </>
  )
}

export default Top
