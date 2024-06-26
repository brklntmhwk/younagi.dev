import type { CollectionEntry, DataEntryMap } from 'astro:content'

type I18n = CollectionEntry<'i18n'>['data']
export type I18nData<T extends keyof I18n> = I18n[T]

export type Taxonomy = CollectionEntry<'categories'> | CollectionEntry<'tags'>

export type CategoryId = keyof DataEntryMap['categories']
export type TagId = keyof DataEntryMap['tags']

export type BlogTags = CollectionEntry<'blog'>['data']['tags']
