import { useStore } from '@nanostores/solid'
import type { Component } from 'solid-js'
import { url as urlStore } from './url-store'

type Props = {
  url: URL
}

export const UrlStore: Component<Props> = (props) => {
  const $url = useStore(urlStore)
  if (props.url !== $url()) {
    urlStore.set(props.url)
  }

  return null
}
