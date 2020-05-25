import React from 'react'
import { WindowLocation } from '@reach/router'

import Base from '../ui/Base'
import Metadata from '../ui/Metadata'
import PageHeader from '../ui/PageHeader'
import { Link, SrText } from '../ui/elements'
import useSiteMetadata from '../queries/useSiteMetadata'
import usePageData from '../queries/usePageData'
import usePostsData from '../queries/usePostsData'

const slugifyTag = (tag: string): string =>
  tag
    .replace('cssmodules', 'css-modules')
    .replace('opensource', 'open-source')
    .replace('styledcomponents', 'styled-components')

const Tags = ({ tags }: any) => (
  <ul className="flex flex-wrap">
    {tags.map((tag: any) => (
      <li key={tag} className="mt-2 mr-2 lh-normal">
        <span className="link-tag">{slugifyTag(tag)}</span>
      </li>
    ))}
  </ul>
)

function Posts() {
  const posts = usePostsData()

  // TODO: add this field during the build
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
          <li key={post.id} className="mt-16">
            <Link variant="underline" href={post.slug} className="project-title">
              {post.title}
            </Link>

            <p
              dangerouslySetInnerHTML={{ __html: post.description }}
              className="mt-3 text-lg iPhoneX:text-xl"
            />

            {post.tags && <Tags tags={post.tags} />}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ({ location }: { location: WindowLocation }) => {
  const { blogPage } = useSiteMetadata()
  const { blogYaml: page } = usePageData()

  return (
    <Base location={location}>
      <Metadata page={blogPage} />

      <PageHeader
        headline={page.headline}
        emoji={page.emoji}
        summary={page.summary}
      />

      <main className="max-w-2xl">
        <Posts />
      </main>
    </Base>
  )
}
