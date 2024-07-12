import {
  type DataCollectionKey,
  type Flatten,
  type AnyEntryMap,
  getEntry,
  getCollection,
  getDataEntryById,
} from 'astro:content'
import { type Language } from '@/utils/i18n/data'
import type { BlogCategoryData, BlogTagsData } from './types'
import { getLocaleFromSlug } from '@/utils/get-locale-from-slug'

export const getLocaleDataEntries = <T extends DataCollectionKey>(
  entries: Flatten<AnyEntryMap[T]>[],
  locale: Language
) => entries.filter((entry) => getLocaleFromSlug(entry.id) === locale)

export const getDataEntries = async <T extends DataCollectionKey>(
  kind: T,
  locale?: Language
) => {
  let entries = await getCollection(kind)
  if (locale) {
    entries = getLocaleDataEntries(entries, locale)
  }

  return entries
}

export const getBlogCategory = async (blogCategory: BlogCategoryData) => {
  const categories = await getDataEntryById(
    'categories',
    blogCategory.metadata.id
  )

  return categories.data.find(
    (categoryData) => blogCategory.slug === categoryData.slug
  )
}
// export const getCategory = async (id: metadata) =>
//   await getDataEntryById('categories', id)

export const getCategories = async (locale: Language) =>
  await getEntry('categories', `${locale}/categories`)

// export const getCategories = async (locale?: Language) =>
//   await getDataEntries('categories', locale)

export const getBlogTags = async (blogTags: BlogTagsData) => {
  const tags = await getDataEntryById('tags', blogTags.metadata.id)

  return tags.data.filter((tagData) =>
    blogTags.slugList?.some((blogTag) => blogTag === tagData.slug)
  )
}
// export const getBlogTags = async (blogTags: BlogTags, locale?: Language) => {
//   const allTags = await getDataEntries('tags', locale)

//   return allTags.map((tag) =>
//     tag.data.filter((tagData) =>
//       blogTags.tagsData?.some((blogTag) => blogTag === tagData.slug)
//     )
//   )
//   // return allTags.filter((tag) =>
//   //   blogTags?.some((blogTag) => blogTag.id === tag.id)
//   // )
// }

export const getTags = async (locale: Language) =>
  await getEntry('tags', `${locale}/tags`)
// export const getTags = async (locale?: Language) =>
//   await getDataEntries('tags', locale)
