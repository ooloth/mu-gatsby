// https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-mdx
// https://mdxjs.com

const components = {
  h2: H2,
  h3: H3,
  p: P,
  a: A,
  ul: UL,
  ol: OL,
  li: LI,
  code: CodeBlock,
  inlineCode: InlineCode
}

///////////////////////////////////////////////////////////////////////////////////

function Post({ data: { mdx } }) {
  const { title, siteUrl } = useSiteMetadata()

  const metadata = {
    type: `article`,
    title: mdx.fields.title,
    description: mdx.fields.description,
    url: `${siteUrl}/${mdx.fields.slug}`, // no trailing slash
    author: title,
    image: mdx.fields.featuredImg // TODO: use my image as a backup?
  }

  // TODO: see https://github.com/gaearon/overreacted.io/blob/master/src/templates/blog-post.js
  return (
    <Base>
      <Metadata page={metadata} />

      <main
        css={`
          ${main};
          margin-top: var(--s7);
          padding-top: var(--s4);
          // margin-left: auto;
        `}
      >
        <article>
          <header
            css={`
              margin-bottom: var(--s7);
            `}
          >
            <h1
              css={`
                line-height: 1.1;
                font-size: 2.3rem;
                font-weight: 900;

                @media screen and (min-width: 375px) {
                  font-size: 2.65rem;
                }

                ${media.sm`
                  font-size: 3rem;
                `}
              `}
            >
              {mdx.fields.title}
            </h1>
            <div
              css={`
                // display: flex;
                // flex-wrap: wrap;
                margin-top: var(--s4);
                // line-height: var(--lh2);
                font-size: var(--f2);

                ${media.sm`
                  display: flex;
                  flex-wrap: wrap;
                  margin-top: var(--s2);
                `}
              `}
            >
              <div
                css={`
                  display: flex;
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
                <p>Published {mdx.fields.datePublished}</p>
              </div>

              {mdx.fields.dateUpdated && (
                <div
                  css={`
                    display: flex;
                    margin-top: var(--s2);
                  `}
                >
                  <span
                    css={`
                      display: none;

                      ${media.sm`
                        display: inline;
                      `}
                    `}
                  >
                    ・
                  </span>
                  <CalendarSVG
                    css={`
                      ${icon};
                      margin-right: var(--s1);
                      color: var(--light-purple);
                    `}
                  />
                  <p>Updated {mdx.fields.dateUpdated}</p>
                </div>
              )}

              <div
                css={`
                  display: flex;
                  margin-top: var(--s2);
                `}
              >
                <span
                  css={`
                    display: none;

                    ${media.sm`
                      display: inline;
                    `}
                  `}
                >
                  ・
                </span>
                <ClockSVG
                  css={`
                    ${icon};
                    margin-right: var(--s1);
                    color: var(--light-purple);
                  `}
                />
                <p>{mdx.timeToRead} min read</p>
              </div>
            </div>
          </header>

          <section
            css={`
              max-width: var(--measure3);
            `}
          >
            <MDXProvider components={components}>
              <MDXRenderer>{mdx.body}</MDXRenderer>
            </MDXProvider>
          </section>
        </article>
      </main>

      <footer
        css={`
          ${main}
        `}
      >
        <Link href={mdx.fields.commentLink} css={linkInline}>
          Discuss on Twitter
        </Link>
        <span>・</span>
        <Link href={mdx.fields.commentLink} css={linkInline}>
          Discuss on DEV.to
        </Link>
        <span>・</span>
        <Link href={mdx.fields.commentLink} css={linkInline}>
          Edit on GitHub
        </Link>
      </footer>

      <aside>
        {/* TODO: add newsletter? */}

        {/* TODO: add prev/next links? */}

        {/* {prevLink && (
          <StyledLink href={`/${prevLink}`}>
            Previous<SrText> template page</SrText>
          </StyledLink>
        )}

        {nextLink && (
          <StyledLink href={`/${nextLink}`}>
            Next<SrText> template page</SrText>
          </StyledLink>
        )*/}
      </aside>
    </Base>
  )
}

///////////////////////////////////////////////////////////////////////////////////

export const pageQuery = graphql`
  query($id: String) {
    mdx(id: { eq: $id }) {
      id
      timeToRead
      body
      fields {
        title
        slug
        description
        # featuredImg {
        #   childImageSharp {
        #     fluid(maxWidth: 1200) {
        #       src
        #     }
        #   }
        # }
        topics
        commentLink
        datePublished(formatString: "MMM DD, YYYY")
        dateUpdated(formatString: "MMM DD, YYYY")
      }
    }
  }
`

///////////////////////////////////////////////////////////////////////////////////

import React from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Image from 'gatsby-image'
import styled from 'styled-components'

import Base from './Base'
import Metadata from './Metadata'
import { H2, H3, P, A, UL, OL, LI, CodeBlock, InlineCode } from './blog'
import { Link, SrText } from './elements'
import { ReactComponent as CalendarSVG } from '../svg/calendar-alt-regular.svg'
import { ReactComponent as ClockSVG } from '../svg/clock-regular.svg'
import useSiteMetadata from '../queries/useSiteMetadata'
import {
  container,
  copy,
  icon,
  linkInline,
  linkTag,
  main,
  media,
  pageHeadline,
  pageSubheadline,
  pageSummary,
  prismTheme,
  project,
  projectDescription,
  projectTitle,
  purpleUnderline,
  tagList,
  tagItem
} from '../styles'
import '../styles/blog.css'

export default Post
