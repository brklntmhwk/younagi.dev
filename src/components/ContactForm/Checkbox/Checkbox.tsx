import { Checkbox as KCheckbox, Root as KRoot } from '@kobalte/core/checkbox'
import { type JSX, splitProps } from 'solid-js'
import { CheckIcon } from '../Checkbox/CheckIcon'
import { checkboxArea, checkboxControl } from './checkbox.css'
import { contactFormError, contactLabel, fieldGroup } from '../contact-form.css'

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
    <KRoot
      {...rootProps}
      class={fieldGroup}
      validationState={props.error ? 'invalid' : 'valid'}
    >
      <KCheckbox class={checkboxArea}>
        <KCheckbox.Input {...inputProps} />
        <KCheckbox.Control class={checkboxControl}>
          <KCheckbox.Indicator>
            <CheckIcon width={18} height={18} />
          </KCheckbox.Indicator>
        </KCheckbox.Control>
        <KCheckbox.Label class={contactLabel}>{props.label}</KCheckbox.Label>
      </KCheckbox>
      <KCheckbox.ErrorMessage class={contactFormError}>
        {props.error}
      </KCheckbox.ErrorMessage>
    </KRoot>
  )
}
