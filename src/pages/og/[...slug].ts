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
      border: { color: [232, 232, 232], width: 5, side: 'block-end' },
      padding: 80,
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
          size: 36,
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
        '/fonts/PixelMplus10-Regular.woff2',
        '/fonts/DotGothic16-Regular.woff2',
      ],
    }
  },
})
