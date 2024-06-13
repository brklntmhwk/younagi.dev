import { atom } from 'nanostores'
import { type Languages } from '@/utils/i18n/data'

export const locale = atom<Languages>('en')
