import React from 'react'
import { WindowLocation } from '@reach/router'
// @ts-ignore
import stringReplaceToArray from 'string-replace-to-array'

import Base from '../ui/Base'
import Metadata from '../ui/Metadata'
import PageHeader from '../ui/PageHeader'
import { Link, SrText } from '../ui/elements'
import useSiteMetadata from '../queries/useSiteMetadata'
import usePageData from '../queries/usePageData'
import useWebsitesData, {
  toolLinks,
  ToolName,
  WebsiteData,
} from '../queries/useWebsitesData'

const getToolLink = (tool: ToolName): string =>
  toolLinks[tool] || `https://youtu.be/dQw4w9WgXcQ` // prevent empty links

const Tool = ({ tool }: { tool: ToolName }) => {
  const link = getToolLink(tool)

  return (
    <li className="mt-2 mr-2 lh-normal">
      <Link variant="incognito" href={link} className="link-tag">
        {tool}
      </Link>
    </li>
  )
}

type Description = Pick<WebsiteData, 'description' | 'repo'>

const Description = ({ description, repo }: Description) => {
  let updatedDescription = description

  // If the website has a public repo...
  if (repo) {
    // Wrap the word "GitHub" with a link to the repo
    updatedDescription = stringReplaceToArray(
      description,
      /GitHub/i,
      (match: string, i: number) => (
        <Link variant="underline" href={repo} key={i} className="font-bold">
          {match}
          <SrText> (Link opens in a new tab or window.)</SrText>
        </Link>
      ),
    )
  }

  return <p className="mt-3 text-lg iPhoneX:text-xl">{updatedDescription}</p>
}

const Websites = () => {
  const websites = useWebsitesData()

  return (
    <section>
      <h2>
        <SrText>Website projects</SrText>
      </h2>

      <ul>
        {websites.map(website => (
          <li key={website.id} className="mt-16">
            <Link variant="underline" href={website.link} className="project-title">
              {website.title}
            </Link>

            <Description description={website.description} repo={website.repo} />

            <ul className="flex flex-wrap">
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

export default ({ location }: { location: WindowLocation }) => {
  const { websitesPage } = useSiteMetadata()
  const { websitesYaml: page } = usePageData()

  return (
    <Base location={location}>
      <Metadata page={websitesPage} />

      <PageHeader
        headline={
          <>
            <span>{page.headline}</span>
            <span className="hidden md:inline">sites</span>
          </>
        }
        emoji={page.emoji}
        summary={page.summary}
      />

      <main className="max-w-2xl">
        <Websites />
      </main>
    </Base>
  )
}
