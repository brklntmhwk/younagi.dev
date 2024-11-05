import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import solidJs from '@astrojs/solid-js';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import purgecss from 'astro-purgecss';
import { defineConfig, sharpImageService } from 'astro/config';
import browserslist from 'browserslist';
import { h } from 'hastscript';
import { browserslistToTargets } from 'lightningcss';
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
import { iconNameTypes } from './src/lib/astro-integrations/icon-name-type';
import { pagefind } from './src/lib/astro-integrations/pagefind';
import { SITE_URL } from './src/lib/consts';
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
    service: sharpImageService({ limitInputPixels: false }),
  },
  integrations: [
    mdx(),
    solidJs(),
    purgecss({
      fontFace: true,
    }),
    sitemap(),
    iconNameTypes(),
    pagefind(),
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
    },
    css: {
      devSourcemap: true,
      transformer: 'lightningcss',
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
    plugins: [vanillaExtractPlugin()],
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
      remarkFootnote,
      remarkLineBreaks,
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
