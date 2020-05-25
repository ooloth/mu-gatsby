import React from 'react'
import { WindowLocation } from '@reach/router'

import Base from '../ui/Base'
import { Emoji, Link, SrText } from '../ui/elements'
import useSharedData, { NavLink as NavLinkType } from '../queries/useSharedData'

const NavLink = ({ link }: { link: NavLinkType }) => (
  <Link
    variant="underline"
    href={link.href}
    className="text-3xl iPhoneX:text-4xl leading-none uppercase font-black"
  >
    {link.text}
  </Link>
)

const NavLinks = ({ links }: { links: Array<NavLinkType> }) => (
  <nav className="mt-16 iPhoneX:mt-16">
    <ul>
      {links.map(
        link =>
          link.href !== `/` && (
            <li key={link.href} className="mt-5 ">
              <NavLink link={link} />
            </li>
          ),
      )}
    </ul>
  </nav>
)

export default ({ location }: { location: WindowLocation }) => {
  const { navLinks } = useSharedData()

  return (
    <Base location={location}>
      <header>
        <p className="page-headline">
          Hi <Emoji emoji="👋" ariaLabel="Emoji of a hand waving hello." />
        </p>

        <h1 className="whitespace-no-wrap text-5xl md:text-6xl leading-none tracking-tight font-black">
          I'm Michael<SrText> Uloth</SrText>.
        </h1>

        <p className="mt-6 iPhoneX:mt-8 max-w-md leading-snug text-2xl">
          I'm a web developer and opera singer working for{' '}
          <Link
            variant="underline"
            href="https://www.ecobee.com"
            className="font-bold"
          >
            ecobee
          </Link>{' '}
          in&nbsp;Toronto.
        </p>
      </header>

      <main>
        <NavLinks links={navLinks} />
      </main>
    </Base>
  )
}
