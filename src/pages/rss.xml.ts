import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getCollection } from 'astro:content'
import { getEntry } from 'astro:content'
import { langList } from '@/i18n/ui'

export async function GET(context: APIContext) {
  const entries = await getCollection('blog')

  langList.map(async (lang) => {
    const meta = await getEntry('meta', `${lang}/site-data`)
    const localeEntries = entries.filter(
      (entry) => entry.slug.split('/')[0] === lang
    )

    return await rss({
      title: meta.data.site.title,
      description: meta.data.site.description,
      site: context.site ?? '',
      items: localeEntries.map((entry) => ({
        ...entry.data,
        pubDate: entry.data.publishedAt,
        link: `/${lang}/blog/${entry.slug}/`,
      })),
    })
  })
}
