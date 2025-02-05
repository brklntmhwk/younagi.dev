import type { Config } from 'drizzle-kit';

// These must be set from your Cloudflare dashboard
const { CLOUDFLARE_ACCOUNT_ID, D1_DB_ID, D1_DB_API_TOKEN } = process.env;

export default {
  schema: './src/db/schema/index.ts',
  out: './src/db/migrations',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    accountId: CLOUDFLARE_ACCOUNT_ID!,
    databaseId: D1_DB_ID!,
    token: D1_DB_API_TOKEN!,
  },
} satisfies Config;
