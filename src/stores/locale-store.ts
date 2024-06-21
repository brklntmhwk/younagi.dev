import { atom } from 'nanostores'
import { type Languages, defaultLang } from '@/utils/i18n/data'

export const locale = atom<Languages>(defaultLang)
