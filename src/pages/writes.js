function BlogPage({ location }) {
  const { blogPage } = useSiteMetadata()
  const { blogYaml: page } = usePageData()

  return (
    // https://www.gatsbyjs.org/docs/migrating-from-v1-to-v2/#4-pass-history-location-and-match-props-to-layout
    <Base location={location}>
      <Metadata page={blogPage} />

      <PageHeader
        headline={page.headline}
        emoji={page.emoji}
        summary={page.summary}
      />

      <main css={main}>
        <Posts />
      </main>
    </Base>
  )
}

///////////////////////////////////////////////////////////////////////////////////

function Posts() {
  const posts = usePostsData()

  return (
    <section>
      <h2>
        <SrText>Blog posts</SrText>
      </h2>

      <ul>
        {posts.map(({ node: post }) => (
          <li key={post.id} css={project}>
            <Link href={`/${post.frontmatter.slug}/`} css={projectTitle}>
              {post.frontmatter.title}
            </Link>

            <p
              dangerouslySetInnerHTML={{ __html: post.frontmatter.description }}
              css={projectDescription}
            />

            {post.frontmatter.topics && (
              <ul css={tagList}>
                {post.frontmatter.topics.map(topic => (
                  <Topic key={topic} topic={topic} />
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

///////////////////////////////////////////////////////////////////////////////////

function Topic({ topic }) {
  let link = `https://youtu.be/dQw4w9WgXcQ` // prevent empty links
  if (topic === `gatsby`) link = `https://www.gatsbyjs.org`
  if (topic === `git`) link = `https://git-scm.com`
  if (topic === `postcss`) link = `https://postcss.org`
  if (topic === `react`) link = `https://reactjs.org`
  if (topic === `sass`) link = `https://sass-lang.com`
  if (topic === `styled-components`) link = `https://www.styled-components.com`

  return (
    <li css={tagItem}>
      <Link href={link} css={linkTag}>
        {topic}
        <SrText> (Link opens in a new tab or window.)</SrText>
      </Link>
    </li>
  )
}

///////////////////////////////////////////////////////////////////////////////////

import React from 'react'
import styled from 'styled-components'

import Base from '../ui/Base'
import Metadata from '../ui/Metadata'
import PageHeader from '../ui/PageHeader'
import { Link, SrText } from '../ui/elements'
import useSiteMetadata from '../queries/useSiteMetadata'
import usePageData from '../queries/usePageData'
import usePostsData from '../queries/usePostsData'
import {
  linkTag,
  main,
  project,
  projectDescription,
  projectTitle,
  purpleUnderline,
  tagList,
  tagItem,
} from '../styles'

export default BlogPage
