import { unfurl } from 'unfurl.js';

export type HProperties = Record<string, string>;
export type Transformer = {
  hName: string | ((url: URL) => Promise<string>);
  hProperties?: HProperties | ((url: URL) => Promise<HProperties>);
  shouldTransform: (url: URL) => Promise<boolean>;
};

export const getHName = async (transformer: Transformer, url: URL) => {
  if (typeof transformer.hName === 'function') return transformer.hName(url);

  return transformer.hName;
};

export const getHProperties = async (transformer: Transformer, url: URL) => {
  if (typeof transformer.hProperties === 'function')
    return transformer.hProperties(url);

  return transformer.hProperties;
};

type MediaKind = 'youtube';
type Medium = {
  name: string;
  regExp: RegExp;
  uidPosition: number;
  createSrc: (uid: string) => string;
};
type MediaMap = {
  [key in MediaKind]: Readonly<Medium>;
};

const media = {
  youtube: {
    name: 'YouTube',
    regExp: /^.*(watch\?v=|embed\/)([^/#&?]*).*/,
    uidPosition: 2,
    createSrc: (uid) => `https://www.youtube.com/embed/${uid}`,
  },
} as const satisfies MediaMap;

const convertToEmbedUrl = (url: URL, kind: MediaKind): string => {
  const medium = media[kind];
  const matched = url.href.match(medium.regExp);

  if (matched?.[medium.uidPosition]) {
    return medium.createSrc(matched[medium.uidPosition]!);
  }

  throw new Error(`Invalid ${medium.name} URL`);
};

export const youTubeTransformer: Readonly<Transformer> = {
  hName: 'iframe',
  hProperties: async (url): Promise<HProperties> => {
    return {
      src: convertToEmbedUrl(url, 'youtube'),
      width: '100%',
      height: '360',
    };
  },
  shouldTransform: async (url) => {
    return url.hostname === 'www.youtube.com';
  },
};

export const oEmbedTransformer: Readonly<Transformer> = {
  hName: 'oembed',
  hProperties: async (url) => {
    const metadata = await unfurl(url.href);

    if (metadata.oEmbed !== undefined)
      return { oEmbed: JSON.stringify(metadata.oEmbed) };

    return {} as HProperties;
  },
  shouldTransform: async (url) => {
    const metadata = await unfurl(url.href);

    return metadata.oEmbed !== undefined;
  },
};
