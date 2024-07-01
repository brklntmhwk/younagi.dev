import { createSignal, onMount, type ParentComponent } from 'solid-js'
import { Portal } from 'solid-js/web'
import {
  hidden,
  modal,
  modalButton,
  modalButtonLabel,
  modalWrapper,
} from './modal.css'

type Props = {
  modalName: string
  icon?: SVGElement
  iconLabel?: string
  buttonLabel: string
}

export const Modal: ParentComponent<Props> = ({
  modalName,
  icon,
  iconLabel,
  buttonLabel,
  children,
}) => {
  onMount(() => {
    const modalOverlay = document.getElementById(`${modalName}-modal-overlay`)!
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        toggle()
      }
    })
  })

  const [isOpen, setIsOpen] = createSignal(false)
  const toggle = () => setIsOpen((isOpen) => !isOpen)

  return (
    <>
      <button
        type="button"
        id={`${modalName}-icon-button`}
        class={modalButton}
        title={buttonLabel}
        aria-label={buttonLabel}
        onClick={toggle}
      >
        {icon}
        {iconLabel && <span class={modalButtonLabel}>{iconLabel}</span>}
      </button>
      <Portal mount={document.getElementById('#modal')!}>
        <div
          id={`${modalName}-modal-overlay`}
          class={`${modal} ${isOpen() ? '' : hidden}`}
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
