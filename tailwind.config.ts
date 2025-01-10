import typoGraphy from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import { gridAreas } from 'tailwindcss-grid-areas';
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';
import type { PluginAPI } from 'tailwindcss/types/config';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'media',
  theme: {
    extend: {
      animation: {
        fadeInUp: 'fadeInUp 800ms ease-out forwards',
        bulletinRoll: 'bulletinRoll 17s linear infinite',
      },
      colors: {
        default: 'var(--color-default-fg)',
        'default-reverse': 'var(--color-default-bg)',
        'default-reverse-hover': 'var(--color-default-bg-hover)',
        'default-mixed': 'var(--color-default-mixed)',
        primary: 'var(--color-primary)',
        'primary-dim': 'var(--color-primary-dim)',
        secondary: 'var(--color-secondary)',
        'line-solid': 'var(--color-line-solid)',
        'line-double': 'var(--color-line-double)',
        'bulletin-fg': 'var(--color-bulletin-fg)',
        'bulletin-bg': 'var(--color-bulletin-bg)',
        'star-empty': 'var(--color-star-empty)',
        'star-filled': 'var(--color-star-filled)',
        'star-glow': 'var(--color-star-glow)',
        'modal-bg': 'var(--color-modal-bg)',

        blue: {
          ...colors.blue,
          400: 'hsl(215.24, 100%, 52.63%)',
          500: 'hsl(220, 98.54%, 43.86%)',
          600: 'hsl(240.24, 100%, 48.63%)',
          800: 'hsl(240, 98.54%, 26.86%)',
        },
        gray: {
          ...colors.gray,
          DEFAULT: colors.gray[500],
          dark: {
            DEFAULT: colors.gray[600],
          },
        },
        green: {
          ...colors.green,
          DEFAULT: colors.green[500],
          dark: {
            DEFAULT: colors.green[600],
          },
        },
        purple: {
          ...colors.purple,
          DEFAULT: colors.purple[500],
          dark: {
            DEFAULT: colors.purple[600],
          },
        },
        red: {
          ...colors.red,
          DEFAULT: colors.red[500],
          dark: {
            DEFAULT: colors.red[600],
          },
        },
        teal: {
          ...colors.teal,
          600: 'hsl(180, 58%, 42%)',
        },
      },
      fontFamily: {
        // base: [
        //   'var(--font-base)',
        //   ...defaultTheme.fontFamily.sans,
        // ],
        pixel: [
          'var(--font-pixel)',
          ...defaultTheme.fontFamily.mono,
        ],
      },
      backdropBlur: {
        xs: '4px',
        sm: '6px',
      },
      backdropSaturate: {
        180: '1.8',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        bulletinRoll: {
          '0%': {
            transform: 'translateX(0)',
          },
          '100%': {
            transform: 'translateX(-100%)',
          },
        },
      },
      screens: {
        xxs: '320px',
        xs: '480px',
      },
      typography: (theme: PluginAPI['theme']) => ({
        DEFAULT: {
          css: {
            color: theme('colors.default'),
            'h2, h3, h4, h5, h6': {
              color: theme('colors.default'),
            },
            'h5, h6': {
              fontWeight: 600,
            },
            'p, li': {
              fontSize: '1.0125rem',
              fontWeight: 400,
              lineHeight: '1.825rem',
            },
            a: {
              '&:not(h2 a, h3 a, h4 a, h5 a, h6 a, a[data-link-card])': {
                color: theme('colors.primary'),
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
                '&:hover': {
                  color: theme('colors.primary-dim'),
                },
              },
            },
            'h2 a, h3 a, h4 a, h5 a, h6 a': {
              color: theme('colors.default'),
              textDecoration: 'none',
              '.heading-anchor-icon': {
                marginRight: '0.5rem',
              },
              '&:hover': {
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
                textDecorationColor: theme('colors.default'),
              },
            },
            'a[data-link-card]': {
              textDecoration: 'none',
            },
            '[data-link-card] img': {
              marginTop: '0',
              marginBottom: '0',
            },
            'li::marker': {
              color: theme('colors.neutral.500'),
            },
            'ul li': {
              listStyleType: 'square',
            },
            'ol li': {
              listStyleType: 'decimal',
            },
            blockquote: {
              fontSize: '1.125rem',
              borderColor: 'var(--color-dark-gray)',
              borderStyle: 'solid',
              borderLeftWidth: '4px',
              paddingLeft: '1.5rem',
              margin: '0',
            },
            table: {
              display: 'block',
              maxHeight: '50vh',
              borderCollapse: 'collapse',
              tableLayout: 'fixed',
              overflowX: 'auto',
              overflowY: 'scroll',
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
            },
            th: {
              '&:first-child': {
                paddingInlineStart: '0.5rem'
              },
              '&:last-child': {
                paddingInlineEnd: '0.5rem'
              }
            },
            td: {
              '&:first-child': {
                paddingInlineStart: '0.5rem'
              },
              '&:last-child': {
                paddingInlineEnd: '0.5rem'
              }
            },
            'th, td': {
              color: theme('colors.default'),
              textAlign: 'center',
              whiteSpace: 'nowrap',
              fontSize: '1rem',
              borderColor: theme('colors.neutral.400'),
              borderStyle: 'solid',
              borderWidth: '2px',
              padding: '0.5rem 0.65rem',
            },
            strong: {
              color: 'inherit',
            },
            hr: {
              marginTop: '1.75rem',
              marginBottom: '1.75rem',
            },
            '.katex-display': {
              marginTop: '1.875rem',
              marginBottom: '1.875rem',
              paddingTop: '0.25rem',
              paddingBottom: '0.25rem',
              overflowX: 'auto',
              overflowY: 'hidden',
            },
          },
        },
        lg: {
          css: {
            'p, li': {
              fontSize: '1.075rem',
              fontWeight: 500,
            },
            'ul, ol': {
              paddingInlineStart: '2.5rem',
            },
            '[data-link-card] img': {
              marginTop: '0',
              marginBottom: '0',
            },
            table: {
              maxWidth: '86vw',
            },
            hr: {
              marginTop: '1.785rem',
              marginBottom: '1.785rem',
            },
          },
        },
      }),
    },
  },
  plugins: [
    gridAreas({
      main: {
        base: ['main', 'footer'],
        lg: ['navigation main', 'navigation footer'],
      },
      navigation: ['blog-title', 'nav-menu'],
    }),
    typoGraphy(),
  ],
} satisfies Config;
