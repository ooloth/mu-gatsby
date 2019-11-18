function useLikesData() {
  const { allTvShow, allMovie, allBook, allAlbum, allPodcast } = useStaticQuery(
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
            publishDate(formatString: "YYYY")
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

        allAlbum(sort: { fields: releaseDate, order: DESC }) {
          nodes {
            id
            artist
            name
            releaseDate(formatString: "YYYY")
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

        allPodcast(sort: { fields: releaseDate, order: DESC }) {
          nodes {
            id
            artist
            name
            releaseDate(formatString: "YYYY")
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
  const albums = allAlbum.nodes;
  const podcasts = allPodcast.nodes;

  return { tvShows, movies, books, albums, podcasts };
}

///////////////////////////////////////////////////////////////////////////////////

import { useStaticQuery, graphql } from "gatsby";

export default useLikesData;
