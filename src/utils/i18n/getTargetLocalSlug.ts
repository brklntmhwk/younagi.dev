/* eslint-disable @typescript-eslint/no-unused-vars */

import { defaultLang, type Languages } from './data'

export const getTargetLocaleSlug = (
  curLocale: Languages | string,
  curUrl: URL
) => {
  let slug: string
  if (curLocale === defaultLang) {
    const [_blank, ...rest] = curUrl.pathname.split('/')
    slug = rest.join('/')
  } else {
    const [_blank, _prevLocale, ...rest] = curUrl.pathname.split('/')
    slug = rest.join('/')
  }

  return slug
}
