import { type ActionError, actions } from 'astro:actions';
import { TURNSTILE_SITE_KEY } from 'astro:env/client';
import { locale } from '@/components/functional/LocaleStore/locale-store';
import type { I18nData } from '@/lib/collections/types';
import { FORM_TEXTAREA_MINLENGTH } from '@/lib/consts';
import {
  type SubmitHandler,
  createForm,
  reset,
  setValue,
  valiForm,
} from '@modular-forms/solid';
import { useStore } from '@nanostores/solid';
import { type Component, splitProps } from 'solid-js';
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
import { Checkbox } from '../Checkbox/Checkbox';
import { SubmitButton } from '../SubmitButton/SubmitButton';
import { TextField } from '../TextField/TextField';
import { Turnstile } from '../Turnstile/Turnstile';
import { isAstroActionError } from './error-is';

type Props = {
  t: I18nData<'contact_form'>;
};

export const Form: Component<Props> = (props) => {
  const [local, _] = splitProps(props, ['t']);

  /** Form schema must be inside this component to apply translated strings.
   * Putting the async getEntry function for i18n outside and using it here is also possible,
   * but it brings about a warning that using async functions from Astro Content Collections in that way will be deprecated in the future. (As of July 2024)
   * */
  const formSchema = object({
    name: pipe(string(), nonEmpty(local.t.name.required)),
    email: pipe(
      string(),
      nonEmpty(local.t.email.required),
      email(local.t.email.invalid),
    ),
    message: pipe(
      string(),
      nonEmpty(local.t.message.required),
      minLength(FORM_TEXTAREA_MINLENGTH, local.t.message.minlength),
    ),
    confirmation: pipe(
      boolean(),
      check((input) => input === true, local.t.confirmation.required),
    ),
    'cf-turnstile-response': string(),
  });

  const $locale = useStore(locale);

  type FormFields = InferOutput<typeof formSchema>;

  const [contactForm, { Form, Field }] = createForm<FormFields>({
    validateOn: 'submit',
    revalidateOn: 'blur',
    validate: valiForm(formSchema),
  });

  const handleError = (e: ActionError | unknown) => {
    if (isAstroActionError(e)) {
      const errLog = `
      ${e.status} ${e.code}
      ${e.message}`;

      toast.error(
        `${errLog}\n
        ${local.t.error_handler_message}`,
        {
          position: 'bottom-right',
          duration: 8000,
        },
      );
      console.error(errLog);
    } else {
      toast.error(
        `${local.t.unexpected_error_message}: ${e}\n
        ${local.t.error_handler_message}`,
        {
          position: 'bottom-right',
          duration: 8000,
        },
      );
      console.trace(`${local.t.unexpected_error_message}: ${e}`);
    }
  };

  const handleSubmit: SubmitHandler<FormFields> = async (values) => {
    const { data, error } = await actions.form.submit({
      locale: $locale(),
      ...values,
    });
    if (error) {
      handleError(error);
    } else {
      toast.success(data.message, {
        position: 'bottom-right',
        duration: 8000,
      });
    }
    reset(contactForm);
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
            label={local.t.name.label}
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
            label={local.t.email.label}
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
            label={local.t.message.label}
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
            label={local.t.confirmation.label}
            checked={field.value ?? false}
            error={field.error}
          />
        )}
      </Field>
      <Field name="cf-turnstile-response">
        {(field, props) => (
          <>
            <Turnstile
              siteKey={TURNSTILE_SITE_KEY}
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
      <SubmitButton
        label={contactForm.submitting ? local.t.submitting : local.t.submit}
      />
    </Form>
  );
};
