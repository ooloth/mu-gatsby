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
  if (tag == `albery`) link = `https://en.wikipedia.org/wiki/Tim_Albery`
  if (tag == `armfield`) link = `https://en.wikipedia.org/wiki/Neil_Armfield`
  if (tag == `bedford`) link = `https://en.wikipedia.org/wiki/Steuart_Bedford`
  if (tag == `bicket`) link = `https://en.wikipedia.org/wiki/Harry_Bicket`
  if (tag == `biernacki`) link = `https://tabierna.wixsite.com/mynewwebsite`
  if (tag == `britten`) link = `https://en.wikipedia.org/wiki/Benjamin_Britten`
  if (tag == `davis`)
    link = `https://en.wikipedia.org/wiki/Andrew_Davis_(conductor)`
  if (tag == `de carpentries`) link = `https://www.francoisdecarpentries.com`
  if (tag == `debus`) link = `https://learn.coc.ca/about-the-coc/johannes-debus`
  if (tag == `donizetti`) link = `https://en.wikipedia.org/wiki/Gaetano_Donizetti`
  if (tag == `elgar`) link = `https://en.wikipedia.org/wiki/Edward_Elgar`
  if (tag == `garman`)
    link = `https://crestedbuttemusicfestival.org/meet-brian-garman-cbmfs-new-opera-music-director/`
  if (tag == `handel`)
    link = `https://en.wikipedia.org/wiki/George_Frideric_Handel`
  if (tag == `hinton`) link = `https://www.peterhinton.ca/biography`
  if (tag == `ivany`) link = `https://www.joelivany.com`
  if (tag == `kazaras`)
    link = `http://www.uzanartists.com/portfolio/peter-kazaras/`
  if (tag == `labadie`)
    link = `http://www.violonsduroy.com/en/about/bernard-labadie-founding-conductor`
  if (tag == `lau`) link = `http://www.kevinlaumusic.com`
  if (tag == `lawless`)
    link = `https://www.musichall.uk.com/artists/directors/stephen-lawless`
  if (tag == `lepage`) link = `https://en.wikipedia.org/wiki/Robert_Lepage`
  if (tag == `macivor`) link = `https://en.wikipedia.org/wiki/Daniel_MacIvor`
  if (tag == `martin`) link = `https://www.stephaniemartinmusic.com`
  if (tag == `massenet`) link = `https://en.wikipedia.org/wiki/Jules_Massenet`
  if (tag == `mokrzewski`) link = `http://www.christophermokrzewski.com`
  if (tag == `montalbetti`) link = `https://www.facebook.com/barbara.montalbetti`
  if (tag == `mozart`)
    link = `https://en.wikipedia.org/wiki/Wolfgang_Amadeus_Mozart`
  if (tag == `oida`) link = `https://www.yoshioida.com`
  if (tag == `paulus`) link = `https://en.wikipedia.org/wiki/Diane_Paulus`
  if (tag == `pérez`) link = `https://en.karstenwitt.com/alejo-perez`
  if (tag == `rhodes`)
    link = `https://www.schmopera.com/scene/people/stephanie-rhodes/`
  if (tag == `rovaris`)
    link = `https://www.operaphila.org/about/our-people/leadership/corrado-rovaris/`
  if (tag == `strauss`) link = `https://en.wikipedia.org/wiki/Richard_Strauss`
  if (tag == `stravinsky`) link = `https://en.wikipedia.org/wiki/Igor_Stravinsky`
  if (tag == `verdi`) link = `https://en.wikipedia.org/wiki/Giuseppe_Verdi`
  if (tag == `vivier`) link = `https://en.wikipedia.org/wiki/Claude_Vivier`
  if (tag == `wainwright`) link = `http://rufuswainwright.com`
  if (tag == `world premiere`) link = `https://en.wikipedia.org/wiki/Premiere`

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
