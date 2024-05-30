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
  // const turnstileSecretKey = import.meta.env.TURNSTILE_SECRET_KEY

  const turnstileResult = await fetch(TURNSTILE_SITE_VERIFICATION_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      secret: import.meta.env.PROD
        ? locals.runtime.env.TURNSTILE_SECRET_KEY
        : import.meta.env.TURNSTILE_SECRET_KEY,
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

  const response = await fetch(
    import.meta.env.PROD
      ? locals.runtime.env.SSGFORM_URL
      : import.meta.env.SSGFORM_URL,
    {
      method: 'POST',
      body: data,
    }
  )

  // const response = await fetch(import.meta.env.SSGFORM_URL, {
  //   method: 'POST',
  //   body: data,
  // })

  if (!response.ok) {
    return new Response(
      JSON.stringify({
        message: `Form submission failed: ${response.status} ${response.statusText} ${response.body}`,
      }),
      { status: 500 }
    )
  }

  return redirect('/', 302)
}
