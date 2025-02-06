import { defineAction } from 'astro:actions';
import { z } from 'astro:content';
import { likes as likesSchema } from '@/db/schema';
import { and, count, eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';

export const likes = {
  fetch: defineAction({
    input: z.object({
      slug: z.string(),
      collection: z.string(),
    }),
    handler: async (input, ctx) => {
      const d1 = ctx.locals.runtime.env.DB;
      const db = drizzle(d1, { schema: { likesSchema } });

      const { slug, collection } = input;
      const sessionId = ctx.cookies.get('sessionId')?.value;

      const likesCount = (
        await db
          .select({ likes: count() })
          .from(likesSchema)
          .where(
            and(
              eq(likesSchema.slug, slug),
              eq(likesSchema.collection, collection),
            ),
          )
      ).at(0)?.likes;

      let liked = false;

      if (sessionId) {
        const sessionCount =
          (
            await db
              .select({ likes: count() })
              .from(likesSchema)
              .where(
                and(
                  eq(likesSchema.slug, slug),
                  eq(likesSchema.sessionId, sessionId),
                ),
              )
          ).at(0)?.likes ?? 0;
        liked = sessionCount > 0;
      }

      return { likes: likesCount, liked };
    },
  }),
  update: defineAction({
    input: z.object({
      slug: z.string(),
      collection: z.string(),
    }),
    handler: async (input, ctx) => {
      const d1 = ctx.locals.runtime.env.DB;
      const db = drizzle(d1, { schema: { likesSchema } });

      if (!ctx.cookies.has('sessionId')) {
        ctx.cookies.set('sessionId', crypto.randomUUID(), {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          path: '/',
          maxAge: 60 * 60 * 24 * 365,
        });
      }

      const { slug, collection } = input;
      const sessionId = ctx.cookies.get('sessionId')?.value ?? '';

      const liked =
        ((
          await db
            .select({ likes: count() })
            .from(likesSchema)
            .where(
              and(
                eq(likesSchema.slug, slug),
                eq(likesSchema.sessionId, sessionId),
              ),
            )
        ).at(0)?.likes ?? 0) > 0;

      if (liked) {
        await db
          .delete(likesSchema)
          .where(
            and(
              eq(likesSchema.slug, slug),
              eq(likesSchema.collection, collection),
              eq(likesSchema.sessionId, sessionId),
            ),
          )
          .execute();
      } else {
        await db
          .insert(likesSchema)
          .values({
            sessionId,
            collection,
            slug,
            createdAt: new Date(),
          })
          .execute();
      }

      return { liked };
    },
  }),
};
