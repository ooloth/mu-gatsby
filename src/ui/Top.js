function Top() {
  const { avatar, socialLinks } = useNavbarData()

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

        <List>
          {socialLinks.map(link => (
            <Item key={link.href}>
              <SocialLink link={link} />
            </Item>
          ))}
        </List>
      </Nav>
    </>
  )
}

///////////////////////////////////////////////////////////////////////////////////

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

const List = styled.ul`
  display: flex;
  font-size: 1.2rem;
`

const Item = styled.li`
  margin-left: var(--s3);
`

///////////////////////////////////////////////////////////////////////////////////

function SocialLink({ link }) {
  let icon
  if (link.platform === `LinkedIn`) icon = <LinkedInIcon />
  if (link.platform === `Twitter`) icon = <TwitterIcon />
  if (link.platform === `GitHub`) icon = <GitHubIcon />

  return (
    <Link href={link.href}>
      <SrText>Follow Michael on {link.platform}</SrText>
      {icon}
    </Link>
  )
}

///////////////////////////////////////////////////////////////////////////////////

const LinkedInIcon = styled(LinkedInSVG)`
  ${icon};
`

const TwitterIcon = styled(TwitterSVG)`
  ${icon};
`

const GitHubIcon = styled(GitHubSVG)`
  ${icon};
`

///////////////////////////////////////////////////////////////////////////////////

import React from 'react'
import styled from 'styled-components'
import Image from 'gatsby-image'

import { Link, SkipNav, SrText } from './elements'
import { ReactComponent as TwitterSVG } from '../svg/twitter-brands.svg'
import { ReactComponent as GitHubSVG } from '../svg/github-brands.svg'
import { ReactComponent as LinkedInSVG } from '../svg/linkedin-in-brands.svg'
import useNavbarData from '../queries/useNavbarData'
import { container, icon } from '../styles'

export default Top
