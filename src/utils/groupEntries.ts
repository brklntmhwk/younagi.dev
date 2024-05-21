import type { CollectionEntry } from 'astro:content'

export type ArchiveYearMonthPairs = Record<string, unknown[]>

function formatDate(date: Date) {
  const year = date.getFullYear().toString()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')

  return { year, month }
}

export const groupEntriesByYearMonth = (entries: CollectionEntry<'blog'>[]) => {
  const grouped = entries.reduce((acc, entry) => {
    const { publishedAt } = entry.data
    const { year, month } = formatDate(publishedAt)

    if (!acc[year]) {
      acc[year] = []
    }
    acc[year]?.push(month)

    return acc
  }, {} as ArchiveYearMonthPairs)

  return grouped
}
