// Blog post template

// https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-mdx
// https://mdxjs.com

function Post({ data: { mdx } }) {
  const { title, siteUrl } = useSiteMetadata()

  // TODO: use "field" versions built in gatsby-node, or these? what's simpler?
  const metadata = {
    type: `article`,
    title: mdx.frontmatter.title,
    description: mdx.frontmatter.description,
    url: `${siteUrl}/${mdx.frontmatter.slug}`, // no trailing slash
    author: title,
    image: mdx.frontmatter.featuredImg
  }

  // TODO: need a main element somewhere?
  return (
    <Base>
      <Metadata page={metadata} />

      <article>
        <header>
          <h1>{mdx.frontmatter.title}</h1>
        </header>

        <section>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </section>
      </article>

      <footer>
        <p>
          <Link
            href={`https://twitter.com/search?q=${
              mdx.frontmatter.linkSharedOnTwitter
            }`}
          >
            Discuss on Twitter
          </Link>
        </p>
      </footer>

      {/* {prevLink && (
          <StyledLink href={`/${prevLink}`}>
            Previous<SrText> template page</SrText>
          </StyledLink>
        )}

        {nextLink && (
          <StyledLink href={`/${nextLink}`}>
            Next<SrText> template page</SrText>
          </StyledLink>
        )}

        <StyledLink href="/">Go back home</StyledLink> */}

      {/* TODO: add newsletter? */}
    </Base>
  )
}

///////////////////////////////////////////////////////////////////////////////////

// const Main = styled.main`
//   padding: var(--s8) var(--s4);
// `

// const StyledLink = styled(Link)`
//   display: block;
//   margin-top: var(--s4);
// `

///////////////////////////////////////////////////////////////////////////////////

export const pageQuery = graphql`
  query($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      timeToRead
      frontmatter {
        title
        slug
        description
        author
        authorImg {
          childImageSharp {
            fluid(maxWidth: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        date(formatString: "MMM DD, YYYY")
        dateUpdated(formatString: "MMM DD, YYYY")
        featuredImg {
          childImageSharp {
            fluid(maxWidth: 1200) {
              src
            }
          }
        }
        removeTitleDot
        linkSharedOnTwitter
      }
    }
  }
`

///////////////////////////////////////////////////////////////////////////////////

import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import styled from 'styled-components'

import Base from './Base'
import Metadata from './Metadata'
import { Link, SrText } from './elements'
import useSiteMetadata from '../queries/useSiteMetadata'
// import useTemplatesData from '../../data/examples/useTemplatesData'

export default Post
