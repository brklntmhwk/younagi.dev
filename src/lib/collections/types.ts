import type { CollectionEntry } from 'astro:content'

type I18n = CollectionEntry<'i18n'>['data']
export type I18nData<T extends keyof I18n> = I18n[T]
