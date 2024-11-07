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
    colors: {
      blue: {
        ...colors.blue,
        400: 'hsl(215.24, 100%, 52.63%)',
        500: 'hsl(220, 98.54%, 43.86%)',
        600: 'hsl(240.24, 100%, 48.63%)',
        800: 'hsl(240, 98.54%, 26.86%)',
      },
      gray: {
        ...colors.gray,
      },
    },
    extend: {
      animation: {
        fadeInUp: 'fadeInUp 800ms ease-out forwards',
      },
      colors: {
        default: 'var(--color-fg)',
        'default-reverse': 'var(--color-bg)',
        accent: 'var(--color-accent)',
        'accent-dark': 'var(--color-dark-accent)',
        'line-solid': 'var(--color-line-solid)',
        'line-double': 'var(--color-line-double)',
        'bulletin-fg': 'var(--bulletin-fg)',
        'bulletin-bg': 'var(--bulletin-bg)',
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
      },
      screens: {
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
              '&:not(h2 a, h3 a, h4 a, h5 a, h6 a)': {
                color: theme('colors.accent'),
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
                '&:hover': {
                  color: theme('colors.accent-dark'),
                },
              },
            },
            'h2 a, h3 a, h4 a, h5 a, h6 a': {
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
            'ul li': {
              listStyleType: 'square',
            },
            'ol li': {
              listStyleType: 'decimal',
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
              },
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
            'ul, ol': {
              paddingInlineStart: '2.5rem',
            },
          },
        },
        xl: {
          css: {
            'ul, ol': {
              paddingInlineStart: '2.75rem',
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
