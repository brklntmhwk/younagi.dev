/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly UNSPLASH_API_ACCESS_KEY: string;
  readonly PUBLIC_TURNSTILE_SITE_KEY: string;
  readonly LOCAL_DB_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
