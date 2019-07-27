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
      value: `/${node.frontmatter.slug}`
    })

    createNodeField({
      name: 'date',
      node,
      value: node.frontmatter.date ? node.frontmatter.date.split(' ')[0] : ''
    })

    createNodeField({
      name: 'description',
      node,
      value: node.frontmatter.description
    })

    createNodeField({
      name: 'published',
      node,
      value: node.frontmatter.published
    })

    // createNodeField({
    //   name: 'banner',
    //   node,
    //   value: node.frontmatter.banner,
    // })

    // createNodeField({
    //   name: 'categories',
    //   node,
    //   value: node.frontmatter.categories || [],
    // })

    // createNodeField({
    //   name: 'keywords',
    //   node,
    //   value: node.frontmatter.keywords || [],
    // })

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
    {
      allMdx(
        filter: { frontmatter: { published: { ne: false } } }
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            id
            fields {
              title
              slug
              date
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
