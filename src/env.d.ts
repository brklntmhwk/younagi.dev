/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

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
