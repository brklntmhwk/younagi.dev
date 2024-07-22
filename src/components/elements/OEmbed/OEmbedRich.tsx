import { fromHtml } from 'hast-util-from-html'
import { select } from 'hast-util-select'
import { toHtml } from 'hast-util-to-html'
import type { Component } from 'solid-js'
import { sanitize } from './sanitize'
import type { OEmbedRich as OEmbedRichSchema } from './types'

const transform = (html: string) => {
  const hast = fromHtml(html)
  const iframe = select('iframe', hast)
  if (iframe?.properties.style?.toString().includes('aspect-ratio:')) {
    iframe.properties.width = '100%'
    iframe.properties.height = '100%'
  }
  return toHtml(hast)
}

export const OEmbedRich: Component<{ data: OEmbedRichSchema }> = (props) => {
  return (
    <div
      class=""
      innerHTML={transform(sanitize(props.data.html))}
      data-oembed
      data-oembed-rich
    />
  )
}
