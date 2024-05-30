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
        backgroundImage: `url(data:image/png;base64,${backgroundImage}`,
        backgroundSize: '1200px 630px',
        width: 1200,
        height: 630,
        color: '#1c1b22',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        justifyContent: 'space-between',
        padding: '1.85rem',
      }}
    >
      <h2
        style={{
          fontSize: '1.5rem',
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
          width="90"
          height="90"
        />
        <span style={{ fontSize: '1.25rem' }}>younagi.dev</span>
      </div>
    </div>,
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
      ],
    }
  )

  const imgBuffer = await sharp(Buffer.from(svg))
    .toFormat('png', {
      quality: 75,
    })
    .toBuffer()

  return imgBuffer

  // const svg = await satori(
  //   {
  //     type: 'div',
  //     props: {
  //       style: {
  //         fontFamily: 'PixelMPlus10, sans-serif',
  //         backgroundImage: `url(data:image/png;base64,${backgroundImage})`,
  //         backgroundSize: "1200px 630px",
  //         color: '#1c1b22',
  //         display: 'flex',
  //         flexDirection: 'column',
  //         gap: '1.5rem',
  //         padding: '1.85rem',
  //         justifyContent: 'space-between',
  //       },
  //     },
  //     children: [
  //       {
  //         type: 'h2',
  //         props: {
  //           style: {
  //             fontSize: '1.5rem',
  //             fontWeight: 700,
  //           },
  //         },
  //         children: text,
  //         key: 'Page title',
  //       },
  //       {
  //         type: 'div',
  //         props: {
  //           style: {
  //             display: 'flex',
  //             alignItems: 'center',
  //             gap: '1.5rem',
  //           },
  //         },
  //         children: [
  //           {
  //             type: 'img',
  //             props: {
  //               src: `data:image/png;base64,${logo}`,
  //               alt: 'younagi.dev site logo',
  //               width: '80',
  //               height: '80',
  //               style: {
  //                 borderRadius: '9999px',
  //               },
  //             },
  //             children: [],
  //             key: 'Site logo image',
  //           },
  //           {
  //             type: 'span',
  //             props: {
  //               style: {
  //                 fontSize: '1.25rem',
  //               },
  //             },
  //             children: 'younagi.dev',
  //             key: 'Site name',
  //           },
  //         ],
  //         key: '',
  //       },
  //     ],
  //     key: '',
  //   },
  //   {
  //     debug: true,
  //     width: 1200,
  //     height: 630,
  //     fonts: [
  //       {
  //         name: 'PixelMPlus10',
  //         data: fontPixelMPlus10,
  //         weight: 400,
  //         style: 'normal',
  //       },
  //     ],
  //   }
  // )
}

export default OgImage
