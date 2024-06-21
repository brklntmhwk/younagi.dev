import type { Node } from 'unist'
import type {
  FootnoteDefinition,
  FootnoteReference,
  InlineCode,
  Paragraph,
  Text,
} from 'mdast'

function isObject(target: unknown): target is { [k: string]: unknown } {
  return typeof target === 'object' && target !== null
}

function isNode(node: unknown): node is Node {
  return isObject(node) && 'type' in node
}

function is<T extends Node>(node: unknown, type: string): node is T {
  return isNode(node) && node.type === type
}

export function isFootnoteDefinition(
  node: unknown
): node is FootnoteDefinition {
  return is(node, 'footnoteDefinition')
}

export function isFootnoteReference(node: unknown): node is FootnoteReference {
  return is(node, 'footnoteReference')
}

export function isInlineCode(node: unknown): node is InlineCode {
  return is(node, 'inlineCode')
}

export function isParagraph(node: unknown): node is Paragraph {
  return is(node, 'paragraph')
}

export function isText(node: unknown): node is Text {
  return is(node, 'text')
}

export function isTextOrInlineCode(node: unknown): node is Text | InlineCode {
  return isText(node) || isInlineCode(node)
}
