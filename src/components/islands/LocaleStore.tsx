import { type Component } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { locale as localeStore } from '@/stores/locale-store'
import { type Languages } from '@/utils/i18n/data'

type Props = {
  locale: Languages
}

const LocaleStore: Component<Props> = ({ locale }) => {
  const $locale = useStore(localeStore)
  if (locale !== $locale()) {
    localeStore.set(locale)
  }

  return null
}

export default LocaleStore
