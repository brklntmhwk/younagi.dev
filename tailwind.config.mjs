import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		darkMode: "media",
		extend: {
			animation: {
        fadeInUp: "fadeInUp 800ms ease-out forwards",
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
      },
			fontFamily: {
				sans: ['var(--font-sans, ui-sans-serif)', ...defaultTheme.fontFamily.sans],
				pixelMPlus: ['var(--font-pixelMPlus)']
			},
      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: 0,
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      },
		},
	},
	plugins: [],
}
