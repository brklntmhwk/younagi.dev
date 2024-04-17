// import type { APIRoute, APIContext } from 'astro'
import { getCollection } from 'astro:content'
import { OGImageRoute } from 'astro-og-canvas'
// import ogImage from '@/components/OgImage'

const entries = await getCollection('blog')
const pages = await getCollection('page')
const articles = Object.fromEntries(
  [...entries, ...pages].map(({ slug, data }) => [slug, data])
)

export const { getStaticPaths, GET } = OGImageRoute({
  param: 'slug',
  pages: articles,
  getImageOptions: (_path, page: (typeof articles)[number]) => {
    return {
      title: page.title,
      description: page.description ?? '',
      bgGradient: [[47, 28, 66]],
      border: { color: [227, 182, 237], width: 10, side: 'block-end' },
      font: {
        title: {
          size: 72,
          lineHeight: 1.5,
          families: [
            'Obviously',
            'Inter',
            'Noto Sans',
            'Noto Sans Arabic',
            'Noto Sans SC',
            'Noto Sans TC',
            'Noto Sans JP',
            'Noto Sans KR',
          ],
          weight: 'Medium',
          color: [255, 255, 255],
        },
        description: {
          size: 42,
          lineHeight: 1.2,
          families: ['Inter', 'Noto Sans', 'Noto Sans SC', 'Noto Sans JP'],
          weight: 'Normal',
          color: [255, 255, 255],
        },
      },
      fonts: [
        './src/assets/fonts/PixelMplus10-Regular.woff2',
        './src/assets/fonts/DotGothic16-Regular.woff2',
      ],
    }
  },
})

// const entries = await getCollection('blog')
// const pages = await getCollection('page')
// const articles = [...entries, ...pages]

// export const GET: APIRoute = async ({ params }: APIContext) => {
//   let res = new Response('OG Image Not Found', { status: 404 })
//   const { type, slug } = params
//   if (type === 'article') {
//     const article = articles.find((a) => `${a.collection}/${a.slug}` === slug)
//     if (article) {
//       const isBlogEntry = article.collection === 'blog'
//       const img = await ogImage(
//         article.data.title,
//         isBlogEntry
//           ? article.data.modifiedAt ?? article.data.publishedAt
//           : undefined
//       )
//       res = new Response(img)
//     }
//   }

//   return res
// }

// export const getStaticPaths = async () => {
//   const ogs = [
//     ...articles.map((a) => ({
//       params: { type: 'article', slug: `${a.collection}/${a.slug}` },
//     })),
//   ]

//   return ogs
// }
