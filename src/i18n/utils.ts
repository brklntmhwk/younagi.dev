import { defaultLang, languages } from './ui'

export const getLocaleFromUrl = (url: URL) => {
  const [, lang] = url.pathname.split('/')
  if (lang && lang in languages) return lang as keyof typeof languages

  return defaultLang
}

// export const useTranslations = (lang: keyof typeof ui) => {
//   return function t(key: keyof (typeof ui)[typeof defaultLang]) {
//     return ui[lang][key] || ui[defaultLang][key]
//   }
// }
