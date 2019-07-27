function BlogPage() {
  const { blogPage } = useSiteMetadata()
  const posts = usePostsData()

  return (
    <Base>
      <Metadata page={blogPage} />

      <Header>
        <div>
          <Heading>
            Blog{' '}
            <Emoji emoji="✍️" ariaLabel="Emoji of a hand writing with a pen." />
          </Heading>

          <Summary>
            Coding tips and walkthroughs that will probably get future me out of a
            jam.
          </Summary>
        </div>
      </Header>

      <main
        id="main-content"
        tabIndex="-1"
        css={`
          ${container};
          margin-top: var(--s4);
          margin-left: 0;
          width: 100%;
          max-width: var(--measure4);
        `}
      >
        <ul>
          {posts.map(({ node: post }) => (
            <li
              key={post.id}
              css={`
                margin-top: var(--s6);
                padding-top: var(--s3);
              `}
            >
              <PostLink href={post.fields.slug}>{post.fields.title}</PostLink>

              <div
                css={`
                  display: flex;
                  flex-wrap: wrap;
                  align-items: center;
                  margin-top: var(--s2);
                  font-size: var(--f2);
                `}
              >
                <p
                  css={`
                    display: flex;
                    align-items: end;
                    margin-top: var(--s2);
                  `}
                >
                  <CalendarSVG
                    css={`
                      ${icon};
                      margin-right: var(--s1);
                      color: var(--light-purple);
                    `}
                  />
                  {post.fields.date}
                </p>
                {/* <span>∙</span> */}
                <span
                  css={`
                    margin-top: var(--s2);
                  `}
                >
                  ・
                </span>
                <p
                  css={`
                    display: flex;
                    align-items: end;
                    margin-top: var(--s2);
                  `}
                >
                  <ClockSVG
                    css={`
                      ${icon};
                      margin-right: var(--s1);
                      color: var(--light-purple);
                    `}
                  />
                  {post.timeToRead} min read
                </p>
              </div>

              <p
                css={`
                  ${copy}
                  margin-top: var(--s2);
                  max-width: 52ch;
                  // font-size: 1.1rem;
                `}
              >
                {post.fields.description}
              </p>
            </li>
          ))}
        </ul>
      </main>
    </Base>
  )
}

///////////////////////////////////////////////////////////////////////////////////

const Header = styled.header`
  ${container}
  flex: auto;
  display: flex;
  width: 100%;
`

// TODO: Same as "Greeting" in index.js (extract component? extract common styles?)
const Heading = styled.h1`
  ${pageHeadline}
`

const Summary = styled.p`
  ${pageSummary}
`

const PostLink = styled(Link)`
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

///////////////////////////////////////////////////////////////////////////////////

import React from 'react'
import styled from 'styled-components'

import Base from '../ui/Base'
import Metadata from '../ui/Metadata'
import { Emoji, Link, SrText } from '../ui/elements'
import { ReactComponent as CalendarSVG } from '../svg/calendar-alt-regular.svg'
import { ReactComponent as ClockSVG } from '../svg/clock-regular.svg'
import useSiteMetadata from '../queries/useSiteMetadata'
import usePostsData from '../queries/usePostsData'
import {
  container,
  copy,
  icon,
  inlineLink,
  media,
  pageHeadline,
  pageSubheadline,
  pageSummary,
  purpleUnderline
} from '../styles'

export default BlogPage
