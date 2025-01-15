import type { Root } from 'hast';
import type { Plugin } from 'unified';
import { isText } from '../mdast-is';

const rehypeTrimEmptyParagraph: Plugin<[], Root> = () => {
  return (tree) => {
    tree.children = tree.children.filter((elem) => {
      if (elem.type === 'element' && elem.tagName === 'p') {
        if (
          elem.children.length === 0 ||
          (isText(elem.children[0]) && elem.children[0].value === '')
        ) {
          return false;
        }
      }
      return true;
    });
  };
};

export default rehypeTrimEmptyParagraph;
