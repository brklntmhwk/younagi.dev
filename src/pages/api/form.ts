export const prerender = false

import type { APIRoute, APIContext } from 'astro'
import { TURNSTILE_SITE_VERIFICATION_URL } from '@/consts'

type TurnstileResponse = {
  success: boolean
  'error-codes': string[]
  challenge_ts: string
  hostname: string
  action: string
  cdata: string
}

export const POST: APIRoute = async ({
  request,
  redirect,
  locals,
}: APIContext) => {
  const data = await request.formData()
  const turnstileToken = data.get('cf-turnstile-response')! as string
  const { TURNSTILE_SECRET_KEY, SSGFORM_URL } = locals.runtime.env
  const turnstileSecretKey = locals
  // const turnstileSecretKey = import.meta.env.TURNSTILE_SECRET_KEY

  const turnstileResult = await fetch(TURNSTILE_SITE_VERIFICATION_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      secret: TURNSTILE_SECRET_KEY,
      response: turnstileToken,
    }),
  })

  const outcome = (await turnstileResult.json()) as TurnstileResponse

  if (!outcome.success) {
    return new Response(
      JSON.stringify({
        message: `Turnstile verification failed: ${outcome['error-codes']} & secretKey: ${turnstileSecretKey}`,
      }),
      { status: 500 }
    )
  }

  const response = await fetch(SSGFORM_URL, {
    method: 'POST',
    body: data,
  })

  // const response = await fetch(import.meta.env.SSGFORM_URL, {
  //   method: 'POST',
  //   body: data,
  // })

  if (!response.ok) {
    return new Response(
      JSON.stringify({ message: 'Form submission failed.' }),
      { status: 500 }
    )
  }

  return redirect('/', 302)
}
