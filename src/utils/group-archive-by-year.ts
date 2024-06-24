import type { CollectionEntry } from 'astro:content'
import { ArchiveSlugify } from './archive-slugify'

export type ArchiveYearMonthPairs = Record<
  string,
  { mStr: string; mDate: Date }[]
>

const getYearMonthPairFromDate = (date: Date) => {
  const year = date.getFullYear().toString()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')

  return { year, month }
}

export const groupArchiveByYear = (entries: CollectionEntry<'blog'>[]) => {
  const grouped = entries.reduce((acc, entry) => {
    const { publishedAt } = entry.data
    const { year, month } = getYearMonthPairFromDate(publishedAt)
    const monthRec = {
      mStr: month,
      mDate: publishedAt,
    }

    if (!acc[year]) {
      acc[year] = []
    }

    if (
      acc[year]?.some(({ mStr }) => year + mStr === ArchiveSlugify(publishedAt))
    )
      return acc

    acc[year]?.push(monthRec)

    return acc
  }, {} as ArchiveYearMonthPairs)

  return grouped
}
