export type ModalContent = 'search' | 'locale' | 'contact' | 'buy_me_a_coffee';
type ShortcutKeyMap = {
  [key in ModalContent]: string[];
};

export const shortcutKeyMap: ShortcutKeyMap = {
  search: ['Control', 'K'],
  locale: ['Control', 'L'],
  contact: ['Control', 'Shift', 'C'],
  buy_me_a_coffee: [],
};
