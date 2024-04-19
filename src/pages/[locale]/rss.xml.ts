import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getCollection } from 'astro:content'
import { getEntry } from 'astro:content'
import { langList } from '@/i18n/data'

export function getStaticPaths() {
  return langList.map((lang) => ({ params: { locale: lang } }))
}

export async function GET(context: APIContext) {
  const localeParam = context.params.locale
  const locale = langList.find((lang) => lang === localeParam)
  if (!locale) {
    return new Response(null, {
      status: 400,
      statusText: 'Bad Request',
    })
  }
  const entries = await getCollection('blog')
  const localeEntries = entries.filter(
    (entry) => entry.slug.slice(entry.slug.indexOf('/') + 1)[0] === locale
  )
  const meta = await getEntry('meta', `${locale}/site-data`)

  const { body } = await rss({
    title: meta.data.site.title,
    description: meta.data.site.description,
    site: context.site ?? '',
    items: localeEntries.map((entry) => ({
      ...entry.data,
      pubDate: entry.data.publishedAt,
      link: `/${entry.collection}/${entry.slug}/`,
    })),
    customData: `<language>${locale}</language>`,
  })

  return new Response(body, {
    status: 200,
    statusText: 'RSS Feed successfully generated',
  })
}
