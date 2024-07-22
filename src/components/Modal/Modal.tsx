import { makeEventListener } from '@solid-primitives/event-listener'
import { createShortcut } from '@solid-primitives/keyboard'
import { type ParentComponent, createSignal, onMount } from 'solid-js'
import { Portal } from 'solid-js/web'
import { type ModalContent, shortcutKeyMap } from './modal-data'
import {
  hidden,
  modal,
  modalButton,
  modalButtonLabel,
  modalWrapper,
} from './modal.css'

type Props = {
  modalName: ModalContent
  icon?: SVGElement
  iconLabel?: string
  buttonStyle: string
  buttonLabel: string
}

export const Modal: ParentComponent<Props> = (props) => {
  onMount(() => {
    makeEventListener(
      overlayRef,
      'click',
      (e) => {
        if (e.target === overlayRef) {
          toggle()
        }
      },
      { passive: true },
    )

    makeEventListener(
      buttonRef,
      'click',
      () => {
        toggle()

        if (props.modalName === 'search') {
          const searchInput = document.getElementById(
            'search-window',
          ) as HTMLInputElement
          searchInput.focus()
        }
      },
      { passive: true },
    )
  })

  let overlayRef!: HTMLDivElement
  let buttonRef!: HTMLButtonElement
  const [isOpen, setIsOpen] = createSignal(false)
  const toggle = () => setIsOpen((isOpen) => !isOpen)

  createShortcut(shortcutKeyMap[props.modalName], toggle, {
    preventDefault: true,
  })

  return (
    <>
      <button
        type="button"
        id={`${props.modalName}-icon-button`}
        ref={buttonRef}
        class={`${modalButton} ${props.buttonStyle}`}
        title={props.buttonLabel}
        aria-label={props.buttonLabel}
      >
        {props.icon}
        {props.iconLabel && (
          <span class={modalButtonLabel}>{props.iconLabel}</span>
        )}
      </button>
      <Portal mount={document.getElementById('#modal')!}>
        <div
          id={`${props.modalName}-modal-overlay`}
          ref={overlayRef}
          class={`${modal} ${!isOpen() && hidden}`}
        >
          <div
            id={`${props.modalName}-wrapper`}
            class={`${modalWrapper} pixel-border`}
          >
            {props.children}
          </div>
        </div>
      </Portal>
    </>
  )
}
