// type FormDataWithTurnstileRes = {
//   'cf-turnstile-response': string
//   [key: string]: FormDataEntryValue
// }

// type ErrorWithMessage = {
//   message: string
// }

// function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
//   return (
//     typeof error === 'object' &&
//     error !== null &&
//     'message' in error &&
//     typeof (error as Record<string, unknown>).message === 'string'
//   )
// }

// function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
//   if (isErrorWithMessage(maybeError)) return maybeError

//   try {
//     return new Error(JSON.stringify(maybeError))
//   } catch {
//     return new Error(String(maybeError))
//   }
// }

// function getErrorMessage(error: unknown) {
//   return toErrorWithMessage(error).message
// }

export default {
  async fetch(req: Request) {
    const reqText = await req.text()
    return new Response(JSON.stringify({ message: reqText }), { status: 200 })
    // try {
    //   const url = new URL(req.url)
    //   if (!url.pathname.includes('contact')) {
    //     return new Response(JSON.stringify({ message: 'Not found' }), {
    //       status: 404,
    //     })
    //   }
    //   const json = await req.json<FormDataWithTurnstileRes>()
    //   const { 'cf-turnstile-response': token, ...formData } = json

    //   if (!token) {
    //     return new Response(
    //       JSON.stringify({ message: 'Missing CAPTCHA token' }),
    //       { status: 400 }
    //     )
    //   }

    //   const secretKey = import.meta.env.TURNSTILE_SECRET_KEY

    //   if (!secretKey) {
    //     return new Response(JSON.stringify({ message: 'Missing secret key' }), {
    //       status: 500,
    //     })
    //   }

    //   const formActionUrl = 'https://ssgform.com/s/kc69Q9YOLbxz'

    //   const verificationResponse = await fetch(
    //     'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    //     {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //       },
    //       body: new URLSearchParams({
    //         secret: secretKey,
    //         response: token,
    //       }),
    //     }
    //   )

    //   if (!verificationResponse.ok) {
    //     return new Response(
    //       JSON.stringify({ message: 'CAPTCHA verification request failed' }),
    //       { status: 500 }
    //     )
    //   }

    //   const verificationResult = await verificationResponse.json<{
    //     success: boolean
    //     messages: string[]
    //   }>()

    //   if (verificationResult.success) {
    //     const forwardRes = await fetch(formActionUrl, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(formData),
    //     })

    //     if (forwardRes.ok) {
    //       return new Response(
    //         JSON.stringify({ message: 'Form submitted successfully' }),
    //         { status: 200 }
    //       )
    //     } else {
    //       return new Response(
    //         JSON.stringify({ message: 'Form submission failed' }),
    //         { status: 400 }
    //       )
    //     }
    //   } else {
    //     return new Response(
    //       JSON.stringify({ message: 'CAPTCHA verification failed' }),
    //       { status: 400 }
    //     )
    //   }
    // } catch (error) {
    //   return new Response(
    //     JSON.stringify({
    //       message: getErrorMessage(error),
    //     })
    //   )
    // }
  },
}

// export const handleRequest = async (event: FetchEvent): Promise<Response> => {
//   try {
//     const request = event.request
//     const { 'cf-turnstile-response': token, ...formData } =
//       (await request.json()) as {
//         'cf-turnstile-response': string
//         [key: string]: unknown
//       }
//     const secretKey = import.meta.env.TURNSTILE_SECRET_KEY
//     const formActionUrl = 'https://ssgform.com/s/kc69Q9YOLbxz'

//     const verificationResponse = await fetch(
//       'https://challenges.cloudflare.com/turnstile/v0/siteverify',
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: new URLSearchParams({
//           secret: secretKey,
//           response: token,
//         }),
//       }
//     )

//     const verificationResult: { success: boolean } =
//       await verificationResponse.json()

//     if (verificationResult.success) {
//       const forwardResponse = await fetch(formActionUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       })

//       if (forwardResponse.ok) {
//         return new Response(
//           JSON.stringify({ message: 'Form submitted successfully' }),
//           { status: 200 }
//         )
//       } else {
//         return new Response(
//           JSON.stringify({ message: 'CAPTCHA verification failed' }),
//           { status: 400 }
//         )
//       }
//     } else {
//       return new Response(
//         JSON.stringify({ message: 'CAPTCHA verification failed' }),
//         { status: 400 }
//       )
//     }
//   } catch (error) {
//     return new Response(JSON.stringify({ message: 'Internal server error' }), {
//       status: 500,
//     })
//   }
// }

// addEventListener('fetch', (event) => {
//   if (event instanceof FetchEvent)
//     event.respondWith(handleRequest(event as FetchEvent))
// })
