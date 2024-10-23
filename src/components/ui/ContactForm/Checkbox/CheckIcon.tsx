import { type Component, type ComponentProps, splitProps } from 'solid-js';

type Props = {
  label: string;
};

export const CheckIcon: Component<ComponentProps<'svg'> & Props> = (props) => {
  const [local, others] = splitProps(props, ['label']);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...others}>
      <title>{local.label}</title>
      <path
        fill="currentColor"
        d="M18 6h2v2h-2zm-2 4V8h2v2zm-2 2v-2h2v2zm-2 2h2v-2h-2zm-2 2h2v-2h-2zm-2 0v2h2v-2zm-2-2h2v2H6zm0 0H4v-2h2z"
      />
    </svg>
  );
};
