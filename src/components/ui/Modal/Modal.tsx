import { makeEventListener } from '@solid-primitives/event-listener';
import { createShortcut } from '@solid-primitives/keyboard';
import { type ParentComponent, createSignal, onMount } from 'solid-js';
import { Portal } from 'solid-js/web';
import { type ModalContent, shortcutKeyMap } from './modal-data';

type Props = {
  modalName: ModalContent;
  icon?: SVGElement;
  iconLabel?: string;
  buttonStyle: string;
  buttonLabel: string;
};

export const Modal: ParentComponent<Props> = (props) => {
  onMount(() => {
    makeEventListener(
      overlayRef,
      'click',
      (e) => {
        if (e.target === overlayRef) {
          toggle();
        }
      },
      { passive: true },
    );

    makeEventListener(
      buttonRef,
      'click',
      () => {
        toggle();

        if (props.modalName === 'search') {
          const searchInput = document.getElementById(
            'search-window',
          ) as HTMLInputElement;
          searchInput.focus();
        }
      },
      { passive: true },
    );
  });

  let overlayRef!: HTMLDivElement;
  let buttonRef!: HTMLButtonElement;
  const [isOpen, setIsOpen] = createSignal(false);
  const toggle = () => setIsOpen((isOpen) => !isOpen);

  createShortcut(shortcutKeyMap[props.modalName], toggle, {
    preventDefault: true,
  });

  return (
    <>
      <button
        type="button"
        id={`${props.modalName}-icon-button`}
        ref={buttonRef}
        class={`border-0 flex gap-2 items-center ${props.buttonStyle}`}
        title={props.buttonLabel}
        aria-label={props.buttonLabel}
      >
        {props.icon}
        {props.iconLabel && (
          <span class="text-base font-bold md:text-lg">{props.iconLabel}</span>
        )}
      </button>
      <Portal mount={document.getElementById('#modal')!}>
        <div
          id={`${props.modalName}-modal-overlay`}
          ref={overlayRef}
          class={`fixed top-0 left-0 right-0 z-10 pt-14 md:pt-16 w-dvw h-dvh flex justify-center items-start bg-modal-bg ${!isOpen() && 'hidden'}`}
        >
          <div
            id={`${props.modalName}-wrapper`}
            class="border-pixel w-full max-w-xl max-h-[80dvh] py-6 px-3.5 mx-6 box-border bg-default-mixed z-20 has-[form]:overflow-y-auto"
          >
            {props.children}
          </div>
        </div>
      </Portal>
    </>
  );
};
