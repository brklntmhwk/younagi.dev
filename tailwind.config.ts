import type { Config } from 'tailwindcss';
import { gridAreas } from 'tailwindcss-grid-areas';
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

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
  ],
} satisfies Config;
