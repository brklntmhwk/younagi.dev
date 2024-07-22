import type { CollectionEntry, DataEntryMap } from 'astro:content';

type I18n = CollectionEntry<'i18n'>['data'];
export type I18nData<T extends keyof I18n> = I18n[T];

export type ContentEntryCollection =
  | CollectionEntry<'blog'>
  | CollectionEntry<'news'>;

export type TaxonomyKind =
  | CollectionEntry<'categories'>['collection']
  | CollectionEntry<'tags'>['collection'];

export type Taxonomy =
  | CollectionEntry<'categories'>['data'][number]
  | CollectionEntry<'tags'>['data'][number];

export type CategoryId = keyof DataEntryMap['categories'];
export type TagId = keyof DataEntryMap['tags'];

export type BlogCategoryData = CollectionEntry<'blog'>['data']['category'];
export type BlogTagsData = CollectionEntry<'blog'>['data']['tags'];
