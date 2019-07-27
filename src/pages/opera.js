function OperaPage() {
  const { operaPage } = useSiteMetadata()

  return (
    <Base>
      <Metadata page={operaPage} />

      <header css="margin-top: 3rem">
        <h1>Opera</h1>
      </header>

      <main id="main-content" tabIndex="-1" />
    </Base>
  )
}

///////////////////////////////////////////////////////////////////////////////////

import React from 'react'

import Base from '../ui/Base'
import Metadata from '../ui/Metadata'
import useSiteMetadata from '../queries/useSiteMetadata'

export default OperaPage
