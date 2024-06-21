import type { RemarkPlugin } from '@astrojs/markdown-remark'
import type { InlineCode, Root, Text } from 'mdast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'
import {
  isFootnoteDefinition,
  isFootnoteReference,
  isTextOrInlineCode,
} from './mdast-is'

const remarkFootnote: Plugin<[], Root> = (): ReturnType<RemarkPlugin> => {
  return (tree) => {
    const footnotes = new Map<string, string>()

    visit(tree, isFootnoteDefinition, (node) => {
      let content = ''

      visit(node, isTextOrInlineCode, (text: Text | InlineCode) => {
        content += text.value
      })

      footnotes.set(node.identifier, content)
    })
    visit(tree, isFootnoteReference, (node) => {
      if (!footnotes.get(node.identifier)) return

      node.data = {
        ...node.data,
        hProperties: {
          // ...((node.data && node.data.hProperties) || {}),
          title: footnotes.get(node.identifier)!,
        },
      }
    })
  }
}

export default remarkFootnote
