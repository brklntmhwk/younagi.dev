import { unfurl } from 'unfurl.js'

export type HProperties = Record<string, string>
export type Transformer = {
  hName: string | ((url: URL) => Promise<string>)
  hProperties?: HProperties | ((url: URL) => Promise<HProperties>)
  shouldTransform: (url: URL) => Promise<boolean>
}

export const getHName = async (transformer: Transformer, url: URL) => {
  if (typeof transformer.hName === 'function') return transformer.hName(url)

  return transformer.hName
}

export const getHProperties = async (transformer: Transformer, url: URL) => {
  if (typeof transformer.hProperties === 'function')
    return transformer.hProperties(url)

  return transformer.hProperties
}

export const oEmbedTransformer: Readonly<Transformer> = {
  hName: 'oembed',
  hProperties: async (url) => {
    const metadata = await unfurl(url.href)

    if (metadata.oEmbed !== undefined)
      return { oEmbed: JSON.stringify(metadata.oEmbed) }

    return {} as HProperties
  },
  shouldTransform: async (url) => {
    const metadata = await unfurl(url.href)

    return metadata.oEmbed !== undefined
  },
}

export const youTubeTransformer: Readonly<Transformer> = {
  hName: 'iframe',
  hProperties: async (url): Promise<HProperties> => {
    const convertToEmbedUrl = (url: string): string => {
      const regExp = /^.*(watch\?v=|embed\/)([^#&?]*).*/
      const matched = url.match(regExp)

      if (matched && matched[2]) {
        return 'https://www.youtube.com/embed/' + matched[2]
      } else {
        throw new Error('Invalid YouTube URL')
      }
    }

    return {
      src: convertToEmbedUrl(url.href),
      width: '100%',
      height: '360',
    }
  },
  shouldTransform: async (url) => {
    return url.hostname === 'www.youtube.com'
  },
}

export const googleSlidesTransformer: Readonly<Transformer> = {
  hName: 'iframe',
  hProperties: async (url): Promise<HProperties> => {
    const getEmbedUrl = (isWeb: boolean) => {
      const path = url.pathname.split('/')

      if (isWeb) {
        path[path.length - 1] = 'embed'
        return new URL(path.join('/'), url.origin)
      }

      if (path.length <= 3) {
        path.push('embed')
      } else {
        path[path.length - 1] = 'embed'
      }
      return new URL(path.join('/'), url.origin)
    }

    const isWeb = url.pathname.startsWith('/presentation/d/e/')

    return {
      src: getEmbedUrl(isWeb).href,
      width: '100%',
      frameBorder: '0',
      allowFullScreen: 'true',
      mozAllowFullScreen: 'true',
      msAllowFullScreen: 'true',
      style: 'aspect-ratio: 960/569;',
    }
  },
  shouldTransform: async (url) => {
    const isGoogleDocs = url.hostname === 'docs.google.com'
    const isGoogleSlides = url.pathname.startsWith('/presentation/d/')

    return isGoogleDocs && isGoogleSlides
  },
}
