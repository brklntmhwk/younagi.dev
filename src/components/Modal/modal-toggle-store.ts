import { atom } from 'nanostores'
import type { Accessor, Setter } from 'solid-js'

export const toggle = atom<{
  isOpen: Accessor<boolean>
  setIsOpen: Setter<boolean>
} | null>(null)
