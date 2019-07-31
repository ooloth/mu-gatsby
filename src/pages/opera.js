function OperaPage() {
  const { operaPage } = useSiteMetadata()
  const { operaYaml: page } = usePageData()

  return (
    <Base>
      <Metadata page={operaPage} />

      <PageHeader
        headline={page.headline}
        emoji={page.emoji}
        summary={page.summary}
      />

      <main css={main}>
        <Gigs />
      </main>
    </Base>
  )
}

///////////////////////////////////////////////////////////////////////////////////

function Gigs() {
  const gigs = useGigsData()

  return (
    <section>
      <h2>
        <SrText>Opera and concert performances</SrText>
      </h2>

      <ul>
        {gigs.map(gig => (
          <li key={gig.id} css={project}>
            <Link href={gig.link} lang={gig.title.lang} css={projectTitle}>
              {gig.title.text}
            </Link>

            <p
              dangerouslySetInnerHTML={{ __html: gig.description }}
              css={projectDescription}
            />

            <ul css={tagList}>
              {gig.tags.map(tag => (
                <Tag key={tag} tag={tag} />
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  )
}

///////////////////////////////////////////////////////////////////////////////////

function Tag({ tag }) {
  let link = `https://youtu.be/dQw4w9WgXcQ` // prevent empty links
  if (tag == `albano`) link = `https://music.utoronto.ca/our-people.php?fid=11`
  if (tag == `albery`) link = `https://en.wikipedia.org/wiki/Tim_Albery`
  if (tag == `alden`)
    link = `https://en.wikipedia.org/wiki/Christopher_Alden_(director)`
  if (tag == `armfield`) link = `https://en.wikipedia.org/wiki/Neil_Armfield`
  if (tag == `bach`) link = `https://en.wikipedia.org/wiki/Johann_Sebastian_Bach`
  if (tag == `beckwith`)
    link = `https://www.schmopera.com/after-15-years-i-felt-like-having-a-party/`
  if (tag == `bedford`) link = `https://en.wikipedia.org/wiki/Steuart_Bedford`
  if (tag == `bicket`) link = `https://en.wikipedia.org/wiki/Harry_Bicket`
  if (tag == `biernacki`) link = `https://tabierna.wixsite.com/mynewwebsite`
  if (tag == `boyes`)
    link = `https://soulpepper.ca/about-us/the-company/resident-artists/derek-boyes/184`
  if (tag == `britten`) link = `https://en.wikipedia.org/wiki/Benjamin_Britten`
  if (tag == `burton`)
    link = `https://ca.linkedin.com/in/sarahjane-burton-91316738`
  if (tag == `butterfield`)
    link = `https://en.wikipedia.org/wiki/Peter_Butterfield`
  if (tag == `curran`)
    link = `https://en.wikipedia.org/wiki/Paul_Curran_(director)`
  if (tag == `darlington`) link = `http://www.jonathan-darlington.com`
  if (tag == `davis`)
    link = `https://en.wikipedia.org/wiki/Andrew_Davis_(conductor)`
  if (tag == `de carpentries`) link = `https://www.francoisdecarpentries.com`
  if (tag == `debus`) link = `https://learn.coc.ca/about-the-coc/johannes-debus`
  if (tag == `donizetti`) link = `https://en.wikipedia.org/wiki/Gaetano_Donizetti`
  if (tag == `doucet`) link = `https://nathaliedoucet.live`
  if (tag == `edison`) link = `https://en.wikipedia.org/wiki/Noel_Edison`
  if (tag == `elgar`) link = `https://en.wikipedia.org/wiki/Edward_Elgar`
  if (tag == `ferreira`) link = `https://www.wesleyferreira.com/press`
  if (tag == `garman`)
    link = `https://crestedbuttemusicfestival.org/meet-brian-garman-cbmfs-new-opera-music-director/`
  if (tag == `glass`) link = `https://en.wikipedia.org/wiki/Philip_Glass`
  if (tag == `guarino`) link = `https://en.wikipedia.org/wiki/Robin_Guarino`
  if (tag == `guidarini`)
    link = `https://www.schmopera.com/scene/people/marco-guidarini/`
  if (tag == `handel`)
    link = `https://en.wikipedia.org/wiki/George_Frideric_Handel`
  if (tag == `hatch`) link = `https://web.wlu.ca/music/Hatch/biography.php`
  if (tag == `haydn`) link = `https://en.wikipedia.org/wiki/Joseph_Haydn`
  if (tag == `helfrich`) link = `https://www.samhelfrich.com`
  if (tag == `hinton`) link = `https://www.peterhinton.ca/biography`
  if (tag == `irving`) link = `https://ca.linkedin.com/in/simon-irving-814887110`
  if (tag == `isepp`) link = `https://en.wikipedia.org/wiki/Martin_Isepp`
  if (tag == `ivany`) link = `https://www.joelivany.com`
  if (tag == `judge`) link = `http://www.ianjudge.com`
  if (tag == `kazaras`)
    link = `http://www.uzanartists.com/portfolio/peter-kazaras/`
  if (tag == `kovatchev`)
    link = `https://www.operamusica.com/artist/julian-kovatchev/#biography`
  if (tag == `labadie`)
    link = `http://www.violonsduroy.com/en/about/bernard-labadie-founding-conductor`
  if (tag == `lacey`) link = `http://www.williamlacey.com`
  if (tag == `larlee`) link = `https://www.standrewsartscouncil.com/anne-larlee/`
  if (tag == `lau`) link = `http://www.kevinlaumusic.com`
  if (tag == `lawless`)
    link = `https://www.musichall.uk.com/artists/directors/stephen-lawless`
  if (tag == `lepage`) link = `https://en.wikipedia.org/wiki/Robert_Lepage`
  if (tag == `b. macdonald`)
    link = `https://en.wikipedia.org/wiki/Brian_Macdonald_(choreographer)`
  if (tag == `r. macdonald`) link = `https://imgartists.com/roster/rory-macdonald/`
  if (tag == `macivor`) link = `https://en.wikipedia.org/wiki/Daniel_MacIvor`
  if (tag == `manson`) link = `https://www.annemanson.com`
  if (tag == `martin`) link = `https://www.stephaniemartinmusic.com`
  if (tag == `massenet`) link = `https://en.wikipedia.org/wiki/Jules_Massenet`
  if (tag == `menotti`) link = `https://en.wikipedia.org/wiki/Gian_Carlo_Menotti`
  if (tag == `mitchell`)
    link = `https://www.kingstonsymphony.ca/about/music-director/`
  if (tag == `mokrzewski`) link = `http://www.christophermokrzewski.com`
  if (tag == `montalbetti`) link = `https://www.facebook.com/barbara.montalbetti`
  if (tag == `montanaro`)
    link = `http://www.gmartandmusic.com/conductors/montanaro/`
  if (tag == `monteverdi`)
    link = `https://en.wikipedia.org/wiki/Claudio_Monteverdi`
  if (tag == `mozart`)
    link = `https://en.wikipedia.org/wiki/Wolfgang_Amadeus_Mozart`
  if (tag == `newton`) link = `https://eccehomotheatre.com/home.html`
  if (tag == `oida`) link = `https://www.yoshioida.com`
  if (tag == `olmi`) link = `https://www.proscenium.at/kuenstler/paolo_olmi_en.php`
  if (tag == `paulus`) link = `https://en.wikipedia.org/wiki/Diane_Paulus`
  if (tag == `pérez`) link = `https://en.karstenwitt.com/alejo-perez`
  if (tag == `pergolesi`)
    link = `https://en.wikipedia.org/wiki/Giovanni_Battista_Pergolesi`
  if (tag == `phillips`)
    link = `http://www.grandriverchorus.com/html/history.shtml`
  if (tag == `prokofiev`) link = `https://en.wikipedia.org/wiki/Sergei_Prokofiev`
  if (tag == `puccini`) link = `https://en.wikipedia.org/wiki/Giacomo_Puccini`
  if (tag == `purcell`) link = `https://en.wikipedia.org/wiki/Henry_Purcell`
  if (tag == `rhodes`)
    link = `https://www.schmopera.com/scene/people/stephanie-rhodes/`
  if (tag == `richards`) link = `https://twitter.com/richards_markc`
  if (tag == `rovaris`)
    link = `https://www.operaphila.org/about/our-people/leadership/corrado-rovaris/`
  if (tag == `silva-marin`) link = `http://www.silva-marin.com/stage.html`
  if (tag == `strauss`) link = `https://en.wikipedia.org/wiki/Richard_Strauss`
  if (tag == `stravinsky`) link = `https://en.wikipedia.org/wiki/Igor_Stravinsky`
  if (tag == `verdi`) link = `https://en.wikipedia.org/wiki/Giuseppe_Verdi`
  if (tag == `vivier`) link = `https://en.wikipedia.org/wiki/Claude_Vivier`
  if (tag == `wainwright`) link = `http://rufuswainwright.com`
  if (tag == `walker`)
    link = `https://www.fletcherartists.com/artists/antony-walker/`
  if (tag == `way`) link = `https://www.facebook.com/justin.way.7545`
  if (tag == `wilkins`)
    link = `https://www.landmarksorchestra.org/team/christopher-wilkins/`
  if (tag == `world premiere`) link = `https://en.wikipedia.org/wiki/Premiere`

  return (
    <li css={tagItem}>
      <Link href={link} css={linkTag}>
        {tag}
        <SrText> (Link opens in a new tab or window.)</SrText>
      </Link>
    </li>
  )
}

///////////////////////////////////////////////////////////////////////////////////

import React from 'react'
import styled from 'styled-components'

import Base from '../ui/Base'
import Metadata from '../ui/Metadata'
import PageHeader from '../ui/PageHeader'
import { Emoji, Link, SrText } from '../ui/elements'
import useSiteMetadata from '../queries/useSiteMetadata'
import usePageData from '../queries/usePageData'
import useGigsData from '../queries/useGigsData'
import {
  container,
  copy,
  icon,
  linkInline,
  linkTag,
  main,
  project,
  projectDescription,
  projectTitle,
  purpleUnderline,
  tagList,
  tagItem
} from '../styles'

export default OperaPage
