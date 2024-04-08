import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import purgecss from 'astro-purgecss'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
// import rehypePrettyCode from "rehype-pretty-code";
import rehypeCodeTitles from 'rehype-code-titles'

// https://astro.build/config
export default defineConfig({
  site: 'https://my-astro-blog-4xp.pages.dev/',
  integrations: [
    mdx(),
    sitemap(),
    purgecss({
      fontFace: true,
      keyframes: true,
    }),
  ],
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkMath, remarkGfm],
    rehypePlugins: [
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
        },
      ],
      rehypeKatex,
      rehypeSlug,
      rehypeCodeTitles,
      // [
      //   rehypePrettyCode,
      //   {
      //     theme: {
      //       light: "github-light",
      //       dark: "github-dark",
      //     },
      //   },
      // ],
    ],
  },
})
