/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type D1Database = import('@cloudflare/workers-types').D1Database
type ExtendedEnv = Env & {
  DB: D1Database
}
type Runtime = import('@astrojs/cloudflare').Runtime<ExtendedEnv>

declare namespace App {
  interface Locals extends Runtime {}
}

declare module '@pagefind/default-ui' {
  declare class PagefindUI {
    constructor(opts: {
      element?: string | HTMLElement
      bundlePath?: string
      pageSize?: number
      resetStyles?: boolean
      showImages?: boolean
      showSubResults?: boolean
      excerptLength?: number
      processResult?: any
      processTerm?: any
      showEmptyFilters?: boolean
      debounceTimeoutMs?: number
      mergeIndex?: any
      translations?: {
        placeholder?: string
        clear_search?: string
        load_more?: string
        search_label?: string
        filters_label?: string
        zero_results?: string
        many_results?: string
        one_result?: string
        alt_search?: string
        search_suggestion?: string
        searching?: string
      }
      autofocus?: boolean
      sort?: any
    })
  }
}
