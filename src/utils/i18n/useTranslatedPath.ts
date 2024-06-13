import { type Languages, defaultLang } from './data'

export const useTranslatedPath = (lang: Languages) => {
  return function translatePath(path: string, l = lang) {
    return l === defaultLang ? path : `/${l}${path}`
  }
}
