import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'
import solid from '@astrojs/solid-js'
import purgecss from 'astro-purgecss'
import browserslist from 'browserslist'
import { browserslistToTargets } from 'lightningcss'
import { h } from 'hastscript'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeMarkImageFigure from './src/plugins/rehype-image-figure'
import remarkAstroImageAssets from './src/plugins/remark-astro-image-assets'
import remarkLineBreaks from './src/plugins/remark-line-breaks'
import remarkCallout from './src/plugins/remark-callout'

// https://astro.build/config
export default defineConfig({
  site: 'https://younagi.dev',
  output: 'hybrid',
  adapter: cloudflare(),
  integrations: [
    mdx(),
    react({
      include: '**/OgImage/*',
    }),
    solid({
      exclude: '**/OgImage/*',
    }),
    purgecss({
      fontFace: true,
    }),
    sitemap(),
  ],
  // trailingSlash: 'never',
  prefetch: {
    defaultStrategy: 'viewport',
    prefetchAll: true,
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja'],
    // routing: {
    //   prefixDefaultLocale: true,
    // },
  },
  vite: {
    build: {
      cssMinify: 'lightningcss',
      sourcemap: 'hidden',
      minify: 'esbuild',
    },
    css: {
      devSourcemap: true,
      transformer: 'lightningcss',
      // @ts-expect-error Object literals may only specify known properties ... probably because Vite or Astro haven't updated their config to reflect the actually existing analyzeDependencies option from LightningCSS yet.
      analyzeDependencies: true,
      lightningcss: {
        cssModules: {
          pattern: '[local]',
        },
        drafts: {
          customMedia: true,
        },
        targets: browserslistToTargets(browserslist('>= 0.1%')),
      },
    },
    ssr: {
      external: ['node:fs'],
    },
  },
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [
      remarkMath,
      remarkGfm,
      remarkAstroImageAssets,
      remarkCallout,
      remarkLineBreaks,
    ],
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug,
      rehypeMarkImageFigure,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'prepend',
          content: h(
            'span.heading-anchor-icon',
            {
              title: 'Anchor link',
            },
            ['#']
          ),
        },
      ],
      [
        rehypePrettyCode,
        {
          theme: {
            light: 'catppuccin-latte',
            dark: 'github-dark',
          },
          grid: false,
        },
      ],
    ],
  },
})
