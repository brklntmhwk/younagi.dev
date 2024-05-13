import { defaultLang, languages } from './data'

export const getLocaleFromUrl = (url: URL) => {
  const [, lang] = url.pathname.split('/')
  if (lang && lang in languages) return lang as keyof typeof languages

  return defaultLang
}
