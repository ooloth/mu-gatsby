import React, { StrictMode } from 'react'
import { WrapRootElementBrowserArgs } from 'gatsby'

// Support the styled components "css" prop
// See: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31245#issuecomment-463640878
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as types from 'styled-components/cssprop'

function wrapRootElement({ element }: WrapRootElementBrowserArgs) {
  return <StrictMode>{element}</StrictMode>
}

export { wrapRootElement }
