import { defineConfig, passthroughImageService } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import solid from '@astrojs/solid-js'
import purgecss from 'astro-purgecss'
import browserslist from 'browserslist'
import { browserslistToTargets } from 'lightningcss'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import solidPlugin from 'vite-plugin-solid'
import { h } from 'hastscript'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeAutolinkHeadings, {
  type Options as RehypeAutoLinkHeadingsOptions,
} from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode, {
  type Options as RehypePrettyCodeOptions,
} from 'rehype-pretty-code'
import rehypeImageFigure from './src/plugins/rehype-image-figure'
import rehypePagefindIgnore from './src/plugins/rehype-pagefind-ignore'
import remarkCallout from './src/plugins/remark-callout'
import remarkAstroImageAssets from './src/plugins/remark-astro-image-assets'
import remarkFootnote from './src/plugins/remark-footnote'
import remarkLinkCard from './src/plugins/remark-link-card'
import remarkLineBreaks from './src/plugins/remark-line-breaks'
import remarkEmbed, {
  type RemarkEmbedOptions,
} from './src/plugins/remark-embed'
import {
  googleSlidesTransformer,
  youTubeTransformer,
  oEmbedTransformer,
} from './src/plugins/transformers'
import { SITE_URL } from './src/consts'

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  output: 'hybrid',
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
      persist: true,
    },
  }),
  image: {
    service: passthroughImageService(),
  },
  integrations: [
    mdx(),
    solid(),
    purgecss({
      fontFace: true,
    }),
    sitemap(),
  ],
  prefetch: {
    defaultStrategy: 'viewport',
    prefetchAll: true,
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja'],
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
          pattern: '[hash]-[local]',
        },
        drafts: {
          customMedia: true,
        },
        targets: browserslistToTargets(browserslist('>= 0.1%')),
      },
    },
    plugins: [vanillaExtractPlugin(), solidPlugin()],
    ssr: {
      external: ['node:fs', 'unfurl.js'],
    },
  },
  markdown: {
    syntaxHighlight: false,
    smartypants: false,
    remarkRehype: {
      footnoteLabel: ' ',
      footnoteLabelProperties: { className: [''] },
      footnoteLabelTagName: 'hr',
    },
    remarkPlugins: [
      remarkMath,
      remarkGfm,
      remarkAstroImageAssets,
      remarkCallout,
      remarkFootnote,
      remarkLineBreaks,
      [
        remarkEmbed,
        {
          transformers: [
            googleSlidesTransformer,
            youTubeTransformer,
            oEmbedTransformer,
          ],
        } satisfies RemarkEmbedOptions,
      ],
      remarkLinkCard,
    ],
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug,
      rehypeImageFigure,
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
        } satisfies RehypeAutoLinkHeadingsOptions,
      ],
      [
        rehypePrettyCode,
        {
          theme: {
            light: 'catppuccin-latte',
            dark: 'github-dark',
          },
          grid: false,
        } satisfies RehypePrettyCodeOptions,
      ],
      rehypePagefindIgnore,
    ],
  },
})
