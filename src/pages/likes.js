function LikesPage({ location }) {
  const { likesPage } = useSiteMetadata();
  const { likesYaml: page } = usePageData();

  return (
    // https://www.gatsbyjs.org/docs/migrating-from-v1-to-v2/#4-pass-history-location-and-match-props-to-layout
    <Base location={location}>
      <Metadata page={likesPage} />

      <PageHeader
        headline={page.headline}
        emoji={page.emoji}
        summary={page.summary}
      />

      <main css={main}>
        <TV />
      </main>
    </Base>
  );
}

///////////////////////////////////////////////////////////////////////////////////

function TV() {
  const shows = useLikesData();

  return (
    <section>
      <h2
        css={`
          margin-top: var(--s7);
          margin-bottom: var(--s3);
          font-size: var(--f9);
          font-weight: 900;
        `}
      >
        TV
      </h2>

      <ul
        css={`
          display: flex;
          overflow: auto;
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;

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
        `}
      >
        {shows.map(show => (
          <li
            key={show.id}
            css={`
              flex: none;
              margin-right: var(--s6);
              width: 10rem;
            `}
          >
            <Link
              href="/"
              css={`
                text-align: center;
                font-weight: 700;
                text-decoration: none;
              `}
            >
              <Image fluid={show.poster.childImageSharp.fluid} />
              <p
                css={`
                  margin-top: var(--s2);
                  line-height: var(--lh1);
                  font-size: var(--f3);
                `}
              >
                {show.name}
              </p>
              <p
                css={`
                  margin-top: var(--s1);
                  font-size: var(--f2);
                `}
              >
                ({new Date(show.airDate).getFullYear()})
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

///////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////

import React from "react";
import Image from "gatsby-image";
import styled from "styled-components";

import Base from "../ui/Base";
import Metadata from "../ui/Metadata";
import PageHeader from "../ui/PageHeader";
import { Link, SrText } from "../ui/elements";
import useSiteMetadata from "../queries/useSiteMetadata";
import usePageData from "../queries/usePageData";
import useLikesData from "../queries/useLikesData";
import { main, media, purpleUnderline } from "../styles";

export default LikesPage;
