import type { Element, Root } from 'hast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

const shouldIgnore = (node: Element) => {
  /* At this point, the link card data attribute has yet to be converted to kebab case so designate it in pascal case here */
  const isLinkCard =
    node.tagName === 'a' && Object.hasOwn(node.properties, 'dataLinkCard');
  const isCodeBlock =
    node.tagName === 'figure' &&
    Object.hasOwn(node.properties, 'data-rehype-pretty-code-figure');
  const isKatex =
    node.tagName === 'span' &&
    node.properties.className?.toString().includes('katex-display');

  return isLinkCard || isCodeBlock || isKatex;
};

const rehypePagefindIgnore: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (shouldIgnore(node)) {
        node.properties = {
          ...node.properties,
          dataPagefindIgnore: 'all',
        };
      }
    });
  };
};

export default rehypePagefindIgnore;
