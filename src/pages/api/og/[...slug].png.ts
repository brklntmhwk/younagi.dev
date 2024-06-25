import type { APIRoute, APIContext, GetStaticPaths } from 'astro'
import { getCollection, getEntry } from 'astro:content'
import getOgImage from '@/components/OgImage'
import { getSortedContentEntries } from '@/lib/collections/contents'
import { type Languages, defaultLang } from '@/utils/i18n/data'
import { useTranslatedPath } from '@/utils/i18n/use-translated-path'

const blogEntries = await getSortedContentEntries('blog')
const newsEntries = await getSortedContentEntries('news')
const pages = await getCollection('page')
const articles = [...blogEntries, ...newsEntries, ...pages]

export const GET: APIRoute = async ({ params }: APIContext) => {
  const { slug } = params
  let locale: Languages = defaultLang
  const article = articles.find((article) => {
    locale = article.slug.slice(0, article.slug.indexOf('/')) as Languages
    const collection = article.collection
    const rawSlug = article.slug.slice(article.slug.indexOf('/') + 1)
    const translatePath = useTranslatedPath(locale)

    return translatePath(`/${collection}/${rawSlug}`) === slug
  })

  if (!article) {
    return new Response('Article Not Found', { status: 404 })
  }
  const t = await getEntry('i18n', `${locale}/translation`)
  const ogImg = await getOgImage(article.data.title, t.data.og_image)

  return new Response(ogImg)
}

export const getStaticPaths = (async () => {
  const ogArticlePaths = [
    ...articles.map((article) => {
      const locale = article.slug.slice(
        0,
        article.slug.indexOf('/')
      ) as Languages
      const collection = article.collection
      const rawSlug = article.slug.slice(article.slug.indexOf('/') + 1)
      const translatePath = useTranslatedPath(locale)

      return { params: { slug: translatePath(`/${collection}/${rawSlug}`) } }
    }),
  ]

  return ogArticlePaths
}) satisfies GetStaticPaths
