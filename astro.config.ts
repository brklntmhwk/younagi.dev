import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import solidJs from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
import compress from 'astro-compress';
import { defineConfig, passthroughImageService } from 'astro/config';
import { h } from 'hastscript';
import rehypeAutolinkHeadings, {
  type Options as RehypeAutoLinkHeadingsOptions,
} from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode, {
  type Options as RehypePrettyCodeOptions,
} from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkCard, { type Config as RemarkCardConfig } from 'remark-card';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkVideo, { type Config as RemarkVideoConfig } from 'remark-video';
import { iconNameTypes } from './src/lib/astro-integrations/icon-name-type';
import { pagefind } from './src/lib/astro-integrations/pagefind';
import { SITE_URL, VIDEO_FALLBACK_MESSAGE } from './src/lib/consts';
import rehypePagefindIgnore from './src/lib/unified/plugins/rehype-pagefind-ignore';
import remarkAstroImageAssets from './src/lib/unified/plugins/remark-astro-image-assets';
import remarkCallout from './src/lib/unified/plugins/remark-callout';
import remarkEmbed, {
  type RemarkEmbedOptions,
} from './src/lib/unified/plugins/remark-embed';
import remarkFootnote from './src/lib/unified/plugins/remark-footnote';
import remarkLineBreaks from './src/lib/unified/plugins/remark-line-breaks';
import remarkLinkCard from './src/lib/unified/plugins/remark-link-card';
import {
  canvaTransformer,
  googleSlidesTransformer,
  oEmbedTransformer,
  youTubeTransformer,
} from './src/lib/unified/transformers';

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
    tailwind({
      applyBaseStyles: false,
    }),
    solidJs(),
    sitemap(),
    iconNameTypes(),
    pagefind(),
    compress({
      CSS: true,
      HTML: false,
      Image: false,
      JavaScript: true,
      SVG: false,
      Logger: 1,
    }),
  ],
  prefetch: {
    defaultStrategy: 'viewport',
    prefetchAll: true,
  },
  trailingSlash: "always",
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja'],
  },
  vite: {
    css: {
      devSourcemap: true,
      transformer: 'postcss',
    },
    server: {
      watch: {
        usePolling: true,
        interval: 1000,
      },
    },
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
      remarkDirective,
      remarkAstroImageAssets,
      remarkCallout,
      [
        remarkCard,
        {
          customHTMLTags: {
            enabled: true,
          },
          cardGridClass: 'card-grid',
          cardClass: 'card',
        } satisfies RemarkCardConfig,
      ],
      [
        remarkVideo,
        {
          videoContainerTag: 'figure',
          fallbackContent: h('p.fallback-content', VIDEO_FALLBACK_MESSAGE),
        } satisfies RemarkVideoConfig,
      ],
      remarkFootnote,
      [
        remarkEmbed,
        {
          transformers: [
            canvaTransformer,
            googleSlidesTransformer,
            youTubeTransformer,
            oEmbedTransformer,
          ],
        } satisfies RemarkEmbedOptions,
      ],
      remarkLinkCard,
      remarkLineBreaks,
    ],
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
            ['#'],
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
});
