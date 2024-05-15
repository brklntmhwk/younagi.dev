import type { RemarkPlugin } from '@astrojs/markdown-remark'
import { newlineToBreak } from 'mdast-util-newline-to-break'

const remarkLineBreaks = (): ReturnType<RemarkPlugin> => (tree) =>
  newlineToBreak(tree)

export default remarkLineBreaks
