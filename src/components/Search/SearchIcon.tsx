import type { Component, ComponentProps } from 'solid-js'

export const SearchIcon: Component<ComponentProps<'svg'>> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
      <path
        fill="currentColor"
        fill-rule="evenodd"
        d="M11.5 7a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m-.82 4.74a6 6 0 1 1 1.06-1.06l2.79 2.79a.75.75 0 1 1-1.06 1.06z"
        clip-rule="evenodd"
      />
    </svg>
  )
}
