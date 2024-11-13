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

        amber: {
          ...colors.amber,
        },
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
        indigo: {
          ...colors.indigo,
        },
        neutral: {
          ...colors.neutral,
        },
        orange: {
          ...colors.orange,
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
        sky: {
          ...colors.sky,
        },
        stone: {
          ...colors.stone,
        },
        teal: {
          ...colors.teal,
          600: 'hsl(180, 58%, 42%)',
        },
        transparent: colors.transparent,
      },
      fontFamily: {
        sans: [
          'var(--font-sans, ui-sans-serif)',
          ...defaultTheme.fontFamily.sans,
        ],
        pixelMPlus: ['var(--font-pixelMPlus)'],
      },
      fontSize: {},
      lineHeight: {
        extraloose: '2.25',
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
            'h5, h6': {
              fontWeight: 600,
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
            'h2 a, h3 a, h4 a, h5 a, h6': {
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
              color: theme('colors.default')
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
            code: {
              '&:not(figure[data-rehype-pretty-code-figure] code)': {
                fontSize: '0.95rem',
                color: theme('colors.gray.800'),
                backgroundColor: theme('colors.gray.200'),
                padding: '0.1rem 0.25rem',
                marginLeft: '0.1rem',
                marginRight: '0.1rem',
                borderRadius: '0.25rem',
                '&::before': {
                  display: 'none',
                },
                '&::after': {
                  display: 'none',
                },
              },
              '& [data-line]': {
                borderLeft: '4px solid transparent',
                padding: '0 0.55rem',
                '&::before': {
                  counterIncrement: 'line',
                  content: 'counter(line)',
                  display: 'inline-block',
                  width: '1rem',
                  marginRight: '1.05rem',
                  textAlign: 'right',
                  color: 'hsla(60, 0.52%, 55.55%, 1)',
                },
              },
              '& [data-highlighted-line]': {
                backgroundColor: 'hsla(242, 100%, 90%, 0.3)',
                borderLeftColor: 'hsla(242, 94.78%, 82.45%, 0.8)',
                '& span': {
                  backgroundColor: 'unset',
                },
              },
              '& [data-highlighted-chars]': {
                backgroundColor: 'hsla(242, 100%, 90%, 0.3)',
                padding: '0.25rem',
                borderRadius: '0.25rem',
                '& span': {
                  backgroundColor: 'unset',
                },
              },
            },
            'figure[data-rehype-pretty-code-figure]': {
              margin: '3.75rem 0 1.75rem 0',
              position: 'relative',
              fontSize: '0.875rem',
              '& pre': {
                maxHeight: '30rem',
                borderRadius: '0.25rem',
                overflow: 'auto',
              },
              '& code': {
                fontFamily: 'Menlo, Consolas, monospace',
                fontSize: '0.875rem',
                counterReset: 'line',
                display: 'grid',
              },
              '&:not(:has([data-rehype-pretty-code-title]))': {
                margin: '1.75rem 0',
              },
              '& [data-rehype-pretty-code-title]': {
                fontFamily: 'Menlo, Consolas, monospace',
                fontSize: '0.875rem',
                width: '100%',
                position: 'absolute',
                top: '-35px',
                left: '0',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                padding: '0.25rem 0.75rem',
                color: 'hsla(0, 1.27%, 20.98%, 1)',
                backgroundColor: 'hsla(220, 1.5%, 87.55%, 1)',
                borderRadius: '0.15rem 0.15rem 0.15rem 0',
              },
              '& [data-rehype-pretty-code-title] + pre': {
                marginTop: '2.85rem',
                padding: '0.85rem 0',
              },
              'pre:not([data-rehype-pretty-code-title] + pre)': {
                padding: '0.75rem 0',
              },
            },
            'pre[data-theme*=" "]': {
              color: 'var(--shiki-light)',
              backgroundColor: 'var(--shiki-light-bg)',
            },
            'pre[data-theme*=" "] span': {
              color: 'var(--shiki-light)',
              backgroundColor: 'var(--shiki-light-bg)',
            },
            table: {
              display: 'block',
              maxWidth: '86vw',
              borderCollapse: 'collapse',
              tableLayout: 'fixed',
              overflowX: 'auto',
              textAlign: 'center',
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
            },
            'th, td': {
              fontSize: '1rem',
              borderColor: '(--color-line-solid)',
              borderStyle: 'solid',
              borderWidth: '2px',
              padding: '0.5rem 0.65rem',
            },
            strong: {
              color: 'inherit',
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
        dark: {
          css: {
            code: {
              '& [data-line]': {
                '&::before': {
                  color: 'hsla(60, 0.52%, 75.55%, 1)',
                },
              },
              '& [data-highlighted-line]': {
                backgroundColor: 'hsla(213.49, 87.31%, 82%, 0.2)',
                borderLeftColor: 'hsla(213.49, 84.31%, 70%, 0.8)',
              },
              '& [data-highlighted-chars]': {
                backgroundColor: 'hsla(213.49, 87.31%, 82%, 0.2)',
              },
            },
            'figure[data-rehype-pretty-code-figure]': {
              '& [data-rehype-pretty-code-title]': {
                color: 'hsla(60, 0.52%, 85.55%, 1)',
                backgroundColor: 'hsla(0, 1.27%, 30.98%, 1)',
              },
            },
            'pre[data-theme*=" "]': {
              color: 'var(--shiki-dark)',
              backgroundColor: 'var(--shiki-dark-bg)',
            },
            'pre[data-theme*=" "] span': {
              color: 'var(--shiki-dark)',
              backgroundColor: 'var(--shiki-dark-bg)',
            },
          },
        },
        lg: {
          css: {
            'ul, ol': {
              paddingInlineStart: '2.5rem',
            },
            '[data-link-card] img': {
              marginTop: '0',
              marginBottom: '0',
            },
          },
        },
        xl: {
          css: {
            'ul, ol': {
              paddingInlineStart: '2.75rem',
            },
            '[data-link-card] img': {
              marginTop: '0',
              marginBottom: '0',
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
