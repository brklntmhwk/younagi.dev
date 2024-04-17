import type { APIRoute, APIContext } from 'astro'
import { getCollection } from 'astro:content'
import ogImage from '@/components/OgImage'

const entries = await getCollection('blog')
const pages = await getCollection('page')
const articles = [...entries, ...pages]

export const GET: APIRoute = async ({ params }: APIContext) => {
  let res = new Response('OG Image Not Found', { status: 404 })
  const { type, slug } = params
  if (type === 'article') {
    const article = articles.find((a) => `${a.collection}/${a.slug}` === slug)
    if (article) {
      const isBlogEntry = article.collection === 'blog'
      const img = await ogImage(
        article.data.title,
        isBlogEntry
          ? article.data.modifiedAt ?? article.data.publishedAt
          : undefined
      )
      res = new Response(img)
    }
  }

  return res
}

export const getStaticPaths = async () => {
  const ogs = [
    ...articles.map((a) => ({
      params: { type: 'article', slug: `${a.collection}/${a.slug}` },
    })),
  ]

  return ogs
}
