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
};

///////////////////////////////////////////////////////////////////////////////////

function Post({ data: { mdx } }) {
  const { title, siteUrl } = useSiteMetadata();

  const metadata = {
    type: `article`,
    title: mdx.frontmatter.title,
    description: mdx.frontmatter.description,
    url: `${siteUrl}/${mdx.frontmatter.slug}`, // no trailing slash
    author: title,
    image: mdx.frontmatter.metaImage
  };

  // TODO: see https://github.com/gaearon/overreacted.io/blob/master/src/templates/blog-post.js
  return (
    <Base>
      <Metadata page={metadata} />

      <Main>
        <article>
          <Header>
            <Title>{mdx.frontmatter.title}</Title>
            <MetaItems mdx={mdx} />
          </Header>

          <section>
            <MDXProvider components={components}>
              <MDXRenderer>{mdx.body}</MDXRenderer>
            </MDXProvider>
          </section>

          <Footer mdx={mdx} />
        </article>
      </Main>

      <aside>
        <Subscribe />

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
  );
}

///////////////////////////////////////////////////////////////////////////////////

const Main = styled.main`
  ${main}
  margin-top: var(--s7);
  padding-top: var(--s4);
`;

const Header = styled.header`
  margin-bottom: var(--s6);
`;

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
`;

///////////////////////////////////////////////////////////////////////////////////

function MetaItems({ mdx }) {
  return (
    <Items>
      <Item>
        <IconWrapper>
          <CalendarSVG css={icon} aria-hidden />
        </IconWrapper>
        <p>Published {mdx.frontmatter.datePublished}</p>
      </Item>

      {mdx.frontmatter.dateUpdated && (
        <Item>
          <IconWrapper>
            <CalendarSVG css={icon} aria-hidden />
          </IconWrapper>
          <p>Updated {mdx.frontmatter.dateUpdated}</p>
        </Item>
      )}

      <Item>
        <IconWrapper>
          <ClockSVG css={icon} aria-hidden />
        </IconWrapper>
        <p>{mdx.timeToRead} min read</p>
      </Item>
    </Items>
  );
}

///////////////////////////////////////////////////////////////////////////////////

const Items = styled.ul`
  margin-top: var(--s5);

  ${media.sm`
    display: flex;
    flex-wrap: wrap;
    margin-top: var(--s1);
  `}
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  margin-top: var(--s2);
  margin-right: var(--s4);
  line-height: var(--lh2);
`;

const IconWrapper = styled.span`
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
`;

///////////////////////////////////////////////////////////////////////////////////

function Footer({ mdx }) {
  const isVideo = mdx.frontmatter.linkSharedOnTwitter.includes(`youtu`);

  return (
    <StyledFooter>
      {isVideo ? (
        <Link
          href={mdx.frontmatter.linkSharedOnTwitter}
          css={`
            ${linkInline}
          `}
        >
          Discuss on YouTube
        </Link>
      ) : (
        <Link
          href={`https://twitter.com/search?q=${mdx.frontmatter.linkSharedOnTwitter}`}
          css={`
            ${linkInline}
          `}
        >
          Discuss on Twitter
        </Link>
      )}

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
    </StyledFooter>
  );
}

///////////////////////////////////////////////////////////////////////////////////

const StyledFooter = styled.footer`
  margin-top: var(--s7);
`;

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
        metaImage {
          childImageSharp {
            fixed(width: 1500, quality: 80) {
              src
            }
          }
        }
        topics
        linkSharedOnTwitter
        devLink
        datePublished(formatString: "MMM DD, YYYY")
        dateUpdated(formatString: "MMM DD, YYYY")
      }
    }
  }
`;

///////////////////////////////////////////////////////////////////////////////////

import React from "react";
import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import styled from "styled-components";

import Base from "./Base";
import Metadata from "./Metadata";
import Subscribe from "./Subscribe";
import { H2, H3, P, A, UL, OL, LI, CodeBlock, InlineCode } from "./blog";
import { Link } from "./elements";
import { ReactComponent as CalendarSVG } from "../svg/calendar-alt-regular.svg";
import { ReactComponent as ClockSVG } from "../svg/clock-regular.svg";
import useSiteMetadata from "../queries/useSiteMetadata";
import { icon, linkInline, main, media, purpleGradient } from "../styles";
import "../styles/blog.css";

export default Post;
