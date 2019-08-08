function NotFoundPage() {
  return (
    <Base>
      <Wrapper>
        <h1>
          <LargeText>404</LargeText>
          <SmallerText>Oh no! This page doesn't exist.</SmallerText>
        </h1>
      </Wrapper>
    </Base>
  )
}

///////////////////////////////////////////////////////////////////////////////////

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 6%;
  padding-right: 6%;
  min-height: calc(100vh - 58px - var(--s4) - 64px - var(--s8));
  text-align: center;
`

///////////////////////////////////////////////////////////////////////////////////

const LargeText = styled.span`
  display: block;
  margin-top: var(--s7);
  font-size: 7rem;
  font-weight: 900;
  white-space: nowrap;

  ${media.sm`
    font-size: 9rem;
  `}
`

///////////////////////////////////////////////////////////////////////////////////

const SmallerText = styled.span`
  display: block;
  padding-top: var(--s4);
  font-size: var(--f6);
  font-weight: 800;

  ${media.sm`
    font-size: var(--f7);
  `}
`

///////////////////////////////////////////////////////////////////////////////////

import React from 'react'
import styled from 'styled-components'

import Base from '../ui/Base'
import { media } from '../styles'

export default NotFoundPage
