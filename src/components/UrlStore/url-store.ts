import { SITE_URL } from '@/lib/consts'
import { atom } from 'nanostores'

export const url = atom<URL>(new URL(SITE_URL))
