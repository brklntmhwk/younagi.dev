import { type Language } from '@/utils/i18n/data'

type FormateDate = (
  date: Date,
  locale: Language,
  show?: {
    year: boolean
    month: boolean
    day: boolean
  }
) => string

export type FormattedDate = Parameters<FormateDate>

export const formatDate: FormateDate = (date, locale, show) =>
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
