import React from 'react'
import PropTypes from 'prop-types'

import SrText from './SrText'

const SkipNav = ({ href }) => (
  <SrText as="a" href={href}>
    Skip navigation and go to main content
  </SrText>
)

SkipNav.propTypes = {
  href: PropTypes.string.isRequired,
}

export default SkipNav

/*

USAGE:

1. Include before any header/sidebar links that appear at the top of each page
2. Make sure the href prop matches the ID of the page element where the main content begins

See: https://medium.freecodecamp.org/next-level-accessibility-freecodecamp-guide-7cbd6473eabd

*/
