import { getEntry } from 'astro:content'
import { getOgImage } from '@/components/OgImage'
import { getContentEntries } from '@/lib/collections/contents'
import { getSlugWithoutLocale } from '@/utils/get-slug-without-locale'
import { defaultLang } from '@/utils/i18n/data'
import type {
  APIContext,
  APIRoute,
  GetStaticPaths,
  InferGetStaticParamsType,
  InferGetStaticPropsType,
} from 'astro'

type Params = InferGetStaticParamsType<typeof getStaticPaths>
type Props = InferGetStaticPropsType<typeof getStaticPaths>

const blogEntries = await getContentEntries('blog', defaultLang)
const newsEntries = await getContentEntries('news', defaultLang)
const articles = [...blogEntries, ...newsEntries]

export const GET: APIRoute = async ({ props, params }: APIContext) => {
  const { rawSlug } = props as Props
  const { collection, slug } = params as Params

  const article = await getEntry(collection, rawSlug)
  if (!article) {
    return new Response(`Article not found: ${slug}`, {
      status: 404,
    })
  }
  const t = await getEntry('i18n', `${defaultLang}/translation`)
  const ogImg = await getOgImage(article.data.title, t.data.og_image)

  return new Response(ogImg, {
    headers: {
      'content-type': 'image/png',
    },
  })
}

// e.g., /api/og/blog/astro-website.png, /ja/api/og/blog/astro-website.png
export const getStaticPaths = (async () => {
  const ogArticlePaths = [
    ...articles.map((article) => {
      const collection = article.collection
      const slug = getSlugWithoutLocale(article.slug)

      return {
        params: { collection, slug },
        props: { rawSlug: article.slug },
      }
    }),
  ]

  return ogArticlePaths
}) satisfies GetStaticPaths
