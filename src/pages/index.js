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
  ${pageHeadline}
`

const Name = styled.h1`
  ${pageSubheadline}
`

const Bio = styled.p`
  ${pageSummary}
`

const JobLink = styled(Link)`
  ${linkInline}
`

const Nav = styled.nav`
  margin-top: var(--s7);
`

const NavLink = styled(Link)`
  ${purpleUnderline}
  display: block;
  margin-top: var(--s3);
  width: max-content;
  line-height: var(--lh1);
  font-size: 1.75rem;
  font-weight: 900;
  text-transform: uppercase;

  ${media.lg`
    font-size: 1.85rem;
  `}
`

///////////////////////////////////////////////////////////////////////////////////

import React from 'react'
import styled, { css } from 'styled-components'

import Base from '../ui/Base'
import { Emoji, Link, SrText } from '../ui/elements'
import {
  container,
  linkInline,
  media,
  pageHeadline,
  pageSubheadline,
  pageSummary,
  purpleUnderline
} from '../styles'

export default IndexPage
