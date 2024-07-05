import type { MarkdownHeading } from 'astro'
import { type Component, onMount } from 'solid-js'
import { TOC_MINIMUM_COUNT } from '@/consts'
import { useToggle } from '@/components/Modal/ToggleProvider'
import { TocUlList, TocListElem } from './toc.css'
import { makeEventListener } from '@solid-primitives/event-listener'

type Props = {
  headings: MarkdownHeading[]
}

export const Toc: Component<Props> = ({ headings }) => {
  onMount(() => {
    makeEventListener(
      linkRef,
      'click',
      () => {
        if (toggle !== undefined) {
          toggle
        }
      },
      { passive: true }
    )
  })

  let linkRef!: HTMLAnchorElement
  const toggle = useToggle()

  return (
    headings.length >= TOC_MINIMUM_COUNT && (
      <ul class={TocUlList}>
        {headings.map((heading) => (
          <li class={`depth-${heading.depth} ${TocListElem}`}>
            <a ref={linkRef} href={`#${heading.slug}`}>
              {heading.text.replace('#', '')}
            </a>
          </li>
        ))}
      </ul>
    )
  )
}
