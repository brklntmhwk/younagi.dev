import type { RemarkPlugin } from '@astrojs/markdown-remark'
import type { Plugin } from 'unified'
import type { Node, Root, Parent, Data } from 'mdast'
import { visit } from 'unist-util-visit'
import { toString } from 'mdast-util-to-string'
import {
  zapIcon,
  quoteIcon,
  bugIcon,
  infoIcon,
  xIcon,
  helpCircleIcon,
  alertTriangleIcon,
  pencilIcon,
  clipboardListIcon,
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
  question: helpCircleIcon,
  help: helpCircleIcon,
  faq: helpCircleIcon,
  info: infoIcon,
  tip: infoIcon,
  hint: infoIcon,
  warning: alertTriangleIcon,
  attention: alertTriangleIcon,
  caution: alertTriangleIcon,
  quote: quoteIcon,
  cite: quoteIcon,
  important: checkIcon,
  success: checkIcon,
  check: checkIcon,
  done: checkIcon,

  note: pencilIcon,
  abstract: clipboardListIcon,
  summary: clipboardListIcon,
  tldr: clipboardListIcon,
  failure: xIcon,
  missing: xIcon,
  fail: xIcon,
  danger: zapIcon,
  error: zapIcon,
  bug: bugIcon,
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
