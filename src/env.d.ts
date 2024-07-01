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

type Language = import('./utils/i18n/data').Language

type TurnstileRenderParameters = {
  sitekey: string
  actions?: string
  cData?: string
  callback?: (token: string) => void
  'error-callback'?: (e: any) => void
  execution?: 'render' | 'execute'
  'expired-callback'?: () => void
  'before-interactive-callback'?: () => void
  'after-interactive-callback'?: () => void
  'unsupported-callback'?: () => void
  theme?: 'light' | 'dark' | 'auto'
  language?: Language | 'auto'
  tabindex?: number
  'timeout-callback'?: () => void
  'response-field'?: boolean
  'response-field-name'?: string
  size?: 'normal' | 'compact'
  retry?: 'auto' | 'never'
  'retry-interval'?: number
  'refresh-expired'?: 'auto' | 'manual' | 'never'
  'refresh-timeout'?: 'auto' | 'manual' | 'never'
  appearance?: 'always' | 'execute' | 'interaction-only'
}

interface Window {
  onloadTurnstileCallback?: (() => void) | undefined
  turnstile: {
    render: (
      container: string | HTMLElement,
      params: TurnstileRenderParameters
    ) => string
    reset: (container?: string | HTMLElement) => void
    getResponse: (container?: string | HTMLElement) => string | undefined
    remove: (container?: string | HTMLElement) => void
  }
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
