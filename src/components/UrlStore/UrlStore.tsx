import { type Component } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { url as urlStore } from './url-store'

type Props = {
  url: URL
}

export const UrlStore: Component<Props> = ({ url }) => {
  const $url = useStore(urlStore)
  if (url !== $url()) {
    urlStore.set(url)
  }

  return null
}
