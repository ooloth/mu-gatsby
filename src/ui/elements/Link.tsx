import React, { ReactNode } from 'react'
import { Link as GatsbyLink } from 'gatsby'

import SrText from './SrText'

const classes = {
  underline: 'purple-gradient purple-underline',
  icon: 'flex justify-center items-center hover:purple-gradient hover:text-white',
  incognito: '',
}

type Variant = keyof typeof classes

interface Props {
  variant: Variant
  href: string
  children: ReactNode
  className?: string
  srText?: string // if anchor has no visible text
  lang?: string
}

function Link({
  variant,
  href,
  children,
  className,
  srText,
  lang,
  ...props
}: Props) {
  const isExternal = Boolean(href.match(/http|\/\/|mailto:|tel:|static\/|pdf\//))
  const isId = Boolean(href.match(/^#/))
  const variantClasses: string = classes[variant]

  return isExternal || isId ? (
    <a
      href={href}
      className={`${variantClasses} ${className}`}
      rel={isExternal ? `noopener noreferrer` : undefined}
      onClick={e => e.stopPropagation()} // avoid firing parent event handlers
      lang={lang}
      {...props}
    >
      {srText && <SrText>{srText}</SrText>}
      {children}
    </a>
  ) : (
    <GatsbyLink
      to={href}
      className={`${variantClasses} ${className}`}
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
