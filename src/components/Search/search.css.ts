import { style, globalStyle } from '@vanilla-extract/css'
import { bgColor, fgColor, lineColor } from '@/styles/styles.css'

export const searchWrapper = style({
  vars: {
    // [bgColor]: 'hsla(0, 0%, 96.7%, 1)',
    [fgColor]: 'hsla(248.57, 11.48%, 11.96%, 1)',
  },
  '@media': {
    '(prefers-color-scheme: dark)': {
      vars: {
        // [bgColor]: 'hsla(248.57, 11.48%, 11.96%, 1)',
        [fgColor]: 'hsla(0, 0%, 96.7%, 1)',
      },
    },
  },
  color: fgColor,
  // backgroundColor: bgColor,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  padding: '1.15rem 1rem',
})

export const searchInputWrapper = style({
  vars: {
    [bgColor]: 'hsla(0, 0%, 96.7%, 1)',
  },
  '@media': {
    '(prefers-color-scheme: dark)': {
      vars: {
        [bgColor]: 'hsla(248.57, 11.48%, 11.96%, 1)',
      },
    },
  },
  backgroundColor: bgColor,
  display: 'flex',
  gap: '0.85rem',
  padding: '0.75rem',
  zIndex: '60',
})

export const searchInput = style({
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
  width: '100%',
  fontSize: '1.05rem',
  fontWeight: 600,
  color: fgColor,
  backgroundColor: 'transparent',
  outline: 'none',
})

export const searchResults = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  overflowY: 'auto',
  padding: '1.5rem 1.25rem 0.95rem 1.25rem',
})

export const searchResult = style({
  vars: {
    [lineColor]: 'hsla(260.87, 10.13%, 55.49%, 0.33)',
  },
  '@media': {
    '(prefers-color-scheme: dark)': {
      vars: {},
    },
  },
  paddingBottom: '0.75rem',
  borderBottom: `1px solid ${lineColor}`,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.625rem',
})

export const hitArticleTitle = style({
  fontSize: '1.35rem',
  fontWeight: 600,
})

export const hitArticleExcerpt = style({
  fontSize: '1.05rem',
})

globalStyle(`${hitArticleExcerpt} > mark`, {
  vars: {
    [fgColor]: 'hsla(240.24, 100%, 48.63%, 1)',
  },
  '@media': {
    '(prefers-color-scheme: dark)': {
      vars: {
        [fgColor]: 'hsla(215.24, 100%, 52.63%, 1)',
      },
    },
  },
  fontWeight: 600,
  color: fgColor,
  backgroundColor: 'transparent',
})

export const notFound = style({
  fontSize: '1.05rem',
  padding: '1.5rem 1.25rem 0.75rem 1.25rem',
  textAlign: 'center',
})

export const notFoundKeyword = style({
  fontWeight: 700,
})
