function IndexPage() {
  return (
    <Base>
      <Main>
        <p css={pageHeadline}>
          Hi <Emoji emoji="👋" ariaLabel="Emoji of a hand waving hello." />
        </p>

        <h1 css={pageSubheadline}>
          I'm Michael<SrText> Uloth</SrText>.
        </h1>

        <p css={pageSummary}>
          I'm a web developer and opera singer currently working for{' '}
          <Link href="https://www.ecobee.com" css={linkInline}>
            ecobee
          </Link>{' '}
          in Toronto.
        </p>

        <Nav>
          <NavLink href="/blog/">Blog</NavLink>
          <NavLink href="https://www.youtube.com/user/michaeluloth">
            Videos
          </NavLink>
          <NavLink href="/websites/">Websites</NavLink>
          <NavLink href="/opera/">Opera</NavLink>
        </Nav>
      </Main>
    </Base>
  )
}

///////////////////////////////////////////////////////////////////////////////////

const Main = styled.main`
  ${main}
  margin-top: 0;
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
  purpleUnderline
} from '../styles'

export default IndexPage
