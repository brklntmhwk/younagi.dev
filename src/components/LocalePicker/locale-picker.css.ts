import { style, createVar } from '@vanilla-extract/css'

export const localeUlList = style({
  display: 'grid',
  gap: '1.5rem',
  marginLeft: '1.25rem',
})

export const localeListElem = style({
  fontSize: '1.25rem',
})

export const localeSpan = style({
  fontWeight: 700,
})

const fgColor = createVar()

export const localeLink = style({
  vars: {
    [fgColor]: 'hsla(248.57, 11.48%, 11.96%, 1)',
  },
  '@media': {
    '(prefers-color-scheme: dark)': {
      vars: {
        [fgColor]: 'hsla(0, 0%, 96.7%, 1)',
      },
    },
  },
  color: fgColor,
  textDecoration: 'none',
  position: 'relative',
  borderBottom: '2px solid transparent',
  selectors: {
    '&:hover::before': {
      content: '▶',
      position: 'absolute',
      top: '0',
      left: '-1.5rem',
      fontSize: '1.25rem',
      alignSelf: 'center',
    },
  },
})
