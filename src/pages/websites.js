function WebsitesPage() {
  const { websitesPage } = useSiteMetadata()

  return (
    <Base>
      <Metadata page={websitesPage} />

      {/* TODO: reuse structure? styles? (shared on all but Home) */}
      <Header>
        <h1 css={pageHeadline}>
          Web{' '}
          <Emoji emoji="👨‍💻" ariaLabel="Emoji of a person typing on a laptop." />
        </h1>

        <p css={pageSummary}>Websites I've built for fun and profit.</p>
      </Header>

      <Main id="main-content" tabIndex="-1">
        <Websites />
      </Main>
    </Base>
  )
}

///////////////////////////////////////////////////////////////////////////////////

const Header = styled.header`
  ${container}
  flex: auto;
  margin-left: 0;
`

const Main = styled.main`
  ${container};
  margin-top: var(--s4);
  margin-left: 0;
  width: 100%;
  max-width: var(--measure4);
`

///////////////////////////////////////////////////////////////////////////////////

function Websites() {
  const websites = useWebsitesData()

  return (
    <section>
      <h2>
        <SrText>Website projects</SrText>
      </h2>

      <ul>
        {websites.map(website => (
          <Website key={website.id}>
            {/* TODO: reuse styles? */}
            <WebsiteLink href={website.link}>{website.title}</WebsiteLink>

            {/* TODO: reuse styles? */}
            <Description description={website.description} repo={website.repo} />

            {/* TODO: reuse styles? */}
            <TechStack>
              {website.tools.map(tool => (
                <Tool key={tool} tool={tool} />
              ))}
            </TechStack>
          </Website>
        ))}
      </ul>
    </section>
  )
}

///////////////////////////////////////////////////////////////////////////////////

const Website = styled.li`
  margin-top: var(--s6);
  padding-top: var(--s3);
`

const WebsiteLink = styled(Link)`
  ${purpleUnderline}
  line-height: 1.4;
  font-size: 1.55rem;
  font-weight: 900;

  ${media.sm`
    font-size: 1.6rem;
  `}

  ${media.md`
    font-size: 1.63rem;
  `}
`

const TechStack = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(var(--s1) * -1);
`

///////////////////////////////////////////////////////////////////////////////////

function Description({ description, repo }) {
  let updatedDescription = description

  // If the website has a repo link...
  if (repo) {
    // Wrap the words "open source" in the description with a link to the repo
    updatedDescription = stringReplaceToArray(
      description,
      /open-source/i,
      (match, i) => (
        <Link key={i} href={repo} css={linkInline}>
          {match}
          <SrText> (Link opens in a new tab or window.)</SrText>
        </Link>
      )
    )
  }

  return <Paragraph>{updatedDescription}</Paragraph>
}

///////////////////////////////////////////////////////////////////////////////////

const Paragraph = styled.p`
  ${copy}
  margin-top: var(--s2);
  max-width: 52ch;
`

///////////////////////////////////////////////////////////////////////////////////

function Tool({ tool }) {
  let link = `https://youtu.be/dQw4w9WgXcQ` // prevent empty links
  if (tool === `gatsby`) link = `https://www.gatsbyjs.org`
  if (tool === `geocoder.ca`) link = `https://geocoder.ca`
  if (tool === `git`) link = `https://git-scm.com`
  if (tool === `github`) link = `https://github.com`
  if (tool === `gsap`) link = `https://greensock.com`
  if (tool === `jquery`) link = `https://jquery.com`
  if (tool === `netlify`) link = `https://www.netlify.com`
  if (tool === `postcss`) link = `https://postcss.org`
  if (tool === `pug`) link = `https://pugjs.org`
  if (tool === `react`) link = `https://reactjs.org`
  if (tool === `react-player`) link = `https://github.com/CookPete/react-player`
  if (tool === `react-spring`) link = `https://www.react-spring.io`
  if (tool === `sass`) link = `https://sass-lang.com`
  if (tool === `scrollreveal`) link = `https://scrollrevealjs.org`
  if (tool === `styled-components`) link = `https://www.styled-components.com`
  if (tool === `tachyons`) link = `https://tachyons.io`
  if (tool === `tailwindcss`) link = `https://tailwindcss.com`
  if (tool === `vue`) link = `https://vuejs.org`
  if (tool === `xstate`) link = `https://xstate.js.org`

  return (
    <Item>
      <Link href={link} css={linkTag}>
        {tool}
      </Link>
    </Item>
  )
}

///////////////////////////////////////////////////////////////////////////////////

const Item = styled.li`
  margin-top: var(--s2);
  margin-right: var(--s1);
`

///////////////////////////////////////////////////////////////////////////////////

import React from 'react'
import styled from 'styled-components'
import stringReplaceToArray from 'string-replace-to-array'

import Base from '../ui/Base'
import Metadata from '../ui/Metadata'
import { Emoji, Link, SrText } from '../ui/elements'
import useSiteMetadata from '../queries/useSiteMetadata'
import useWebsitesData from '../queries/useWebsitesData'
import {
  container,
  copy,
  linkInline,
  linkTag,
  media,
  pageHeadline,
  pageSummary,
  purpleUnderline
} from '../styles'

export default WebsitesPage
