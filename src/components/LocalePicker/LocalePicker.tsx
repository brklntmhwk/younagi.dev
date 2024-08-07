import { locale } from '@/components/LocaleStore/locale-store';
import { url } from '@/components/UrlStore/url-store';
import { defaultLang, languages } from '@/utils/i18n/data';
import { getTargetLocaleSlug } from '@/utils/i18n/utils';
import { useStore } from '@nanostores/solid';
import type { Component } from 'solid-js';
import {
  localeLink,
  localeListElem,
  localeSpan,
  localeUlList,
} from './locale-picker.css';

export const LocalePicker: Component = () => {
  const $locale = useStore(locale);
  const $url = useStore(url);

  return (
    <ul class={localeUlList}>
      {Object.entries(languages).map(([lang, label]) => (
        <li class={localeListElem}>
          {lang === $locale() ? (
            <span class={localeSpan}>{label}</span>
          ) : (
            <a
              class={localeLink}
              href={
                lang === defaultLang
                  ? `/${getTargetLocaleSlug($locale(), $url())}`
                  : `/${lang}/${getTargetLocaleSlug($locale(), $url())}`
              }
            >
              {label}
            </a>
          )}
        </li>
      ))}
    </ul>
  );
};
