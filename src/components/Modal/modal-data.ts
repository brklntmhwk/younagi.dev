export type ModalContent = 'search' | 'locale' | 'toc' | 'buy_me_a_coffee'
type ShortcutKeyMap = {
  [key in ModalContent]: string[]
}

export const shortcutKeyMap: ShortcutKeyMap = {
  search: ['Control', 'K'],
  locale: ['Control', 'L'],
  toc: ['Control', 'Shift', 'C'],
  buy_me_a_coffee: [],
}
