import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getCollection } from 'astro:content'
import { getEntry } from 'astro:content'
import { langList } from '@/i18n/data'

export const getStaticPaths = async () => {
  return langList.map((lang) => ({ params: { locale: lang } }))
}

export async function GET(context: APIContext) {
  const localeParam = context.params.locale
  const locale = langList.find((lang) => lang === localeParam)
  const entries = await getCollection('blog')
  const meta = await getEntry('meta', `${locale ?? 'en'}/site-data`)

  return await rss({
    title: meta.data.site.title,
    description: meta.data.site.description,
    site: context.site ?? '',
    items: entries.map((entry) => ({
      ...entry.data,
      pubDate: entry.data.publishedAt,
      link: `/${entry.collection}/${entry.slug}/`,
    })),
    customData: `<language>${locale}</language>`,
  })
}
