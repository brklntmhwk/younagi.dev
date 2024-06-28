import { defaultLang, languages, type Languages } from './data'

export const getLocaleFromUrl = (url: URL) => {
  const [, lang] = url.pathname.split('/')
  if (lang && lang in languages) return lang as Languages

  return defaultLang
}

export const useTranslatedPath = (lang: Languages) => {
  return function translatePath(path: string, l = lang) {
    return l === defaultLang ? path : `/${l}${path}`
  }
}

export const isLocale = (locale: string | undefined): locale is Languages =>
  locale !== undefined && Object.hasOwn(languages, locale)

export const getTargetLocaleSlug = (
  curLocale: Languages | string,
  curUrl: URL
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
