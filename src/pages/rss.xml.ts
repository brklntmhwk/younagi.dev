import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getCollection } from 'astro:content'
import { getEntry } from 'astro:content'

export async function GET(context: APIContext) {
  const entries = await getCollection('blog')
  const meta = await getEntry('meta', 'en/site-data')

  return await rss({
    title: meta.data.site.title,
    description: meta.data.site.description,
    site: context.site ?? '',
    items: entries.map((entry) => ({
      ...entry.data,
      pubDate: entry.data.publishedAt,
      link: `/${entry.collection}/${entry.slug}/`,
    })),
    customData: '<language>en</language>',
  })
}
