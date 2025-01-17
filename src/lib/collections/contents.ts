import {
  type AnyEntryMap,
  type CollectionEntry,
  type DataCollectionKey,
  type Flatten,
  getCollection,
} from 'astro:content';
import { SHOW_DRAFT_PAGES_IN_DEV } from '@/lib/consts';
import { getLocaleFromId } from '@/utils/get-locale-from-id';
import type { Language } from '@/utils/i18n/data';

const hasDraft = (
  data: object,
): data is CollectionEntry<'blog'>['data'] | CollectionEntry<'news'>['data'] =>
  Object.hasOwn(data, 'draft') && Object.hasOwn(data, 'publishedAt');

export const isContentCollectionKey = (
  key: unknown,
): key is DataCollectionKey =>
  ['blog', 'news', 'page'].some((cKey) => cKey === key);

export const getLocaleContentEntries = <T extends DataCollectionKey>(
  entries: Flatten<AnyEntryMap[T]>[],
  locale: Language,
) => entries.filter((entry) => getLocaleFromId(entry.id) === locale);

export const getContentEntries = async <T extends DataCollectionKey>(
  key: T,
  locale?: Language,
) => {
  let entries = await getCollection(key);
  if (locale) {
    entries = getLocaleContentEntries(entries, locale);
  }

  return entries.filter((entry) => {
    if (hasDraft(entry.data)) {
      if (import.meta.env.PROD) {
        return entry.data.draft === 'published';
      }
      return SHOW_DRAFT_PAGES_IN_DEV;
    }
    return true;
  });
};

export const getSortedContentEntries = async <T extends DataCollectionKey>(
  key: T,
  locale?: Language,
) => {
  const entries = await getContentEntries(key, locale);

  return entries.sort((a, b) =>
    hasDraft(a.data) && hasDraft(b.data)
      ? b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf()
      : 0,
  );
};
