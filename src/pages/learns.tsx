import React from 'react'
import { WindowLocation } from '@reach/router'
import styled from 'styled-components'

import Base from '../ui/Base'
// import Metadata from '../ui/Metadata'
import PageHeader from '../ui/PageHeader'
import { Link } from '../ui/elements'
// import useSiteMetadata from '../queries/useSiteMetadata'
import useAirtableTopics from '../queries/useAirtableTopics'
import usePageData from '../queries/usePageData'
import { main } from '../styles'

import { Section } from './likes'

export const LearnsHeading = styled.h2`
  margin-bottom: var(--s4);
  font-size: var(--f8);
  font-weight: 900;
`

const List = styled.ul``
const Item = styled.li``
const ItemLink = styled(Link)``

// function Basics() {
//   const { basics } = useAirtableTopics()

//   return (
//     <Section>
//       <LearnsHeading>Basics</LearnsHeading>

//       <List>
//         {basics.map(topic => (
//           <Item key={topic.id}>
//             {/* <ItemLink
//               href={topic.link}
//               // srText={`Visit IMDB page for "${show.title}" in a new window.`}
//             > */}
//             {topic.data['Name']}
//             {/* </ItemLink> */}
//           </Item>
//         ))}
//       </List>
//     </Section>
//   )
// }

// TODO: refactor these three sections into one component?
function DataStructures() {
  const { dataStructures } = useAirtableTopics()

  return (
    <Section>
      <LearnsHeading>Data Structures</LearnsHeading>

      <List>
        {dataStructures.map((topic: any) => (
          <Item key={topic.id}>
            <ItemLink href={`/learns/${topic.data.Slug}`}>
              {topic.data.Name}
            </ItemLink>
          </Item>
        ))}
      </List>
    </Section>
  )
}

function Algorithms() {
  const { algorithms } = useAirtableTopics()

  return (
    <Section>
      <LearnsHeading>Algorithms</LearnsHeading>

      <List>
        {algorithms.map((topic: any) => (
          <Item key={topic.id}>
            {/* <ItemLink
              href={topic.link}
              // srText={`Visit IMDB page for "${show.title}" in a new window.`}
            > */}
            {topic.data.Name}
            {/* </ItemLink> */}
          </Item>
        ))}
      </List>
    </Section>
  )
}

// FIXME: extract this shared PageComponent declaration
interface Props {
  location: WindowLocation
}

function LearnPage({ location }: Props) {
  const { referenceYaml: page } = usePageData()

  return (
    // https://www.gatsbyjs.org/docs/migrating-from-v1-to-v2/#4-pass-history-location-and-match-props-to-layout
    <Base location={location}>
      {/* <Metadata page={blogPage} /> */}

      <PageHeader
        headline={page.headline}
        emoji={page.emoji}
        summary={page.summary}
      />

      <main css={main}>
        {/* <Basics /> */}
        <DataStructures />
        <Algorithms />
      </main>
    </Base>
  )
}

export default LearnPage
