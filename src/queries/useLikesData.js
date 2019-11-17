function useLikesData() {
  const { allTvShow, allMovie, allBook } = useStaticQuery(
    graphql`
      query {
        allTvShow(sort: { fields: releaseDate, order: DESC }) {
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

        allBook(sort: { fields: publishDate, order: DESC }) {
          nodes {
            id
            title
            publishDate
            link
            cover {
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
  const books = allBook.nodes;

  return { tvShows, movies, books };
}

///////////////////////////////////////////////////////////////////////////////////

import { useStaticQuery, graphql } from "gatsby";

export default useLikesData;
