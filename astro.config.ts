import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import purgecss from "astro-purgecss";
import cloudflare from "@astrojs/cloudflare";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
// import rehypePrettyCode from "rehype-pretty-code";
import rehypeCodeTitles from "rehype-code-titles";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://my-astro-blog-4xp.pages.dev/",
  integrations: [
    mdx(),
    sitemap(),
    purgecss({
      fontFace: true,
      keyframes: true,
    }),
    tailwind(),
  ],
  output: "server",
  adapter: cloudflare(),
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkMath, remarkGfm],
    rehypePlugins: [
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
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
});
