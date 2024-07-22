import { getCollection } from 'astro:content';
import { getEntry } from 'astro:content';
import { getLocaleFromSlug } from '@/utils/get-locale-from-slug';
import { defaultLang } from '@/utils/i18n/data';
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const entries = await getCollection('blog');
  const defaultLocaleEntries = entries.filter(
    (entry) => getLocaleFromSlug(entry.slug) === defaultLang,
  );
  const meta = await getEntry('meta', `${defaultLang}/site-data`);

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
  });

  return new Response(body, {
    status: 200,
    statusText: 'RSS Feed successfully generated',
  });
}
