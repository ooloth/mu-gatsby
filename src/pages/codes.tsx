import React from 'react'
import { WindowLocation } from '@reach/router'
import stringReplaceToArray from 'string-replace-to-array'

import Base from '../ui/Base'
import Metadata from '../ui/Metadata'
import PageHeader from '../ui/PageHeader'
import { Link, SrText } from '../ui/elements'
import useSiteMetadata from '../queries/useSiteMetadata'
import usePageData from '../queries/usePageData'
import useWebsitesData, { WebsiteData } from '../queries/useWebsitesData'
import {
  linkInline,
  linkTag,
  main,
  media,
  project,
  projectDescription,
  projectTitle,
  tagList,
  tagItem,
} from '../styles'

interface Tool {
  tool: string
}

function Tool({ tool }: Tool) {
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
    <li css={tagItem}>
      <Link href={link} css={linkTag}>
        {tool}
      </Link>
    </li>
  )
}

type Description = Pick<WebsiteData, 'description' | 'repo'>

function Description({ description, repo }: Description) {
  let updatedDescription = description

  // If the website has a public repo...
  if (repo) {
    // Wrap the word "GitHub" with a link to the repo
    updatedDescription = stringReplaceToArray(
      description,
      /GitHub/i,
      (match: string, i: number) => (
        <Link key={i} href={repo} css={linkInline}>
          {match}
          <SrText> (Link opens in a new tab or window.)</SrText>
        </Link>
      ),
    )
  }

  return <p css={projectDescription}>{updatedDescription}</p>
}

function Websites() {
  const websites: WebsiteData[] = useWebsitesData()

  return (
    <section>
      <h2>
        <SrText>Website projects</SrText>
      </h2>

      <ul>
        {websites.map(website => (
          <li key={website.id} css={project}>
            <Link href={website.link} css={projectTitle}>
              {website.title}
            </Link>

            <Description description={website.description} repo={website.repo} />

            <ul css={tagList}>
              {website.tools.map(tool => (
                <Tool key={tool} tool={tool} />
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  )
}

// FIXME: extract this shared PageComponent declaration
interface Props {
  location: WindowLocation
}

function WebsitesPage({ location }: Props) {
  const { websitesPage } = useSiteMetadata()
  const { websitesYaml: page } = usePageData()

  return (
    // https://www.gatsbyjs.org/docs/migrating-from-v1-to-v2/#4-pass-history-location-and-match-props-to-layout
    <Base location={location}>
      <Metadata page={websitesPage} />

      <PageHeader
        headline={
          <>
            <span>{page.headline}</span>
            <span
              css={`
                display: none;
                ${media.md} {
                  display: inline;
                }
              `}
            >
              sites
            </span>
          </>
        }
        emoji={page.emoji}
        summary={page.summary}
      />

      <main css={main}>
        <Websites />
      </main>
    </Base>
  )
}

export default WebsitesPage
