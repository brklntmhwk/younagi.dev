import { getCollection, getEntry } from 'astro:content';
import { getLocaleFromId } from '@/utils/get-locale-from-id';
import { nonDefaultLocaleList } from '@/utils/i18n/data';
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

export function getStaticPaths() {
  return nonDefaultLocaleList.map((lang) => ({ params: { locale: lang } }));
}

export async function GET(context: APIContext) {
  const localeParam = context.params.locale;
  const locale = nonDefaultLocaleList.find((lang) => lang === localeParam);
  if (!locale) {
    return new Response(null, {
      status: 400,
      statusText: 'Bad Request',
    });
  }
  const entries = await getCollection('blog');
  const localeEntries = entries.filter(
    (entry) => getLocaleFromId(entry.id) === locale,
  );
  const meta = await getEntry('meta', `${locale}/site-data`);

  const { body } = await rss({
    title: meta!.data.site.title!,
    description: meta!.data.site.description!,
    site: context.site ?? '',
    items: localeEntries.map((entry) => ({
      ...entry.data,
      pubDate: entry.data.publishedAt,
      link: `/${entry.collection}/${entry.id}`,
    })),
    customData: `<language>${locale}</language>`,
  });

  return new Response(body, {
    status: 200,
    statusText: 'RSS Feed successfully generated',
  });
}
