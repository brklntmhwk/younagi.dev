import type { MarkdownHeading } from 'astro'
import { type Component } from 'solid-js'
import { TOC_MINIMUM_COUNT } from '@/consts'
import { TocUlList, TocListElem } from './toc.css'

type Props = {
  headings: MarkdownHeading[]
}

export const Toc: Component<Props> = ({ headings }) => {
  return (
    headings.length >= TOC_MINIMUM_COUNT && (
      <ul class={TocUlList}>
        {headings.map((heading) => (
          <li class={`depth-${heading.depth} ${TocListElem}`}>
            <a href={`#${heading.slug}`}>{heading.text.replace('#', '')}</a>
          </li>
        ))}
      </ul>
    )
  )
}
