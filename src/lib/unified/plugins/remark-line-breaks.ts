import type { Root } from 'mdast';
import { newlineToBreak } from 'mdast-util-newline-to-break';
import type { Plugin } from 'unified';

const remarkLineBreaks: Plugin<[], Root> = () => (tree) => newlineToBreak(tree);

export default remarkLineBreaks;
