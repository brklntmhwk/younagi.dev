import { sql } from 'drizzle-orm'
import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const likes = sqliteTable(
  'likes',
  {
    sessionId: text('session_id'),
    collection: text('collection'),
    slug: text('slug'),
    createdAt: integer('created_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`0`),
  },
  (likes) => {
    return {
      pk: primaryKey({
        columns: [likes.sessionId, likes.collection, likes.slug],
      }),
    }
  },
)
