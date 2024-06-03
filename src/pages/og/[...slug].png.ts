import type { APIRoute, APIContext, GetStaticPaths } from 'astro'
import { getCollection } from 'astro:content'
import getOgImage from '@/components/OgImage'
import { getPublishedSortedEntries } from '@/lib/content'
import { languages } from '@/utils/i18n/data'
import { useTranslatedPath } from '@/utils/i18n/useTranslatedPath'

const blogEntries = getPublishedSortedEntries(await getCollection('blog'))
const newsEntries = getPublishedSortedEntries(await getCollection('news'))
const pages = await getCollection('page')
const articles = [...blogEntries, ...newsEntries, ...pages]

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
      const locale = article.slug.slice(
        0,
        article.slug.indexOf('/')
      ) as keyof typeof languages
      const collection = article.collection
      const rawSlug = article.slug.slice(article.slug.indexOf('/') + 1)
      const translatePath = useTranslatedPath(locale)

      return { params: { slug: translatePath(`/${collection}/${rawSlug}`) } }
    }),
  ]

  return ogArticlePaths
}) satisfies GetStaticPaths
