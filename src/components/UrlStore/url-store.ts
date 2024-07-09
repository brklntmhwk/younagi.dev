import { atom } from 'nanostores'
import { SITE_URL } from '@/lib/consts'

export const url = atom<URL>(new URL(SITE_URL))
