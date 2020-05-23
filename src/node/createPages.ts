import { CreatePagesArgs } from 'gatsby'

// Generate blog post pages

// https://www.gatsbyjs.org/tutorial/part-seven/
// https://www.gatsbyjs.org/docs/debugging-async-lifecycles/

interface DevToQueryNode {
  canonical_url: string
  id: string
}

interface DevToQueryResult {
  data?: {
    allDevArticle: {
      nodes: Array<DevToQueryNode>
    }
  }
  errors?: string
}

async function createPages({ graphql, actions }: CreatePagesArgs) {
  const devToQuery: DevToQueryResult = await graphql(`
    {
      allDevArticle {
        nodes {
          canonical_url
          id
        }
      }
    }
  `)

  if (devToQuery.errors) {
    // Don't create pages with incomplete data
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`[createPages]: ${devToQuery.errors}`)
    } else {
      console.error(`[createPages]: ${devToQuery.errors}`)
    }
  }

  if (
    !devToQuery.data ||
    !devToQuery.data.allDevArticle ||
    !devToQuery.data.allDevArticle.nodes ||
    !devToQuery.data.allDevArticle.nodes.length
  ) {
    // Don't create pages with no data
    if (process.env.NODE_ENV === 'production') {
      throw new Error('[createPages]: No query results from DEV.to')
    } else {
      console.error('[createPages]: No query results from DEV.to')
    }

    return
  }

  const { nodes } = devToQuery.data.allDevArticle

  nodes.forEach((node: DevToQueryNode) => {
    // const prev: any | null = i === 0 ? null : edges[i - 1].node
    // const next: any | null = i === edges.length - 1 ? null : edges[i + 1].node

    actions.createPage({
      path: node.canonical_url.replace('https://www.michaeluloth.com/', ''),
      component: require.resolve(`../ui/Post.tsx`),
      context: {
        id: node.id,
        // prev,
        // next,
      },
    })
  })
}

export { createPages }
