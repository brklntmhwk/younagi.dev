import {
  TextField as Kobalte,
  Root as KobalteRoot,
} from '@kobalte/core/text-field';
import { type Component, type JSX, Show, splitProps } from 'solid-js';
import { contactFormError } from '../contact-form.css';

type Props = {
  name: string;
  type?: 'text' | 'email' | 'tel' | 'hidden' | 'password' | 'url' | 'date';
  label?: string;
  placeholder?: string;
  value?: string;
  error: string;
  multiline?: boolean;
  required?: boolean;
  disabled?: boolean;
  class?: string;
  ref: (element: HTMLInputElement | HTMLTextAreaElement) => void;
  onInput: JSX.EventHandler<HTMLInputElement | HTMLTextAreaElement, InputEvent>;
  onChange: JSX.EventHandler<HTMLInputElement | HTMLTextAreaElement, Event>;
  onBlur: JSX.EventHandler<HTMLInputElement | HTMLTextAreaElement, FocusEvent>;
};

export const TextField: Component<Props> = (props) => {
  const [rootProps, inputProps] = splitProps(
    props,
    ['name', 'value', 'required', 'disabled'],
    ['placeholder', 'ref', 'onInput', 'onChange', 'onBlur'],
  );
  return (
    <KobalteRoot
      {...rootProps}
      class="flex flex-col gap-4 z-10"
      validationState={props.error ? 'invalid' : 'valid'}
    >
      <Show when={props.label}>
        <Kobalte.Label class="select-none">{props.label}</Kobalte.Label>
      </Show>
      <Show
        when={props.multiline}
        fallback={
          <Show
            when={props.type === 'hidden'}
            fallback={
              <div class="relative border-t-4 border-b-2 border-x-2 border-line-double rounded-md before:absolute before:-top-2 before:-bottom-2 before:-left-1.5 before:-right-1.5 before:border-t-2 before:border-b-4 before:border-x-2 before:rounded-lg before:-z-10">
                <Kobalte.Input
                  {...inputProps}
                  type={props.type}
                  class="flex flex-col w-full p-2 bg-transparent outline-none"
                />
              </div>
            }
          >
            <Kobalte.Input
              {...inputProps}
              type={props.type}
              class="flex flex-col w-full p-2 bg-transparent outline-none"
            />
          </Show>
        }
      >
        <div class="relative border-t-4 border-b-2 border-x-2 border-line-double rounded-md before:absolute before:-top-2 before:-bottom-2 before:-left-1.5 before:-right-1.5 before:border-t-2 before:border-b-4 before:border-x-2 before:rounded-lg before:-z-10">
          <Kobalte.TextArea
            {...inputProps}
            class="flex flex-col w-full p-2 bg-transparent outline-none"
          />
        </div>
      </Show>
      <Kobalte.ErrorMessage class={contactFormError}>
        {props.error}
      </Kobalte.ErrorMessage>
    </KobalteRoot>
  );
};
