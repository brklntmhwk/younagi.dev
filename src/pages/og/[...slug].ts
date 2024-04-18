import { getCollection } from 'astro:content'
import { OGImageRoute } from 'astro-og-canvas'

const entries = await getCollection('blog')
// const pages = await getCollection('page')
const articles = Object.fromEntries(
  entries.map(({ slug, data, collection }) => {
    const locale = slug.slice(0, slug.indexOf('/'))
    const rawSlug = slug.slice(slug.indexOf('/') + 1)

    return [`${locale}/${collection}/${rawSlug}`, data]
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

export const { getStaticPaths, GET } = OGImageRoute({
  param: 'slug',
  pages: articles,
  getImageOptions: (_path, page: (typeof articles)[number]) => {
    return {
      title: page.title,
      description: page.description ?? '',
      bgGradient: [[26.99, 26.99, 30.99]],
      border: { color: [138, 130, 153], width: 8, side: 'block-end' },
      padding: 70,
      font: {
        title: {
          size: 72,
          lineHeight: 1.5,
          families: [
            'PixelMPlus10',
            'Noto Sans',
            'Noto Sans Arabic',
            'Noto Sans SC',
            'Noto Sans JP',
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
            'Noto Sans Arabic',
            'Noto Sans SC',
            'Noto Sans JP',
          ],
          weight: 'Normal',
          color: [255, 255, 255],
        },
      },
      logo: {
        path: './src/assets/images/hitokage.png',
        size: [70, 70],
      },
      fonts: [
        './src/assets/fonts/PixelMplus10-Regular.woff2',
        './src/assets/fonts/DotGothic16-Regular.woff2',
      ],
    }
  },
})
