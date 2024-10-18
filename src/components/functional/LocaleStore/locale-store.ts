import { type Language, defaultLang } from '@/utils/i18n/data';
import { atom } from 'nanostores';

export const locale = atom<Language>(defaultLang);
