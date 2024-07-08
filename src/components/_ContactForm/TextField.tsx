import {
  TextField as Kobalte,
  Root as KobalteRoot,
} from '@kobalte/core/text-field'
import { Skeleton } from '@kobalte/core/skeleton'
import { type JSX, Show, splitProps } from 'solid-js'
import {
  contactField,
  contactFormError,
  contactLabel,
  skeleton,
} from './contact-form.css'

type Props = {
  name: string
  type?: 'text' | 'email' | 'tel' | 'password' | 'url' | 'date'
  label?: string
  placeholder?: string
  value?: string
  error: string
  multiline?: boolean
  required?: boolean
  disabled?: boolean
  class?: string
  ref: (element: HTMLInputElement | HTMLTextAreaElement) => void
  onInput: JSX.EventHandler<HTMLInputElement | HTMLTextAreaElement, InputEvent>
  onChange: JSX.EventHandler<HTMLInputElement | HTMLTextAreaElement, Event>
  onBlur: JSX.EventHandler<HTMLInputElement | HTMLTextAreaElement, FocusEvent>
}

export const TextField = (props: Props) => {
  const [rootProps, inputProps] = splitProps(
    props,
    ['name', 'value', 'required', 'disabled'],
    ['placeholder', 'ref', 'onInput', 'onChange', 'onBlur']
  )
  return (
    <KobalteRoot
      {...rootProps}
      validationState={props.error ? 'invalid' : 'valid'}
    >
      <Skeleton class={`${skeleton} ${contactField}`}>
        <Show when={props.label}>
          <Kobalte.Label class={contactLabel}>{props.label}</Kobalte.Label>
        </Show>
        <Show
          when={props.multiline}
          fallback={
            <div class="pokemon-border">
              <Kobalte.Input
                {...inputProps}
                type={props.type}
                class={contactField}
              />
            </div>
          }
        >
          <div class="pokemon-border">
            <Kobalte.TextArea {...inputProps} class={contactField} autoResize />
          </div>
        </Show>
      </Skeleton>
      <Kobalte.ErrorMessage class={contactFormError}>
        {props.error}
      </Kobalte.ErrorMessage>
    </KobalteRoot>
  )
}
