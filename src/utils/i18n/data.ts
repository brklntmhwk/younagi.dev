export type Languages = keyof typeof languages

export const languages = {
  en: 'English',
  ja: '日本語',
}
export const langList = ['ja'] as const
export const defaultLang = 'en'
