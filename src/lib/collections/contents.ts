import {
  type AnyEntryMap,
  type CollectionEntry,
  type ContentCollectionKey,
  type Flatten,
  getCollection,
} from 'astro:content'
import type { Language } from '@/utils/i18n/data'
import { getLocaleFromSlug } from '@/utils/get-locale-from-slug'
import { SHOW_DRAFT_PAGES_IN_DEV } from '@/lib/consts'

export const isBlogList = (
  listData: Record<string, unknown>[]
): listData is CollectionEntry<'blog'>[] =>
  listData.every(
    (data) => Object.hasOwn(data, 'collection') && data.collection === 'blog'
  )

export const isNewsList = (
  listData: Record<string, unknown>[]
): listData is CollectionEntry<'news'>[] =>
  listData.every(
    (data) => Object.hasOwn(data, 'collection') && data.collection === 'news'
  )

export const isPageList = (
  listData: Record<string, unknown>[]
): listData is CollectionEntry<'page'>[] =>
  listData.every(
    (data) => Object.hasOwn(data, 'collection') && data.collection === 'page'
  )

const hasDraft = (
  data: Record<string, unknown>
): data is CollectionEntry<'blog'>['data'] | CollectionEntry<'news'>['data'] =>
  Object.hasOwn(data, 'draft') && Object.hasOwn(data, 'publishedAt')

export const isContentCollectionKey = (
  key: unknown
): key is ContentCollectionKey =>
  ['blog', 'news', 'page'].some((cKey) => cKey === key)

export const getLocaleContentEntries = <T extends ContentCollectionKey>(
  entries: Flatten<AnyEntryMap[T]>[],
  locale: Language
) => entries.filter((entry) => getLocaleFromSlug(entry.slug) === locale)

export const getContentEntries = async <T extends ContentCollectionKey>(
  key: T,
  locale?: Language
) => {
  let entries = await getCollection(key)
  if (locale) {
    entries = getLocaleContentEntries(entries, locale)
  }

  return entries.filter((entry) => {
    if (hasDraft(entry.data)) {
      if (import.meta.env.PROD) {
        return entry.data.draft === 'published' ? true : false
      }
      return SHOW_DRAFT_PAGES_IN_DEV
    }
    return true
  })
}

export const getSortedContentEntries = async <T extends ContentCollectionKey>(
  key: T,
  locale?: Language
) => {
  const entries = await getContentEntries(key, locale)

  return entries.sort((a, b) =>
    hasDraft(a.data) && hasDraft(b.data)
      ? a.data.publishedAt.valueOf() - b.data.publishedAt.valueOf()
      : 0
  )
}
