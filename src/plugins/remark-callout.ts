import type { RemarkPlugin } from '@astrojs/markdown-remark'
import type { Plugin } from 'unified'
import type { Node, Root, Parent, Data } from 'mdast'
import { visit } from 'unist-util-visit'
import { toString } from 'mdast-util-to-string'
import {
  zapIcon,
  listIcon,
  quoteIcon,
  bugIcon,
  infoIcon,
  xIcon,
  helpCircleIcon,
  alertTriangleIcon,
  pencilIcon,
  clipboardListIcon,
  checkCircleIcon,
  checkIcon,
} from '../consts'

type Callout = Record<string, unknown>
type HtmlNode = Node & {
  type: 'html'
  data: Data
  value: string
}

const regex = /^\[!(\w+)\]([+-]?)/
const containsKey = (obj: Callout, str: string) =>
  Object.keys(obj).includes(str)
const callouts: Callout = {
  note: pencilIcon,
  abstract: clipboardListIcon,
  summary: clipboardListIcon,
  tldr: clipboardListIcon,
  info: infoIcon,
  todo: checkCircleIcon,
  tip: infoIcon,
  hint: infoIcon,
  important: checkIcon,
  success: checkIcon,
  check: checkIcon,
  done: checkIcon,
  question: helpCircleIcon,
  help: helpCircleIcon,
  faq: helpCircleIcon,
  warning: alertTriangleIcon,
  attention: alertTriangleIcon,
  caution: alertTriangleIcon,
  failure: xIcon,
  missing: xIcon,
  fail: xIcon,
  danger: zapIcon,
  error: zapIcon,
  bug: bugIcon,
  example: listIcon,
  quote: quoteIcon,
  cite: quoteIcon,
}

const remarkCallout: Plugin<[], Root> = (): ReturnType<RemarkPlugin> => {
  return (tree) => {
    visit(tree, 'blockquote', (node: Node) => {
      if (!('children' in node) || (node as Parent).children.length === 0)
        return

      const firstChild = (node as Parent).children[0]!

      if (firstChild.type === 'paragraph') {
        const value = toString(firstChild)
        const [firstLine, ...rest] = value.split('\n')
        const restContent = rest.join('\n')
        const matched = firstLine?.match(regex)

        if (matched) {
          const array = regex.exec(firstLine!)
          const calloutType = array?.at(1)
          const expandCollapseSign = array?.at(2)

          if (array && calloutType && containsKey(callouts, calloutType)) {
            const title = array.input.slice(matched[0].length).trim()

            const titleHtmlNode: HtmlNode = {
              type: 'html',
              data: {},
              value: `
              <div class="callout-title">
                <div class="callout-title-icon">${callouts[calloutType]}</div>
                <div class="callout-title-text">${title}</div>
              </div>
              <div class="callout-content">${restContent}</div>
              `,
            }

            ;(node as Parent).children.splice(0, 1, titleHtmlNode)

            const dataExpandable = Boolean(expandCollapseSign)
            const dataExpanded = expandCollapseSign === '+'

            node.data = {
              hProperties: {
                ...((node.data && node.data.hProperties) || {}),
                className: `callout-${calloutType}`,
                'data-callout': calloutType,
                'data-expandable': String(dataExpandable),
                'data-expanded': String(dataExpanded),
              },
            }
          }
        }
      }
    })
  }
}

export default remarkCallout
