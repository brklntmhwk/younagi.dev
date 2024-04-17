import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import purgecss from 'astro-purgecss'
import { h } from 'hastscript'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'
// import type { LineElement } from 'rehype-pretty-code'

// https://astro.build/config
export default defineConfig({
  site: 'https://my-astro-blog-4xp.pages.dev/',
  integrations: [
    mdx({
      optimize: true,
    }),
    sitemap(),
    purgecss({
      fontFace: true,
      keyframes: true,
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
      },
    },
  },
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkMath, remarkGfm],
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug,
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
            light: 'github-dark',
            dark: 'github-light',
          },
          grid: false,
          // onVisitLine(elm: LineElement) {
          //   // Prevent lines from collapsing in `display: grid` mode, and allow empty lines to be copy/pasted
          //   if (elm.children.length === 0) {
          //     elm.children = [{ type: 'text', value: ' ' }]
          //   }
          // },
          // onVisitHighlightedLine(elm: LineElement) {
          //   // Each line element by default has `class="line"`.
          //   elm.properties.className?.push('highlighted')
          // },
          // onVisitHighlightedWord(elm: LineElement) {
          //   // Each word element has no className by default.
          //   elm.properties.className = ['word']
          // },
        },
      ],
    ],
  },
})
