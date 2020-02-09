import React, { ReactNode } from 'react'
import { WindowLocation } from '@reach/router'
import styled from 'styled-components'
import 'what-input'

import Metadata from './Metadata'
import Top from './Top'
import Bottom from './Bottom'
import { CustomProperties, Reset } from '../styles'
import '../styles/base/font-face.css'
import avenirRegular from '../fonts/AvenirNextLTPro-Regular.woff2'
import avenirHeavy from '../fonts/AvenirNextLTPro-Heavy.woff2'

const MinHeight100 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
`

interface Props {
  children: ReactNode
  location?: WindowLocation
}

function Base({ children, location }: Props) {
  return (
    <MinHeight100>
      <Metadata
        preload={[
          { href: avenirRegular, as: `font`, type: `font/woff2` },
          { href: avenirHeavy, as: `font`, type: `font/woff2` },
        ]}
        preconnect={[`https://unpkg.com`]}
      />
      <CustomProperties />
      <Reset />

      <Top />
      {children}
      {/* https://www.gatsbyjs.org/docs/migrating-from-v1-to-v2/#4-pass-history-location-and-match-props-to-layout */}
      <Bottom currentPath={location && location.pathname} />
    </MinHeight100>
  )
}

export default Base
