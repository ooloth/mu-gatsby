import React, { ReactNode } from 'react'
import { WindowLocation } from '@reach/router'

import Metadata from './Metadata'
import Top from './Top'
import Bottom from './Bottom'
import avenirRegular from '../fonts/AvenirNextLTPro-Regular.woff2'
import avenirHeavy from '../fonts/AvenirNextLTPro-Heavy.woff2'

// TODO: delete
import { CustomProperties } from '../styles'

interface Props {
  children: ReactNode
  location?: WindowLocation
}

export default ({ children, location }: Props) => (
  <div className="flex flex-col justify-center min-h-screen px-3 sm:px-4 md:px-8 xl:px-12">
    <Metadata
      preload={[
        { href: avenirRegular, as: `font`, type: `font/woff2` },
        { href: avenirHeavy, as: `font`, type: `font/woff2` },
      ]}
      preconnect={[`https://unpkg.com`]}
    />

    {/* TODO: delete */}
    <CustomProperties />

    <Top />
    <div className="flex-auto relative">{children}</div>
    <Bottom currentPath={location && location.pathname} />
  </div>
)
