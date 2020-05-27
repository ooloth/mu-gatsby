import React, { StrictMode } from 'react'
import 'what-input'
import { WrapRootElementBrowserArgs } from 'gatsby'

import './src/styles/tailwind.css'

function wrapRootElement({ element }: WrapRootElementBrowserArgs) {
  return <StrictMode>{element}</StrictMode>
}

export { wrapRootElement }
