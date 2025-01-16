import { type Component, type Setter, Suspense } from 'solid-js';
import { SearchResult } from './SearchResult';
import type { PagefindSearchResults } from './types';

type SearchResultsProps = {
  query: string;
  results: PagefindSearchResults['results'] | undefined;
  resultRefs: HTMLAnchorElement[];
  setResultRefs: Setter<HTMLAnchorElement[]>;
  activeIndex: number;
  setActiveIndex: Setter<number>;
  notFoundLabel: string;
};

export const SearchResults: Component<SearchResultsProps> = (props) => {
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
