import React from 'react'
import styled from 'styled-components'

import Base from '../ui/Base'
import { Emoji, Link, SrText } from '../ui/elements'
import {
  linkInline,
  main,
  media,
  pageHeadline,
  pageSubheadline,
  pageSummary,
  purpleUnderline,
} from '../styles'

const Main = styled.main`
  ${main}
  margin-top: 0;
`

const Nav = styled.nav`
  margin-top: var(--s7);
`

const NavLink = styled(Link)`
  ${purpleUnderline}
  font-size: 1.75rem;
  font-weight: 900;
  text-transform: uppercase;

  &::before {
    display: block;
    content: '';
    margin-top: var(--s4);
  }

  ${media.sm`
    font-size: 1.8rem;
  `}
`

function IndexPage({ location }) {
  return (
    // https://www.gatsbyjs.org/docs/migrating-from-v1-to-v2/#4-pass-history-location-and-match-props-to-layout
    <Base location={location}>
      <Main>
        <p css={pageHeadline}>
          Hi <Emoji emoji="👋" ariaLabel="Emoji of a hand waving hello." />
        </p>

        <h1 css={pageSubheadline}>
          I'm Michael<SrText> Uloth</SrText>.
        </h1>

        <p css={pageSummary}>
          I'm a web developer and opera singer working for{' '}
          <Link href="https://www.ecobee.com" css={linkInline}>
            ecobee
          </Link>{' '}
          in Toronto.
        </p>

        <Nav>
          <NavLink href="/writes/">Articles</NavLink>
          <br />
          <NavLink href="https://www.youtube.com/user/michaeluloth">Videos</NavLink>
          <br />
          <NavLink href="/codes/">Websites</NavLink>
          {/* <br />
          <NavLink href="/experiments/">Experiments</NavLink>
          <br />
          <NavLink href="/bookmarks/">Bookmarks</NavLink> */}
          <br />
          <NavLink href="/sings/">Operas</NavLink>
          <br />
          <NavLink href="/likes/">Likes</NavLink>
        </Nav>
      </Main>
    </Base>
  )
}

export default IndexPage
