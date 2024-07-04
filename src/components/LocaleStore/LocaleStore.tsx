import { type Component } from 'solid-js'
import { useStore } from '@nanostores/solid'
import type { Language } from '@/utils/i18n/data'
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
