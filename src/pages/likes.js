function LikesPage({ location }) {
  const { likesPage } = useSiteMetadata();
  const { likesYaml: page } = usePageData();

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
      </Main>
    </Base>
  );
}

///////////////////////////////////////////////////////////////////////////////////

const Main = styled.main`
  ${main}
  max-width: 100%;
`;

///////////////////////////////////////////////////////////////////////////////////

function TV() {
  const { tvShows } = useLikesData();

  return (
    <Section>
      <LikesHeading>TV</LikesHeading>

      <LikesList>
        {tvShows.map(show => (
          <LikesItem key={show.id}>
            <ItemLink
              href={show.link}
              alt={`Visit IMDB page for ${show.title} in a separate window.`}
            >
              <Image
                fluid={show.poster.childImageSharp.fluid}
                alt={`Poster for the TV series ${show.title}`}
              />
              <ItemName>{show.name}</ItemName>
              <ItemDate>({show.releaseDate})</ItemDate>
            </ItemLink>
          </LikesItem>
        ))}
      </LikesList>
    </Section>
  );
}

///////////////////////////////////////////////////////////////////////////////////

const Section = styled.section`
  padding-top: var(--s7);
`;

const LikesHeading = styled.h2`
  margin-bottom: var(--s3);
  font-size: var(--f9);
  font-weight: 900;
`;

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
`;

const LikesList = styled.ul`
  ${hideScrollbar}
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
`;

const LikesItem = styled.li`
  flex: none;
  margin-right: var(--s6);
  width: 10rem;
`;

const ItemLink = styled(Link)`
  text-align: center;
  font-weight: 700;
  text-decoration: none;
`;

const ItemName = styled.p`
  margin-top: var(--s2);
  line-height: var(--lh1);
  font-size: var(--f3);
`;

const ItemDate = styled.p`
  margin-top: var(--s1);
  font-size: var(--f2);
`;

///////////////////////////////////////////////////////////////////////////////////

function Movies() {
  const { movies } = useLikesData();

  return (
    <Section>
      <LikesHeading>Movies</LikesHeading>

      <LikesList>
        {movies.map(movie => (
          <LikesItem key={movie.id}>
            <ItemLink
              href={movie.link}
              alt={`Visit IMDB page for ${movie.title} in a separate window.`}
            >
              <Image
                fluid={movie.poster.childImageSharp.fluid}
                alt={`Poster for the movie ${movie.title}`}
              />
              <ItemName>{movie.title}</ItemName>
              <ItemDate>({movie.releaseDate})</ItemDate>
            </ItemLink>
          </LikesItem>
        ))}
      </LikesList>
    </Section>
  );
}

///////////////////////////////////////////////////////////////////////////////////

import React from "react";
import Image from "gatsby-image";
import styled, { css } from "styled-components";

import Base from "../ui/Base";
import Metadata from "../ui/Metadata";
import PageHeader from "../ui/PageHeader";
import { Link } from "../ui/elements";
import useSiteMetadata from "../queries/useSiteMetadata";
import usePageData from "../queries/usePageData";
import useLikesData from "../queries/useLikesData";
import { main } from "../styles";

export default LikesPage;
