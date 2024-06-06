import { sql } from 'drizzle-orm'
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'

export const likes = sqliteTable('likes', {
  id: integer('id', { mode: 'number' })
    .primaryKey({ autoIncrement: true })
    .notNull(),
  slug: text('slug').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(
    sql`(strftime('%s', 'now'))`
  ),
  count: integer('count').notNull().default(0),
})
