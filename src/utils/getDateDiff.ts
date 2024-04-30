import { languages } from '@/i18n/data'

export const getDateDiff = (date: Date, locale: keyof typeof languages) => {
  const diffMilliSec = date.getTime() - new Date().getTime()
  const diffDays = Math.floor(diffMilliSec / 1000 / 60 / 60 / 24)
  const displayDiff = new Intl.RelativeTimeFormat(locale, {
    style: 'short',
  }).format(diffDays, 'day')

  return displayDiff
}
