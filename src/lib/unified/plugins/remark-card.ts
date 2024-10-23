import type { RemarkPlugin } from '@astrojs/markdown-remark';
import type { BlockContent, DefinitionContent, Root } from 'mdast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { isLink, isList, isParagraph, isParent, isText } from '../mdast-is';

type BorderStyleMap = {
  className: string;
  markdownSymbol: string;
};
type RemarkCardOptions = {
  borderStyles: BorderStyleMap[];
};

const defaultRemarkCardOptions: Readonly<RemarkCardOptions> = {
  borderStyles: [
    {
      className: 'solid',
      markdownSymbol: '-',
    },
    {
      className: 'double',
      markdownSymbol: '=',
    },
    {
      className: 'pixel',
      markdownSymbol: '.',
    },
  ],
};

const parseSign = (
  sign: string | undefined,
  borderStyles: BorderStyleMap[],
): string | undefined => {
  if (sign === undefined || sign === '') return;

  const defaultSymbol = borderStyles[0]?.markdownSymbol;
  if (defaultSymbol === undefined) return;

  const symbols = borderStyles.map((style) => style.markdownSymbol);
  const reg = new RegExp(`@(?<borderType>[${symbols.join()}])?$`);
  const matched = sign.match(reg);

  const borderTypeSign = matched?.groups?.borderType;
  let borderType: string = defaultSymbol;

  for (const style of borderStyles) {
    if (borderTypeSign === style.markdownSymbol) {
      borderType = style.className;
    }
  }

  return borderType;
};

const remarkCard: Plugin<[RemarkCardOptions?], Root> = (
  options = defaultRemarkCardOptions,
): ReturnType<RemarkPlugin> => {
  return (tree) => {
    visit(tree, isList, (node) => {
      if (!isParent(node)) return;
      if (node.children.length === 0) return;

      for (const listItemNode of node.children) {
        if (!isParent(listItemNode)) continue;
        if (listItemNode.children.length === 0) continue;

        const cardSignNode = listItemNode.children[0];
        if (!isParagraph(cardSignNode)) continue;

        if (!isParent(cardSignNode)) continue;
        if (cardSignNode.children.length === 0) continue;

        const cardSign = cardSignNode.children[0];
        if (!isText(cardSign)) continue;

        const cardSignText = cardSign.value;
        if (!cardSignText.startsWith('@')) continue;

        const [sign, ...rest] = cardSignText.split(/\s/);
        const imageAlt = rest.join(' ');
        const borderType = parseSign(sign, options.borderStyles);

        const cardListNode = listItemNode.children[1];
        if (!isList(cardListNode)) continue;

        if (!isParent(cardListNode)) continue;
        if (cardListNode.children.length === 0) continue;

        const [cardListImageNode, ...cardListContentNodes] =
          cardListNode.children;
        if (!isParent(cardListImageNode)) continue;
        if (cardListImageNode.children.length === 0) continue;

        const cardImageNode = cardListImageNode.children[0];
        if (!isParagraph(cardImageNode)) continue;

        if (!isParent(cardImageNode)) continue;
        if (cardImageNode.children.length === 0) continue;

        const cardImageOrLink = cardImageNode.children[0];

        const imageWrapperNode: BlockContent | DefinitionContent = {
          type: 'paragraph',
          data: {
            hName: 'div',
            hProperties: {
              slot: 'image',
              className: 'card-image',
            },
          },
          children: [],
        };

        if (cardImageOrLink?.type === 'image') {
          cardImageOrLink.alt = cardImageOrLink.alt ?? imageAlt;
        } else if (isLink(cardImageOrLink)) {
          const cardImage = cardImageOrLink.children[0];
          if (cardImage?.type !== 'image') continue;

          cardImage.alt = cardImage.alt ?? imageAlt;
        } else {
          continue;
        }

        imageWrapperNode.children.push(cardImageOrLink);

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
          if (!isParagraph(cardContentNode)) return;

          if (!isParent(cardContentNode)) return;
          if (cardContentNode.children.length === 0) return;

          const cardContent = cardContentNode.children[0];
          if (isText(cardContent)) {
            contentNode.children.push(cardContent);
          } else {
            if (!isParent(cardContent)) return;
            if (cardContentNode.children.length === 0) return;
            if (!isText(cardContent.children[0])) return;

            contentNode.children.push(cardContent);
          }

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
