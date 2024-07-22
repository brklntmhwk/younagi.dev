import type { Component } from 'solid-js';
import type { OEmbedPhoto as OEmbedPhotoSchema } from './types';

export const OEmbedPhoto: Component<{ data: OEmbedPhotoSchema }> = (props) => {
  return (
    <img
      src={props.data.url}
      alt={props.data.title ?? ''}
      width={props.data.width}
      height={props.data.height}
      loading="lazy"
      decoding="async"
      data-oembed
      data-oembed-photo
    />
  );
};
