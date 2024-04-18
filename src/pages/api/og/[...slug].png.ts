import { getCollection } from 'astro:content'
import { OGImageRoute } from 'astro-og-canvas'

const entries = await getCollection('blog')
// const pages = await getCollection('page')
const articles = Object.fromEntries(
  entries.map(({ slug, data /* , collection */ }) => {
    // const [locale, rawSlug] = slug.split('/')

    return [slug, data]
    // return [`${locale}/${collection}/${rawSlug}`, data]
  })
)
// const articles = Object.fromEntries(
//   [...entries, ...pages].map(({ slug, data, collection }) => {
//     const [locale, rawSlug] = slug.split('/')
//     switch (collection) {
//       case 'blog':
//         return [`/${locale}/${collection}/${rawSlug!.split('/').pop()}/`, data]
//       case 'page':
//         return [`/${locale}/${rawSlug!.split('/').pop()}/`, data]
//     }
//   })
// )
console.log(articles)

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
            'PixelMPlus10',
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
          families: [
            'DotGothic16',
            'Noto Sans',
            'Noto Sans SC',
            'Noto Sans JP',
          ],
          weight: 'Normal',
          color: [255, 255, 255],
        },
      },
      bgImage: {
        path: './src/assets/images/hitokage.png',
      },
      fonts: [
        './src/assets/fonts/PixelMplus10-Regular.woff2',
        './src/assets/fonts/DotGothic16-Regular.woff2',
      ],
    }
  },
})
