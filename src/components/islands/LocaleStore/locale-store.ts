import { atom } from 'nanostores'
import { type Language, defaultLang } from '@/utils/i18n/data'

export const locale = atom<Language>(defaultLang)
