export default {
  async fetch(req: Request) {
    try {
      const { 'cf-turnstile-response': token, ...formData } =
        (await req.json()) as {
          'cf-turnstile-response': string
          [key: string]: unknown
        }
      const secretKey = import.meta.env.TURNSTILE_SECRET_KEY
      const formActionUrl = 'https://ssgform.com/s/kc69Q9YOLbxz'

      const verificationResponse = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            secret: secretKey,
            response: token,
          }),
        }
      )

      const verificationResult: { success: boolean } =
        await verificationResponse.json()

      if (verificationResult.success) {
        const forwardResponse = await fetch(formActionUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })

        if (forwardResponse.ok) {
          return new Response(
            JSON.stringify({ message: 'Form submitted successfully' }),
            { status: 200 }
          )
        } else {
          return new Response(
            JSON.stringify({ message: 'CAPTCHA verification failed' }),
            { status: 400 }
          )
        }
      } else {
        return new Response(
          JSON.stringify({ message: 'CAPTCHA verification failed' }),
          { status: 400 }
        )
      }
    } catch (error) {
      return new Response(
        JSON.stringify({ message: 'Internal server error', error: error }),
        {
          status: 500,
        }
      )
    }
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
