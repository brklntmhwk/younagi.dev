import '@/styles/pixel-m-plus.css';
import type { I18nData } from '@/lib/collections/types';
import { isDev } from '@/lib/mode';
import {
  type Component,
  Suspense,
  createMemo,
  createResource,
  createSignal,
  onMount,
} from 'solid-js';
import { SearchIcon } from './SearchIcon';
import { SearchResults } from './SearchResults';
import type {
  PagefindFilterCounts,
  PagefindSearchOptions,
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
  // This should preferably be a store but it's not possible to use stores in createResource
  const [enabledFilters, setEnabledFilters] = createSignal<EnabledFilters>({});
  const isQuerying = createMemo(() => query().length > 0);
  const [searchResultRefs, setSearchResultRefs] = createSignal<
    HTMLAnchorElement[]
  >([]);

  const [searchResults] = createResource(
    () => {
      return { query: query(), filters: enabledFilters() };
    },
    async ({ query, filters }) => {
      if (query.length === 0) return undefined;

      const searchResults = await pagefind.search(query, {
        filters: filters,
      });
      setSearchResultRefs(Array(searchResults?.results.length ?? 0).fill(null));
      setActiveIndex(0);

      return searchResults;
    },
  );
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
  };

  const handleReset = () => {
    setQuery('');
    setEnabledFilters({});
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    if (searchResultRefs().length <= 0) return;

    searchResultRefs().at(activeIndex())?.click();
  };

  return (
    <div class="max-h-[76dvh] flex flex-col gap-4 box-border h-fit">
      <form class="my-2 flex flex-col gap-3" onsubmit={handleSubmit}>
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
          {Object.entries(filters() ?? {}).map(([title, filterMap]) => (
            <details class="w-full py-3 border-b-2 border-solid border-line-solid [&>summary:after]:open:rotate-90">
              <summary class="cursor-pointer select-none list-none text-base sm:text-lg font-bold after:ml-2 after:content-['≫'] after:text-inherit after:inline-block">
                {title}
              </summary>
              <fieldset class="flex flex-wrap gap-4 py-4">
                <legend class="sr-only">{title}</legend>
                {Object.entries(filterMap).map(([value, count]) => (
                  <div class="relative flex items-center">
                    <input
                      type="checkbox"
                      class="checked:accent-neutral-500"
                      id={`${title}-${value}`}
                      name={title}
                      value={value}
                      onChange={handleCheckboxChange}
                    />
                    <label
                      for={`${title}-${value}`}
                      class="select-none font-medium pl-2"
                    >
                      {value} ({count})
                    </label>
                  </div>
                ))}
              </fieldset>
            </details>
          ))}
        </div>
        <input
          type="reset"
          class="font-semibold cursor-pointer py-1 px-2 rounded-sm self-center border-2 border-solid border-line-solid hover:bg-default-reverse-hover"
          value={props.t.reset_label}
          onClick={handleReset}
        />
        {isQuerying() && (
          <p class="text-center">
            {props.t.results_label}{' '}
            <span class="font-bold">
              "{query()}": {searchResults()?.results.length}
            </span>
          </p>
        )}
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
