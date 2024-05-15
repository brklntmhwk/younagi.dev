import type { RehypePlugin } from '@astrojs/markdown-remark'
import { visit } from 'unist-util-visit'

const rehypeMarkImageFigure = (): ReturnType<RehypePlugin> => {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (!Object.hasOwn(node.properties, 'dataImageFigure')) return
      node.tagName = 'figure'
    })
  }
}

export default rehypeMarkImageFigure
