export const getSlugWithoutLocale = (slug: string) =>
  slug.slice(slug.indexOf('/') + 1)
