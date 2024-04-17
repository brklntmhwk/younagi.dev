import { readFileSync } from 'fs'
import satori from 'satori'
import sharp from 'sharp'

const ogImage = async (text: string, date?: Date) => {
  const pixelMPlus10Data = readFileSync(
    `/${process.cwd()}/public/fonts/PixelMplus10-Regular.woff2`
  )
  const dotGothic16Data = readFileSync(
    `/${process.cwd()}/public/fonts/DotGothic16-Regular.woff2`
  )
  const iconBuffer = readFileSync(
    `/${process.cwd()}/public/blog-placeholder-1.jpg`
  )
  const icon = window.btoa(
    new Uint8Array(iconBuffer).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ''
    )
  )
  const svg = await satori(
    <div
      style={{
        fontFamily: 'Pixel M Plus 10, Dot Gothic 16, sans-serif',
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
            Nagi's ogImage
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
          <div style={{ display: 'flex' }}>
            <h2
              style={{
                fontFamily: 'Roboto Mono',
                fontSize: '2.5rem',
              }}
            >
              <p>{date && `${date.toISOString().split('T')[0]}`}</p>
            </h2>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              src={`data:image/jpeg;base64,${icon}`}
              alt="Nagi's icon"
              width={100}
              height={100}
              style={{
                borderRadius: '9999px',
                marginRight: '1.25rem',
              }}
            />
            <h2
              style={{
                marginRight: '1.25rem',
                fontFamily: 'Roboto Mono',
                fontSize: '2.5rem',
              }}
            >
              {'Nagi'}
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
          name: 'Pixel M Plus 10',
          data: pixelMPlus10Data,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Dot Gothic 16',
          data: dotGothic16Data,
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
}

export default ogImage
