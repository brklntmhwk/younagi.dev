export type Locale = keyof typeof locales;
export type LangsWithoutDefault = typeof nonDefaultLocaleList;

/* Add locales on an as-needed basis here */
export const locales = {
  en: 'English',
  ja: '日本語',
} as const;
export const nonDefaultLocaleList = ['ja'] as const;
export const localeList = ['en', 'ja'] as const;
export const defaultLocale = 'en' as const;
