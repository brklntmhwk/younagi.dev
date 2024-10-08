import { Button } from '@kobalte/core/button';
import type { Component } from 'solid-js';
import { submitButton } from './submit-button.css';

type Props = {
  label: string;
};

export const SubmitButton: Component<Props> = (props) => {
  return (
    <Button type="submit" class={`double-border ${submitButton}`}>
      {props.label}
    </Button>
  );
};
