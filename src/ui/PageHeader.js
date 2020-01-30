import React from 'react'
import styled from 'styled-components'

import { Emoji } from '../ui/elements'
import { container, pageHeadline, pageSummary } from '../styles'

const Header = styled.header`
  ${container}
  margin-left: 0;
`

function PageHeader({ headline, emoji, subheadline, summary }) {
  return (
    <Header>
      <h1 css={pageHeadline}>
        {headline} <Emoji emoji={emoji.icon} ariaLabel={emoji.label} />
      </h1>

      <p css={pageSummary}>{summary}</p>
    </Header>
  )
}

export default PageHeader
