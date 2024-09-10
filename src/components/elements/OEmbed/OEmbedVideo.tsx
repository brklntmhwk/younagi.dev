import type { Component } from 'solid-js';
import { sanitize } from './sanitize';
import type { OEmbedVideo as OEmbedVideoSchema } from './types';

export const OEmbedVideo: Component<{ data: OEmbedVideoSchema }> = (props) => {
  return (
    <div
      class="double-border"
      innerHTML={sanitize(props.data.html)}
      data-oembed
      data-oembed-video
    />
  );
};
