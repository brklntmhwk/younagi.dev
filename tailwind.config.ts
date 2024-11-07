import type { Config } from 'tailwindcss';
import { gridAreas } from 'tailwindcss-grid-areas';
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

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
    },
    extend: {
      animation: {
        fadeInUp: 'fadeInUp 800ms ease-out forwards',
      },
      colors: {
        default: 'var(--fg)',
        'default-reverse': 'var(--bg)',
        'line-solid': 'var(--line-solid)',
        'line-double': 'var(--line-double)',
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
        xsm: '4px',
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
        xsm: '480px',
      },
    },
  },
  plugins: [
    gridAreas({
      main: {
        base: ['main', 'footer'],
        lg: ['navigation main', 'navigation footer']
      },
      navigation: ['blog-title', 'nav-menu'],
    }),
  ],
} satisfies Config;
