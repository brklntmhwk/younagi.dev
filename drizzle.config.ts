import type { Config } from 'drizzle-kit';

const { CLOUDFLARE_ACCOUNT_ID, D1_DB_ID, D1_DB_API_TOKEN, LOCAL_DB_PATH } =
  process.env;

export default LOCAL_DB_PATH
  ? ({
      schema: './src/db/schema/index.ts',
      out: './src/db/migrations',
      dialect: 'sqlite',
      dbCredentials: {
        url: LOCAL_DB_PATH,
      },
    } satisfies Config)
  : ({
      schema: './src/db/schema/index.ts',
      out: './src/db/migrations',
      dialect: 'sqlite',
      driver: 'd1-http',
      dbCredentials: {
        accountId: CLOUDFLARE_ACCOUNT_ID!,
        databaseId: D1_DB_ID!,
        token: D1_DB_API_TOKEN!,
      },
    } satisfies Config);
