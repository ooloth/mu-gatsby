function BlogPage() {
  const { blogPage } = useSiteMetadata()
  const posts = usePostsData()
  console.log('posts', posts)

  return (
    <Base>
      <Metadata page={blogPage} />

      <header css="margin-top: 3rem">
        <h1>Blog</h1>
      </header>

      <main id="main-content" tabIndex="-1">
        <ul>
          {posts.map(({ node: post }) => (
            <li key={post.id}>
              <Link href={post.fields.slug}>{post.fields.title}</Link>
            </li>
          ))}
        </ul>
      </main>
    </Base>
  )
}

///////////////////////////////////////////////////////////////////////////////////

import React from 'react'

import Base from '../ui/Base'
import Metadata from '../ui/Metadata'
import { Link, SrText } from '../ui/elements'
import useSiteMetadata from '../queries/useSiteMetadata'
import usePostsData from '../queries/usePostsData'

export default BlogPage
