import { getCollection } from 'astro:content';
import { getEntry } from 'astro:content';
import { getLocaleFromId } from '@/utils/get-locale-from-id';
import { defaultLocale } from '@/utils/i18n/data';
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const entries = await getCollection('blog');
  const defaultLocaleEntries = entries.filter(
    (entry) => getLocaleFromId(entry.id) === defaultLocale,
  );
  const meta = await getEntry('meta', `${defaultLocale}/site-data`);

  const { body } = await rss({
    title: meta!.data.site.title!,
    description: meta!.data.site.description!,
    site: context.site ?? '',
    items: defaultLocaleEntries.map((entry) => ({
      ...entry.data,
      pubDate: entry.data.publishedAt,
      link: `/${entry.collection}/${entry.id}`,
    })),
    customData: `<language>${defaultLocale}</language>`,
  });

  return new Response(body, {
    status: 200,
    statusText: 'RSS Feed successfully generated',
  });
}
