import type { APIRoute, APIContext, GetStaticPaths } from 'astro'
import { getCollection } from 'astro:content'
import getOgImage from '@/components/OgImage'

const entries = await getCollection('blog')
const pages = await getCollection('page')
const articles = [...entries, ...pages]

export const GET: APIRoute = async ({ params }: APIContext) => {
  const { slug } = params
  const article = articles.find((article) => {
    const locale = article.slug.slice(0, article.slug.indexOf('/'))
    const collection = article.collection
    const rawSlug = article.slug.slice(article.slug.indexOf('/') + 1)

    return `${locale}/${collection}/${rawSlug}` === slug
  })

  if (!article) {
    return new Response('Article Not Found', { status: 404 })
  }
  const ogImg = await getOgImage(article.data.title)

  return new Response(ogImg)
}

export const getStaticPaths = (async () => {
  const ogArticlePaths = [
    ...articles.map((article) => {
      const locale = article.slug.slice(0, article.slug.indexOf('/'))
      const collection = article.collection
      const rawSlug = article.slug.slice(article.slug.indexOf('/') + 1)

      return { params: { slug: `${locale}/${collection}/${rawSlug}` } }
    }),
  ]

  return ogArticlePaths
}) satisfies GetStaticPaths
