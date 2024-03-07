import type { APIRoute, APIContext } from 'astro'
import { getCollection } from 'astro:content'
// import { readFileSync } from 'fs'
// import satori from 'satori'
// import { html } from 'satori-html'

const entries = await getCollection('blog')
const pages = await getCollection('page')
const articles = [...entries, ...pages]

export const GET: APIRoute = async ({ params }: APIContext) => {
  const res = new Response('OG Image Not found', { status: 404 })
  const { type, slug } = params
  if (type === 'article') {
    const article = articles.find((a) => `${a.collection}/${a.slug}` === slug)
    if (article) {
      // const isArticle = article.collection === "blog"
      // const img =
    }
  }

  return res
}

export const getStaticPaths = async () => {
  const ogs = articles.map((a) => ({
    params: { type: 'article', slug: `${a.collection}/${a.slug}` },
  }))

  return ogs
}
