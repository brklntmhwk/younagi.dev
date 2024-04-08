export const languages = {
  en: 'English',
  ja: 'Japanese',
}

export const defaultLang = 'en'

// Preferably yaml

export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    '404.not_found': 'Page Not Found',
    'global.back_to_top': 'Back to Top',
  },
  ja: {
    'nav.home': 'ホーム',
    'nav.blog': 'ブログ',
    'nav.about': '私について',
    '404.not_found': 'ページが見つかりませんでした',
    'global.back_to_top': 'トップに戻る',
  },
} as const
