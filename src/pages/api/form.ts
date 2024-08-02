export const prerender = false;

import { getEntry } from 'astro:content';
import {
  FORM_TEXTAREA_MINLENGTH,
  // BREVO_FORM_URL,
  // CONTACT_NOTIFICATION_SUBJECT,
  SITE_URL,
  TURNSTILE_SITE_VERIFICATION_URL,
} from '@/lib/consts';
import { defaultLang } from '@/utils/i18n/data';
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

export const POST: APIRoute = async ({
  request,
  redirect,
  locals,
}: APIContext) => {
  const t = await getEntry('i18n', `${defaultLang}/translation`);
  // const meta = await getEntry('meta', `${defaultLang}/site-data`);

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
        message: `Missing or invalid field input(s):\n ${vResult.issues.map((issue) => `message: ${issue.message}\n input: ${issue.input}`)}`,
      }),
      { status: 422 },
    );
  }

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

  // const myEmail = locals.runtime.env.MY_CUSTOM_EMAIL_ADDRESS;

  // const mailContent = {
  //   sender: { email: myEmail, name: meta.data.site.title },
  //   to: [
  //     {
  //       email: myEmail,
  //       name: t.data.author_name,
  //     },
  //   ],
  //   subject: CONTACT_NOTIFICATION_SUBJECT,
  //   textContent: `お問い合わせ内容 \n --- \n 名前: ${data.name} \n メールアドレス: ${data.email} \n メッセージ: ${data.message} \n ---`,
  //   replyTo: {
  //     email: data.email,
  //     name: data.name,
  //   },
  // };
  // const brevoApiKey = locals.runtime.env.BREVO_API_KEY;

  // const response = await fetch(BREVO_FORM_URL, {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //     'api-key': brevoApiKey,
  //   },
  //   body: JSON.stringify(mailContent),
  // });
  const response = await fetch(`${SITE_URL}/api/email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      message: data.message,
    }),
  });
  if (!response.ok) {
    return new Response(
      JSON.stringify({
        message: `Failed to submit form data: ${response.status} ${response.statusText} ${response.url}`,
      }),
      { status: 500 },
    );
  }

  return redirect('/thanks-page', 302);
};
