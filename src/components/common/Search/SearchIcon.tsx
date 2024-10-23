import { type Component, type ComponentProps, splitProps } from 'solid-js';

type Props = {
  label: string;
};

export const SearchIcon: Component<ComponentProps<'svg'> & Props> = (props) => {
  const [local, others] = splitProps(props, ['label']);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...others}>
      <title>{local.label}</title>
      <path
        fill="currentColor"
        d="M6 2h8v2H6zM4 6V4h2v2zm0 8H2V6h2zm2 2H4v-2h2zm8 0v2H6v-2zm2-2h-2v2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2zm0-8h2v8h-2zm0 0V4h-2v2z"
      />
    </svg>
  );
};
