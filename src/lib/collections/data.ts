import {
  type DataCollectionKey,
  type Flatten,
  type AnyEntryMap,
  getCollection,
  getDataEntryById,
} from 'astro:content'
import { type Languages } from '@/utils/i18n/data'
import type { BlogTags, CategoryId } from './types'

export const getLocaleDataEntries = <T extends DataCollectionKey>(
  entries: Flatten<AnyEntryMap[T]>[],
  locale: Languages
) =>
  entries.filter((entry) => entry.id.slice(0, entry.id.indexOf('/')) === locale)

export const getDataEntries = async <T extends DataCollectionKey>(
  kind: T,
  locale?: Languages
) => {
  let entries = await getCollection(kind)
  if (locale) {
    entries = getLocaleDataEntries(entries, locale)
  }

  return entries
}

export const getCategory = async (id: CategoryId) =>
  await getDataEntryById('categories', id)

export const getCategories = async (locale?: Languages) =>
  await getDataEntries('categories', locale)

export const getBlogTags = async (blogTags: BlogTags, locale?: Languages) => {
  const allTags = await getDataEntries('tags', locale)

  return allTags.filter((tag) =>
    blogTags?.some((blogTag) => blogTag.id === tag.id)
  )
}

export const getTags = async (locale?: Languages) =>
  await getDataEntries('tags', locale)
