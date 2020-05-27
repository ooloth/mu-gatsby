// See: https://dev.to/ascorbic/how-to-build-a-gatsby-plugin-to-display-your-dev-posts-542a

import fetch from 'node-fetch'
import { SourceNodesArgs } from 'gatsby'

/**
 * Article list
 */

const fetchArticleList = async (): Promise<any> => {
  try {
    // See: https://docs.dev.to/api/#operation/getArticles
    const response = await fetch(
      `https://dev.to/api/articles?username=ooloth&per_page=1000`,
    )
    return await response.json()
  } catch (error) {
    // Don't build the site if all posts are missing
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`[gatsby-source-dev]: ${error}`)
    } else {
      console.error(`[gatsby-source-dev]: ${error}`)
    }
  }
}

/**
 * Articles
 */

const fetchArticles = async (articleList: any): Promise<any> =>
  await Promise.all(
    articleList.map(async (article: any) => {
      try {
        // See: https://docs.dev.to/api/#operation/getArticleById
        const response = await fetch(`https://dev.to/api/articles/${article.id}`)
        return await response.json()
      } catch (error) {
        // Don't build the site if individual posts are missing
        if (process.env.NODE_ENV === 'production') {
          throw new Error(`[gatsby-source-dev]: ${error}`)
        } else {
          console.error(`[gatsby-source-dev]: ${error}`)
        }
      }
    }),
  )

/**
 * YouTube links
 */

const findYouTubeEmbeds = (markdown: string): RegExpMatchArray | [] =>
  markdown.match(/\{% youtube .+ %\}/gi) || []

// TODO: replace "22" with "until we reach a space" (to future proof)
const getVideoId = (embed: string): string => embed.substring(11, 22)

const getIframe = (videoId: string): string =>
  String(
    `<div class="my-8 ratio-parent-16x9 purple-gradient">
      <iframe src="https://www.youtube.com/embed/${videoId}" class="shadow-lg rounded ratio-child" width="560" height="315" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
      </iframe>
    </div>`,
  )

const replaceYouTubeEmbedWithIframe = (markdown: string, embed: string): string =>
  markdown.replace(embed, getIframe(getVideoId(embed)))

const replaceYouTubeEmbeds = (article: any): any => {
  const youTubeEmbeds = findYouTubeEmbeds(article.body_markdown)

  let updatedMarkdown = article.body_markdown

  youTubeEmbeds.forEach(embed => {
    updatedMarkdown = replaceYouTubeEmbedWithIframe(updatedMarkdown, embed)
  })

  return {
    ...article,
    body_markdown: updatedMarkdown,
  }
}

/**
 * Twitter links
 */

// Could be more than one per article!
const findTwitterEmbeds = (html: string): RegExpMatchArray | [] =>
  html.match(/\{% twitter .+ %\}/gi) || []

// TODO: replace "22" with "until we reach a space" (to future proof)
const getTweetId = (embed: string): string => embed.substring(11, 22)

// TODO: fetch tweet IDs one at a time (not all at once)
const fetchTweet = (articles: any): any => {}

const replaceTwitterEmbeds = (article: any): any => {
  const twitterEmbeds = findTwitterEmbeds(article.body_markdown)

  let updatedMarkdown = article.body_markdown

  twitterEmbeds.forEach(embed => {
    // TODO: update with real logic to build twitter URL
    updatedMarkdown = updatedMarkdown.replace(embed, '')
    // updatedMarkdown = replaceTwitterEmbedWithLink(updatedMarkdown, embed)
  })

  return {
    ...article,
    body_markdown: updatedMarkdown,
  }
}

/**
 * DEV.to embeds
 */

const replaceEmbedsWithLinks = (articles: any): any =>
  articles
    .filter(Boolean)
    .map((article: any) => replaceTwitterEmbeds(replaceYouTubeEmbeds(article)))

/**
 * GraphQL nodes
 */

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

  const articles = replaceEmbedsWithLinks(
    await fetchArticles(await fetchArticleList()),
  )

  createArticleNodes(articles, createNode, createNodeId, createContentDigest)
}
