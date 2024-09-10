import type { RemarkPlugin } from '@astrojs/markdown-remark';
import type { BlockContent, DefinitionContent, Image, Link, Root } from 'mdast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { isParent } from './mdast-is';

const parseSign = (sign: string | undefined): string | undefined => {
  if (sign === undefined || sign === '') return;

  const matched = sign.match(/@(?<borderType>[-=.])?$/);

  const borderTypeSign = matched?.groups?.borderType;
  const borderType =
    borderTypeSign === '-'
      ? 'solid'
      : borderTypeSign === '='
        ? 'double'
        : borderTypeSign === '.'
          ? 'pixel'
          : 'solid';

  return borderType;
};

const remarkCard: Plugin<[], Root> = (): ReturnType<RemarkPlugin> => {
  return (tree) => {
    visit(tree, 'list', (node) => {
      if (!isParent(node)) return;
      if (node.children.length === 0) return;

      for (const listItemNode of node.children) {
        if (!isParent(listItemNode)) continue;
        if (listItemNode.children.length === 0) continue;

        const cardSignNode = listItemNode.children[0];
        if (cardSignNode?.type !== 'paragraph') continue;

        if (!isParent(cardSignNode)) continue;
        if (cardSignNode.children.length === 0) continue;

        const cardSign = cardSignNode.children[0];
        if (cardSign?.type !== 'text') continue;

        const cardSignText = cardSign.value;
        if (!cardSignText.startsWith('@')) continue;

        const [sign, ...rest] = cardSignText.split(/\s/);
        const imageAlt = rest.join(' ');
        const borderType = parseSign(sign);

        const cardListNode = listItemNode.children[1];
        if (cardListNode?.type !== 'list') continue;

        if (!isParent(cardListNode)) continue;
        if (cardListNode.children.length === 0) continue;

        const [cardListImageNode, ...cardListContentNodes] =
          cardListNode.children;
        if (!isParent(cardListImageNode)) continue;
        if (cardListImageNode.children.length === 0) continue;

        const cardImageNode = cardListImageNode.children[0];
        if (cardImageNode?.type !== 'paragraph') continue;

        if (!isParent(cardImageNode)) continue;
        if (cardImageNode.children.length === 0) continue;

        const cardImageOrLink = cardImageNode.children[0];
        const imageMap = new Map<'url' | 'alt', string | null | undefined>();
        let imageNode: Image | Link;
        if (cardImageOrLink?.type === 'image') {
          imageMap.set('url', cardImageOrLink.url);
          imageMap.set('alt', imageAlt !== '' ? imageAlt : cardImageOrLink.alt);
          imageNode = {
            type: 'image',
            alt: imageMap.get('alt'),
            url: imageMap.get('url'),
          } as Image;
        } else if (cardImageOrLink?.type === 'link') {
          const cardImage = cardImageOrLink.children[0];
          if (cardImage?.type !== 'image') continue;

          imageMap.set('url', cardImage.url);
          imageMap.set('alt', imageAlt !== '' ? imageAlt : cardImage.alt);
          imageNode = {
            type: 'link',
            url: cardImageOrLink.url,
            children: [
              {
                type: 'image',
                alt: imageMap.get('alt'),
                url: imageMap.get('url'),
              } as Image,
            ],
          } as Link;
        } else {
          continue;
        }

        const imageWrapperNode: BlockContent | DefinitionContent = {
          type: 'paragraph',
          data: {
            hName: 'div',
            hProperties: {
              slot: 'image',
              className: 'card-image',
            },
          },
          children: [imageNode],
        };

        const contentNode: BlockContent | DefinitionContent = {
          type: 'paragraph',
          data: {
            hName: 'div',
            hProperties: {
              slot: 'content',
              className: 'card-content',
            },
          },
          children: [],
        };

        cardListContentNodes.forEach((cardListContentNode, index, thisArr) => {
          if (!isParent(cardListContentNode)) return;
          if (cardListContentNode.children.length === 0) return;

          const cardContentNode = cardListContentNode.children[0];
          if (cardContentNode?.type !== 'paragraph') return;

          if (!isParent(cardContentNode)) return;
          if (cardContentNode.children.length === 0) return;

          const cardContent = cardContentNode.children[0];
          if (cardContent?.type !== 'text') return;

          contentNode.children.push(cardContent);

          if (thisArr.length !== index) {
            contentNode.children.push({
              type: 'text',
              value: '\n',
            });
          }
        });

        node.data = {
          ...node.data,
          hName: 'card-grid',
        };

        listItemNode.data = {
          ...listItemNode.data,
          hName: 'card',
          hProperties: {
            dataBorderType: borderType,
          },
        };

        listItemNode.children = [imageWrapperNode, contentNode];
      }
    });
  };
};

export default remarkCard;
