import type { RehypePlugin } from '@astrojs/markdown-remark'
import type { Root } from 'hast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

const rehypeMarkImageFigure: Plugin<
  [],
  Root
> = (): ReturnType<RehypePlugin> => {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (!Object.hasOwn(node.properties, 'dataImageFigure')) return
      node.tagName = 'figure'
    })
  }
}

export default rehypeMarkImageFigure
