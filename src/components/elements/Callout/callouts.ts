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
      info: 'bg-sky-100 dark:bg-sky-700 text-sky-600 dark:text-sky-300',
      check: 'bg-teal-100 dark:bg-teal-700 text-teal-600 dark:text-teal-300',
      question:
        'bg-indigo-100 dark:bg-indigo-800 text-indigo-500 dark:text-indigo-300',
      note: 'bg-amber-100 dark:bg-amber-700 text-amber-600 dark:text-amber-400',
      failure: 'bg-red-100 dark:bg-red-900 text-red-500 dark:text-red-300',
      quote:
        'bg-stone-200 dark:bg-stone-600 text-stone-600 dark:text-stone-300',
      warning:
        'bg-orange-200 dark:bg-orange-800 text-orange-500 dark:text-orange-400',
    },
  },
});
