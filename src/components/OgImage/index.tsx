/** @jsxImportSource react */
/** @jsxRuntime automatic */

import { readFileSync } from 'fs'
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
  const icon = btoa(
    new Uint8Array(logoBuffer).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ''
    )
  )

  const svg = await satori(
    <div
      style={{
        fontFamily: 'PixelMPlus10, sans-serif',
        backgroundColor: '#120e12',
        color: '#f2f0e6',
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        width: '100%',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          color: '#120e12',
          display: 'flex',
          flexDirection: 'column',
          width: '30%',
          padding: '2.5rem',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <h2
            style={{
              fontSize: '17rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            sssss
          </h2>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '70%',
          maxHeight: '100%',
          padding: '3rem',
        }}
      >
        <h1
          style={{
            marginTop: 0,
            fontSize: '4rem',
            width: '100%',
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: '1.2',
          }}
        >
          {text}
        </h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              src={`data:image/jpeg;base64,${icon}`}
              alt="younagi.dev icon"
              width={80}
              height={80}
              style={{
                borderRadius: '9999px',
                marginRight: '1.25rem',
              }}
            />
            <h2
              style={{
                marginRight: '1.25rem',
                fontFamily: 'PixelMPlus10',
                fontSize: '2.5rem',
              }}
            >
              {'Nagi (凪)'}
            </h2>
          </div>
        </div>
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
