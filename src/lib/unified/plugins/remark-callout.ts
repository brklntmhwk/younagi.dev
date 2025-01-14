import type { BlockContent, DefinitionContent, Paragraph, Root } from 'mdast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { isParagraph, isParent, isText } from '../mdast-is';

type Callout = {
  type: string;
  title: string | undefined;
  expandable: boolean;
  expanded: boolean;
};

const parseCallout = (text: string | undefined): Callout | undefined => {
  if (text === undefined || text === '') return;

  const matched = text.match(
    /^\[!(?<type>.+?)\](?<expandable>[+-])?\s?(?<title>.+)?$/,
  );

  if (matched?.groups?.type === undefined) return undefined;

  const calloutType = matched.groups.type;
  const calloutTitle = matched.groups.title;
  const expansionMark = matched.groups.expandable;
  const expandable = Boolean(expansionMark);
  const expanded = expansionMark === '+';

  return {
    type: calloutType,
    title: calloutTitle,
    expandable,
    expanded,
  };
};

const remarkCallout: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'blockquote', (node) => {
      if (!isParent(node)) return;
      if (node.children.length === 0) return;

      const paragraphNode = node.children[0];
      if (!isParagraph(paragraphNode)) return;
      if (!isParent(paragraphNode)) return;
      if (paragraphNode.children.length === 0) return;

      const calloutNode = paragraphNode.children[0];
      if (!isText(calloutNode)) return;

      const [calloutTypeTitle, ...calloutContent] =
        calloutNode.value.split('\n');
      const calloutData = parseCallout(calloutTypeTitle);
      if (calloutData === undefined) return;

      node.data = {
        ...node.data,
        hName: 'callout',
        hProperties: {
          ...(node.data?.hProperties ?? {}),
          dataCalloutType: calloutData.type,
          dataExpandable: String(calloutData.expandable),
          dataExpanded: String(calloutData.expanded),
        },
      };

      const contentNode: (BlockContent | DefinitionContent)[] = [
        {
          type: 'paragraph',
          data: {
            hName: 'callout-content',
          },
          children: [],
        },
        ...node.children.splice(1),
      ];

      if (!isParagraph(contentNode[0])) return;
      if (calloutContent.length > 0) {
        contentNode[0].children.push({
          type: 'text',
          value: calloutContent.join('\n'),
        });
      }

      const titleNode: Paragraph = {
        type: 'paragraph',
        data: {
          hName: 'callout-title',
          hProperties: {
            dataCalloutType: calloutData.type,
            dataExpandable: String(calloutData.expandable),
            dataExpanded: String(calloutData.expanded),
          },
        },
        children: [],
      };
      if (calloutData.title !== undefined) {
        titleNode.children.push({
          type: 'text',
          value: calloutData.title,
        });
      }

      if (calloutContent.length <= 0) {
        for (const [i, child] of paragraphNode.children.slice(1).entries()) {
          if (!isText(child)) {
            titleNode.children.push(child);
            continue;
          }

          const [titleText, ...contentLines] = child.value.split('\n');
          if (titleText) {
            titleNode.children.push({
              type: 'text',
              value: titleText,
            });
          }
          if (contentLines.length > 0) {
            if (!isParagraph(contentNode[0])) return;
            contentNode[0].children.push({
              type: 'text',
              value: contentLines.join('\n'),
            });
          }
          contentNode[0].children.push(...paragraphNode.children.slice(i + 2));
          break;
        }
      } else {
        contentNode[0].children.push(...paragraphNode.children.slice(1));
      }

      node.children = [titleNode, ...contentNode];
    });
  };
};

export default remarkCallout;
