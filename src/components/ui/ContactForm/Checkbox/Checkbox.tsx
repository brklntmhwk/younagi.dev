import { Checkbox as KCheckbox, Root as KRoot } from '@kobalte/core/checkbox';
import { type Component, type JSX, splitProps } from 'solid-js';
import { CheckIcon } from './CheckIcon';

type Props = {
  name: string;
  label: string;
  value?: string;
  checked: boolean;
  error: string;
  required?: boolean;
  disabled?: boolean;
  class?: string;
  ref: (element: HTMLInputElement) => void;
  onInput: JSX.EventHandler<HTMLInputElement, InputEvent>;
  onChange: JSX.EventHandler<HTMLInputElement, Event>;
  onBlur: JSX.EventHandler<HTMLInputElement, FocusEvent>;
};

export const Checkbox: Component<Props> = (props) => {
  const [iconProps, rootProps, inputProps] = splitProps(
    props,
    ['label'],
    ['name', 'value', 'checked', 'required', 'disabled'],
    ['ref', 'onInput', 'onChange', 'onBlur'],
  );
  return (
    <KRoot
      {...rootProps}
      class="flex flex-col gap-4 z-10"
      validationState={props.error ? 'invalid' : 'valid'}
    >
      <KCheckbox class="mt-6 inline-flex items-center gap-1">
        <KCheckbox.Input {...inputProps} />
        <KCheckbox.Control class="h-5 w-5 rounded-sm border-solid border-[1px] border-zinc-400">
          <KCheckbox.Indicator>
            <CheckIcon label={iconProps.label} width={18} height={18} />
          </KCheckbox.Indicator>
        </KCheckbox.Control>
        <KCheckbox.Label class="select-none ml-3">
          {props.label}
        </KCheckbox.Label>
      </KCheckbox>
      <KCheckbox.ErrorMessage class="p-2 rounded-sm text-red-500 dark:text-red-300 bg-red-200 dark:bg-red-400">
        {props.error}
      </KCheckbox.ErrorMessage>
    </KRoot>
  );
};
