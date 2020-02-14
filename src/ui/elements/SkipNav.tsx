import React from 'react'

import SrText from './SrText'

interface SkipNav {
  href: string
}

function SkipNav({ href }: SkipNav) {
  return (
    <SrText as="a" href={href}>
      Skip navigation and go to main content
    </SrText>
  )
}

export default SkipNav

/*

USAGE:

1. Include before any header/sidebar links that appear at the top of each page
2. Make sure the href prop matches the ID of the page element where the main content begins

See: https://medium.freecodecamp.org/next-level-accessibility-freecodecamp-guide-7cbd6473eabd

*/
