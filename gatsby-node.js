// Generate blog post pages

// https://www.gatsbyjs.org/tutorial/part-seven/
// https://www.gatsbyjs.org/docs/debugging-async-lifecycles/
// https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-mdx

exports.createPages = async function({ actions, graphql }) {
  await graphql(`
    {
      allMdx(filter: { frontmatter: { published: { ne: false } } }) {
        edges {
          node {
            id
            timeToRead
            body
            frontmatter {
              title
              slug
              description
              metaImage {
                childImageSharp {
                  fixed(width: 1500) {
                    src
                  }
                }
              }
              topics
              linkSharedOnTwitter
              devLink
              datePublished(formatString: "MMMM DD, YYYY")
              dateUpdated(formatString: "MMMM DD, YYYY")
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      console.error(result.errors);
    }

    const { edges } = result.data.allMdx;

    edges.forEach((edge, i) => {
      const prev = i === 0 ? null : edges[i - 1].node;
      const next = i === edges.length - 1 ? null : edges[i + 1].node;

      actions.createPage({
        path: edge.node.frontmatter.slug,
        component: require.resolve(`./src/ui/Post.js`),
        context: {
          id: edge.node.id,
          prev,
          next
        }
      });
    });
  });
};

// Generate TV Show data

const { fetchTvData } = require(`./src/node/fetchTvData`);
const crypto = require(`crypto`);

exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions;
  const tvData = await fetchTvData();

  tvData.forEach(show =>
    createNode({
      // Data for the node.
      name: show.name,
      airDate: show.airDate,
      link: show.link,
      posterUrl: show.posterUrl,

      // Required fields.
      id: String(show.id),
      parent: null,
      children: [],
      internal: {
        type: `TvShow`,
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(show))
          .digest(`hex`)
      }
    })
  );

  return;
};
