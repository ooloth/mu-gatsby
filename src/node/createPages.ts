import { CreatePagesArgs } from 'gatsby'

// Generate blog post pages

// https://www.gatsbyjs.org/tutorial/part-seven/
// https://www.gatsbyjs.org/docs/debugging-async-lifecycles/
// https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-mdx

export interface MdxQueryNode {
  body: string
  frontmatter: {
    title: string
    slug: string
    description: string
    metaImage: {
      childImageSharp: {
        fixed: {
          src: string
        }
      }
    }
    topics: Array<string>
    linkSharedOnTwitter: string
    devLink: string
    datePublished: string
    dateUpdated: string
  }
  id: string
  timeToRead: string
}

interface MdxQueryEdge {
  node: MdxQueryNode
}

interface MdxQueryResult {
  data?: {
    allMdx: {
      edges: Array<MdxQueryEdge>
    }
  }
  errors?: string
}

async function createPages({ graphql, actions }: CreatePagesArgs) {
  const result: MdxQueryResult = await graphql(`
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
                  fixed(width: 1500, quality: 80) {
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
  `)

  if (result.errors) {
    console.error(result.errors)
  }

  if (!result.data) {
    return
  }

  const { edges } = result.data.allMdx

  edges.forEach((edge: MdxQueryEdge, i: number) => {
    const prev: MdxQueryNode | null = i === 0 ? null : edges[i - 1].node
    const next: MdxQueryNode | null =
      i === edges.length - 1 ? null : edges[i + 1].node

    actions.createPage({
      path: edge.node.frontmatter.slug,
      component: require.resolve(`../ui/blog/Post.tsx`),
      context: {
        id: edge.node.id,
        prev,
        next,
      },
    })
  })
}

export { createPages }
