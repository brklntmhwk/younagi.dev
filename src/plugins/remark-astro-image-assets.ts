import fs from 'node:fs'
import path from 'node:path'
import type { RemarkPlugin } from '@astrojs/markdown-remark'
import type { Image, Parent, Root } from 'mdast'
import sharp from 'sharp'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

type RemarkAstroImageAssetsOptions = {
  imgDir: string
  size: number
  blurFormat: keyof sharp.FormatEnum
  widths: number[]
  sizes: string
}

const defaultRemarkAstroImageAssetsOptions: Readonly<RemarkAstroImageAssetsOptions> =
  {
    imgDir: './assets/images',
    size: 8,
    blurFormat: 'webp',
    widths: [240, 540, 720],
    sizes:
      '(max-width: 360px) 240px, (max-width: 720px) 540px, (max-width: 1600px) 720px',
  }

const remarkAstroImageAssets: Plugin<[RemarkAstroImageAssetsOptions?], Root> = (
  options = defaultRemarkAstroImageAssetsOptions,
): ReturnType<RemarkPlugin> => {
  return async (tree) => {
    const imgAndParentPairs: { node: Image; parent: Parent }[] = []

    visit(tree, 'image', (node, index, parent) => {
      if (
        parent?.type !== 'paragraph' ||
        index !== 0 ||
        node.url.startsWith('http')
      )
        return

      imgAndParentPairs.push({ node, parent })
    })

    const { imgDir, size, blurFormat, sizes, widths } = options

    await Promise.all(
      imgAndParentPairs.map(async ({ node, parent }) => {
        const basename = path.basename(node.url)
        const buffer = fs.readFileSync(
          path.join(process.cwd(), './src', imgDir, basename),
        )

        const metadataPromise = sharp(buffer)
          .metadata()
          .then((data) => {
            if (!data.width || !data.height) {
              throw new Error(`Failed to get image metadata: ${node.url}`)
            }

            return {
              width: data.width,
              height: data.height,
              aspectRatio: `${data.width} / ${data.height}`,
            }
          })

        const base64Promise = sharp(buffer)
          .resize(size, size, { fit: 'inside' })
          .toFormat(blurFormat, { quality: 60 })
          .modulate({
            brightness: 1,
            saturation: 1.2,
          })
          .normalize()
          .toBuffer()
          .then(
            (data) =>
              `data:image/${blurFormat};base64,${data.toString('base64')}`,
          )

        const [{ width, aspectRatio }, base64] = await Promise.all([
          metadataPromise,
          base64Promise,
        ])

        node.data = {
          ...node.data,
          hProperties: {
            ...(node.data?.hProperties ?? {}),
            widths: [...widths, width],
            sizes: `${sizes}, ${width}px`,
            format: 'avif',
          },
        }

        parent.data = {
          ...parent.data,
          hProperties: {
            ...(parent.data?.hProperties ?? {}),
            dataImageFigure: true,
            dataImageAlt: node.alt,
            dataImageAspectRatio: aspectRatio,
            dataImageBlurUrl: `url("${base64}")`,
          },
        }
      }),
    )
  }
}

export default remarkAstroImageAssets
