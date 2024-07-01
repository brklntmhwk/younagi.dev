export type Language = keyof typeof languages
export type LangsWithoutDefault = typeof langList

/* Add languages on an as-needed basis here */
export const languages = {
  en: 'English',
  ja: '日本語',
}
export const langList = ['ja'] as const

export const defaultLang = 'en' as const
