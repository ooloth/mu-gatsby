function useLikesData() {
  const { allTvShow, allMovie } = useStaticQuery(
    graphql`
      query {
        allTvShow(sort: { fields: airDate, order: DESC }) {
          nodes {
            id
            name
            airDate
            link
            poster {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }

        allMovie(sort: { fields: releaseDate, order: DESC }) {
          nodes {
            id
            title
            releaseDate
            link
            poster {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    `
  );

  const tvShows = allTvShow.nodes;
  const movies = allMovie.nodes;

  return { tvShows, movies };
}

///////////////////////////////////////////////////////////////////////////////////

import { useStaticQuery, graphql } from "gatsby";

export default useLikesData;
