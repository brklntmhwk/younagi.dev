import { type CollectionEntry } from 'astro:content'
import { type Component } from 'solid-js'
import {
  type InferInput,
  check,
  object,
  pipe,
  string,
  nonEmpty,
  minLength,
  email,
  boolean,
} from 'valibot'
import { createForm, valiForm, type SubmitHandler } from '@modular-forms/solid'
import { useStore } from '@nanostores/solid'
import Turnstile from './Turnstile'
import { useTranslatedPath } from '@/utils/i18n/useTranslatedPath'
import { FORM_TEXTAREA_ROWS, FORM_TEXTAREA_MINLENGTH } from '@/consts'
import { locale } from '@/stores/localeStore'

type Props = {
  t: CollectionEntry<'i18n'>
}

const Contact2: Component<Props> = ({ t }) => {
  const $locale = useStore(locale)
  const translatePath = useTranslatedPath($locale())

  const formSchema = object({
    name: pipe(string(), nonEmpty(t.data.contact.name.required)),
    email: pipe(
      string(),
      nonEmpty(t.data.contact.email.required),
      email(t.data.contact.email.invalid)
    ),
    message: pipe(
      string(),
      nonEmpty(t.data.contact.message.required),
      minLength(FORM_TEXTAREA_MINLENGTH, t.data.contact.message.minlength)
    ),
    confirmation: pipe(
      boolean(),
      check((input) => input === true, t.data.contact.confirmation.required)
    ),
  })

  type FormFields = InferInput<typeof formSchema>

  const [, { Form, Field }] = createForm<FormFields>({
    validateOn: 'submit',
    revalidateOn: 'blur',
    validate: valiForm(formSchema),
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

      // navigate(response.url)
    } catch (err) {
      handleError(err, 'Failed to submit form data')
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Field name="name">
        {(field, props) => (
          <>
            <label for="name2">{t.data.contact.name.label}</label>
            <div class="pokemon-border">
              <input
                {...props}
                id="name2"
                type="text"
                value={field.value || ''}
              />
            </div>
            {field.error && <div class="error">{field.error}</div>}
          </>
        )}
      </Field>
      <Field name="email">
        {(field, props) => (
          <>
            <label for="email2">{t.data.contact.email.label}</label>
            <div class="pokemon-border">
              <input
                {...props}
                id="email2"
                type="email"
                value={field.value || ''}
              />
            </div>
            {field.error && <div class="error">{field.error}</div>}
          </>
        )}
      </Field>
      <Field name="message">
        {(field, props) => (
          <>
            <label for="message2">{t.data.contact.message.label}</label>
            <div class="pokemon-border">
              <textarea
                {...props}
                id="message2"
                value={field.value || ''}
                rows={FORM_TEXTAREA_ROWS}
                autocomplete="off"
              />
            </div>
            {field.error && <div class="error">{field.error}</div>}
          </>
        )}
      </Field>
      <Field name="confirmation" type="boolean">
        {(field, props) => (
          <>
            <input
              {...props}
              id="confirmation"
              type="checkbox"
              checked={field.value ?? false}
            />
            <label for="confirmation">
              {t.data.contact.confirmation.label}
              {field.active}
            </label>
            {field.error && <div class="error">{field.error}</div>}
          </>
        )}
      </Field>
      <Turnstile size="compact" locale={$locale()} />
      <button class="pokemon-border" type="submit">
        {t.data.contact.sendLabel}
      </button>
    </Form>
  )
}

export default Contact2
