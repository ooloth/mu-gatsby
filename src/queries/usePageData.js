function usePageData() {
  const { blogYaml, websitesYaml, operaYaml, likesYaml } = useStaticQuery(
    graphql`
      query {
        blogYaml {
          headline
          emoji {
            icon
            label
          }
          summary
        }

        websitesYaml {
          headline
          emoji {
            icon
            label
          }
          summary
        }

        operaYaml {
          headline
          emoji {
            icon
            label
          }
          summary
        }

        likesYaml {
          headline
          emoji {
            icon
            label
          }
          summary
        }
      }
    `
  );

  return { blogYaml, websitesYaml, operaYaml, likesYaml };
}

///////////////////////////////////////////////////////////////////////////////////

import { useStaticQuery, graphql } from "gatsby";

export default usePageData;
