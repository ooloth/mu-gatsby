function NotFoundPage() {
  // const navLinks = useNavLinksData()

  return (
    <Base>
      <Wrapper>
        <div>
          <h1>
            <LargeText>404</LargeText>
            <SmallerText>Oh no! This page doesn't exist.</SmallerText>
          </h1>

          <Text>How about this one instead?</Text>
          <RealLink href="/">Home</RealLink>

          {/* <Text>How about one of these instead?</Text> */}
          {/* <ul>{navLinks.map...}</ul> */}
        </div>
      </Wrapper>
    </Base>
  )
}

///////////////////////////////////////////////////////////////////////////////////

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--red);
  padding: 6%;
  height: 100vh;
  text-align: center;
  letter-spacing: -0.025rem;
  color: white;
`

///////////////////////////////////////////////////////////////////////////////////

const LargeText = styled.span`
  font-size: 9rem;
  font-weight: 900;
  white-space: nowrap;

  ${media.sm`
    font-size: 11rem;
  `}
`

///////////////////////////////////////////////////////////////////////////////////

const SmallerText = styled.span`
  display: block;
  padding-top: var(--s5);
  font-size: var(--f7);
  font-weight: 800;

  ${media.sm`
    font-size: var(--f8);
  `}
`

///////////////////////////////////////////////////////////////////////////////////

const Text = styled.p`
  ${copy}
  margin: 0 auto;
  padding-top: var(--s6);
  max-width: 24rem;
  font-size: var(--f5);
  font-weight: 700;

  ${media.sm`
    padding-top: var(--s7);
    font-size: var(--f6);
  `}
`

///////////////////////////////////////////////////////////////////////////////////

const RealLink = styled(Link)`
  /* Add primary link styles */
`

///////////////////////////////////////////////////////////////////////////////////

import React from 'react'
import styled from 'styled-components'

import Base from '../ui/Base'
import { Link } from '../ui/elements'
// import useNavLinks from '../data/useNavLinksData'
import { copy, media } from '../styles'

export default NotFoundPage
