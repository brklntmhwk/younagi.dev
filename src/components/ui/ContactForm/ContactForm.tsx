import { locale } from '@/components/functional/LocaleStore/locale-store';
import type { I18nData } from '@/lib/collections/types';
import { FORM_TEXTAREA_MINLENGTH } from '@/lib/consts';
import { useTranslatedPath } from '@/utils/i18n/utils';
import {
  type SubmitHandler,
  createForm,
  setValue,
  valiForm,
} from '@modular-forms/solid';
import { useStore } from '@nanostores/solid';
import type { Component } from 'solid-js';
import toast from 'solid-toast';
import {
  type InferOutput,
  boolean,
  check,
  email,
  minLength,
  nonEmpty,
  object,
  pipe,
  string,
} from 'valibot';
import wretch, { type WretchError } from 'wretch';
import { Checkbox } from './Checkbox/Checkbox';
import { SubmitButton } from './SubmitButton/SubmitButton';
import { TextField } from './TextField/TextField';
import { Turnstile } from './Turnstile/Turnstile';
import { isWretchError } from './error-is';

type Props = {
  t: I18nData<'contact_form'>;
  turnstileSiteKey: string;
};

export const ContactForm: Component<Props> = ({ t, turnstileSiteKey }) => {
  /** Form schema must be inside this component to apply translated strings.
   * Putting the async getEntry function for i18n outside and using it here is also possible,
   * but it brings about a warning that using async functions from Astro Content Collections in that way will be deprecated in the future. (As of July 2024)
   * */
  const formSchema = object({
    name: pipe(string(), nonEmpty(t.name.required)),
    email: pipe(string(), nonEmpty(t.email.required), email(t.email.invalid)),
    message: pipe(
      string(),
      nonEmpty(t.message.required),
      minLength(FORM_TEXTAREA_MINLENGTH, t.message.minlength),
    ),
    confirmation: pipe(
      boolean(),
      check((input) => input === true, t.confirmation.required),
    ),
    'cf-turnstile-response': string(),
  });

  type FormFields = InferOutput<typeof formSchema>;

  const $locale = useStore(locale);
  const translatePath = useTranslatedPath($locale());

  const [contactForm, { Form, Field }] = createForm<FormFields>({
    validateOn: 'submit',
    revalidateOn: 'blur',
    validate: valiForm(formSchema),
  });

  const handleError = (e: unknown | WretchError) => {
    if (isWretchError(e)) {
      const errorMessage = `
      ${e.status} ${e.response.statusText}
      ${e.message}`;

      toast.error(
        `${errorMessage}\n
        ${t.error_handler_message}`,
        {
          position: 'bottom-right',
          duration: 8000,
        },
      );
      console.error(errorMessage);
    } else {
      toast.error(
        `${t.unexpected_error_message}: ${e}\n
        ${t.error_handler_message}`,
        {
          position: 'bottom-right',
          duration: 8000,
        },
      );
      console.trace(`${t.unexpected_error_message}: ${e}`);
    }
  };

  const handleSubmit: SubmitHandler<FormFields> = async (values) => {
    try {
      await wretch()
        .url(translatePath('/api/form/'))
        .post(values)
        .error(422, (err) => handleError(err))
        .badRequest((err) => handleError(err))
        .internalError((err) => handleError(err))
        .notFound((err) => handleError(err))
        .fetchError((err) => handleError(err))
        .res((r) => window.location.replace(r.url));
    } catch (err) {
      handleError(err);
    }
  };

  const handleVerify = (token: string) => {
    setValue(contactForm, 'cf-turnstile-response', token);
  };

  return (
    <Form class="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Field name="name">
        {(field, props) => (
          <TextField
            {...props}
            type="text"
            label={t.name.label}
            value={field.value || ''}
            error={field.error}
          />
        )}
      </Field>
      <Field name="email">
        {(field, props) => (
          <TextField
            {...props}
            type="email"
            label={t.email.label}
            value={field.value || ''}
            error={field.error}
          />
        )}
      </Field>
      <Field name="message">
        {(field, props) => (
          <TextField
            {...props}
            type="text"
            label={t.message.label}
            value={field.value || ''}
            error={field.error}
            multiline
          />
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
        )}
      </Field>
      <Field name="cf-turnstile-response">
        {(field, props) => (
          <>
            <Turnstile
              siteKey={turnstileSiteKey}
              size="normal"
              locale={$locale()}
              onVerify={handleVerify}
            />
            <TextField
              {...props}
              type="hidden"
              value={field.value || ''}
              error={field.error}
            />
          </>
        )}
      </Field>
      <SubmitButton label={contactForm.submitting ? t.submitting : t.submit} />
    </Form>
  );
};
