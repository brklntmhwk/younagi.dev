import type { Language } from '@/utils/i18n/data'

export const getTimeDiff = (fromDate: Date, locale: Language) => {
  const diffInMilliSeconds = new Date().getTime() - fromDate.getTime()
  const diffInSeconds = Math.floor(diffInMilliSeconds / 1000)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)
  const diffInWeeks = Math.floor(diffInDays / 7)
  const diffInYears = new Date().getFullYear() - fromDate.getFullYear()
  const diffInMonths = Math.floor(
    diffInYears * 12 + new Date().getMonth() - fromDate.getMonth(),
  )

  if (diffInSeconds < 60) {
    return new Intl.RelativeTimeFormat(locale, {
      style: 'long',
    }).format(-diffInSeconds, 'seconds')
  }
  if (diffInMinutes < 60) {
    return new Intl.RelativeTimeFormat(locale, {
      style: 'long',
    }).format(-diffInMinutes, 'minutes')
  }
  if (diffInHours < 24) {
    return new Intl.RelativeTimeFormat(locale, {
      style: 'long',
    }).format(-diffInHours, 'hours')
  }
  if (diffInDays < 7) {
    return new Intl.RelativeTimeFormat(locale, {
      style: 'long',
    }).format(-diffInDays, 'days')
  }
  if (diffInWeeks < 4) {
    return new Intl.RelativeTimeFormat(locale, {
      style: 'long',
    }).format(-diffInWeeks, 'weeks')
  }
  if (diffInMonths < 12) {
    return new Intl.RelativeTimeFormat(locale, {
      style: 'long',
    }).format(-diffInMonths, 'months')
  }

  return new Intl.RelativeTimeFormat(locale, {
    style: 'long',
  }).format(-diffInYears, 'years')
}
