import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import styled from 'styled-components'

import Base from '../Base'
// import Metadata from '../Metadata'
import PageHeader from '../PageHeader'
import { Link, SrText } from '../elements'
// import useSiteMetadata from '../../queries/useSiteMetadata'
// import usePageData from '../../queries/usePageData'
import { main, linkTag, purpleUnderline, tagItem, tagList } from '../../styles'

import { LearnsHeading } from '../../pages/learns'
import { Section } from '../../pages/likes'

const List = styled.ul``

const Item = styled.li`
  margin-top: var(--s4);
`

const ItemLink = styled(Link)`
  ${purpleUnderline}
  line-height: 1.4;
  font-size: var(--f5);
  font-weight: 900;
`

// TODO: improve this placeholder
interface Gist {
  gist: any
}

function Gist({ gist }: Gist) {
  return (
    <Section>
      <LearnsHeading>Implementation</LearnsHeading>

      <iframe src={gist} title="Code example" />
    </Section>
  )
}

// TODO: improve this placeholder
interface Links {
  heading: string
  items: Array<any>
}

function Links({ heading, items }: Links) {
  return (
    <Section>
      <LearnsHeading>{heading}</LearnsHeading>

      <List>
        {items.map((item: any) => (
          <Item key={item.id}>
            {/* <ItemLink href={item.data.Link}>{item.data.Name}</ItemLink> */}
            <ItemLink href={item.data.Link}>{item.data.Name}</ItemLink>

            <ul css={tagList}>
              <li css={tagItem}>
                <Link href={item.data.Source[0].data.Link} css={linkTag}>
                  {item.data.Source[0].data.Name.toLowerCase()}
                </Link>
              </li>

              {item.data.Topics && (
                <>
                  {item.data.Topics.map((topic: any) => (
                    <li key={topic.data.Slug} css={tagItem}>
                      <Link href={`/learns/${topic.data.Slug}`} css={linkTag}>
                        {topic.data.Name.toLowerCase()}
                        <SrText> (Link opens in a new tab or window.)</SrText>
                      </Link>
                    </li>
                  ))}
                </>
              )}
            </ul>
            {/* <span
              css={`
                font-weight: bold;
              `}
            >
              {` `}|{' '}
            </span>
            <ItemLink href={item.data.Source[0].data.Link}>
              {item.data.Source[0].data.Name}
            </ItemLink> */}
          </Item>
        ))}
      </List>
    </Section>
  )
}

function DataStructurePage({ pageContext: { data, prev, next } }: any) {
  console.log('data', data)

  return (
    // https://www.gatsbyjs.org/docs/migrating-from-v1-to-v2/#4-pass-history-location-and-match-props-to-layout
    <Base>
      {/* <Metadata page={blogPage} /> */}

      <PageHeader
        headline={data.Name}
        emoji={{ icon: '🤷‍♂️', label: 'Emoji of a person shrugging' }}
        summary={data.Summary}
      />

      <main css={main}>
        {data.Details && <MDXRenderer>{data.Details.childMdx.body}</MDXRenderer>}
        {data.Gist && <Gist gist={data.Gist} />}
        {/* {data.Skills && <Links heading="Skills" items={data.Skills} />} */}
        {data.Practice && <Links heading="Practice" items={data.Practice} />}
        {data.Learn && <Links heading="Learn" items={data.Learn} />}
      </main>
    </Base>
  )
}

export default DataStructurePage
