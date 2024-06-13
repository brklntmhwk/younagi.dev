import { type Languages } from '@/utils/i18n/data'

export const formatDate = (
  date: Date,
  locale: Languages,
  show?: {
    year: boolean
    month: boolean
    day: boolean
  }
) =>
  !show
    ? new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(date)
    : new Intl.DateTimeFormat(locale, {
        year: show.year ? 'numeric' : undefined,
        month: show.month ? 'short' : undefined,
        day: show.day ? 'numeric' : undefined,
      }).format(date)
