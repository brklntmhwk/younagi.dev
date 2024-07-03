import { createSignal, onMount, type ParentComponent } from 'solid-js'
import { Portal } from 'solid-js/web'
import { makeEventListener } from '@solid-primitives/event-listener'
import { createShortcut } from '@solid-primitives/keyboard'
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
  buttonStyle?: string
  buttonLabel: string
}

export const Modal: ParentComponent<Props> = ({
  modalName,
  icon,
  iconLabel,
  buttonStyle,
  buttonLabel,
  children,
}) => {
  onMount(() => {
    makeEventListener(
      overlayRef,
      'click',
      (e) => {
        if (e.target === overlayRef) {
          toggle()
        }
      },
      { passive: true }
    )

    makeEventListener(
      buttonRef,
      'click',
      () => {
        toggle()

        if (modalName === 'search') {
          const searchInput = document.getElementById(
            'search-window'
          ) as HTMLInputElement
          searchInput.focus()
        }
      },
      { passive: true }
    )
  })

  let overlayRef!: HTMLDivElement
  let buttonRef!: HTMLButtonElement
  const [isOpen, setIsOpen] = createSignal(false)
  const toggle = () => setIsOpen((isOpen) => !isOpen)

  createShortcut(shortcutKeyMap[modalName], toggle, { preventDefault: true })

  return (
    <>
      <button
        id={`${modalName}-icon-button`}
        ref={buttonRef}
        class={`${modalButton} ${buttonStyle}`}
        title={buttonLabel}
        aria-label={buttonLabel}
      >
        {icon}
        {iconLabel && <span class={modalButtonLabel}>{iconLabel}</span>}
      </button>
      <Portal mount={document.getElementById('#modal')!}>
        <div
          id={`${modalName}-modal-overlay`}
          ref={overlayRef}
          class={`${modal} ${!isOpen() && hidden}`}
        >
          <div
            id={`${modalName}-wrapper`}
            class={`${modalWrapper} pixel-border`}
          >
            {children}
          </div>
        </div>
      </Portal>
    </>
  )
}
