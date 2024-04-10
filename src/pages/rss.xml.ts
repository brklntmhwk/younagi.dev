import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getCollection } from 'astro:content'
import { getEntry } from 'astro:content'

const meta = await getEntry('meta', 'en/site-data')

export async function GET(context: APIContext) {
  const posts = await getCollection('blog')

  return await rss({
    title: meta!.data.site.title,
    description: meta!.data.site.description,
    site: context.site ?? '',
    items: posts.map((post) => ({
      ...post.data,
      pubDate: post.data.publishedAt,
      link: `/blog/${post.slug}/`,
    })),
  })
}
