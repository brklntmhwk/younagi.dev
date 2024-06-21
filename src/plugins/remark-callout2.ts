import type { RemarkPlugin } from '@astrojs/markdown-remark'
import type { Plugin } from 'unified'
import type {
  Root,
  Parent,
  BlockContent,
  DefinitionContent,
  Paragraph,
} from 'mdast'
import { visit } from 'unist-util-visit'
import type { Element } from 'hast'

type Callout = {
  type: string
  title: string
  expandable: boolean
  expanded: boolean
}

const parseCallout = (text: string | undefined): Callout | undefined => {
  if (text === undefined || text === '') return

  const matched = text.match(
    /^\[!(?<type>.+?)\](?<expandable>[+-])?\s?(?<title>.+)?$/
  )
  const calloutType = matched?.groups?.type
  if (calloutType === undefined || calloutType === '') return undefined

  const calloutTitle = matched?.groups?.title || calloutType
  const expansionMark = matched?.groups?.expandable
  const expandable = Boolean(expansionMark)
  const expanded = expansionMark === '+'

  return {
    type: calloutType,
    title: calloutTitle,
    expandable,
    expanded,
  }
}

const remarkCallout2: Plugin<[], Root> = (): ReturnType<RemarkPlugin> => {
  return (tree) => {
    visit(tree, 'blockquote', (node) => {
      if (!('children' in node) || (node as Parent).children.length === 0)
        return

      const paragraphNode = node.children[0]!
      if (paragraphNode.type !== 'paragraph') return

      if (
        !('children' in paragraphNode) ||
        (paragraphNode as Parent).children.length === 0
      )
        return

      const calloutNode = paragraphNode.children[0]!
      if (calloutNode?.type !== 'text') return

      const [calloutTypeTitle, ...calloutContent] =
        calloutNode.value.split('\n')
      const calloutData = parseCallout(calloutTypeTitle)
      if (calloutData === undefined) return

      node.data = {
        ...node.data,
        hProperties: {
          className: `callout-${calloutData.type}`,
          dataCalloutBlockquote: true,
          dataCallout: calloutData.type,
          dataExpandable: String(calloutData.expandable),
          dataExpanded: String(calloutData.expanded),
        },
      }

      const contentNode: (BlockContent | DefinitionContent)[] = [
        {
          type: 'paragraph',
          data: {
            hName: 'div',
            hProperties: {
              className: 'callout-content',
            },
          },
          children: [],
        },
        ...node.children.splice(1),
      ]
      if (contentNode[0]?.type !== 'paragraph') return
      if (calloutContent.length > 0) {
        contentNode[0].children.push({
          type: 'text',
          value: calloutContent.join('\n'),
        })
      }

      // const titleIconNode: Paragraph = {
      //   type: 'paragraph',
      //   data: {
      //     hName: 'div',
      //     hProperties: {
      //       className: 'callout-title-icon',
      //     },
      //   },
      //   children: [],
      // }
      // const titleTextNode: Paragraph = {
      //   type: 'paragraph',
      //   data: {
      //     hName: 'div',
      //     hProperties: {
      //       className: 'callout-title-text',
      //     },
      //   },
      //   children: [{
      //     type: "text",
      //     value: callout.title
      //   }],
      // }
      const titleChildrenNode: Element[] = [
        {
          type: 'element',
          tagName: 'div',
          properties: {
            className: 'callout-title-icon',
          },
          children: [],
        },
        {
          type: 'element',
          tagName: 'div',
          properties: {
            className: 'callout-title-text',
          },
          children: [
            {
              type: 'text',
              value: calloutData.title,
            },
          ],
        },
      ]
      const titleNode: Paragraph = {
        type: 'paragraph',
        data: {
          hProperties: {
            className: 'callout-title',
          },
          // hChildren: [titleIconNode, titleTextNode],
          hChildren: titleChildrenNode,
        },
        children: [],
      }

      if (calloutData.expandable) {
        const inputNode: Paragraph = {
          type: 'paragraph',
          data: {
            hName: 'input',
            hProperties: {
              type: 'checkbox',
              id: `callout-toggle-check-${calloutData.type}-${calloutData.title}`,
            },
          },
          children: [],
        }
        titleNode.data = {
          ...titleNode.data,
          hName: 'label',
          hProperties: {
            for: `callout-toggle-check-${calloutData.type}-${calloutData.title}`,
          },
        }
        if (calloutData.expanded) {
          inputNode.data = {
            ...inputNode.data,
            hProperties: {
              checked: 'true',
            },
          }
        }
      } else {
        titleNode.data = {
          ...titleNode.data,
          hName: 'div',
        }
      }

      // if (calloutContent.length <= 0) {
      //   for (const [i, child] of paragraphNode.children.slice(1).entries()) {
      //     if (child.type !== 'text') {
      //       titleChildrenNode[1]?.children.push(child)
      //       continue
      //     }

      //     const [titleText, ...contentLines] = child.value.split('\n')
      //     if (titleText) {
      //       titleChildrenNode[1]?.children.push({
      //         type: 'text',
      //         value: titleText,
      //       })
      //     }
      //     if (contentLines.length > 0) {
      //       if (contentNode[0]?.type !== 'paragraph') return
      //       contentNode[0].children.push({
      //         type: 'text',
      //         value: contentLines.join('\n'),
      //       })
      //     }
      //     contentNode[0].children.push(...paragraphNode.children.slice(i + 2))

      //     break
      //   }
      // } else {
      //   contentNode[0].children.push(...paragraphNode.children.slice(1))
      // }

      node.children = [titleNode, ...contentNode]
    })
  }
}

export default remarkCallout2
