function Bottom() {
  const { socialLinks } = useSharedData()

  return (
    <Footer>
      <List>
        {socialLinks.map(link => (
          <Item key={link.href}>
            <SocialLink link={link} />
          </Item>
        ))}
      </List>
    </Footer>
  )
}

///////////////////////////////////////////////////////////////////////////////////

const Footer = styled.footer`
  ${container}
  margin-top: var(--s8);
  padding-top: var(--s3);
  padding-bottom: var(--s5);
  width: 100%;
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

import { Link, SrText } from './elements'
import { ReactComponent as TwitterSVG } from '../svg/twitter-brands.svg'
import { ReactComponent as GitHubSVG } from '../svg/github-brands.svg'
import { ReactComponent as LinkedInSVG } from '../svg/linkedin-in-brands.svg'
import useSharedData from '../queries/useSharedData'
import { container, icon } from '../styles'

export default Bottom
