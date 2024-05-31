export const prerender = false

import type { APIRoute, APIContext } from 'astro'
import { TURNSTILE_SITE_VERIFICATION_URL, BREVO_FORM_URL } from '@/consts'

type TurnstileErrorCode =
  | 'missing-input-secret'
  | 'invalid-input-secret'
  | 'missing-input-response'
  | 'invalid-input-response'
  | 'invalid-widget-id'
  | 'invalid-parsed-secret'
  | 'bad-request'
  | 'timeout-or-duplicate'
  | 'internal-error'

type TurnstileResponse =
  | {
      success: true
      'error-codes': []
      challenge_ts: string
      hostname: string
      action: string
      cdata: string
    }
  | {
      success: false
      'error-codes': TurnstileErrorCode[]
    }

export const POST: APIRoute = async ({
  request,
  /* redirect, */
  locals,
}: APIContext) => {
  const data = await request.formData()
  const turnstileToken = data.get('cf-turnstile-response')! as string
  const secretKey = import.meta.env.PROD
    ? locals.runtime.env.TURNSTILE_SECRET_KEY
    : import.meta.env.TURNSTILE_SECRET_KEY

  const turnstileResult = await fetch(TURNSTILE_SITE_VERIFICATION_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      secret: secretKey,
      response: turnstileToken,
    }),
  })

  const outcome = (await turnstileResult.json()) as TurnstileResponse

  if (!outcome.success) {
    return new Response(
      JSON.stringify({
        message: `Turnstile verification failed: ${outcome['error-codes']}`,
      }),
      { status: 500 }
    )
  }

  data.delete('cf-turnstile-response')
  data.delete('confirmCheck')

  const inputName = data.get('name')! as string
  const inputEmail = data.get('email')! as string
  const inputMessage = data.get('message')! as string

  const myEmail = import.meta.env.PROD
    ? locals.runtime.env.MY_CUSTOM_EMAIL_ADDRESS
    : import.meta.env.MY_CUSTOM_EMAIL_ADDRESS
  const mailContent = {
    sender: { email: myEmail, name: 'younagi.dev Contact Form' },
    to: [
      {
        email: myEmail,
        name: 'Nagi (凪)',
      },
    ],
    subject: 'Message sent from younagi.dev contact form.',
    textContent: `Name: ${inputName} \n Email: ${inputEmail} \n Message: ${inputMessage}`,
  }
  const brevoApiKey = import.meta.env.PROD
    ? locals.runtime.env.BREVO_API_KEY
    : import.meta.env.BREVO_API_KEY

  const response = await fetch(BREVO_FORM_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-key': brevoApiKey,
    },
    body: JSON.stringify(mailContent),
  })

  if (!response.ok) {
    return new Response(
      JSON.stringify({
        message: `Form submission failed: ${response.status} ${response.statusText} ${response.type}`,
      }),
      { status: 500 }
    )
  }

  return new Response(
    JSON.stringify({
      message: `Form successfully submitted!: ${response.status} ${response.statusText}`,
    }),
    { status: 200 }
  )

  // return redirect('/', 302)
}
