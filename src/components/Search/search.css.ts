import { createVar, globalStyle, style } from '@vanilla-extract/css';

const fgColor = createVar();

export const searchWrapper = style({
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
  boxSizing: 'border-box',
  height: 'fit-content',
  maxHeight: '76dvh',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
});

const bgColor = createVar();

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
  position: 'sticky',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.75rem',
});

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
  fontWeight: 400,
  color: fgColor,
  backgroundColor: 'transparent',
  outline: 'none',
});

export const searchResults = style({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: 'auto',
  gap: '0.25rem',
  overflowY: 'auto',
  padding: '0.75rem 0 0.95rem 0',
});

const hoverBgColor = createVar();
const lineColor = createVar();

export const searchResult = style({
  vars: {
    [lineColor]: 'hsla(260.87, 10.13%, 55.49%, 0.33)',
    [hoverBgColor]: 'hsla(0, 0%, 91.7%, 1)',
  },
  '@media': {
    '(prefers-color-scheme: dark)': {
      vars: {
        [hoverBgColor]: 'hsla(248.57, 11.48%, 18.96%, 1)',
      },
    },
  },
  ':hover': {
    backgroundColor: hoverBgColor,
  },
  selectors: {
    '&.active': {
      backgroundColor: hoverBgColor,
    },
  },
  padding: '0.85rem 0.5rem',
  borderBottom: `1px solid ${lineColor}`,
  borderRadius: '0.15rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.625rem',
});

export const hitArticleTitle = style({
  fontSize: '1.35rem',
  fontWeight: 600,
});

export const hitArticleExcerpt = style({
  fontSize: '0.95rem',
  lineHeight: '1.175',
});

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
});

export const notFound = style({
  fontSize: '1.05rem',
  padding: '1.5rem 1.25rem 0.75rem 1.25rem',
  textAlign: 'center',
});

export const notFoundKeyword = style({
  fontWeight: 700,
});
