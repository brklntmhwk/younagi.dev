import {
  type AnyEntryMap,
  type DataCollectionKey,
  type Flatten,
  getCollection,
  getEntry,
} from 'astro:content';
import { getLocaleFromId } from '@/utils/get-locale-from-id';
import type { Locale } from '@/utils/i18n/data';
import type { BlogCategoryData, BlogTagsData } from './types';

export const getLocaleDataEntries = <T extends DataCollectionKey>(
  entries: Flatten<AnyEntryMap[T]>[],
  locale: Locale,
) => entries.filter((entry) => getLocaleFromId(entry.id) === locale);

export const getDataEntries = async <T extends DataCollectionKey>(
  kind: T,
  locale?: Locale,
) => {
  let entries = await getCollection(kind);
  if (locale) {
    entries = getLocaleDataEntries(entries, locale);
  }

  return entries;
};

export const getBlogCategory = async (blogCategory: BlogCategoryData) => {
  const categories = await getEntry('categories', blogCategory.metadata.id);

  return categories?.data.find(
    (categoryData) => blogCategory.slug === categoryData.slug,
  );
};

export const getCategories = async (locale: Locale) =>
  await getEntry('categories', `${locale}/categories`);

export const getBlogTags = async (blogTags: BlogTagsData) => {
  const tags = await getEntry('tags', blogTags.metadata.id);

  return tags?.data.filter((tagData) =>
    blogTags.slugList!.some((blogTag) => blogTag === tagData.slug),
  );
};
export const getTags = async (locale: Locale) =>
  await getEntry('tags', `${locale}/tags`);
