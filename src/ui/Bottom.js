import React, { Fragment } from 'react'
import styled from 'styled-components'

import { Link, SrText } from './elements'
import { ReactComponent as TwitterSVG } from '../svg/twitter-brands.svg'
import { ReactComponent as GitHubSVG } from '../svg/github-brands.svg'
import { ReactComponent as LinkedInSVG } from '../svg/linkedin-in-brands.svg'
import { ReactComponent as YouTubeSVG } from '../svg/youtube-brands.svg'
import { ReactComponent as RssSVG } from '../svg/rss-solid.svg'
import { ReactComponent as PaperPlaneSVG } from '../svg/paper-plane-solid.svg'
import useSharedData from '../queries/useSharedData'
import { container, icon, linkInline, purpleGradient } from '../styles'

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--s5);
  height: var(--s5);

  &:hover {
    ${purpleGradient}
    color: white;
  }
`

const LinkedInIcon = styled(LinkedInSVG)`
  ${icon}
`

const TwitterIcon = styled(TwitterSVG)`
  ${icon}
`

const GitHubIcon = styled(GitHubSVG)`
  ${icon}
`

const YouTubeIcon = styled(YouTubeSVG)`
  ${icon}
`

const RssIcon = styled(RssSVG)`
  ${icon}
`

const PaperPlaneIcon = styled(PaperPlaneSVG)`
  ${icon}
`

function SocialLink({ link }) {
  let socialIcon
  if (link.platform === `LinkedIn`) socialIcon = <LinkedInIcon />
  if (link.platform === `Twitter`) socialIcon = <TwitterIcon />
  if (link.platform === `GitHub`) socialIcon = <GitHubIcon />
  if (link.platform === `YouTube`) socialIcon = <YouTubeIcon />
  if (link.platform === `RSS`) socialIcon = <RssIcon />
  if (link.platform === `Email`) socialIcon = <PaperPlaneIcon />

  return (
    <StyledLink href={link.href}>
      <SrText>{link.srText}</SrText>
      {socialIcon}
    </StyledLink>
  )
}

const Footer = styled.footer`
  ${container}
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: var(--s8);
  padding-bottom: var(--s4);
  width: 100%;
`

const ContactLinks = styled.ul`
  flex: 1;
  display: flex;
`

const ContactItem = styled.li`
  margin-top: var(--s3);
  margin-right: var(--s2);
  font-size: var(--f4);
`

const Nav = styled.nav`
  display: none;

  @media screen and (min-width: 45em) {
    flex: none;
    display: block;
  }
`

const NavList = styled.ul`
  display: flex;
  margin-left: calc(var(--s4) * -1);
`

const NavItem = styled.li`
  margin-left: var(--s4);
`

const NavLink = styled(Link)`
  ${linkInline}
  text-transform: uppercase;
  font-size: var(--f2);
`

function NavLinks({ currentPath }) {
  const { navLinks } = useSharedData()

  return (
    <Nav>
      <NavList>
        {navLinks.map(link => (
          <Fragment key={link.href}>
            {currentPath !== link.href && currentPath !== `/` && (
              <NavItem>
                <NavLink href={link.href}>{link.text}</NavLink>
              </NavItem>
            )}
          </Fragment>
        ))}
      </NavList>
    </Nav>
  )
}

function Bottom({ currentPath }) {
  const { socialLinks } = useSharedData()

  return (
    <Footer>
      <ContactLinks>
        {socialLinks.map(link => (
          <ContactItem key={link.href}>
            <SocialLink link={link} />
          </ContactItem>
        ))}
      </ContactLinks>

      <NavLinks currentPath={currentPath} />
    </Footer>
  )
}

///////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////

export default Bottom
