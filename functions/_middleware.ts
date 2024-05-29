import staticFormsPlugin from '@cloudflare/pages-plugin-static-forms'
import { TURNSTILE_SITE_VERIFICATION_URL } from '@/consts'

type TurnstileResponse = {
  success: boolean
  'error-codes': string[]
  challenge_ts: string
  hostname: string
}

export const onRequest: PagesFunction = staticFormsPlugin({
  respondWith: async ({ formData, name }) => {
    if (name !== 'contact') {
      return new Response(JSON.stringify({ message: 'Not found' }), {
        status: 404,
      })
    }

    const turnstileToken = formData.get('cf-turnstile-response')! as string

    formData.append('secret', import.meta.env.TURNSTILE_SECRET_KEY)
    formData.append('response', turnstileToken)

    const turnstileResult = await fetch(TURNSTILE_SITE_VERIFICATION_URL, {
      body: formData,
      method: 'POST',
    })

    const outcome = (await turnstileResult.json()) as TurnstileResponse

    if (!outcome.success) {
      return new Response(
        JSON.stringify({ message: 'Turnstile verification failed.' }),
        { status: 500 }
      )
    }

    const response = await fetch(import.meta.env.SSGFORM_URL, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      return new Response(
        JSON.stringify({ message: 'Form submission failed.' }),
        { status: 500 }
      )
    }

    return new Response(
      JSON.stringify({ message: 'Form successfully submitted!' }),
      { status: 200 }
    )
  },
})
