import React from 'react'
import PropTypes from 'prop-types'
import { Link as GatsbyLink } from 'gatsby'

import SrText from './SrText'

function Link({ href, srText, children, ...props }) {
  const isExternal = href.match(/http|\/\/|mailto:|tel:|static\/|pdf\//)
  const isId = href.match(/^#/)

  return isExternal || isId ? (
    <a
      href={href}
      onClick={e => e.stopPropagation()} // avoid firing parent event handlers
      target={isExternal ? `_blank` : null}
      rel={isExternal ? `noopener noreferrer` : null}
      {...props}
    >
      {srText && <SrText>{srText}</SrText>}
      {children}
    </a>
  ) : (
    <GatsbyLink
      to={href}
      onClick={e => e.stopPropagation()} // avoid firing parent event handlers
      {...props}
    >
      {srText && <SrText>{srText}</SrText>}
      {children}
    </GatsbyLink>
  )
}

Link.propTypes = {
  href: PropTypes.string.isRequired,
  srText: PropTypes.string, // if anchor has no visible text
  children: PropTypes.node,
}

export default Link

/*

USAGE:

const StyledLink = styled(Link)``

<StyledLink href="" srText="">Link Text</StyledLink>

- See: https://stackoverflow.com/questions/1369035/how-do-i-prevent-a-parents-onclick-event-from-firing-when-a-child-anchor-is-cli
- See: https://stackoverflow.com/questions/37568550/react-prevent-event-trigger-on-parent-from-child

*/
