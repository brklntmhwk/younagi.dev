import type { Language } from '@/utils/i18n/data'
import { useStore } from '@nanostores/solid'
import type { Component } from 'solid-js'
import { locale as localeStore } from './locale-store'

type Props = {
  locale: Language
}

export const LocaleStore: Component<Props> = (props) => {
  const $locale = useStore(localeStore)
  if (props.locale !== $locale()) {
    localeStore.set(props.locale)
  }

  return null
}
