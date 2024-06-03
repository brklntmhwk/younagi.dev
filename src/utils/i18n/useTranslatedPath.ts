import { languages, defaultLang } from './data'

export const useTranslatedPath = (lang: keyof typeof languages) => {
  return function translatePath(path: string, l = lang) {
    return l === defaultLang ? path : `/${l}${path}`
  }
}
