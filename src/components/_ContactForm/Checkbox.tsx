import {
  Checkbox as Kobalte,
  Root as KobalteRoot,
} from '@kobalte/core/checkbox'
import { Skeleton } from '@kobalte/core/skeleton'
import { type JSX, splitProps } from 'solid-js'
import {
  contactCheckboxArea,
  contactFormError,
  contactLabel,
} from './contact-form.css'

type Props = {
  name: string
  label: string
  value?: string
  checked: boolean
  error: string
  required?: boolean
  disabled?: boolean
  class?: string
  ref: (element: HTMLInputElement) => void
  onInput: JSX.EventHandler<HTMLInputElement, InputEvent>
  onChange: JSX.EventHandler<HTMLInputElement, Event>
  onBlur: JSX.EventHandler<HTMLInputElement, FocusEvent>
}

export const Checkbox = (props: Props) => {
  const [rootProps, inputProps] = splitProps(
    props,
    ['name', 'value', 'checked', 'required', 'disabled'],
    ['ref', 'onInput', 'onChange', 'onBlur']
  )
  return (
    <KobalteRoot
      {...rootProps}
      validationState={props.error ? 'invalid' : 'valid'}
    >
      <Skeleton>
        <div class={contactCheckboxArea}>
          <Kobalte.Input {...inputProps} />
          <Kobalte.Control>
            <Kobalte.Indicator>a{/* Add SVG icon here */}</Kobalte.Indicator>
          </Kobalte.Control>
          <Kobalte.Label class={contactLabel}>{props.label}</Kobalte.Label>
        </div>
      </Skeleton>
      <Kobalte.ErrorMessage class={contactFormError}>
        {props.error}
      </Kobalte.ErrorMessage>
    </KobalteRoot>
  )
}
