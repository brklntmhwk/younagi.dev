import { Button } from '@kobalte/core/button';
import type { Component } from 'solid-js';

type Props = {
  label: string;
};

export const SubmitButton: Component<Props> = (props) => {
  return (
    <Button
      type="submit"
      class="relative border-t-4 border-b-2 border-x-2 border-line-double rounded-md before:absolute before:-top-2 before:-bottom-2 before:-left-1.5 before:-right-1.5 before:border-t-2 before:border-b-4 before:border-x-2 before:rounded-lg before:-z-10 bg-transparent font-semibold py-2 px-6 z-10 self-center hover:bg-zinc-300"
    >
      {props.label}
    </Button>
  );
};
