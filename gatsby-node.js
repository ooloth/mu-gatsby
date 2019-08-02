// 1. Generate blog post slugs (and other post fields)

// https://github.com/eggheadio/gatsby-starter-egghead-blog/blob/master/gatsby-node.js
// https://gatsby-mdx.netlify.com/guides/programmatically-creating-pages

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    createNodeField({
      name: 'id',
      node,
      value: node.id
    })

    createNodeField({
      name: 'title',
      node,
      value: node.frontmatter.title
    })

    createNodeField({
      name: 'slug',
      node,
      value: node.frontmatter.slug
    })

    createNodeField({
      name: 'description',
      node,
      value: node.frontmatter.description
    })

    createNodeField({
      name: 'featuredImg',
      node,
      value: node.frontmatter.featuredImg
    })

    createNodeField({
      name: 'topics',
      node,
      value: node.frontmatter.topics || []
    })

    createNodeField({
      name: 'linkSharedOnTwitter',
      node,
      value: node.frontmatter.linkSharedOnTwitter
    })

    createNodeField({
      name: 'devLink',
      node,
      value: node.frontmatter.devLink
    })

    createNodeField({
      name: 'published',
      node,
      value: node.frontmatter.published
    })

    createNodeField({
      name: 'datePublished',
      node,
      value: node.frontmatter.datePublished
    })

    createNodeField({
      name: 'dateUpdated',
      node,
      value: node.frontmatter.dateUpdated
    })

    // createNodeField({
    //   name: 'redirects',
    //   node,
    //   value: node.frontmatter.redirects,
    // })
  }
}

///////////////////////////////////////////////////////////////////////////////////

// 2. Generate blog post pages

// https://www.gatsbyjs.org/tutorial/part-seven/
// https://www.gatsbyjs.org/docs/debugging-async-lifecycles/
// https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-mdx

exports.createPages = async function({ actions, graphql }) {
  await graphql(`
    query {
      allMdx(filter: { frontmatter: { published: { ne: false } } }) {
        edges {
          node {
            id
            timeToRead
            body
            fields {
              title
              slug
              description
              # featuredImg {
              #   childImageSharp {
              #     fluid(maxWidth: 1200) {
              #       src
              #     }
              #   }
              # }
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
      console.error(result.errors)
    }

    const { edges } = result.data.allMdx

    edges.forEach((edge, i) => {
      const prev = i === 0 ? null : edges[i - 1].node
      const next = i === edges.length - 1 ? null : edges[i + 1].node

      actions.createPage({
        path: edge.node.fields.slug,
        component: require.resolve(`./src/ui/Post.js`),
        context: {
          id: edge.node.id,
          prev,
          next
        }
      })
    })
  })
}
