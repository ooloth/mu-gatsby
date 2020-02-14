import React, { ReactNode } from 'react'
import { Link as GatsbyLink } from 'gatsby'

import SrText from './SrText'

interface Props {
  children: ReactNode
  href: string
  lang?: string
  srText?: string // if anchor has no visible text
}

function Link({ children, href, lang, srText, ...props }: Props) {
  const isExternal = Boolean(href.match(/http|\/\/|mailto:|tel:|static\/|pdf\//))
  const isId = Boolean(href.match(/^#/))

  return isExternal || isId ? (
    <a
      href={href}
      lang={lang}
      onClick={e => e.stopPropagation()} // avoid firing parent event handlers
      target={isExternal ? `_blank` : undefined}
      rel={isExternal ? `noopener noreferrer` : undefined}
      {...props}
    >
      {srText && <SrText>{srText}</SrText>}
      {children}
    </a>
  ) : (
    <GatsbyLink
      to={href}
      onClick={e => e.stopPropagation()} // avoid firing parent event handlers
      lang={lang}
      {...props}
    >
      {srText && <SrText>{srText}</SrText>}
      {children}
    </GatsbyLink>
  )
}

export default Link

/*

USAGE:

const StyledLink = styled(Link)``

<StyledLink href="" srText="">Link Text</StyledLink>

- See: https://stackoverflow.com/questions/1369035/how-do-i-prevent-a-parents-onclick-event-from-firing-when-a-child-anchor-is-cli
- See: https://stackoverflow.com/questions/37568550/react-prevent-event-trigger-on-parent-from-child

*/
