import '@/styles/pixel-m-plus.css';
import { locale } from '@/components/functional/LocaleStore/locale-store';
import { url } from '@/components/functional/UrlStore/url-store';
import { defaultLocale, locales } from '@/utils/i18n/data';
import { getTargetLocaleId } from '@/utils/i18n/utils';
import { useStore } from '@nanostores/solid';
import type { Component } from 'solid-js';

export const LocalePicker: Component = () => {
  const $locale = useStore(locale);
  const $url = useStore(url);

  return (
    <ul class="grid gap-6 ml-5">
      {Object.entries(locales).map(([lang, label]) => (
        <li class="text-xl font-pixel">
          {lang === $locale() ? (
            <span class="font-bold">{label}</span>
          ) : (
            <a
              class="no-underline relative border-solid border-transparent border-b-2 hover:before:content-['▶'] hover:before:absolute hover:before:-top-1 hover:before:-left-6 hover:before:text-xl self-center"
              href={
                lang === defaultLocale
                  ? `/${getTargetLocaleId($locale(), $url())}`
                  : `/${lang}/${getTargetLocaleId($locale(), $url())}`
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
