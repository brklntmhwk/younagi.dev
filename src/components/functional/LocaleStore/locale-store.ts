import { type Locale, defaultLocale } from '@/utils/i18n/data';
import { atom } from 'nanostores';

export const locale = atom<Locale>(defaultLocale);
