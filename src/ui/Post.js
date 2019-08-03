// https://mdxjs.com/getting-started/#table-of-components
// https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-mdx
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
    title: mdx.frontmatter.title,
    description: mdx.frontmatter.description,
    url: `${siteUrl}/${mdx.frontmatter.slug}`, // no trailing slash
    author: title,
    image: mdx.frontmatter.featuredImg // TODO: use my image as a backup?
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
              margin-bottom: var(--s6);
            `}
          >
            <Title>{mdx.frontmatter.title}</Title>

            <MetaItems>
              <MetaItem>
                <MetaIconWrapper>
                  <CalendarSVG css={icon} aria-hidden />
                </MetaIconWrapper>
                <p>Published {mdx.frontmatter.datePublished}</p>
              </MetaItem>

              {mdx.frontmatter.dateUpdated && (
                <MetaItem>
                  <MetaIconWrapper>
                    <CalendarSVG css={icon} aria-hidden />
                  </MetaIconWrapper>
                  <p>Updated {mdx.frontmatter.dateUpdated}</p>
                </MetaItem>
              )}

              <MetaItem>
                <MetaIconWrapper>
                  <ClockSVG css={icon} aria-hidden />
                </MetaIconWrapper>
                <p>{mdx.timeToRead} min read</p>
              </MetaItem>
            </MetaItems>
          </header>

          <section>
            <MDXProvider components={components}>
              <MDXRenderer>{mdx.body}</MDXRenderer>
            </MDXProvider>
          </section>

          <footer
            css={`
              margin-top: var(--s7);
            `}
          >
            <Link
              href={mdx.frontmatter.linkSharedOnTwitter}
              css={`
                ${linkInline}
              `}
            >
              Discuss on Twitter
            </Link>
            <br
              css={`
                line-height: 2;
                ${media.sm`display:none;`}
              `}
            />
            <span
              css={`
                display: none;
                ${media.sm`display:inline;`}
              `}
            >
              ・
            </span>
            <Link
              href={mdx.frontmatter.devLink}
              css={`
                ${linkInline};
              `}
            >
              Discuss on DEV.to
            </Link>

            {mdx.frontmatter.editLink && (
              <>
                <br
                  css={`
                    line-height: 2;
                    ${media.sm`display:none;`}
                  `}
                />
                <span
                  css={`
                    display: none;
                    ${media.sm`display:inline;`}
                  `}
                >
                  ・
                </span>
                <Link
                  href={mdx.frontmatter.editLink}
                  css={`
                    ${linkInline}
                  `}
                >
                  Edit on GitHub
                </Link>
              </>
            )}
          </footer>
        </article>
      </main>

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

const Title = styled.h1`
  line-height: 1.1;
  font-size: 2.1rem;
  font-weight: 900;

  @media screen and (min-width: 375px) {
    font-size: 2.5rem;
  }

  ${media.sm`
    font-size: 3rem;
  `}
`

const MetaItems = styled.ul`
  margin-top: var(--s5);

  ${media.sm`
    display: flex;
    flex-wrap: wrap;
    margin-top: var(--s1);
  `}
`

const MetaItem = styled.li`
  display: flex;
  align-items: center;
  margin-top: var(--s2);
  margin-right: var(--s4);
  line-height: var(--lh2);
`

const MetaIconWrapper = styled.span`
  ${purpleGradient}
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: var(--s1);
  box-shadow: var(--shadow1);
  border-radius: var(--r100);
  width: var(--s5);
  height: var(--s5);
  font-size: 0.9rem;
  color: white;
`

///////////////////////////////////////////////////////////////////////////////////

export const pageQuery = graphql`
  query($id: String) {
    mdx(id: { eq: $id }) {
      id
      timeToRead
      body
      frontmatter {
        title
        slug
        description
        topics
        linkSharedOnTwitter
        devLink
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
  purpleGradient,
  purpleUnderline,
  tagList,
  tagItem
} from '../styles'
import '../styles/blog.css'

export default Post
