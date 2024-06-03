import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getCollection } from 'astro:content'
import { getEntry } from 'astro:content'
import { defaultLang } from '@/utils/i18n/data'

export async function GET(context: APIContext) {
  const entries = await getCollection('blog')
  const defaultLocaleEntries = entries.filter(
    (entry) => entry.slug.slice(0, entry.slug.indexOf('/')) === defaultLang
  )
  const meta = await getEntry('meta', `${defaultLang}/site-data`)

  const { body } = await rss({
    title: meta.data.site.title,
    description: meta.data.site.description,
    site: context.site ?? '',
    items: defaultLocaleEntries.map((entry) => ({
      ...entry.data,
      pubDate: entry.data.publishedAt,
      link: `/${entry.collection}/${entry.slug}`,
    })),
    customData: `<language>${defaultLang}</language>`,
  })

  return new Response(body, {
    status: 200,
    statusText: 'RSS Feed successfully generated',
  })
}
