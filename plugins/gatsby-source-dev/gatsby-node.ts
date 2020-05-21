// See: https://dev.to/ascorbic/how-to-build-a-gatsby-plugin-to-display-your-dev-posts-542a

import fetch from 'node-fetch'
import { SourceNodesArgs } from 'gatsby'

const fetchArticleList = async (): Promise<any> => {
  try {
    // See: https://docs.dev.to/api/#operation/getArticles
    const response = await fetch(
      `https://dev.to/api/articles?username=ooloth&per_page=1000`,
    )
    return await response.json()
  } catch (error) {
    // Don't build the site if all posts are missing
    throw new Error(`[gatsby-source-dev]: ${error}`)
  }
}

const fetchArticles = async (articleList: any): Promise<any> =>
  await Promise.all(
    articleList.map(async (article: any) => {
      try {
        // See: https://docs.dev.to/api/#operation/getArticleById
        const response = await fetch(`https://dev.to/api/articles/${article.id}`)
        return await response.json()
      } catch (error) {
        // Don't build the site if individual posts are missing
        throw new Error(`[gatsby-source-dev]: ${error}`)
      }
    }),
  )

const createArticleNodes = (
  articles: any,
  createNode: any,
  createNodeId: any,
  createContentDigest: any,
): void =>
  articles.filter(Boolean).forEach((article: any) => {
    const { id, body_markdown, ...data } = article

    const node = {
      id: createNodeId(id),
      internal: {
        type: `DevArticle`,
        mediaType: `text/markdown`,
        content: body_markdown,
      },
      ...data,
    }
    const contentDigest = createContentDigest(node)
    node.internal.contentDigest = contentDigest

    createNode(node)
  })

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}: SourceNodesArgs): Promise<void> => {
  const { createNode } = actions

  const articleList = await fetchArticleList()
  const articles = await fetchArticles(articleList)

  createArticleNodes(articles, createNode, createNodeId, createContentDigest)
}
