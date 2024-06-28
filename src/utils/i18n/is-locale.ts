import { type Languages, languages } from './data'

export const isLocale = (locale: string | undefined): locale is Languages =>
  locale !== undefined && Object.hasOwn(languages, locale)
