import { type Language } from '@/utils/i18n/data'

export const getTimeDiff = (fromDate: Date, locale: Language) => {
  const diffInMilliSeconds = new Date().getTime() - fromDate.getTime()
  const diffInSeconds = Math.floor(diffInMilliSeconds / 1000)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)
  const diffInWeeks = Math.floor(diffInDays / 7)
  const diffInYears = new Date().getFullYear() - fromDate.getFullYear()
  const diffInMonths = Math.floor(
    diffInYears * 12 + new Date().getMonth() - fromDate.getMonth()
  )
  // const diffInMonths = Math.floor(diffInDays / 30)
  // const diffInYears = Math.floor(diffInDays / 365)

  if (diffInSeconds < 60) {
    return new Intl.RelativeTimeFormat(locale, {
      style: 'long',
    }).format(-diffInSeconds, 'seconds')
  } else if (diffInMinutes < 60) {
    return new Intl.RelativeTimeFormat(locale, {
      style: 'long',
    }).format(-diffInMinutes, 'minutes')
  } else if (diffInHours < 24) {
    return new Intl.RelativeTimeFormat(locale, {
      style: 'long',
    }).format(-diffInHours, 'hours')
  } else if (diffInDays < 7) {
    return new Intl.RelativeTimeFormat(locale, {
      style: 'long',
    }).format(-diffInDays, 'days')
  } else if (diffInWeeks < 4) {
    return new Intl.RelativeTimeFormat(locale, {
      style: 'long',
    }).format(-diffInWeeks, 'weeks')
  } else if (diffInMonths < 12) {
    return new Intl.RelativeTimeFormat(locale, {
      style: 'long',
    }).format(-diffInMonths, 'months')
  } else {
    return new Intl.RelativeTimeFormat(locale, {
      style: 'long',
    }).format(-diffInYears, 'years')
  }
}
