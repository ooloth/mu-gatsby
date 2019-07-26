const SrText = styled.span`
  display: block;
  position: absolute;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(1px);
  height: 1px;
  width: 1px;
  white-space: nowrap;
`

SrText.propTypes = {
  children: PropTypes.node.isRequired,
}

///////////////////////////////////////////////////////////////////////////////////

import PropTypes from 'prop-types'
import styled from 'styled-components'

export default SrText

// See: https://css-tricks.com/small-tweaks-can-make-huge-impact-websites-accessibility/#article-header-id-5

// TODO: add any a11y attributes to this?

// TODO: move the srOnly styles here (ever used outside of this component? Sometimes as a heading, but I could use this with an 'as="h2"' prop...)
