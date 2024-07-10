import { Button } from '@kobalte/core/button'
import { submitButton } from './submit-button.css'

type Props = {
  label: string
}

export const SubmitButton = (props: Props) => {
  return (
    <Button type="submit" class={`pokemon-border ${submitButton}`}>
      {props.label}
    </Button>
  )
}
