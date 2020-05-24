import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'
import styled from 'styled-components'
import 'gatsby-remark-vscode/styles.css'

import Base from './Base'
import Metadata from './Metadata'
import Subscribe from './Subscribe'
import { Link } from './elements'
import { ReactComponent as CalendarSVG } from '../svg/calendar-alt-regular.svg'
import { icon, linkInline, main, media, purpleGradient } from '../styles'
import {
  h2,
  h3,
  p,
  a,
  ul,
  ol,
  li,
  img,
  figure,
  pre,
  code,
  selection,
  gatsbyPluginTwitter,
} from '../styles/blog'

export const pageQuery = graphql`
  query($id: String) {
    devArticle(id: { eq: $id }) {
      body_html
      canonical_url
      childMarkdownRemark {
        html
        rawMarkdownBody
      }
      collection_id
      comments_count
      created_at
      description
      edited_at(formatString: "MMM D, YYYY")
      id
      image {
        childImageSharp {
          fluid(maxWidth: 1000, quality: 80) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      positive_reactions_count
      published_at(formatString: "MMM D, YYYY")
      social_image
      tags
      title
      url
    }
  }
`

const Main = styled.main`
  ${main}
  margin-top: var(--s7);
  padding-top: var(--s4);
`

const Header = styled.header`
  margin-bottom: var(--s6);
`

const Title = styled.h1`
  line-height: 1.1;
  font-size: 2.1rem;
  font-weight: 900;

  @media screen and (min-width: 375px) {
    font-size: 2.5rem;
  }

  ${media.sm} {
    font-size: 3rem;
  }
`

const Items = styled.ul`
  margin-top: var(--s5);

  ${media.sm} {
    display: flex;
    flex-wrap: wrap;
    margin-top: var(--s1);
  }
`

const Item = styled.li`
  display: flex;
  align-items: center;
  margin-top: var(--s2);
  margin-right: var(--s4);
  line-height: var(--lh2);
`

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
`

function MetaItems({ article }: any) {
  return (
    <Items>
      <Item>
        <IconWrapper>
          <CalendarSVG css={icon} aria-hidden />
        </IconWrapper>
        <p>Published {article.published_at}</p>
      </Item>

      {article.edited_at && (
        <Item>
          <IconWrapper>
            <CalendarSVG css={icon} aria-hidden />
          </IconWrapper>
          <p>Updated {article.edited_at}</p>
        </Item>
      )}
    </Items>
  )
}

const Body = styled.div`
  ${h2};
  ${h3};
  ${p};
  ${a};
  ${ul};
  ${ol};
  ${li};
  ${img};
  ${figure};
  ${pre};
  ${code};
  ${selection};
  ${gatsbyPluginTwitter};
`

const StyledFooter = styled.footer`
  margin-top: var(--s7);
`

const FeaturedImage = styled(Image)`
  margin-top: var(--s6);
  margin-bottom: var(--s6);
  box-shadow: var(--shadow2);
  border-radius: var(--r2);
`

const Footer = ({ article }: any) => (
  <StyledFooter>
    <Link href={article.url} css={linkInline}>
      Discuss on DEV.to
    </Link>
  </StyledFooter>
)

const getPostMetadata = (article: any): any => ({
  author: 'Michael Uloth',
  description: article.description,
  image: article.social_image,
  title: article.title,
  type: 'article',
  url: article.canonical_url,
})

const Post = ({ data: { devArticle: article } }: { data: any }) => {
  const metadata = getPostMetadata(article)

  return (
    <Base>
      <Metadata page={metadata} />

      <Main>
        <article>
          <Header>
            <Title>{article.title}</Title>
            <MetaItems article={article} />
          </Header>

          {article.image && (
            <FeaturedImage fluid={article.image.childImageSharp.fluid} />
          )}

          <Body
            dangerouslySetInnerHTML={{ __html: article.childMarkdownRemark.html }}
          />

          <Footer article={article} />
        </article>
      </Main>

      <aside>
        <Subscribe />
      </aside>
    </Base>
  )
}

export default Post
