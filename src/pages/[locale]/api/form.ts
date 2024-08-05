export const prerender = false;

import { getEntry } from 'astro:content';
import {
  CONTACT_NOTIFICATION_SUBJECT,
  FORM_TEXTAREA_MINLENGTH,
  TURNSTILE_SITE_VERIFICATION_URL,
} from '@/lib/consts';
import type { Language } from '@/utils/i18n/data';
import type { APIContext, APIRoute } from 'astro';
import {
  type InferOutput,
  boolean,
  check,
  email,
  minLength,
  nonEmpty,
  object,
  pipe,
  safeParse,
  string,
} from 'valibot';
import nodemailer from 'nodemailer'

export const POST: APIRoute = async ({
  request,
  redirect,
  locals,
  params,
}: APIContext) => {
  const { locale } = params;

  if (!locale) {
    return new Response(
      JSON.stringify({
        message: 'Locale not found. It must be specified.',
      }),
      { status: 404 },
    );
  }

  const curLocale = locale as Language;
  const t = await getEntry('i18n', `${curLocale}/translation`);
  const meta = await getEntry('meta', `${curLocale}/site-data`);

  const formSchema = object({
    name: pipe(string(), nonEmpty(t.data.contact_form.name.required)),
    email: pipe(
      string(),
      nonEmpty(t.data.contact_form.email.required),
      email(t.data.contact_form.email.invalid),
    ),
    message: pipe(
      string(),
      nonEmpty(t.data.contact_form.message.required),
      minLength(FORM_TEXTAREA_MINLENGTH, t.data.contact_form.message.minlength),
    ),
    confirmation: pipe(
      boolean(),
      check(
        (input) => input === true,
        t.data.contact_form.confirmation.required,
      ),
    ),
    'cf-turnstile-response': string(),
  });

  const data = (await request.json()) as InferOutput<typeof formSchema>;

  const vResult = safeParse(formSchema, data);
  if (!vResult.success) {
    return new Response(
      JSON.stringify({
        message: `Missing or invalid field input(s): ${vResult.issues.map((issue) => `message: ${issue.message}\n input: ${issue.input}`)}`,
      }),
      { status: 422 },
    );
  }

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

  const turnstileToken = data['cf-turnstile-response'];
  const secretKey = locals.runtime.env.TURNSTILE_SECRET_KEY;

  const turnstileResult = await fetch(TURNSTILE_SITE_VERIFICATION_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      secret: secretKey,
      response: turnstileToken,
    }),
  });
  const outcome = (await turnstileResult.json()) as TurnstileResponse;
  if (!outcome.success) {
    return new Response(
      JSON.stringify({
        message: `Turnstile verification failed: ${outcome['error-codes']}`,
      }),
      { status: 500 },
    );
  }

 const {
    MY_EMAIL_ADDRESS: user,
    MY_CUSTOM_EMAIL_ADDRESS: myCustomAddress,
    MAIL_OAUTH_CLIENT_ID: clientId,
    MAIL_OAUTH_CLIENT_SECRET: clientSecret,
    MAIL_OAUTH_REFRESH_TOKEN: refreshToken
  } = locals.runtime.env

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user,
      clientId,
      clientSecret,
      refreshToken
    }
  })

  const mailContent = {
    from: `"${meta.data.site.title}" <${myCustomAddress}>`,
    to: myCustomAddress,
    subject: `${CONTACT_NOTIFICATION_SUBJECT} from ${data.name}`,
    text:
      `Name:\n${data.name}\n\n` +
        `Email:\n${data.email}\n\n` +
        `Message:\n${data.message}\n\n`,
    replyTo: {
      name: data.name,
      address: data.email,
    },
  };

  try {
    await transporter.sendMail(mailContent)
  } catch (e) {
    if (e instanceof Error) {
    throw new Error(`Failed to send email due to the error "${e.name}: ${e.message}"`);
  }

  throw new Error('An unexpected error occurred');
  }

  return redirect(`/${curLocale}/thanks-page`, 302);
};
