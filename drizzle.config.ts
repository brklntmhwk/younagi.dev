import type { Config } from 'drizzle-kit'

// const {
//   CLOUDFLARE_ACCOUNT_ID,
//   D1_DB_ID,
//   D1_DB_API_TOKEN /* , LOCAL_DB_PATH */,
// } = process.env

export default {
  schema: './src/db/schema/index.ts',
  out: './src/db/migrations',
  dialect: 'sqlite',
  // driver: 'd1-http',
  dbCredentials: {
    url: '.wrangler\\state\\v3\\d1\\miniflare-D1DatabaseObject\\c1916cea0a616034661a643af690f1cb7d0c860517289e554741eaf4df59bd2e.sqlite',
    // accountId: CLOUDFLARE_ACCOUNT_ID!,
    // databaseId: D1_DB_ID!,
    // token: D1_DB_API_TOKEN!,
  },
} satisfies Config

// export default LOCAL_DB_PATH
//   ? {
//       schema: './src/db/schema/index.ts',
//       out: './src/db/migrations',
//       dialect: 'sqlite',
//       driver: 'better-sqlite',
//       dbCredentials: {
//         url: LOCAL_DB_PATH,
//       },
//     }
//   : ({
//       schema: './src/db/schema/index.ts',
//       out: './src/db/migrations',
//       dialect: 'sqlite',
//       driver: 'd1-http',
//       dbCredentials: {
//         accountId: CLOUDFLARE_ACCOUNT_ID!,
//         databaseId: D1_DB_ID!,
//         token: D1_DB_API_TOKEN!,
//       },
//     } satisfies Config)
