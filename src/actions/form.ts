import { ActionError, defineAction } from 'astro:actions';
import { getEntry, z } from 'astro:content';
import {
  CONTACT_NOTIFICATION_SUBJECT,
  TURNSTILE_SITE_VERIFICATION_URL,
} from '@/lib/consts';
import { Resend } from 'resend';
import wretch from 'wretch';

export const form = {
  submit: defineAction({
    input: z.object({
      name: z.string(),
      email: z.string(),
      message: z.string(),
      confirmation: z.boolean(),
      'cf-turnstile-response': z.string(),
      locale: z.string(),
    }),
    handler: async (input, ctx) => {
      if (!input.locale) {
        throw new ActionError({
          code: 'NOT_FOUND',
          message: 'Locale not found. It must be specified.',
        });
      }

      const locale = input.locale;
      const t = await getEntry('i18n', `${locale}/translation`);
      const meta = await getEntry('meta', `${locale}/site-data`);

      type TurnstileErrorCode =
        | 'missing-input-secret'
        | 'invalid-input-secret'
        | 'missing-input-response'
        | 'invalid-input-response'
        | 'invalid-widget-id'
        | 'invalid-parsed-secret'
        | 'bad-request'
        | 'timeout-or-duplicate'
        | 'internal-error';

      type TurnstileResponse =
        | {
            success: true;
            'error-codes': [];
            challenge_ts: string;
            hostname: string;
            action: string;
            cdata: string;
          }
        | {
            success: false;
            'error-codes': TurnstileErrorCode[];
          };

      const turnstileToken = input['cf-turnstile-response'];
      const secretKey = ctx.locals.runtime.env.TURNSTILE_SECRET_KEY;

      const turnstileResult = await wretch(TURNSTILE_SITE_VERIFICATION_URL)
        .headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
        .post(
          new URLSearchParams({
            secret: secretKey,
            response: turnstileToken,
          }),
        )
        .res();
      const outcome = (await turnstileResult.json()) as TurnstileResponse;
      if (!outcome.success) {
        throw new ActionError({
          code: 'FORBIDDEN',
          message: 'Failed to verify Turnstile',
        });
      }

      const {
        MY_CUSTOM_EMAIL_ADDRESS: myCustomAddress,
        RESEND_API_KEY: resendApiKey,
      } = ctx.locals.runtime.env;

      const resend = new Resend(resendApiKey);

      const mailContent = {
        from: `${meta!.data.site.title} <${myCustomAddress}>`,
        to: [myCustomAddress],
        subject: `${CONTACT_NOTIFICATION_SUBJECT} from ${input.name}`,
        text: `Name:\n${input.name}\nEmail:\n${input.email}\nMessage:\n${input.message}`,
        reply_to: `${input.name} <${input.email}>`,
      };

      const resendResult = await resend.emails.send(mailContent);
      if (resendResult.error) {
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to send email: ${resendResult.error.name}`,
        });
      }

      return { message: t!.data.contact_form.submitting };
    },
  }),
};
