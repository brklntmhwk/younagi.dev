import { languages } from '@/utils/i18n/data'

export const getDateDiff = (date: Date, locale: keyof typeof languages) => {
  let diffDate: number
  let displayDiff: string
  const diffMilliSec = date.getTime() - new Date().getTime()
  const isWithinDay = (diffMilliSec * -1) / (1000 * 60 * 60 * 24) < 1

  if (isWithinDay) {
    diffDate = Math.floor(diffMilliSec / 1000 / 60 / 60)
    displayDiff = new Intl.RelativeTimeFormat(locale, {
      style: 'long',
    }).format(diffDate, 'hour')
  } else {
    diffDate = Math.floor(diffMilliSec / 1000 / 60 / 60 / 24)
    displayDiff = new Intl.RelativeTimeFormat(locale, {
      style: 'short',
    }).format(diffDate, 'day')
  }

  return displayDiff
}
