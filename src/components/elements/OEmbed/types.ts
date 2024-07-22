/**
 * OEmbed API schema types extracted from:
 * \unfurl.js\dist\types.d.ts
 */

export type OEmbedSchema = OEmbedPhoto | OEmbedVideo | OEmbedLink | OEmbedRich;

type OEmbedBase = {
  type: 'photo' | 'video' | 'link' | 'rich';
  version: string;
  title?: string;
  author_name?: string;
  author_url?: string;
  provider_name?: string;
  provider_url?: string;
  cache_age?: number;
  thumbnails?: [
    {
      url?: string;
      width?: number;
      height?: number;
    },
  ];
};
export type OEmbedPhoto = OEmbedBase & {
  type: 'photo';
  url: string;
  width: number;
  height: number;
};
export type OEmbedVideo = OEmbedBase & {
  type: 'video';
  html: string;
  width: number;
  height: number;
};
export type OEmbedLink = OEmbedBase & {
  type: 'link';
};
export type OEmbedRich = OEmbedBase & {
  type: 'rich';
  html: string;
  width: number;
  height: number;
};
