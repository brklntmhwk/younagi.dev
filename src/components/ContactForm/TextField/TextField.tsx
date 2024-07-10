import {
  TextField as Kobalte,
  Root as KobalteRoot,
} from '@kobalte/core/text-field'
import { type JSX, Show, splitProps } from 'solid-js'
import { contactFormError, contactLabel, fieldGroup } from '../contact-form.css'
import { textField } from './text-field.css'

type Props = {
  name: string
  type?: 'text' | 'email' | 'tel' | 'hidden' | 'password' | 'url' | 'date'
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
      class={fieldGroup}
      validationState={props.error ? 'invalid' : 'valid'}
    >
      <Show when={props.label}>
        <Kobalte.Label class={contactLabel}>{props.label}</Kobalte.Label>
      </Show>
      <Show
        when={props.multiline}
        fallback={
          <Show
            when={props.type === 'hidden'}
            fallback={
              <div class="pokemon-border">
                <Kobalte.Input
                  {...inputProps}
                  type={props.type}
                  class={textField}
                />
              </div>
            }
          >
            <Kobalte.Input
              {...inputProps}
              type={props.type}
              class={textField}
            />
          </Show>
        }
      >
        <div class="pokemon-border">
          <Kobalte.TextArea {...inputProps} class={textField} />
        </div>
      </Show>
      <Kobalte.ErrorMessage class={contactFormError}>
        {props.error}
      </Kobalte.ErrorMessage>
    </KobalteRoot>
  )
}
