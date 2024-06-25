import {
  type AnyEntryMap,
  type CollectionEntry,
  type ContentCollectionKey,
  type Flatten,
  getCollection,
} from 'astro:content'
import type { Languages } from '@/utils/i18n/data'
import { SHOW_DRAFT_PAGES_IN_DEV } from '@/consts'

const hasDraft = (
  data: Record<string, unknown>
): data is CollectionEntry<'blog'>['data'] | CollectionEntry<'news'>['data'] =>
  Object.hasOwn(data, 'draft') && Object.hasOwn(data, 'publishedAt')

export const getLocaleContentEntries = <T extends ContentCollectionKey>(
  entries: Flatten<AnyEntryMap[T]>[],
  locale: Languages
) =>
  entries.filter(
    (entry) => entry.slug.slice(0, entry.slug.indexOf('/')) === locale
  )

export const getContentEntries = async <T extends ContentCollectionKey>(
  kind: T,
  locale?: Languages
) => {
  let entries = await getCollection(kind)
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
  kind: T,
  locale?: Languages
) => {
  const entries = await getContentEntries(kind, locale)

  return entries.sort((a, b) =>
    hasDraft(a.data) && hasDraft(b.data)
      ? a.data.publishedAt.valueOf() - b.data.publishedAt.valueOf()
      : 0
  )
}
