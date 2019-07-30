function OperaPage() {
  const { operaPage } = useSiteMetadata()

  return (
    <Base>
      <Metadata page={operaPage} />

      {/* TODO: reuse structure? styles? (shared on all but Home) */}
      <Header>
        <h1 css={pageHeadline}>
          Opera{' '}
          <Emoji emoji="🎭" ariaLabel="Emoji of a person typing on a laptop." />
        </h1>

        <p css={pageSummary}>
          Concerts and operas I've been lucky enough to perform in.
        </p>
      </Header>

      <Main id="main-content" tabIndex="-1">
        <Gigs />
      </Main>
    </Base>
  )
}

///////////////////////////////////////////////////////////////////////////////////

const Header = styled.header`
  ${container}
  flex: auto;
  margin-left: 0;
`

const Main = styled.main`
  ${container};
  margin-top: var(--s4);
  margin-left: 0;
  width: 100%;
  max-width: var(--measure4);
`

///////////////////////////////////////////////////////////////////////////////////

function Gigs() {
  const gigs = useOperaData()

  return (
    <section>
      <h2>
        <SrText>Opera and concert performances</SrText>
      </h2>

      <ul>
        {gigs.map(gig => (
          <Gig key={gig.id}>
            {/* TODO: reuse styles? */}
            <GigLink href={gig.link} lang={gig.title.lang}>
              {gig.title.text}
            </GigLink>

            {/* TODO: reuse styles? */}
            <Description dangerouslySetInnerHTML={{ __html: gig.description }} />

            {/* TODO: reuse styles? */}
            <Tags>
              {gig.tags.map(tag => (
                <Tag key={tag} tag={tag} />
              ))}
            </Tags>
          </Gig>
        ))}
      </ul>
    </section>
  )
}

///////////////////////////////////////////////////////////////////////////////////

const Gig = styled.li`
  margin-top: var(--s6);
  padding-top: var(--s3);
`

const GigLink = styled(Link)`
  ${purpleUnderline}
  line-height: 1.4;
  font-size: 1.55rem;
  font-weight: 900;

  ${media.sm`
    font-size: 1.6rem;
  `}

  ${media.md`
    font-size: 1.63rem;
  `}
`

const Description = styled.p`
  ${copy}
  margin-top: var(--s2);
  max-width: 52ch;
`

const Tags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(var(--s1) * -1);
`

///////////////////////////////////////////////////////////////////////////////////

function Tag({ tag }) {
  let link = `https://youtu.be/dQw4w9WgXcQ` // prevent empty links
  if (tag === `debus`) link = `https://learn.coc.ca/about-the-coc/johannes-debus`
  if (tag === `donizetti`) link = `https://en.wikipedia.org/wiki/Gaetano_Donizetti`
  if (tag === `hinton`) link = `https://www.peterhinton.ca/biography`
  if (tag === `lawless`)
    link = `https://www.musichall.uk.com/artists/directors/stephen-lawless`
  if (tag === `lepage`) link = `https://en.wikipedia.org/wiki/Robert_Lepage`
  if (tag === `macivor`) link = `https://en.wikipedia.org/wiki/Daniel_MacIvor`
  if (tag === `rovaris`)
    link = `https://www.operaphila.org/about/our-people/leadership/corrado-rovaris/`
  if (tag === `stravinsky`) link = `https://en.wikipedia.org/wiki/Igor_Stravinsky`
  if (tag === `wainwright`) link = `http://rufuswainwright.com`
  if (tag === `world premiere`) link = `https://en.wikipedia.org/wiki/Premiere`

  return (
    <Item>
      <Link href={link} css={linkTag}>
        {tag}
        <SrText> (Link opens in a new tab or window.)</SrText>
      </Link>
    </Item>
  )
}

///////////////////////////////////////////////////////////////////////////////////

const Item = styled.li`
  margin-top: var(--s2);
  margin-right: var(--s1);
`

///////////////////////////////////////////////////////////////////////////////////

import React from 'react'
import styled from 'styled-components'

import Base from '../ui/Base'
import Metadata from '../ui/Metadata'
import { Emoji, Link, SrText } from '../ui/elements'
import useSiteMetadata from '../queries/useSiteMetadata'
import useOperaData from '../queries/useOperaData'
import {
  container,
  copy,
  icon,
  linkInline,
  linkTag,
  media,
  pageHeadline,
  pageSubheadline,
  pageSummary,
  purpleUnderline
} from '../styles'

export default OperaPage
