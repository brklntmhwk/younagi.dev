import { type Component, type Setter, createResource } from 'solid-js';
import type { PagefindSearchResult } from './types';

type Props = {
  index: number;
  result: PagefindSearchResult;
  ref: (el: HTMLAnchorElement) => void;
  active: boolean;
  setActiveIndex: Setter<number>;
};

export const SearchResult: Component<Props> = (props) => {
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
        <span class="text-xl font-bold">{result()?.meta.title}</span>
        <span
          class="text-base [&>mark]:text-primary [&>mark]:font-medium [&>mark]:bg-transparent"
          innerHTML={result()?.excerpt ?? ''}
        />
      </a>
    </li>
  );
};
