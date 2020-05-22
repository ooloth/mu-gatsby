import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { Emoji } from './elements'
import { container, pageHeadline, pageSummary } from '../styles'

const Header = styled.header`
  ${container}
  margin-left: 0;
`

interface Emoji {
  icon: string
  label: string
}

interface Props {
  emoji: Emoji
  headline: ReactNode
  summary: string
}

function PageHeader({ headline, emoji, summary }: Props) {
  return (
    <Header>
      <h1 css={pageHeadline}>
        {headline} <Emoji emoji={emoji.icon} ariaLabel={emoji.label} />
      </h1>

      <p css={pageSummary} dangerouslySetInnerHTML={{ __html: summary }} />
    </Header>
  )
}

export default PageHeader
