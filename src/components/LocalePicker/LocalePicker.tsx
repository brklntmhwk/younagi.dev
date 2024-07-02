// import { type Component } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { locale } from '@/components/LocaleStore/locale-store'
import { url } from '@/components/UrlStore/url-store'
// import type { I18nData } from '@/lib/collections/types'
import { getTargetLocaleSlug } from '@/utils/i18n/utils'
import { defaultLang, languages } from '@/utils/i18n/data'
import {
  localeUlList,
  localeListElem,
  localeLink,
  localeSpan,
} from './locale-picker.css'

// type Props = {
//   t: I18nData<'locale_picker'>
// }

export const LocalePicker = () => {
  const $locale = useStore(locale)
  const $url = useStore(url)

  return (
    <ul class={localeUlList}>
      {Object.entries(languages).map(([lang, label]) => (
        <li class={localeListElem}>
          {lang === $locale() ? (
            <span class={localeSpan}>{label}</span>
          ) : (
            <a
              class={localeLink}
              href={
                lang === defaultLang
                  ? `/${getTargetLocaleSlug($locale(), $url())}`
                  : `/${lang}/${getTargetLocaleSlug($locale(), $url())}`
              }
            >
              {label}
            </a>
          )}
        </li>
      ))}
    </ul>
  )
}
