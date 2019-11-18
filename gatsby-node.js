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

// Generate Likes data nodes

const crypto = require(`crypto`);
const { fetchTMDBData } = require(`./src/node/fetchTMDBData`);
const { fetchiTunesData } = require(`./src/node/fetchiTunesData`);

exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions;
  const [tvData, movieData] = await fetchTMDBData();
  const [albumData, podcastData, bookData] = await fetchiTunesData();

  tvData.forEach(
    show =>
      show &&
      createNode({
        // Data for the node.
        title: show.title,
        releaseDate: show.releaseDate,
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

  movieData.forEach(
    movie =>
      movie &&
      createNode({
        // Data for the node.
        title: movie.title,
        releaseDate: movie.releaseDate,
        link: movie.link,
        posterUrl: movie.posterUrl,

        // Required fields.
        id: String(movie.id),
        parent: null,
        children: [],
        internal: {
          type: `Movie`,
          contentDigest: crypto
            .createHash(`md5`)
            .update(JSON.stringify(movie))
            .digest(`hex`)
        }
      })
  );

  bookData.forEach(
    book =>
      book &&
      createNode({
        // Data for the node.
        title: book.title,
        publishDate: book.publishDate,
        link: book.link,
        coverUrl: book.coverUrl,

        // Required fields.
        id: String(book.id),
        parent: null,
        children: [],
        internal: {
          type: `Book`,
          contentDigest: crypto
            .createHash(`md5`)
            .update(JSON.stringify(book))
            .digest(`hex`)
        }
      })
  );

  albumData.forEach(
    album =>
      album &&
      createNode({
        // Data for the node.
        artist: album.artist,
        name: album.name,
        releaseDate: album.releaseDate,
        link: album.link,
        coverUrl: album.coverUrl,

        // Required fields.
        id: String(album.id),
        parent: null,
        children: [],
        internal: {
          type: `Album`,
          contentDigest: crypto
            .createHash(`md5`)
            .update(JSON.stringify(album))
            .digest(`hex`)
        }
      })
  );

  podcastData.forEach(
    podcast =>
      podcast &&
      createNode({
        // Data for the node.
        artist: podcast.artist,
        name: podcast.name,
        releaseDate: podcast.releaseDate,
        link: podcast.link,
        coverUrl: podcast.coverUrl,

        // Required fields.
        id: String(podcast.id),
        parent: null,
        children: [],
        internal: {
          type: `Podcast`,
          contentDigest: crypto
            .createHash(`md5`)
            .update(JSON.stringify(podcast))
            .digest(`hex`)
        }
      })
  );

  return;
};
