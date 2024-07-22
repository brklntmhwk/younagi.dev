import { type Language, defaultLang, languages } from './data'

export const getLocaleFromUrl = (url: URL) => {
  const [, lang] = url.pathname.split('/')
  if (lang && lang in languages) return lang as Language

  return defaultLang
}

export const useTranslatedPath = (lang: Language) => {
  return function translatePath(path: string, l = lang) {
    return l === defaultLang ? path : `/${l}${path}`
  }
}

export const isLocale = (locale: string | undefined): locale is Language =>
  locale !== undefined && Object.hasOwn(languages, locale)

export const getTargetLocaleSlug = (
  curLocale: Language | string,
  curUrl: URL,
) => {
  let slug: string
  if (curLocale === defaultLang) {
    const [_blank, ...rest] = curUrl.pathname.split('/')
    slug = rest.join('/')
  } else {
    const [_blank, _prevLocale, ...rest] = curUrl.pathname.split('/')
    slug = rest.join('/')
  }

  return slug
}
