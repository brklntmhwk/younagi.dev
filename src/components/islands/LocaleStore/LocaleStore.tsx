import { type Component } from 'solid-js'
import { useStore } from '@nanostores/solid'
import type { Language } from '@/utils/i18n/data'
import { locale as localeStore } from './locale-store'

type Props = {
  locale: Language
}

export const LocaleStore: Component<Props> = ({ locale }) => {
  const $locale = useStore(localeStore)
  if (locale !== $locale()) {
    localeStore.set(locale)
  }

  return null
}
