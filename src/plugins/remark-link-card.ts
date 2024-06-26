import type { RemarkPlugin } from '@astrojs/markdown-remark'
import type { Plugin } from 'unified'
import type { Parent, Root } from 'mdast'
import { visit } from 'unist-util-visit'
import { isBareLink, isParent } from './mdast-is'

const remarkLinkCard: Plugin<[], Root> = (): ReturnType<RemarkPlugin> => {
  return (tree) => {
    visit(tree, isBareLink, (node, _index, parent: Parent | undefined) => {
      if (!isParent(parent)) return

      if (
        node.children[0].children[0].value !== node.children[0].url ||
        parent.type === 'listItem'
      )
        return

      node.children[0].data = {
        ...node.children[0].data,
        hProperties: {
          dataLinkCard: true,
        },
      }
    })
  }
}

export default remarkLinkCard
