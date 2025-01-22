import { getEntry } from 'astro:content';
import { getOgImage } from '@/components/models/OgImage';
import { getContentEntries } from '@/lib/collections/contents';
import { getIdWithoutLocale } from '@/utils/get-id-without-locale';
import { getLocaleFromId } from '@/utils/get-locale-from-id';
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
  const { rawId } = props as Props;
  const { collection, locale, id } = params as Params;

  const article = await getEntry(collection, rawId);
  if (!article) {
    return new Response(`Article not found: ${id}`, {
      status: 404,
    });
  }
  const t = await getEntry('i18n', `${locale}/translation`);
  const ogImg = await getOgImage(article.data.title, t!.data.og_image);

  return new Response(ogImg, {
    headers: {
      'content-type': 'image/png',
    },
  });
};

// e.g., /api/og/blog/astro-website.png, /ja/api/og/blog/astro-website.png
export const getStaticPaths = (async () => {
  const localeArticles = articles.filter((article) =>
    langList.some((lang) => lang === getLocaleFromId(article.id)),
  );
  const ogArticlePaths = [
    ...localeArticles.map((article) => {
      const locale = getLocaleFromId(article.id) as Language;
      const collection = article.collection;
      const idWithoutLocale = getIdWithoutLocale(article.id);

      return {
        params: { locale, collection, id: idWithoutLocale },
        props: { rawId: article.id },
      };
    }),
  ];

  return ogArticlePaths;
}) satisfies GetStaticPaths;
