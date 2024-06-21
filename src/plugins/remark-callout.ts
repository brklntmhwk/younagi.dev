import type { RemarkPlugin } from '@astrojs/markdown-remark'
import type { Plugin } from 'unified'
import type { Node, Root, Parent, Data, Blockquote, RootContent } from 'mdast'
import { visit } from 'unist-util-visit'
import { toString } from 'mdast-util-to-string'
import { optimize } from 'svgo'
import {
  quoteIcon,
  infoIcon,
  xIcon,
  helpCircleIcon,
  alertTriangleIcon,
  pencilIcon,
  checkIcon,
} from '../consts'

type Callout = Map<string, string>
type HtmlNode = Node & {
  type: 'html'
  data: Data
  value: string
}

const regex = /^\[!(\w+)\]([+-]?)/
const containsKey = (mapObj: Callout, str: string) => mapObj.has(str)
const optimizeSvgIcons = (callouts: Callout) => {
  for (const [key, svg] of callouts.entries()) {
    callouts.set(
      key,
      optimize(svg, {
        multipass: true,
        js2svg: { pretty: true },
      }).data
    )
  }
}
const callouts: Callout = new Map([
  ['question', helpCircleIcon],
  ['help', helpCircleIcon],
  ['faq', helpCircleIcon],
  ['info', infoIcon],
  ['tip', infoIcon],
  ['hint', infoIcon],
  ['warning', alertTriangleIcon],
  ['attention', alertTriangleIcon],
  ['caution', alertTriangleIcon],
  ['quote', quoteIcon],
  ['cite', quoteIcon],
  ['success', checkIcon],
  ['check', checkIcon],
  ['done', checkIcon],
  ['note', pencilIcon],
  ['failure', xIcon],
])

const remarkCallout: Plugin<[], Root> = (): ReturnType<RemarkPlugin> => {
  return (tree) => {
    const blockquoteChildrenTriples: {
      node: Blockquote
      firstChild: RootContent
      children: RootContent[]
    }[] = []

    visit(tree, 'blockquote', (node) => {
      if (
        !('children' in node) ||
        (node as Parent).children.length === 0 ||
        (node as Parent).children[0]?.type !== 'paragraph'
      )
        return

      blockquoteChildrenTriples.push({
        node,
        firstChild: (node as Parent).children[0]!,
        children: (node as Parent).children,
      })
    })

    blockquoteChildrenTriples.map(({ node, firstChild, children }, index) => {
      const value = toString(firstChild)
      const [firstLine, ...rest] = value.split('\n')
      const restContent = rest.join('\n')
      const matched = firstLine?.match(regex)

      if (matched) {
        const array = regex.exec(firstLine!)
        const calloutType = array?.at(1)
        const expandCollapseSign = array?.at(2) as '+' | '-' | undefined

        if (array && calloutType && containsKey(callouts, calloutType)) {
          const title = array.input.slice(matched[0].length).trim()
          const isExpandable = Boolean(expandCollapseSign)
          const isExpanded = expandCollapseSign === '+'

          optimizeSvgIcons(callouts)

          const calloutHtmlNode: HtmlNode = {
            type: 'html',
            data: {},
            value: isExpandable
              ? `
              <input type="checkbox" id="callout-toggle-check-${calloutType}-${index}" ${isExpanded === true ? 'checked' : ''} />
              <label for="callout-toggle-check-${calloutType}-${index}" class="callout-title">
                <div class="callout-title-icon">${callouts.get(calloutType)}</div>
                <span class="callout-title-text">${title}</span>
              </label>
              <div class="callout-content">${restContent}</div>
              `
              : `
              <div class="callout-title">
                <div class="callout-title-icon">${callouts.get(calloutType)}</div>
                <span class="callout-title-text">${title}</span>
              </div>
              <div class="callout-content">${restContent}</div>
              `,
          }

          children.splice(0, 1, calloutHtmlNode)

          node.data = {
            ...node.data,
            hProperties: {
              // ...((node.data && node.data.hProperties) || {}),
              className: `callout-${calloutType}`,
              dataCalloutBlockquote: true,
              dataCallout: calloutType,
              dataExpandable: String(isExpandable),
              dataExpanded: String(isExpanded),
            },
          }
        }
      }
    })
  }
}

export default remarkCallout
