import { type CollectionEntry, getEntry } from 'astro:content'
import { createEffect, createSignal, onMount } from 'solid-js'
import { createForm, validate, type SubmitHandler } from '@modular-forms/solid'
import { languages } from '@/utils/i18n/data'
import { useTranslatedPath } from '@/utils/i18n/useTranslatedPath'
import { FORM_TEXTAREA_ROWS, FORM_TEXTAREA_MINLENGTH } from '@/consts'

type FormFields = {
  name: string
  email: string
  message: string
  confirmation: boolean
}

type Props = {
  locale: keyof typeof languages
}

const Contact = ({ locale }: Props) => {
  const translatePath = useTranslatedPath(locale)
  const [t, setT] = createSignal<CollectionEntry<'i18n'>>()
  const [contactForm, { Form, Field }] = createForm<FormFields>()

  onMount(() => {
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    script.async = true
    script.defer = true
    document.body.appendChild(script)
  })

  createEffect(async () => {
    const translations = await getEntry('i18n', `${locale}/translation`)
    setT(translations)
  })

  const handleError = (e: unknown, message: string) => {
    if (e instanceof Error) {
      console.error(`${message}: ${e.message}`)
    } else {
      console.trace(e)
    }
  }

  const handleSubmit: SubmitHandler<FormFields> = async (values) => {
    try {
      const isValid = await validate(contactForm)
      if (!isValid) return

      const response = await fetch(translatePath('/api/form'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      if (!response.ok) {
        throw new Error('Failed to submit form data')
      }
    } catch (err) {
      handleError(err, 'Failed to submit form data')
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Field name="name">
        {(field, props) => (
          <input {...props} type="text" value={field.value || ''} required />
        )}
      </Field>
      <Field name="email">
        {(field, props) => (
          <input {...props} type="email" value={field.value || ''} required />
        )}
      </Field>
      <Field name="message">
        {(field, props) => (
          <textarea
            {...props}
            value={field.value || ''}
            rows={FORM_TEXTAREA_ROWS}
            minlength={FORM_TEXTAREA_MINLENGTH}
            autocomplete="off"
            required
          />
        )}
      </Field>
      <Field name="confirmation" type="boolean">
        {(field, props) => (
          <input
            {...props}
            type="checkbox"
            checked={field.value ?? false}
            required
          />
        )}
      </Field>
      <div
        class="cf-turnstile"
        data-sitekey={import.meta.env.TURNSTILE_SITE_KEY}
        data-language={locale}
      ></div>
      <button class="pokemon-border" type="submit">
        {t()?.data.contact.sendLabel}
      </button>
    </Form>
  )
}

export default Contact
