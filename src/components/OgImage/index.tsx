import { readFileSync } from 'node:fs'
import satori from 'satori'
import sharp from 'sharp'

const OgImage = async (text: string) => {
  const fontPixelMPlus10 = readFileSync(
    './src/assets/fonts/PixelMplus10-Regular.woff'
  )
  // const fontInconsolata = readFileSync(
  //   './node_modules/@fontsource-variable/inconsolata/files/inconsolata-latin-ext-wdth-normal.woff2'
  // )
  const logoBuffer = readFileSync('./src/assets/images/logo.png')
  const logo = btoa(
    new Uint8Array(logoBuffer).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ''
    )
  )

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          fontFamily: 'PixelMPlus10, sans-serif',
          backgroundColor: '#f7f7f7',
          color: '#1c1b22',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          padding: '1.85rem',
          justifyContent: 'space-between',
        },
      },
      children: [
        {
          type: 'h2',
          props: {
            style: {
              fontSize: '1.5rem',
              fontWeight: 700,
            },
          },
          children: text,
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
          },
          children: [
            {
              type: 'img',
              props: {
                src: `data:image/png;base64,${logo}`,
                alt: 'younagi.dev site logo',
                width: '80',
                height: '80',
                style: {
                  borderRadius: '9999px',
                },
              },
              children: [],
              key: 'Site logo image',
            },
            {
              type: 'span',
              props: {
                style: {
                  fontSize: '1.25rem',
                },
              },
              children: 'younagi.dev',
              key: 'Site name',
            },
          ],
          key: '',
        },
      ],
      key: '',
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'PixelMPlus10',
          data: fontPixelMPlus10,
          weight: 400,
          style: 'normal',
        },
        // {
        //   name: 'Inconsolata',
        //   data: fontInconsolata,
        //   weight: 600,
        //   style: 'normal',
        // },
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

export default OgImage
