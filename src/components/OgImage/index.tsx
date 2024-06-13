/** @jsxImportSource react */
/** @jsxRuntime automatic */
/** @jsx jsx **/

import { readFileSync } from 'node:fs'
import satori from 'satori'
import sharp from 'sharp'

const OgImage = async (text: string) => {
  const fontPixelMPlus10Regular = readFileSync(
    './src/assets/fonts/PixelMplus10-Regular.woff'
  )
  const fontPixelMPlus10Bold = readFileSync(
    './src/assets/fonts/PixelMplus10-Bold.woff'
  )
  const backgroundImage = readFileSync(
    './src/assets/images/og-bg.jpg'
  ).toString('base64')
  const logoBuffer = readFileSync('./src/assets/images/logo.png')
  const logo = btoa(
    new Uint8Array(logoBuffer).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ''
    )
  )

  const svg = await satori(
    <div
      style={{
        fontFamily: 'PixelMPlus10, sans-serif',
        backgroundImage: `url(data:image/jpeg;base64,${backgroundImage}`,
        backgroundSize: '1200px 630px',
        width: 1200,
        height: 630,
        display: 'flex',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          padding: '2.25rem',
        }}
      >
        <h2
          style={{
            color: '#f7f7f7',
            fontSize: '2.875rem',
            fontWeight: '700',
          }}
        >
          {text}
        </h2>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
          }}
        >
          <img
            src={`data:image/png;base64,${logo}`}
            alt="younagi.dev site logo"
            style={{ borderRadius: '9999px' }}
            width="60"
            height="60"
          />
          <span style={{ fontSize: '2.25rem', color: '#1c1b22' }}>
            younagi.dev
          </span>
        </div>
      </div>
    </div>,
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

export default OgImage

// {
//       type: 'div',
//       props: {
//         style: {
//           fontFamily: 'PixelMPlus10, sans-serif',
//           backgroundImage: `url(data:image/jpeg;base64,${backgroundImage})`,
//           backgroundSize: '1200px 630px',
//           width: 1200,
//           height: 630,
//           display: 'flex',
//         },
//       },
//       children: [
//         {
//           type: 'div',
//           props: {
//             style: {
//               display: 'flex',
//               flexDirection: 'column',
//               gap: '1.5rem',
//               padding: '2.25rem',
//             },
//           },
//           children: [
//             {
//               type: 'h2',
//               props: {
//                 style: {
//                   color: '#f7f7f7',
//                   fontSize: '2.875rem',
//                   fontWeight: '700',
//                 },
//               },
//               children: `${text}`,
//               key: 'Page title',
//             },
//             {
//               type: 'div',
//               props: {
//                 style: {
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '1.5rem',
//                 },
//               },
//               children: [
//                 {
//                   type: 'img',
//                   props: {
//                     src: `data:image/png;base64,${logo}`,
//                     alt: 'younagi.dev site logo',
//                     width: '60',
//                     height: '60',
//                     style: {
//                       borderRadius: '9999px',
//                     },
//                   },
//                   children: [],
//                   key: 'Site logo image',
//                 },
//                 {
//                   type: 'span',
//                   props: {
//                     style: {
//                       fontSize: '2.25rem',
//                       color: '#1c1b22',
//                     },
//                   },
//                   children: 'younagi.dev',
//                   key: 'Site name',
//                 },
//               ],
//               key: 'Image container',
//             },
//           ],
//           key: 'OG image wrapper 2',
//         },
//       ],
//       key: 'OG image wrapper',
//     },
