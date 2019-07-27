function IndexPage() {
  return (
    <Base>
      <Main id="main-content">
        <div>
          <Greeting>
            Hi <Emoji emoji="👋" ariaLabel="Emoji of a hand waving hello." />
          </Greeting>

          <Name>
            I'm Michael<SrText> Uloth</SrText>.
          </Name>

          <Bio>
            I'm a web developer and opera singer currently working for{' '}
            <JobLink href="https://www.ecobee.com">ecobee</JobLink> in Toronto.
          </Bio>

          <Nav>
            <NavLink href="/blog/">Blog</NavLink>
            <NavLink href="https://www.youtube.com/user/michaeluloth">
              Videos
            </NavLink>
            <NavLink href="/websites/">Websites</NavLink>
            <NavLink href="/opera/">Opera</NavLink>
          </Nav>
        </div>
      </Main>
    </Base>
  )
}

///////////////////////////////////////////////////////////////////////////////////

const Main = styled.main`
  ${container}
  flex: auto;
  display: flex;
  width: 100%;
`

const Greeting = styled.p`
  margin-top: var(--s8);
  line-height: var(--lh1);
  font-size: 5rem;
  font-weight: 900;

  @media screen and (min-width: 375px) {
    font-size: 5.4rem;
  }

  ${media.sm`
    padding-top: var(--s1);
    font-size: 6rem;
  `}
`

const Name = styled.h1`
  line-height: var(--lh1);
  font-size: var(--f9);
  font-weight: 900;

  @media screen and (min-width: 375px) {
    font-size: 3.6rem;
  }

  ${media.sm`
    font-size: 4.1rem;
  `}
`

const Bio = styled.p`
  margin-top: var(--s5);
  max-width: 28ch;
  line-height: 1.4;
  font-size: var(--f6);
`

const JobLink = styled(Link)`
  ${inlineLink}
`

const Nav = styled.nav`
  margin-top: 3rem;
`

const NavLink = styled(Link)`
  display: flex;
  width: max-content;
  margin-top: var(--s3);
  border-top: 0.25em solid transparent;
  border-bottom: 0.25em solid var(--light-purple);
  vertical-align: middle;
  line-height: 1;
  font-size: 2rem;
  font-weight: 900;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.05s;

  &:hover {
    border-top-color: var(--light-purple);
    background-color: var(--light-purple);
    color: white;
  }
`

///////////////////////////////////////////////////////////////////////////////////

import React from 'react'
import styled from 'styled-components'

import Base from '../ui/Base'
import { Emoji, Link, SrText } from '../ui/elements'
import { container, inlineLink, media } from '../styles'

export default IndexPage
