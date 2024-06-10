export const prerender = false

import type { APIRoute, APIContext } from 'astro'
import { count, eq, and } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/d1'
import { likes } from '@/db/schema'

export const GET: APIRoute = async ({ locals, url, cookies }: APIContext) => {
  const d1 = locals.runtime.env.DB
  const db = drizzle(d1, { schema: { likes } })

  const slug = url.searchParams.get('slug') ?? ''
  const collection = url.searchParams.get('collection') ?? ''
  const sessionId = cookies.get('sessionId')?.value

  const likesCount = (
    await db
      .select({ likes: count() })
      .from(likes)
      .where(and(eq(likes.slug, slug), eq(likes.collection, collection)))
  ).at(0)?.likes
  let liked = false
  if (sessionId) {
    const sessionCount =
      (
        await db
          .select({ likes: count() })
          .from(likes)
          .where(and(eq(likes.slug, slug), eq(likes.sessionId, sessionId)))
      ).at(0)?.likes ?? 0
    liked = sessionCount > 0
  }

  return new Response(JSON.stringify({ likes: likesCount, liked }), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const POST: APIRoute = async ({
  locals,
  request,
  cookies,
}: APIContext) => {
  const runtime = locals.runtime
  const d1 = runtime.env.DB
  const db = drizzle(d1, { schema: { likes } })

  const { slug = '', collection = '' } = (await request.json()) as {
    slug?: string
    collection?: string
  }

  if (!cookies.has('sessionId')) {
    cookies.set('sessionId', crypto.randomUUID(), {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    })
  }

  const sessionId = cookies.get('sessionId')?.value ?? ''

  const liked =
    ((
      await db
        .select({ likes: count() })
        .from(likes)
        .where(and(eq(likes.slug, slug), eq(likes.sessionId, sessionId)))
    ).at(0)?.likes ?? 0) > 0

  if (liked) {
    await db
      .delete(likes)
      .where(
        and(
          eq(likes.slug, slug),
          eq(likes.collection, collection),
          eq(likes.sessionId, sessionId)
        )
      )
      .execute()
  } else {
    await db
      .insert(likes)
      .values({
        sessionId,
        collection,
        slug,
        createdAt: new Date(),
      })
      .execute()
  }

  return new Response(JSON.stringify({ success: true }))
}
