export const getLocaleFromSlug = (slug: string) =>
  slug.slice(0, slug.indexOf('/'))
