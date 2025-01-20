import { tv } from 'tailwind-variants';

export const style = tv({
  base: 'text-default text-center text-xs sm:text-sm hover:bg-default-reverse-hover border-2 border-default border-solid py-0.5 xs:py-1 px-2 xs:px-2.5 py-0.5 xs:py-1 px-2 xs:px-2.5',
  variants: {
    taxonomy: {
      categories: 'rounded-sm',
      tags: 'rounded-full',
    },
  },
});
