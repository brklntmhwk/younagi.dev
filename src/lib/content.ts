import type { CollectionEntry } from 'astro:content'
import { SHOW_DRAFT_PAGES_IN_DEV } from '@/consts'

export const getPublishedSortedEntries = <
  T extends CollectionEntry<'blog'> | CollectionEntry<'news'>,
>(
  entries: T[]
) => {
  return entries
    .filter((entry) => {
      if (import.meta.env.PROD) {
        return entry.data.draft === 'published' ? true : false
      }

      return SHOW_DRAFT_PAGES_IN_DEV ? true : false
    })
    .sort((a, b) => a.data.publishedAt.valueOf() - b.data.publishedAt.valueOf())
}
