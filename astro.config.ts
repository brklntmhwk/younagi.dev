import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import purgecss from 'astro-purgecss'
import browserslist from 'browserslist'
import { Features, browserslistToTargets } from 'lightningcss'
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

// https://astro.build/config
export default defineConfig({
  site: 'https://younagi.dev/en/',
  integrations: [
    mdx({
      optimize: true,
    }),
    sitemap(),
    purgecss({
      fontFace: true,
    }),
  ],
  trailingSlash: 'always',
  prefetch: {
    defaultStrategy: 'viewport',
    prefetchAll: true,
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  image: {
    domains: ['unsplash.com'],
  },
  vite: {
    build: {
      cssMinify: 'lightningcss',
      sourcemap: 'hidden',
      minify: 'esbuild',
      // rollupOptions: {
      //   external: ['sharp'],
      // },
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
        exclude: Features.VendorPrefixes,
        targets: browserslistToTargets(browserslist('>= 0.1%')),
      },
    },
  },
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [
      remarkMath,
      remarkGfm,
      remarkAstroImageAssets,
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
            light: 'vitesse-light',
            dark: 'github-dark',
          },
          grid: false,
        },
      ],
    ],
  },
})
