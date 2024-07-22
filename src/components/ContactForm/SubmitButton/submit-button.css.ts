import { createVar, style } from '@vanilla-extract/css'

const hoverBgColor = createVar()

export const submitButton = style({
  vars: {
    [hoverBgColor]: 'hsla(0, 0%, 82.7%, 1)',
  },
  '@media': {
    '(prefers-color-scheme: dark)': {
      vars: {
        [hoverBgColor]: 'hsla(248.57, 11.48%, 25.96%, 1)',
      },
    },
  },
  ':hover': {
    backgroundColor: hoverBgColor,
  },
  fontWeight: '600',
  padding: '0.375rem 1.85rem',
  alignSelf: 'center',
  zIndex: 1,
})
