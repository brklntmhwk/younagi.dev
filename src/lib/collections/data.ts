import {
  type DataCollectionKey,
  type Flatten,
  type AnyEntryMap,
  getCollection,
  getDataEntryById,
} from 'astro:content'
import { type Language } from '@/utils/i18n/data'
import type { BlogTags, CategoryId } from './types'
import { getLocaleFromSlug } from '@/utils/get-locale-from-slug'

export const getLocaleDataEntries = <T extends DataCollectionKey>(
  entries: Flatten<AnyEntryMap[T]>[],
  locale: Language
) => entries.filter((entry) => getLocaleFromSlug(entry.id) === locale)

export const getDataEntries = async <T extends DataCollectionKey>(
  kind: T,
  locale?: Language
) => {
  let entries = await getCollection(kind)
  if (locale) {
    entries = getLocaleDataEntries(entries, locale)
  }

  return entries
}

export const getCategory = async (id: CategoryId) =>
  await getDataEntryById('categories', id)

export const getCategories = async (locale?: Language) =>
  await getDataEntries('categories', locale)

export const getBlogTags = async (blogTags: BlogTags, locale?: Language) => {
  const allTags = await getDataEntries('tags', locale)

  return allTags.filter((tag) =>
    blogTags?.some((blogTag) => blogTag.id === tag.id)
  )
}

export const getTags = async (locale?: Language) =>
  await getDataEntries('tags', locale)
