import React from 'react'
import { WindowLocation } from '@reach/router'

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
  tagList,
  tagItem,
} from '../styles'

const slugifyTag = (tag: string): string =>
  tag
    .replace('cssmodules', 'css-modules')
    .replace('opensource', 'open-source')
    .replace('styledcomponents', 'styled-components')

const Tags = ({ tags }: any) => (
  <ul css={tagList}>
    {tags.map((tag: any) => (
      <li css={tagItem}>
        <span css={linkTag}>{slugifyTag(tag)}</span>
      </li>
    ))}
  </ul>
)

function Posts() {
  const posts = usePostsData()

  const postsWithSlugs = posts.map((post: any) => ({
    ...post,
    slug: post.canonical_url.replace('https://www.michaeluloth.com', ''),
  }))

  return (
    <section>
      <h2>
        <SrText>Blog posts</SrText>
      </h2>

      <ul>
        {postsWithSlugs.map((post: any) => (
          <li key={post.id} css={project}>
            <Link href={post.slug} css={projectTitle}>
              {post.title}
            </Link>

            <p
              dangerouslySetInnerHTML={{ __html: post.description }}
              css={projectDescription}
            />

            {post.tags && <Tags tags={post.tags} />}
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

function BlogPage({ location }: Props) {
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

export default BlogPage
