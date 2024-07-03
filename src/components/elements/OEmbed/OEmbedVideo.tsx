import type { Component } from 'solid-js'
import type { OEmbedVideo as OEmbedVideoSchema } from './types'
import { sanitize } from './sanitize'

export const OEmbedVideo: Component<{ data: OEmbedVideoSchema }> = (props) => {
  return (
    <div
      class="pokemon-border"
      innerHTML={sanitize(props.data.html)}
      data-oembed
      data-oembed-video
    />
  )
}
