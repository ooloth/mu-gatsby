function WebsitesPage() {
  const { websitesPage } = useSiteMetadata()

  return (
    <Base>
      <Metadata page={websitesPage} />

      <header css="margin-top: 3rem">
        <h1>Websites</h1>
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

export default WebsitesPage
