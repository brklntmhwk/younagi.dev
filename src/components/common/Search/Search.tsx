import '@/styles/pixel-m-plus.css';
import { CheckIcon } from '@/components/ui/ContactForm/Checkbox/CheckIcon';
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
import { createStore } from 'solid-js/store';
import { SearchIcon } from './SearchIcon';
import type {
  PagefindFilterCounts,
  PagefindSearchOptions,
  PagefindSearchResult,
  PagefindSearchResults,
} from './types';

type Pagefind = {
  init: () => void;
  search: (
    query: string,
    options?: PagefindSearchOptions,
  ) => Promise<PagefindSearchResults>;
  filters: () => Promise<PagefindFilterCounts>;
};

type EnabledFilters = {
  [key: string]: string[];
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
    setFilters(await pagefind.filters());
  });

  const [filters, setFilters] = createSignal<PagefindFilterCounts>({});
  const [query, setQuery] = createSignal('');
  const [enabledFilters, setEnabledFilters] = createStore<EnabledFilters>({});
  const isQuerying = createMemo(() => query().length > 0);
  const [searchResultRefs, setSearchResultRefs] = createSignal<
    HTMLAnchorElement[]
  >([]);

  const [searchResults] = createResource(query, async (query: string) => {
    if (query.length === 0) return undefined;

    const searchResults = await pagefind.search(query, {
      filters: enabledFilters,
    });
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

  const handleCheckboxChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;

    setEnabledFilters((prev) => ({
      ...prev,
      [name]: prev[name]?.includes(value)
        ? prev[name]?.filter((v) => v !== value)
        : [...(prev[name] ?? []), value],
    }));

    console.log(enabledFilters);
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    if (searchResultRefs().length <= 0) return;

    searchResultRefs().at(activeIndex())?.click();
  };

  return (
    <div class="max-h-[76dvh] flex flex-col gap-4 box-border h-fit">
      <form class="flex flex-col gap-2" onsubmit={handleSubmit}>
        <div class="bg-default-reverse double-border flex items-center gap-2 p-3">
          <SearchIcon label={props.t.button_label} width={22} height={22} />
          <input
            id="search-window"
            type="text"
            value={query()}
            placeholder={props.t.placeholder}
            onInput={(e) => setQuery(e.currentTarget.value)}
            onKeyDown={handleKeyDown}
            class="font-pixel w-full text-lg bg-transparent outline-none"
            autocomplete="off"
          />
        </div>
        <div class="p-1 flex flex-col gap-2 py-3">
          {Object.entries(
            filters() ?? {
              category: {
                Gourmet: 5,
                Outdoor: 4,
                Something1: 5,
                Something2: 1,
                Something3: 1,
                Something4: 1,
                Something5: 1,
                Something6: 1,
                Something7: 1,
              },
              tag: { DIY: 7 },
            },
          ).map(([title, filterMap]) => (
            <details class="w-full py-3 border-b-2 border-solid border-line-solid [&>summary:after]:open:rotate-90">
              <summary class="cursor-pointer select-none list-none text-lg font-bold after:ml-2 after:content-['≫'] after:text-inherit after:inline-block after:ease-linear after:duration-300">
                {title}
              </summary>
              <fieldset class="flex flex-wrap gap-2 py-4">
                <legend class="sr-only">{title}</legend>
                {Object.entries(filterMap).map(([value, count]) => (
                  <div class="relative flex items-center before:content-[''] before:text-xl before:w-4 before:h-4 before:absolute before:left-0 before:top-1 before:border-2 before:border-solid before:border-line-solid">
                    <input
                      type="checkbox"
                      class="peer appearance-none"
                      id={value}
                      name={title}
                      value={value}
                      onChange={handleCheckboxChange}
                    />
                    <CheckIcon
                      label={value}
                      width={16}
                      height={16}
                      class="hidden absolute top-1 left-0 peer-checked:inline"
                    />
                    <label for={value} class="select-none pl-5 font-medium">
                      {value} ({count})
                    </label>
                  </div>
                ))}
              </fieldset>
            </details>
          ))}
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
        <ol class="flex flex-col flex-auto gap-1 pt-3 pb-4">
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
        class={`py-3 px-2 rounded-sm flex flex-col gap-2.5 border-2 border-solid border-line-solid hover:bg-default-reverse-hover ${props.active && 'bg-default-reverse-hover'}`}
        href={result()?.raw_url ?? ''}
        ref={props.ref}
        onFocus={() => props.setActiveIndex(props.index)}
        onMouseEnter={() => props.setActiveIndex(props.index)}
      >
        <span class="text-xl font-semibold">{result()?.meta.title}</span>
        <span
          class="text-base [&>mark]:text-primary [&>mark]:font-semibold [&>mark]:bg-transparent"
          innerHTML={result()?.excerpt ?? ''}
        />
      </a>
    </li>
  );
};
