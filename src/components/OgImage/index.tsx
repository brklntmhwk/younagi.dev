import { readFileSync } from 'node:fs'
import satori from 'satori'
import sharp from 'sharp'
import type { I18nData } from '@/lib/collections/types'

const fontPixelMPlus10Regular = readFileSync(
  './src/assets/fonts/PixelMplus10-Regular.woff'
)
const fontPixelMPlus10Bold = readFileSync(
  './src/assets/fonts/PixelMplus10-Bold.woff'
)
const backgroundImage = readFileSync('./src/assets/images/og-bg.jpg').toString(
  'base64'
)
const logoBuffer = readFileSync('./src/assets/images/logo.png')
const logo = btoa(
  new Uint8Array(logoBuffer).reduce(
    (data, byte) => data + String.fromCharCode(byte),
    ''
  )
)

const getOgImage = async (text: string, t: I18nData<'og_image'>) => {
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          fontFamily: 'PixelMPlus10, sans-serif',
          backgroundImage: `url(data:image/jpeg;base64,${backgroundImage})`,
          backgroundSize: '1200px 630px',
          width: 1200,
          height: 630,
          display: 'flex',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                padding: '2.25rem',
              },
              children: [
                {
                  type: 'h2',
                  props: {
                    style: {
                      color: '#f7f7f7',
                      fontSize: '2.875rem',
                      fontWeight: '700',
                      lineHeight: '1.25',
                    },
                    children: `${text}`,
                  },
                  key: 'Page title',
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.5rem',
                    },
                    children: [
                      {
                        type: 'img',
                        props: {
                          src: `data:image/png;base64,${logo}`,
                          alt: t.logo_alt,
                          width: '60',
                          height: '60',
                          style: {
                            borderRadius: '9999px',
                          },
                        },
                        key: 'Site logo image',
                      },
                      {
                        type: 'span',
                        props: {
                          style: {
                            fontSize: '2.25rem',
                            color: '#1c1b22',
                          },
                          children: t.site_name,
                        },
                        key: 'Site name',
                      },
                    ],
                  },
                  key: 'Image container',
                },
              ],
            },
            key: 'OG image second wrapper',
          },
        ],
      },
      key: 'OG image outermost wrapper',
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'PixelMPlus10',
          data: fontPixelMPlus10Regular,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'PixelMPlus10',
          data: fontPixelMPlus10Bold,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  )

  const imgBuffer = await sharp(Buffer.from(svg))
    .toFormat('png', {
      quality: 75,
    })
    .toBuffer()

  return imgBuffer
}

export default getOgImage
