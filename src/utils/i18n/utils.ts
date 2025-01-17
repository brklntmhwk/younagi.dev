import { type Language, defaultLang, languages } from './data';

export const getLocaleFromUrl = (url: URL) => {
  const [, lang] = url.pathname.split('/');
  if (lang && lang in languages) return lang as Language;

  return defaultLang;
};

export const useTranslatedPath = (lang: Language) => {
  return function translatePath(path: string, l = lang) {
    return l === defaultLang ? path : `/${l}${path}`;
  };
};

export const isLocale = (locale: string | undefined): locale is Language =>
  locale !== undefined && Object.hasOwn(languages, locale);

export const getTargetLocaleId = (
  curLocale: Language | string,
  curUrl: URL,
) => {
  let id: string;
  if (curLocale === defaultLang) {
    const [_blank, ...rest] = curUrl.pathname.split('/');
    id = rest.join('/');
  } else {
    const [_blank, _prevLocale, ...rest] = curUrl.pathname.split('/');
    id = rest.join('/');
  }

  return id;
};

export const compareCharsInLocale = (
  a: string,
  b: string,
  locale: Language,
) => {
  const collator = new Intl.Collator(locale);

  return collator.compare(a, b);
};
