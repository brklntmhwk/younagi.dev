import { defaultLang, languages, type Languages } from './data'

export const getLocaleFromUrl = (url: URL) => {
  const [, lang] = url.pathname.split('/')
  if (lang && lang in languages) return lang as Languages

  return defaultLang
}
