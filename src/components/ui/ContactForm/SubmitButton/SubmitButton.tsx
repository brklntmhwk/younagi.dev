import { Button } from '@kobalte/core/button';
import type { Component } from 'solid-js';

type Props = {
  label: string;
};

export const SubmitButton: Component<Props> = (props) => {
  return (
    <Button
      type="submit"
      class="double-border bg-transparent font-semibold py-2 px-6 z-10 self-center hover:bg-neutral-300/90 dark:hover:bg-neutral-700/90"
    >
      {props.label}
    </Button>
  );
};
