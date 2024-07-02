export type ModalContent = 'search' | 'locale' | 'toc'
type ShortcutKeyMap = {
  [key in ModalContent]: string[]
}

export const shortcutKeyMap: ShortcutKeyMap = {
  search: ['Control', 'K'],
  locale: ['Control', 'L'],
  toc: ['Control', 'Shift', 'C'],
}
