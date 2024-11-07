import type { Component } from 'solid-js';
import { sanitize } from './sanitize';
import type { OEmbedVideo as OEmbedVideoSchema } from './types';

export const OEmbedVideo: Component<{ data: OEmbedVideoSchema }> = (props) => {
  return (
    <div
      class="relative border-t-4 border-b-2 border-x-2 border-line-double rounded-md before:absolute before:-top-2 before:-bottom-2 before:-left-1.5 before:-right-1.5 before:border-t-2 before:border-b-4 before:border-x-2 before:rounded-lg before:-z-10"
      innerHTML={sanitize(props.data.html)}
      data-oembed
      data-oembed-video
    />
  );
};
