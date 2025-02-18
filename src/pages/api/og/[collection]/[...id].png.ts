import { getEntry } from 'astro:content';
import { getOgImage } from '@/components/models/OgImage';
import { getContentEntries } from '@/lib/collections/contents';
import { getIdWithoutLocale } from '@/utils/get-id-without-locale';
import { defaultLocale } from '@/utils/i18n/data';
import type {
  APIContext,
  APIRoute,
  GetStaticPaths,
  InferGetStaticParamsType,
  InferGetStaticPropsType,
} from 'astro';

type Params = InferGetStaticParamsType<typeof getStaticPaths>;
type Props = InferGetStaticPropsType<typeof getStaticPaths>;

const blogEntries = await getContentEntries('blog', defaultLocale);
const newsEntries = await getContentEntries('news', defaultLocale);
const articles = [...blogEntries, ...newsEntries];

export const GET: APIRoute = async ({ props, params }: APIContext) => {
  const { rawId } = props as Props;
  const { collection, id } = params as Params;

  const article = await getEntry(collection, rawId);
  if (!article) {
    return new Response(`Article not found: ${id}`, {
      status: 404,
    });
  }
  const t = await getEntry('i18n', `${defaultLocale}/translation`);
  const ogImg = await getOgImage(article.data.title, t!.data.og_image);

  return new Response(ogImg, {
    headers: {
      'content-type': 'image/png',
    },
  });
};

// e.g., /api/og/blog/astro-website.png, /ja/api/og/blog/astro-website.png
export const getStaticPaths = (async () => {
  const ogArticlePaths = [
    ...articles.map((article) => {
      const collection = article.collection;
      const id = getIdWithoutLocale(article.id);

      return {
        params: { collection, id },
        props: { rawId: article.id },
      };
    }),
  ];

  return ogArticlePaths;
}) satisfies GetStaticPaths;
