// Blog post template

// https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-mdx
// https://mdxjs.com

function Post({ data: { mdx } }) {
  const { title, siteUrl } = useSiteMetadata()
  console.log(`title`, mdx.fields.title)

  const metadata = {
    type: `article`,
    title: mdx.fields.title,
    description: mdx.fields.description,
    url: `${siteUrl}/${mdx.fields.slug}`, // no trailing slash
    author: title,
    image: mdx.fields.featuredImg
  }

  // TODO: need a main element somewhere?
  return (
    <Base>
      <Metadata page={metadata} />

      <article>
        <header>
          <h1>{mdx.fields.title}</h1>
        </header>

        <section>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </section>
      </article>

      <footer>
        <p>
          <Link href={mdx.fields.commentLink}> Discuss on DEV.to</Link>
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
        datePublished(formatString: "MMMM DD, YYYY")
        dateUpdated(formatString: "MMMM DD, YYYY")
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
