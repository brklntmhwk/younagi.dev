import type { MarkdownHeading } from 'astro'
import { type Component, onMount } from 'solid-js'
// import { useStore } from '@nanostores/solid'
import { TOC_MINIMUM_COUNT } from '@/consts'
// import { useToggle } from '@/components/Modal/ToggleProvider'
// import { toggle } from '@/components/Modal/modal-toggle-store'
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
        // if ($toggle()) {
        //   $toggle()?.setIsOpen((isOpen) => !isOpen)
        // }
        // if (toggle !== undefined) {
        //   toggle
        // }
      },
      { passive: true }
    )
  })

  let linkRef!: HTMLAnchorElement
  // const toggle = useToggle()
  // const $toggle = useStore(toggle)

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
