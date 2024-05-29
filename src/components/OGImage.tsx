import { readFileSync } from 'fs'
import satori from 'satori'
import sharp from 'sharp'

const OgImage = async (text: string) => {
  const fontPixelMPlus10 = readFileSync(
    './src/assets/fonts/PixelMplus10-Regular.woff2'
  )
  const fontInconsolata = readFileSync(
    './node_modules/@fontsource-variable/inconsolata/files/inconsolata-latin-ext-wdth-normal.woff2'
  )
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
        'font-family': 'PixelMPlus10, Inconsolata,sans-serif',
        'background-color': '#120e12',
        color: '#f2f0e6',
        display: 'flex',
        'flex-direction': 'row',
        height: '100%',
        width: '100%',
      }}
    >
      <div
        style={{
          'background-color': 'white',
          color: '#120e12',
          display: 'flex',
          'flex-direction': 'column',
          width: '30%',
          padding: '2.5rem',
          'justify-content': 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            'flex-direction': 'column',
            gap: '1rem',
          }}
        >
          <h2
            style={{
              'font-size': '17rem',
              display: 'flex',
              'align-items': 'center',
              'justify-content': 'center',
            }}
          >
            sssss
          </h2>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          'flex-direction': 'column',
          width: '70%',
          'max-height': '100%',
          padding: '3rem',
        }}
      >
        <h1
          style={{
            'margin-top': 0,
            'font-size': '4rem',
            width: '100%',
            'flex-grow': 1,
            display: 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            'line-height': '1.2',
          }}
        >
          {text}
        </h1>
        <div
          style={{
            display: 'flex',
            'flex-direction': 'row',
            width: '100%',
            'justify-content': 'space-between',
            'align-items': 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              'align-items': 'center',
            }}
          >
            <img
              src={`data:image/jpeg;base64,${icon}`}
              alt="younagi.dev icon"
              width={80}
              height={80}
              style={{
                'border-radius': '9999px',
                'margin-right': '1.25rem',
              }}
            />
            <h2
              style={{
                'margin-right': '1.25rem',
                'font-family': 'PixelMPlus10',
                'font-size': '2.5rem',
              }}
            >
              {'Nagi (凪)'}
            </h2>
          </div>
        </div>
      </div>
    </div>,
    {
      // debug: true,
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'PixelMPlus10',
          data: fontPixelMPlus10,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Inconsolata',
          data: fontInconsolata,
          weight: 600,
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
