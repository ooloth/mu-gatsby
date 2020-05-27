import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'

import Base from './Base'
import Metadata from './Metadata'
import Subscribe from './Subscribe'
import { Link } from './elements'
import { ReactComponent as CalendarSVG } from '../svg/calendar-alt-regular.svg'

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

const MetaItem = ({ action, date }: { action: string; date: string }) => (
  <li className="flex items-center mt-2 mr-4 text-lg md:text-xl">
    <span className="flex justify-center items-center mr-1 shadow-md rounded-full purple-gradient w-8 h-8 text-white">
      <CalendarSVG className="icon" aria-hidden />
    </span>
    <p>
      {action} {date}
    </p>
  </li>
)

const MetaItems = ({ article }: any) => (
  <ul className="mt-6 sm:flex sm:flex-wrap sm:mt-3">
    <MetaItem action="Published" date={article.published_at} />
    {article.edited_at && <MetaItem action="Updated" date={article.edited_at} />}
  </ul>
)

const Footer = ({ article }: any) => (
  <footer className="mt-16">
    <Link
      href={article.url}
      variant="underline"
      className="text-lg iPhoneX:text-xl font-bold"
    >
      Discuss on DEV.to
    </Link>
  </footer>
)

const getPostMetadata = (article: any): any => ({
  author: 'Michael Uloth',
  description: article.description,
  image: article.social_image,
  title: article.title,
  type: 'article',
  url: article.canonical_url,
})

export default ({ data: { devArticle: article } }: { data: any }) => {
  const metadata = getPostMetadata(article)

  return (
    <Base>
      <Metadata page={metadata} />

      <main className="mt-12 pt-4">
        <article className="max-w-2xl">
          <header className="mb-10">
            <h1 className="text-4xl iPhoneX:text-5xl font-black">
              {article.title}
            </h1>
            <MetaItems article={article} />
          </header>

          {article.image && (
            <Image
              fluid={article.image.childImageSharp.fluid}
              className="my-10 md:my-12 shadow-lg rounded"
            />
          )}

          <div
            dangerouslySetInnerHTML={{ __html: article.childMarkdownRemark.html }}
            className="blog-post"
          />

          <Footer article={article} />
        </article>
      </main>

      <Subscribe />
    </Base>
  )
}
