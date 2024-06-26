import {
  type Component,
  type Setter,
  createSignal,
  createResource,
  onMount,
  Suspense,
  createMemo,
} from 'solid-js'
import type { PagefindSearchResult, PagefindSearchResults } from './types'
import { isDev } from '@/lib/mode'
import type { I18nData } from '@/lib/collections/types'
import {
  searchInputWrapper,
  searchInput,
  searchResult,
  searchResults,
  searchWrapper,
  hitArticleTitle,
  hitArticleExcerpt,
  notFound,
  notFoundKeyword,
} from './search.css'
import { SearchIcon } from './SearchIcon'

type Pagefind = {
  init: () => void
  search: (query: string) => Promise<PagefindSearchResults>
}

const initPagefind = async () => {
  const pagefindPath = isDev
    ? '../../../dist/pagefind/pagefind.js'
    : '/pagefind/pagefind.js'
  const pagefind = (await import(/* @vite-ignore */ pagefindPath)) as Pagefind
  pagefind.init()

  return pagefind
}

type Props = {
  t: I18nData<'search'>
}

export const Search: Component<Props> = ({ t }) => {
  let pagefind: Pagefind

  onMount(async () => {
    pagefind = await initPagefind()
  })

  const [query, setQuery] = createSignal('')
  const isQuerying = createMemo(() => query().length > 0)
  const [searchResultRefs, setSearchResultRefs] = createSignal<
    HTMLAnchorElement[]
  >([])
  const [searchResults] = createResource(query, async (query: string) => {
    if (query.length === 0) return undefined

    const searchResults = await pagefind?.search(query)
    setSearchResultRefs(Array(searchResults?.results.length ?? 0).fill(null))
    setActiveIndex(0)

    return searchResults
  })
  const [activeIndex, setActiveIndex] = createSignal(0)
  const incrementActiveIndex = () =>
    setActiveIndex(Math.min(activeIndex() + 1, searchResultRefs().length - 1))
  const decrementActiveIndex = () =>
    setActiveIndex(Math.max(activeIndex() - 1, 0))

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        incrementActiveIndex()
        searchResultRefs()
          .at(activeIndex())
          ?.scrollIntoView({ block: 'nearest' })
        break
      case 'ArrowUp':
        e.preventDefault()
        decrementActiveIndex()
        searchResultRefs()
          .at(activeIndex())
          ?.scrollIntoView({ block: 'nearest' })
        break
    }
  }

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault()
    if (searchResultRefs().length <= 0) return

    searchResultRefs().at(activeIndex())?.click()
  }

  return (
    <div class={searchWrapper}>
      <form onsubmit={handleSubmit}>
        <div class={`${searchInputWrapper} pokemon-border`}>
          <SearchIcon width={20} height={20} />
          <input
            type="text"
            value={query()}
            placeholder={t.button_label}
            onInput={(e) => setQuery(e.currentTarget.value)}
            onKeyDown={handleKeyDown}
            class={searchInput}
          />
        </div>
      </form>
      <Suspense>
        {isQuerying() && (
          <SearchResults
            query={query()}
            results={searchResults()?.results}
            resultRefs={searchResultRefs()}
            setResultRefs={setSearchResultRefs}
            activeIndex={activeIndex()}
            setActiveIndex={setActiveIndex}
          />
        )}
      </Suspense>
    </div>
  )
}

type SearchResultsProps = {
  query: string
  results: PagefindSearchResults['results'] | undefined
  resultRefs: HTMLAnchorElement[]
  setResultRefs: Setter<HTMLAnchorElement[]>
  activeIndex: number
  setActiveIndex: Setter<number>
}

const SearchResults: Component<SearchResultsProps> = (props) => {
  const setResultRef = (i: number) => (el: HTMLAnchorElement) => {
    props.setResultRefs((refs) => {
      refs[i] = el
      return refs
    })
  }

  return (
    <>
      {props.results?.length === 0 ? (
        <div class={notFound}>
          No results found for{' '}
          <span class={notFoundKeyword}>"{props.query}"</span>
        </div>
      ) : (
        <ol class={searchResults}>
          {props.results?.map((result, i) => (
            <Suspense>
              <SearchResult
                index={i}
                result={result}
                ref={setResultRef(i)}
                active={i === props.activeIndex}
                setActiveIndex={props.setActiveIndex}
              />
            </Suspense>
          ))}
        </ol>
      )}
    </>
  )
}

type SearchResultProps = {
  index: number
  result: PagefindSearchResult
  ref: (el: HTMLAnchorElement) => void
  active: boolean
  setActiveIndex: Setter<number>
}

const SearchResult: Component<SearchResultProps> = (props) => {
  const [result] = createResource(() => props.result.data())
  return (
    <li>
      <a
        class={searchResult}
        href={result()?.raw_url ?? ''}
        ref={props.ref}
        onFocus={() => props.setActiveIndex(props.index)}
        onMouseEnter={() => props.setActiveIndex(props.index)}
      >
        <span class={hitArticleTitle}>{result()?.meta['title']}</span>
        <span class={hitArticleExcerpt} innerHTML={result()?.excerpt ?? ''} />
      </a>
    </li>
  )
}
