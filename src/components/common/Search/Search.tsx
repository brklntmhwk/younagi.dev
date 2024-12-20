import type { I18nData } from '@/lib/collections/types';
import { isDev } from '@/lib/mode';
import {
  type Component,
  type Setter,
  Suspense,
  createMemo,
  createResource,
  createSignal,
  onMount,
} from 'solid-js';
import { SearchIcon } from './SearchIcon';
import type { PagefindSearchResult, PagefindSearchResults } from './types';

type Pagefind = {
  init: () => void;
  search: (query: string) => Promise<PagefindSearchResults>;
};

const initPagefind = async () => {
  const pagefindPath = isDev
    ? '../../../dist/pagefind/pagefind.js'
    : '/pagefind/pagefind.js';
  const pagefind = (await import(/* @vite-ignore */ pagefindPath)) as Pagefind;
  pagefind.init();

  return pagefind;
};

type Props = {
  t: I18nData<'search'>;
};

export const Search: Component<Props> = (props) => {
  let pagefind: Pagefind;

  onMount(async () => {
    pagefind = await initPagefind();
  });

  const [query, setQuery] = createSignal('');
  const isQuerying = createMemo(() => query().length > 0);
  const [searchResultRefs, setSearchResultRefs] = createSignal<
    HTMLAnchorElement[]
  >([]);
  const [searchResults] = createResource(query, async (query: string) => {
    if (query.length === 0) return undefined;

    const searchResults = await pagefind?.search(query);
    setSearchResultRefs(Array(searchResults?.results.length ?? 0).fill(null));
    setActiveIndex(0);

    return searchResults;
  });
  const [activeIndex, setActiveIndex] = createSignal(0);
  const incrementActiveIndex = () =>
    setActiveIndex(Math.min(activeIndex() + 1, searchResultRefs().length - 1));
  const decrementActiveIndex = () =>
    setActiveIndex(Math.max(activeIndex() - 1, 0));

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        incrementActiveIndex();
        searchResultRefs()
          .at(activeIndex())
          ?.scrollIntoView({ block: 'nearest' });
        break;
      case 'ArrowUp':
        e.preventDefault();
        decrementActiveIndex();
        searchResultRefs()
          .at(activeIndex())
          ?.scrollIntoView({ block: 'nearest' });
        break;
    }
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    if (searchResultRefs().length <= 0) return;

    searchResultRefs().at(activeIndex())?.click();
  };

  return (
    <div class="max-h-[76dvh] flex flex-col gap-6 box-border h-fit">
      <form onsubmit={handleSubmit}>
        <div class="bg-default-reverse double-border sticky flex items-center gap-2 p-3">
          <SearchIcon label={props.t.button_label} width={22} height={22} />
          <input
            id="search-window"
            type="text"
            value={query()}
            placeholder={props.t.placeholder}
            onInput={(e) => setQuery(e.currentTarget.value)}
            onKeyDown={handleKeyDown}
            class="font-pixelMPlus w-full text-lg bg-transparent outline-none"
            autocomplete="off"
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
            notFoundLabel={props.t.result_not_found}
          />
        )}
      </Suspense>
    </div>
  );
};

type SearchResultsProps = {
  query: string;
  results: PagefindSearchResults['results'] | undefined;
  resultRefs: HTMLAnchorElement[];
  setResultRefs: Setter<HTMLAnchorElement[]>;
  activeIndex: number;
  setActiveIndex: Setter<number>;
  notFoundLabel: string;
};

const SearchResults: Component<SearchResultsProps> = (props) => {
  const setResultRef = (i: number) => (el: HTMLAnchorElement) => {
    props.setResultRefs((refs) => {
      refs[i] = el;

      return refs;
    });
  };

  return (
    <>
      {props.results?.length === 0 ? (
        <div class="px-5 py-6 pb-3 text-center">
          {props.notFoundLabel} <span class="font-bold">"{props.query}"</span>
        </div>
      ) : (
        <ol class="flex flex-col flex-auto gap-1 overflow-y-auto pt-3 pb-4">
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
  );
};

type SearchResultProps = {
  index: number;
  result: PagefindSearchResult;
  ref: (el: HTMLAnchorElement) => void;
  active: boolean;
  setActiveIndex: Setter<number>;
};

const SearchResult: Component<SearchResultProps> = (props) => {
  const [result] = createResource(() => props.result.data());

  return (
    <li>
      <a
        class={`py-3.5 px-2 rounded-sm flex flex-col gap-2.5 border-[1px] border-solid border-line-solid hover:bg-default-reverse-hover ${props.active && 'bg-default-reverse-hover'}`}
        href={result()?.raw_url ?? ''}
        ref={props.ref}
        onFocus={() => props.setActiveIndex(props.index)}
        onMouseEnter={() => props.setActiveIndex(props.index)}
      >
        <span class="text-xl font-semibold">{result()?.meta.title}</span>
        <span
          class="text-base [&>mark]:text-primary [&>mark]:font-semibold"
          innerHTML={result()?.excerpt ?? ''}
        />
      </a>
    </li>
  );
};
