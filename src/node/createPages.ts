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
  /**
   * Blog posts
   */
  const mdxQuery: MdxQueryResult = await graphql(`
    {
      allMdx(filter: { frontmatter: { published: { eq: true } } }) {
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

  if (mdxQuery.errors) {
    console.error(mdxQuery.errors)
  }

  if (!mdxQuery.data) {
    return
  }

  const { edges: posts } = mdxQuery.data.allMdx

  posts.forEach((post: MdxQueryEdge, i: number) => {
    const prev: MdxQueryNode | null = i === 0 ? null : posts[i - 1].node
    const next: MdxQueryNode | null =
      i === posts.length - 1 ? null : posts[i + 1].node

    actions.createPage({
      path: post.node.frontmatter.slug,
      component: require.resolve(`../ui/blog/Post.tsx`),
      context: {
        id: post.node.id,
        prev,
        next,
      },
    })
  })

  /**
   * Data Structures
   */
  // TODO: save fragment for each table type and reuse all over the place
  const dsQuery: any = await graphql(`
    {
      dataStructureTopics: allAirtableTopics(
        filter: { data: { Category: { eq: "Data Structures" } } }
        sort: { fields: data___Order, order: ASC }
      ) {
        edges {
          node {
            id
            data {
              Details {
                childMdx {
                  body
                }
              }

              Gist

              Learn {
                id
                data {
                  Link
                  Name
                  Source {
                    data {
                      Name
                      Link
                    }
                  }
                  Topics {
                    data {
                      Name
                      Slug
                    }
                  }
                }
              }

              Name

              Practice {
                id
                data {
                  Link
                  Name
                  Source {
                    data {
                      Name
                      Link
                    }
                  }
                  Topics {
                    data {
                      Name
                      Slug
                    }
                  }
                }
              }

              Skills {
                id
              }

              Slug

              Summary
            }
          }
        }
      }
    }
  `)

  if (dsQuery.errors) {
    console.error(dsQuery.errors)
  }

  if (!dsQuery.data) {
    return
  }

  const { edges: dataStructures } = dsQuery.data.dataStructureTopics

  dataStructures.forEach((dataStructure: any, i: number) => {
    const prev: any | null = i === 0 ? null : dataStructures[i - 1].node
    const next: any | null =
      i === dataStructures.length - 1 ? null : dataStructures[i + 1].node

    actions.createPage({
      path: `/learns/${dataStructure.node.data.Slug}`,
      component: require.resolve(`../ui/learn/DataStructure.tsx`),
      context: {
        id: dataStructure.node.id,
        data: dataStructure.node.data,
        prev,
        next,
      },
    })
  })
}

export { createPages }
