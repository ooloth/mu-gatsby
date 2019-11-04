function useLikesData() {
  const { allTvShow } = useStaticQuery(
    graphql`
      query {
        allTvShow(sort: { fields: airDate, order: DESC }) {
          nodes {
            airDate
            id
            name
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

  return allTvShow.nodes;
}

///////////////////////////////////////////////////////////////////////////////////

import { useStaticQuery, graphql } from "gatsby";

export default useLikesData;
