import type { Parent, Root } from 'mdast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { isBareLink, isParent } from '../mdast-is';

const remarkLinkCard: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, isBareLink, (node, _i, parent: Parent | undefined) => {
      if (!isParent(parent)) return;

      const link = node.children[0];

      if (
        link.children[0].value !== link.url ||
        !link.url.startsWith('http') ||
        parent.type === 'listItem'
      )
        return;

      link.data = {
        ...link.data,
        hProperties: {
          ...(link.data?.hProperties ?? {}),
          dataLinkCard: true,
        },
      };
    });
  };
};

export default remarkLinkCard;
