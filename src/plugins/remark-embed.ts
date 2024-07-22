import type { RemarkPlugin } from '@astrojs/markdown-remark';
import type { Parent, Root } from 'mdast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { isBareLink, isParent } from './mdast-is';
import { type Transformer, getHName, getHProperties } from './transformers';

export type RemarkEmbedOptions = {
  transformers: Transformer[];
};

const defaultRemarkEmbedOptions: Readonly<RemarkEmbedOptions> = {
  transformers: [],
};

const remarkEmbed: Plugin<[RemarkEmbedOptions?], Root> = (
  options = defaultRemarkEmbedOptions,
): ReturnType<RemarkPlugin> => {
  return async (tree, file) => {
    const transforms: Promise<void>[] = [];

    visit(tree, isBareLink, (node, _index, parent: Parent | undefined) => {
      if (!isParent(parent)) return;

      const link = node.children[0];

      if (
        (link.data?.hName !== undefined && link.data?.hName !== 'a') ||
        link.children[0].value !== link.url
      )
        return;

      const url = new URL(link.url);

      const transform = async () => {
        for (const transformer of options.transformers) {
          if (!(await transformer.shouldTransform(url))) continue;

          if (!link.data) link.data = {};

          const hName = await getHName(transformer, url);
          const hProperties = await getHProperties(transformer, url);

          link.data = {
            ...link.data,
            hName,
            hProperties: {
              ...(link.data?.hProperties ?? {}),
              ...hProperties,
              url: link.url,
            },
          };

          return;
        }
      };
      transforms.push(
        transform().catch((e) => {
          const msg = `Failed to embed ${link.url} in ${file.path} at line ${link.position?.start?.line}`;
          file.message(
            `${msg}; ${JSON.stringify(e)}`,
            link.position,
            'remarkEmbed',
          );
        }),
      );
    });

    await Promise.all(transforms);
  };
};

export default remarkEmbed;
