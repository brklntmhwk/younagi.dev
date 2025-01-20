import { tv } from 'tailwind-variants';
import type { CalloutType, Callouts } from './types';

export const callouts = {
  info: {
    label: 'Info',
    icon: 'info',
  },
  check: {
    label: 'Check',
    icon: 'check',
  },
  question: {
    label: 'Question',
    icon: 'question',
  },
  note: {
    label: 'Note',
    icon: 'pencil',
  },
  failure: {
    label: 'Failure',
    icon: 'failure',
  },
  quote: {
    label: 'Quote',
    icon: 'quote',
  },
  warning: {
    label: 'Warning',
    icon: 'warning',
  },
} as const satisfies Callouts;

const defaultCalloutType: CalloutType = 'info';

const hasCallout = (type: string): type is CalloutType => type in callouts;

export const getCalloutType = (type: string) => {
  const key = type.toLowerCase();
  if (hasCallout(key)) return key;

  return defaultCalloutType;
};

export const getCallout = (type: string) => {
  const key = type.toLowerCase();
  if (hasCallout(key)) return callouts[key];

  return callouts[defaultCalloutType];
};

export const style = tv({
  base: 'block py-3 px-3.5 my-6 flex flex-col rounded-sm',
  variants: {
    type: {
      info: 'text-sky-600 dark:text-sky-300 border-2 border-sky-600 dark:border-sky-300',
      check:
        'text-teal-600 dark:text-teal-300 border-2 border-teal-600 dark:border-teal-300',
      question:
        'text-indigo-600 dark:text-indigo-300 border-2 border-indigo-600 dark:border-indigo-300',
      note: 'text-amber-600 dark:text-amber-400 border-2 border-amber-600 dark:border-amber-400',
      failure:
        'text-red-500 dark:text-red-300 border-2 border-red-500 dark:border-red-300',
      quote:
        'text-stone-600 dark:text-stone-300 border-2 border-stone-600 dark:border-stone-300',
      warning:
        'text-orange-500 dark:text-orange-400 border-2 border-orange-500 dark:border-orange-400',
    },
  },
});
