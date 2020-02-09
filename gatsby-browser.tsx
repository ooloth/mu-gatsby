import React, { StrictMode } from 'react'
import { WrapRootElementBrowserArgs } from 'gatsby'

function wrapRootElement({ element }: WrapRootElementBrowserArgs) {
  return <StrictMode>{element}</StrictMode>
}

export { wrapRootElement }
