import { type Locale, defaultLocale, locales } from './data';

export const getLocaleFromUrl = (url: URL) => {
  const [, lang] = url.pathname.split('/');
  if (lang && lang in locales) return lang as Locale;

  return defaultLocale;
};

export const useTranslatedPath = (lang: Locale) => {
  return function translatePath(path: string, l = lang) {
    return l === defaultLocale ? path : `/${l}${path}`;
  };
};

export const isLocale = (locale: string | undefined): locale is Locale =>
  locale !== undefined && Object.hasOwn(locales, locale);

export const getTargetLocaleId = (curLocale: Locale | string, curUrl: URL) => {
  let id: string;
  if (curLocale === defaultLocale) {
    const [_blank, ...rest] = curUrl.pathname.split('/');
    id = rest.join('/');
  } else {
    const [_blank, _prevLocale, ...rest] = curUrl.pathname.split('/');
    id = rest.join('/');
  }

  return id;
};

export const compareCharsInLocale = (a: string, b: string, locale: Locale) => {
  const collator = new Intl.Collator(locale);

  return collator.compare(a, b);
};
