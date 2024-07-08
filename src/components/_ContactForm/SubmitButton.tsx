import { Button } from '@kobalte/core/button'
import { Skeleton } from '@kobalte/core/skeleton'
import { contactButton, skeleton } from './contact-form.css'

type Props = {
  label: string
}

export const SubmitButton = (props: Props) => {
  return (
    <Skeleton class={skeleton}>
      <Button type="submit" class={`pokemon-border ${contactButton}`}>
        {props.label}
      </Button>
    </Skeleton>
  )
}
