function useLikesData() {
  const { allTvShow, allMovie } = useStaticQuery(
    graphql`
      query {
        allTvShow(sort: { fields: releaseDate, order: DESC }) {
          nodes {
            id
            name
            releaseDate(formatString: "YYYY")
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
            releaseDate(formatString: "YYYY")
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
