import React from 'react'
import Image from 'gatsby-image'
import { WindowLocation } from '@reach/router'
import styled, { css } from 'styled-components'

import Base from '../ui/Base'
import Metadata from '../ui/Metadata'
import PageHeader from '../ui/PageHeader'
import { Link } from '../ui/elements'
import useSiteMetadata from '../queries/useSiteMetadata'
import usePageData from '../queries/usePageData'
import useAlbumData from '../queries/useAlbumData'
import useBookData from '../queries/useBookData'
import useMovieData from '../queries/useMovieData'
import usePodcastData from '../queries/usePodcastData'
import useTvShowData from '../queries/useTvShowData'

export const Section = styled.section`
  padding-top: var(--s7);
`

export const LikesHeading = styled.h2`
  margin-bottom: var(--s3);
  font-size: var(--f9);
  font-weight: 900;
`

const hideScrollbar = css`
  /* For Chrome */
  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
`

const LikesList = styled.ul`
  ${hideScrollbar}
  display: flex;
  position: relative; /* prevents whitespace to right on Safari */
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

// const ItemLink = styled(Link)`
//   text-align: center;
//   font-weight: 700;
//   text-decoration: none;
// `

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
  const shows = useTvShowData()

  return (
    <Section>
      <LikesHeading>TV</LikesHeading>

      <LikesList>
        {shows.map(show => {
          if (
            !show ||
            !show.id ||
            !show.link ||
            !show.title ||
            !show.poster ||
            !show.poster.childImageSharp ||
            !show.poster.childImageSharp.fixed ||
            !show.releaseDate
          ) {
            return null
          }

          return (
            <LikesItem key={show.id}>
              <Link
                variant="incognito"
                href={show.link}
                srText={`Visit IMDB page for "${show.title}" in a new window.`}
              >
                <ItemImage
                  fixed={show.poster.childImageSharp.fixed}
                  alt={`Poster for the TV series "${show.title}"`}
                />
                <ItemName>{show.title}</ItemName>
                <ItemDetail>({show.releaseDate})</ItemDetail>
              </Link>
            </LikesItem>
          )
        })}
      </LikesList>
    </Section>
  )
}

function Movies() {
  const movies = useMovieData()

  return (
    <Section>
      <LikesHeading>Movies</LikesHeading>

      <LikesList>
        {movies.map(movie => {
          if (
            !movie ||
            !movie.id ||
            !movie.link ||
            !movie.title ||
            !movie.poster ||
            !movie.poster.childImageSharp ||
            !movie.poster.childImageSharp.fixed ||
            !movie.releaseDate
          ) {
            return null
          }

          return (
            <LikesItem key={movie.id}>
              <Link
                variant="incognito"
                href={movie.link}
                srText={`Visit IMDB page for "${movie.title}" in a new window.`}
              >
                <ItemImage
                  fixed={movie.poster.childImageSharp.fixed}
                  alt={`Poster for the movie "${movie.title}"`}
                />
                <ItemName>{movie.title}</ItemName>
                <ItemDetail>({movie.releaseDate})</ItemDetail>
              </Link>
            </LikesItem>
          )
        })}
      </LikesList>
    </Section>
  )
}

function Books() {
  const books = useBookData()

  return (
    <Section>
      <LikesHeading>Books</LikesHeading>

      <LikesList>
        {books.map(book => {
          if (
            !book ||
            !book.id ||
            !book.link ||
            !book.title ||
            !book.cover ||
            !book.cover.childImageSharp ||
            !book.cover.childImageSharp.fixed ||
            !book.publishDate
          ) {
            return null
          }

          return (
            <LikesItem key={book.id}>
              <Link
                variant="incognito"
                href={book.link}
                srText={`Visit the Open Library page for "${book.title}" in a new window.`}
              >
                <ItemImage
                  fixed={book.cover.childImageSharp.fixed}
                  alt={`Cover for the book "${book.title}"`}
                />
                <ItemName>{book.title}</ItemName>
                <ItemDetail>({book.publishDate})</ItemDetail>
              </Link>
            </LikesItem>
          )
        })}
      </LikesList>
    </Section>
  )
}

function Albums() {
  const albums = useAlbumData()

  return (
    <Section>
      <LikesHeading>Albums</LikesHeading>

      <LikesList>
        {albums.map(album => {
          if (
            !album ||
            !album.id ||
            !album.link ||
            !album.name ||
            !album.artist ||
            !album.cover ||
            !album.cover.childImageSharp ||
            !album.cover.childImageSharp.fixed ||
            !album.releaseDate
          ) {
            return null
          }

          return (
            <LikesItem key={album.id}>
              <Link
                variant="incognito"
                href={album.link}
                srText={`Visit the iTunes page for "${album.name}" by ${album.artist} in a new window.`}
              >
                <ItemImage
                  fixed={album.cover.childImageSharp.fixed}
                  alt={`Cover for the album "${album.name}" by ${album.artist}`}
                />
                <ItemName>{album.name}</ItemName>
                <ItemDetail>{album.artist}</ItemDetail>
                <ItemDetail>({album.releaseDate})</ItemDetail>
              </Link>
            </LikesItem>
          )
        })}
      </LikesList>
    </Section>
  )
}

function Podcasts() {
  const podcasts = usePodcastData()

  return (
    <Section>
      <LikesHeading>Podcasts</LikesHeading>

      <LikesList>
        {podcasts.map(podcast => {
          if (
            !podcast ||
            !podcast.id ||
            !podcast.link ||
            !podcast.name ||
            !podcast.cover ||
            !podcast.cover.childImageSharp ||
            !podcast.cover.childImageSharp.fixed ||
            !podcast.releaseDate
          ) {
            return null
          }

          return (
            <LikesItem key={podcast.id}>
              <Link
                variant="incognito"
                href={podcast.link}
                srText={`Visit the iTunes page for "${podcast.name}" in a new window.`}
              >
                <ItemImage
                  fixed={podcast.cover.childImageSharp.fixed}
                  alt={`Cover for the podcast "${podcast.name}"`}
                />
                <ItemName>{podcast.name}</ItemName>
                <ItemDetail>({podcast.releaseDate})</ItemDetail>
              </Link>
            </LikesItem>
          )
        })}
      </LikesList>
    </Section>
  )
}

// FIXME: extract this shared PageComponent declaration
interface Props {
  location: WindowLocation
}

function LikesPage({ location }: Props) {
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

      <main>
        <TV />
        <Movies />
        <Books />
        <Albums />
        <Podcasts />
      </main>
    </Base>
  )
}

export default LikesPage
