import React from 'react'
import Image from 'gatsby-image'
import styled, { css } from 'styled-components'

import Base from '../ui/Base'
import Metadata from '../ui/Metadata'
import PageHeader from '../ui/PageHeader'
import { Link } from '../ui/elements'
import useSiteMetadata from '../queries/useSiteMetadata'
import usePageData from '../queries/usePageData'
import useLikesData from '../queries/useLikesData'
import { main } from '../styles'

const Section = styled.section`
  padding-top: var(--s7);
`

const LikesHeading = styled.h2`
  margin-bottom: var(--s3);
  font-size: var(--f9);
  font-weight: 900;
`

const hideScrollbar = css`
  /* For IE */
  -ms-overflow-style: -ms-autohiding-scrollbar;
  scrollbar-face-color: transparent;
  scrollbar-track-color: transparent;
  scrollbar-3dlight-color: transparent;
  scrollbar-darkshadow-color: transparent;
  scrollbar-arrow-color: transparent;

  /* For Chrome */
  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
`

const LikesList = styled.ul`
  ${hideScrollbar}
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
`

const LikesItem = styled.li`
  flex: none;
  margin-right: var(--s6);
  width: 10rem; /* IE, Edge */
  width: min-content; /* modern browsers */
`

const ItemLink = styled(Link)`
  text-align: center;
  font-weight: 700;
  text-decoration: none;
`

const ItemImage = styled(Image)`
  box-shadow: var(--shadow1);
`

const ItemName = styled.p`
  margin-top: var(--s2);
  line-height: var(--lh1);
  font-size: var(--f3);
`

const ItemDetail = styled.p`
  margin-top: var(--s1);
  font-size: var(--f2);
`

function TV() {
  const { tvShows } = useLikesData()

  return (
    <Section>
      <LikesHeading>TV</LikesHeading>

      <LikesList>
        {tvShows.map(show => (
          <LikesItem key={show.id}>
            <ItemLink
              href={show.link}
              alt={`Visit IMDB page for "${show.title}" in a new window.`}
            >
              <ItemImage
                fixed={{
                  ...show.poster.childImageSharp.fixed,
                  aspectRatio: 2 / 3,
                }}
                alt={`Poster for the TV series "${show.title}"`}
              />
              <ItemName>{show.title}</ItemName>
              <ItemDetail>({show.releaseDate})</ItemDetail>
            </ItemLink>
          </LikesItem>
        ))}
      </LikesList>
    </Section>
  )
}

function Movies() {
  const { movies } = useLikesData()

  return (
    <Section>
      <LikesHeading>Movies</LikesHeading>

      <LikesList>
        {movies.map(movie => (
          <LikesItem key={movie.id}>
            <ItemLink
              href={movie.link}
              alt={`Visit IMDB page for "${movie.title}" in a new window.`}
            >
              <ItemImage
                fixed={{
                  ...movie.poster.childImageSharp.fixed,
                  aspectRatio: 2 / 3,
                }}
                alt={`Poster for the movie "${movie.title}"`}
              />
              <ItemName>{movie.title}</ItemName>
              <ItemDetail>({movie.releaseDate})</ItemDetail>
            </ItemLink>
          </LikesItem>
        ))}
      </LikesList>
    </Section>
  )
}

function Books() {
  const { books } = useLikesData()

  return (
    <Section>
      <LikesHeading>Books</LikesHeading>

      <LikesList>
        {books.map(book => (
          <LikesItem key={book.id}>
            <ItemLink
              href={book.link}
              alt={`Visit the Open Library page for "${book.title}" in a new window.`}
            >
              <ItemImage
                fixed={book.cover.childImageSharp.fixed}
                alt={`Cover for the book "${book.title}"`}
              />
              <ItemName>{book.title}</ItemName>
              <ItemDetail>({book.publishDate})</ItemDetail>
            </ItemLink>
          </LikesItem>
        ))}
      </LikesList>
    </Section>
  )
}

function Albums() {
  const { albums } = useLikesData()

  return (
    <Section>
      <LikesHeading>Albums</LikesHeading>

      <LikesList>
        {albums.map(album => (
          <LikesItem key={album.id}>
            <ItemLink
              href={album.link}
              alt={`Visit the iTunes page for "${album.name}" by ${album.artist} in a new window.`}
            >
              <ItemImage
                fixed={album.cover.childImageSharp.fixed}
                alt={`Cover for the album "${album.name}" by ${album.artist}`}
              />
              <ItemName>{album.name}</ItemName>
              <ItemDetail>{album.artist}</ItemDetail>
              <ItemDetail>({album.releaseDate})</ItemDetail>
            </ItemLink>
          </LikesItem>
        ))}
      </LikesList>
    </Section>
  )
}

function Podcasts() {
  const { podcasts } = useLikesData()

  return (
    <Section>
      <LikesHeading>Podcasts</LikesHeading>

      <LikesList>
        {podcasts.map(podcast => (
          <LikesItem key={podcast.id}>
            <ItemLink
              href={podcast.link}
              alt={`Visit the iTunes page for "${podcast.name}" in a new window.`}
            >
              <ItemImage
                fixed={podcast.cover.childImageSharp.fixed}
                alt={`Cover for the podcast "${podcast.name}"`}
              />
              <ItemName>{podcast.name}</ItemName>
              <ItemDetail>({podcast.releaseDate})</ItemDetail>
            </ItemLink>
          </LikesItem>
        ))}
      </LikesList>
    </Section>
  )
}

const Main = styled.main`
  ${main}
  max-width: 100%;
`

function LikesPage({ location }) {
  const { likesPage } = useSiteMetadata()
  const { likesYaml: page } = usePageData()

  return (
    <Base location={location}>
      <Metadata page={likesPage} />

      <PageHeader
        headline={page.headline}
        emoji={page.emoji}
        summary={page.summary}
      />

      <Main>
        <TV />
        <Movies />
        <Books />
        <Albums />
        <Podcasts />
      </Main>
    </Base>
  )
}

export default LikesPage
