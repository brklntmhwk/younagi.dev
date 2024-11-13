import { tv } from 'tailwind-variants';

export type TaxonomyColor = (typeof colors)[number];

export const colors = [
  'primary',
  'secondary',
  'gray',
  'green',
  'purple',
  'red',
] as const;

export const style = tv({
  base: 'text-neutral-100 text-center text-sm sm:text-base',
  variants: {
    color: {
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      gray: 'bg-gray-500 dark:bg-gray-700',
      green: 'bg-green-600 dark:bg-green-800',
      purple: 'bg-purple-500 dark:bg-purple-800',
      red: 'bg-red-500 dark:bg-red-800',
    },
    taxonomy: {
      categories: 'py-1.5 px-3.5 m-0 rounded-[0.185rem]',
      tags: 'py-0.5 px-[0.35rem] my-1 mx-2',
    },
  },
  compoundVariants: [
    {
      color: 'primary',
      taxonomy: 'tags',
      class:
        'shadow-[0_0.35rem_theme(colors.primary),0_-0.35rem_theme(colors.primary),0.5rem_0_theme(colors.primary),-0.5rem_0_theme(colors.primary)]',
    },
    {
      color: 'secondary',
      taxonomy: 'tags',
      class:
        'shadow-[0_0.35rem_theme(colors.secondary),0_-0.35rem_theme(colors.secondary),0.5rem_0_theme(colors.secondary),-0.5rem_0_theme(colors.secondary)]',
    },
    {
      color: 'gray',
      taxonomy: 'tags',
      class:
        'shadow-[0_0.35rem_theme(colors.gray.500),0_-0.35rem_theme(colors.gray.500),0.5rem_0_theme(colors.gray.500),-0.5rem_0_theme(colors.gray.500)] dark:shadow-[0_0.35rem_theme(colors.gray.700),0_-0.35rem_theme(colors.gray.700),0.5rem_0_theme(colors.gray.700),-0.5rem_0_theme(colors.gray.700)]',
    },
    {
      color: 'green',
      taxonomy: 'tags',
      class:
        'shadow-[0_0.35rem_theme(colors.green.600),0_-0.35rem_theme(colors.green.600),0.5rem_0_theme(colors.green.600),-0.5rem_0_theme(colors.green.600)] dark:shadow-[0_0.35rem_theme(colors.green.800),0_-0.35rem_theme(colors.green.800),0.5rem_0_theme(colors.green.800),-0.5rem_0_theme(colors.green.800)]',
    },
    {
      color: 'purple',
      taxonomy: 'tags',
      class:
        'shadow-[0_0.35rem_theme(colors.purple.500),0_-0.35rem_theme(colors.purple.500),0.5rem_0_theme(colors.purple.500),-0.5rem_0_theme(colors.purple.500)] dark:shadow-[0_0.35rem_theme(colors.purple.800),0_-0.35rem_theme(colors.purple.800),0.5rem_0_theme(colors.purple.800),-0.5rem_0_theme(colors.purple.800)]',
    },
    {
      color: 'red',
      taxonomy: 'tags',
      class:
        'shadow-[0_0.35rem_theme(colors.red.500),0_-0.35rem_theme(colors.red.500),0.5rem_0_theme(colors.red.500),-0.5rem_0_theme(colors.red.500)] dark:shadow-[0_0.35rem_theme(colors.red.800),0_-0.35rem_theme(colors.red.800),0.5rem_0_theme(colors.red.800),-0.5rem_0_theme(colors.red.800)]',
    },
  ],
});
