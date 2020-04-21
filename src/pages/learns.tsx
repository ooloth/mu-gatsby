import React from 'react'
import { WindowLocation } from '@reach/router'

import Base from '../ui/Base'
import Metadata from '../ui/Metadata'
import PageHeader from '../ui/PageHeader'
import { Link, SrText } from '../ui/elements'
import useSiteMetadata from '../queries/useSiteMetadata'
import useAirtableData from '../queries/useAirtableData'
import usePageData from '../queries/usePageData'
import { main } from '../styles'

// FIXME: extract this shared PageComponent declaration
interface Props {
  location: WindowLocation
}

function LearnPage({ location }: Props) {
  // const { LearnPage } = useSiteMetadata()
  const { referenceYaml: page } = usePageData()

  const topics = useAirtableData()
  console.log('topics', topics)

  return (
    // https://www.gatsbyjs.org/docs/migrating-from-v1-to-v2/#4-pass-history-location-and-match-props-to-layout
    <Base location={location}>
      {/* <Metadata page={blogPage} /> */}

      <PageHeader
        headline={page.headline}
        emoji={page.emoji}
        summary={page.summary}
      />

      <main css={main}>Hi</main>
    </Base>
  )
}

export default LearnPage
