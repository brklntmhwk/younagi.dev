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

type MediaKind = 'youtube' | 'canva'
type Medium = {
  name: string
  regExp: RegExp
  uidPosition: number
  createSrc: (uid: string) => string
}
type MediaMap = {
  [key in MediaKind]: Readonly<Medium>
}

const media = {
  youtube: {
    name: 'YouTube',
    regExp: /^.*(watch\?v=|embed\/)([^#&?]*).*/,
    uidPosition: 2,
    createSrc: (uid) => 'https://www.youtube.com/embed/' + uid,
  },
  canva: {
    name: 'Canva',
    regExp: /^.*(design\/)([^#&?]*)(\/view).*/,
    uidPosition: 2,
    createSrc: (uid) => 'https://www.canva.com/design/' + uid + '/view?embed',
  },
} as const satisfies MediaMap

const convertToEmbedUrl = (url: string, kind: MediaKind): string => {
  const medium = media[kind]
  const matched = url.match(medium.regExp)

  if (matched && matched[medium.uidPosition]) {
    return medium.createSrc(matched[medium.uidPosition]!)
  } else {
    throw new Error(`Invalid ${medium.name} URL`)
  }
}

export const canvaTransformer: Readonly<Transformer> = {
  hName: 'iframe',
  hProperties: async (url): Promise<HProperties> => {
    return {
      src: convertToEmbedUrl(url.href, 'canva'),
      width: '100%',
      height: '360',
    }
  },
  shouldTransform: async (url) => {
    return url.hostname === 'www.canva.com'
  },
}

export const youTubeTransformer: Readonly<Transformer> = {
  hName: 'iframe',
  hProperties: async (url): Promise<HProperties> => {
    return {
      src: convertToEmbedUrl(url.href, 'youtube'),
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
