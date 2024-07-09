import { type Component } from 'solid-js'
import {
  type SubmitHandler,
  createForm,
  FormError,
  valiForm,
  setValue,
} from '@modular-forms/solid'
import {
  type InferOutput,
  check,
  object,
  pipe,
  string,
  nonEmpty,
  minLength,
  email,
  boolean,
} from 'valibot'
import { Skeleton } from '@kobalte/core/skeleton'
import { useStore } from '@nanostores/solid'
// import wretch from 'wretch'
import { useTranslatedPath } from '@/utils/i18n/utils'
import { /* FORM_TEXTAREA_ROWS, */ FORM_TEXTAREA_MINLENGTH } from '@/lib/consts'
import { locale } from '@/components/LocaleStore/locale-store'
import { Turnstile } from './Turnstile'
import type { I18nData } from '@/lib/collections/types'
import { SubmitButton } from './SubmitButton'
import { Checkbox } from './Checkbox'
import { TextField } from './TextField'
import {
  contactForm as ContactFormStyle,
  contactField,
  skeleton,
  // contactCheckboxArea,
  // contactButton,
  // contactFormError,
  // contactLabel,
} from './contact-form.css'

type Props = {
  t: I18nData<'contact_form'>
}

export const ContactForm: Component<Props> = ({ t }) => {
  const formSchema = object({
    name: pipe(string(), nonEmpty(t.name.required)),
    email: pipe(string(), nonEmpty(t.email.required), email(t.email.invalid)),
    message: pipe(
      string(),
      nonEmpty(t.message.required),
      minLength(FORM_TEXTAREA_MINLENGTH, t.message.minlength)
    ),
    confirmation: pipe(
      boolean(),
      check((input) => input === true, t.confirmation.required)
    ),
    'cf-turnstile-response': string(),
  })

  type FormFields = InferOutput<typeof formSchema>

  const $locale = useStore(locale)
  const translatePath = useTranslatedPath($locale())

  const [contactForm, { Form, Field }] = createForm<FormFields>({
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

  const handleVerify = (token: string) => {
    setValue(contactForm, 'cf-turnstile-response', token)
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
        throw new FormError<FormFields>(
          `${response.statusText} ${response.status}`
        )
      }

      window.location.replace(response.url)
    } catch (err) {
      handleError(err, 'Failed to submit form data')
    }
  }

  return (
    <Skeleton class={`${skeleton} ${ContactFormStyle}`}>
      <Form class={ContactFormStyle} onSubmit={handleSubmit}>
        <Field name="name">
          {(field, props) => (
            <TextField
              {...props}
              type="text"
              class={contactField}
              label={t.name.label}
              value={field.value || ''}
              error={field.error}
            />
            // <>
            //   <label for="name" class={contactLabel}>
            //     {t.name.label}
            //   </label>
            //   <div class="pokemon-border">
            //     <input
            //       {...props}
            //       id="name"
            //       class={contactField}
            //       type="text"
            //       value={field.value || ''}
            //     />
            //   </div>
            //   {field.error && <div class={contactFormError}>{field.error}</div>}
            // </>
          )}
        </Field>
        <Field name="email">
          {(field, props) => (
            <TextField
              {...props}
              type="email"
              class={contactField}
              label={t.email.label}
              value={field.value || ''}
              error={field.error}
            />
            // <>
            //   <label for="email" class={contactLabel}>
            //     {t.email.label}
            //   </label>
            //   <div class="pokemon-border">
            //     <input
            //       {...props}
            //       id="email"
            //       class={contactField}
            //       type="email"
            //       value={field.value || ''}
            //     />
            //   </div>
            //   {field.error && <div class={contactFormError}>{field.error}</div>}
            // </>
          )}
        </Field>
        <Field name="message">
          {(field, props) => (
            <TextField
              {...props}
              type="text"
              class={contactField}
              label={t.message.label}
              value={field.value || ''}
              error={field.error}
              multiline
            />
            // <>
            //   <label for="message" class={contactLabel}>
            //     {t.message.label}
            //   </label>
            //   <div class="pokemon-border">
            //     <textarea
            //       {...props}
            //       id="message"
            //       class={contactField}
            //       value={field.value || ''}
            //       rows={FORM_TEXTAREA_ROWS}
            //       autocomplete="off"
            //     />
            //   </div>
            //   {field.error && <div class={contactFormError}>{field.error}</div>}
            // </>
          )}
        </Field>
        <Field name="confirmation" type="boolean">
          {(field, props) => (
            <Checkbox
              {...props}
              label={t.confirmation.label}
              checked={field.value ?? false}
              error={field.error}
            />
            // <>
            //   <div class={contactCheckboxArea}>
            //     <input
            //       {...props}
            //       id="confirmation"
            //       type="checkbox"
            //       checked={field.value ?? false}
            //     />
            //     <label for="confirmation" class={contactLabel}>
            //       {t.confirmation.label}
            //     </label>
            //   </div>
            //   {field.error && <div class={contactFormError}>{field.error}</div>}
            // </>
          )}
        </Field>
        <Field name="cf-turnstile-response">
          {(field, props) => (
            <>
              <Turnstile
                siteKey={import.meta.env.PUBLIC_TURNSTILE_SITE_KEY}
                size="normal"
                locale={$locale()}
                onVerify={handleVerify}
              />
              <input {...props} type="hidden" value={field.value || ''} />
            </>
          )}
        </Field>
        <SubmitButton label={t.send_label} />
        {/* <button class={`pokemon-border ${contactButton}`} type="submit">
        {contactForm.submitting ? t.submitting : t.send_label}
      </button> */}
        {contactForm.response.message && (
          <div>{contactForm.response.message}</div>
        )}
      </Form>
    </Skeleton>
  )
}
