import { getEntry } from 'astro:content';
import { getOgImage } from '@/components/OgImage';
import { getContentEntries } from '@/lib/collections/contents';
import { getLocaleFromSlug } from '@/utils/get-locale-from-slug';
import { getSlugWithoutLocale } from '@/utils/get-slug-without-locale';
import { type Language, langList } from '@/utils/i18n/data';
import type {
  APIContext,
  APIRoute,
  GetStaticPaths,
  InferGetStaticParamsType,
  InferGetStaticPropsType,
} from 'astro';

type Params = InferGetStaticParamsType<typeof getStaticPaths>;
type Props = InferGetStaticPropsType<typeof getStaticPaths>;

const blogEntries = await getContentEntries('blog');
const newsEntries = await getContentEntries('news');
const articles = [...blogEntries, ...newsEntries];

export const GET: APIRoute = async ({ props, params }: APIContext) => {
  const { rawSlug } = props as Props;
  const { collection, locale, slug } = params as Params;

  const article = await getEntry(collection, rawSlug);
  if (!article) {
    return new Response(`Article not found: ${slug}`, {
      status: 404,
    });
  }
  const t = await getEntry('i18n', `${locale}/translation`);
  const ogImg = await getOgImage(article.data.title, t.data.og_image);

  return new Response(ogImg, {
    headers: {
      'content-type': 'image/png',
    },
  });
};

// e.g., /api/og/blog/astro-website.png, /ja/api/og/blog/astro-website.png
export const getStaticPaths = (async () => {
  const localeArticles = articles.filter((article) =>
    langList.some((lang) => lang === getLocaleFromSlug(article.slug)),
  );
  const ogArticlePaths = [
    ...localeArticles.map((article) => {
      const locale = getLocaleFromSlug(article.slug) as Language;
      const collection = article.collection;
      const slugWithoutLocale = getSlugWithoutLocale(article.slug);

      return {
        params: { locale, collection, slug: slugWithoutLocale },
        props: { rawSlug: article.slug },
      };
    }),
  ];

  return ogArticlePaths;
}) satisfies GetStaticPaths;
