function Bottom() {
  const { title } = useSiteMetadata()
  const { socialLinks } = useNavbarData()

  return (
    <Footer>
      <List>
        {socialLinks.map(link => (
          <Item key={link.href}>
            <SocialLink link={link} />
          </Item>
        ))}
      </List>
      {/* <Text>
        &copy; {new Date().getFullYear()} {title}
      </Text> */}
    </Footer>
  )
}

///////////////////////////////////////////////////////////////////////////////////

const Footer = styled.footer`
  ${container}
  margin-top: var(--s8);
  padding-top: var(--s4);
  padding-bottom: var(--s4);
  width: 100%;
`

const Text = styled.small`
  ${copy}
  display: block;
  margin-top: var(--s2);
  font-size: var(--f2);
`

const List = styled.ul`
  display: flex;
  font-size: 1.25rem;
`

const Item = styled.li`
  margin-right: var(--s3);
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
import { container, copy, icon } from '../styles'

import useSiteMetadata from '../queries/useSiteMetadata'

export default Bottom
