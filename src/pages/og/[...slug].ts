import { getCollection } from 'astro:content'
import { OGImageRoute } from 'astro-og-canvas'

const entries = await getCollection('blog')
const articles = Object.fromEntries(
  entries.map(({ slug, data, collection }) => {
    const locale = slug.slice(0, slug.indexOf('/'))
    const rawSlug = slug.slice(slug.indexOf('/') + 1)

    return [`${locale}/${collection}/${rawSlug}`, data]
  })
)

export const { getStaticPaths, GET } = OGImageRoute({
  param: 'slug',
  pages: articles,
  getImageOptions: (_path, page: (typeof articles)[number]) => {
    return {
      title: page.title,
      description: page.description ?? '',
      bgGradient: [[26.99, 26.99, 30.99]],
      padding: 80,
      font: {
        title: {
          size: 64,
          lineHeight: 1.35,
          families: [
            'PixelMPlus10',
            'Arial',
            'Hiragino Kaku Gothic ProN',
            'Hiragino Sans',
          ],
          weight: 'Medium',
          color: [255, 255, 255],
        },
        description: {
          size: 36,
          lineHeight: 1.2,
          families: ['Arial', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans'],
          weight: 'Normal',
          color: [255, 255, 255],
        },
      },
      logo: {
        path: './src/assets/images/logo.png',
        size: [80, 80],
      },
      fonts: ['./src/assets/fonts/PixelMplus10-Regular.woff2'],
    }
  },
})
