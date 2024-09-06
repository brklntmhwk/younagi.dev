import { createVar, style, styleVariants } from '@vanilla-extract/css';

const fgColor = createVar();
const bgColor = createVar();

export const colorVariants = styleVariants({
  primary: {
    vars: {
      [fgColor]: 'hsla(0, 0%, 96.7%, 1)',
      [bgColor]: 'hsla(240.24, 100%, 48.63%, 1)',
    },
    '@media': {
      '(prefers-color-scheme: dark)': {
        vars: {
          [fgColor]: 'hsla(0, 0%, 96.7%, 1)',
          [bgColor]: 'hsla(215.24, 100%, 52.63%, 1)',
        },
      },
    },
    color: fgColor,
    backgroundColor: bgColor,
  },
  secondary: {
    vars: {
      [fgColor]: 'hsla(0, 0%, 96.7%, 1)',
      [bgColor]: 'hsla(28.94, 100%, 50%, 1)',
    },
    '@media': {
      '(prefers-color-scheme: dark)': {
        vars: {
          [fgColor]: 'hsla(0, 0%, 96.7%, 1)',
          [bgColor]: 'hsla(29, 96%, 42%, 1)',
        },
      },
    },
    color: fgColor,
    backgroundColor: bgColor,
  },
  green: {
    vars: {
      [fgColor]: 'hsla(0, 0%, 96.7%, 1)',
      [bgColor]: 'hsla(117, 75%, 40%, 1)',
    },
    '@media': {
      '(prefers-color-scheme: dark)': {
        vars: {
          [fgColor]: 'hsla(0, 0%, 96.7%, 1)',
          [bgColor]: 'hsla(117, 42%, 30%, 1)',
        },
      },
    },
    color: fgColor,
    backgroundColor: bgColor,
  },
  purple: {
    vars: {
      [fgColor]: 'hsla(0, 0%, 96.7%, 1)',
      [bgColor]: 'hsla(253, 56%, 60%, 1)',
    },
    '@media': {
      '(prefers-color-scheme: dark)': {
        vars: {
          [fgColor]: 'hsla(0, 0%, 96.7%, 1)',
          [bgColor]: 'hsla(258, 42%, 65%, 1)',
        },
      },
    },
    color: fgColor,
    backgroundColor: bgColor,
  },
  red: {
    vars: {
      [fgColor]: 'hsla(0, 0%, 96.7%, 1)',
      [bgColor]: 'hsla(0, 95%, 65%, 1)',
    },
    '@media': {
      '(prefers-color-scheme: dark)': {
        vars: {
          [fgColor]: 'hsla(0, 0%, 96.7%, 1)',
          [bgColor]: 'hsla(0, 100%, 75%, 1)',
        },
      },
    },
    color: fgColor,
    backgroundColor: bgColor,
  },
  grey: {
    vars: {
      [fgColor]: 'hsla(0, 0%, 96.7%, 1)',
      [bgColor]: 'hsla(212, 10%, 48%, 1)',
    },
    '@media': {
      '(prefers-color-scheme: dark)': {
        vars: {
          [fgColor]: 'hsla(0, 0%, 96.7%, 1)',
          [bgColor]: 'hsla(205, 10%, 35%, 1)',
        },
      },
    },
    color: fgColor,
    backgroundColor: bgColor,
  },
});

const borderRadius = createVar();
const boxShadow = createVar();
const padding = createVar();
const margin = createVar();

export const taxonomyVariants = styleVariants({
  categories: {
    vars: {
      [borderRadius]: '0.25rem',
      [boxShadow]: 'none',
      [padding]: '0.375rem 0.875rem',
      [margin]: '0',
    },
    margin: margin,
  },
  tags: {
    vars: {
      [borderRadius]: 'unset',
      [boxShadow]: `0 0.25rem ${bgColor},
      0 -0.25rem ${bgColor},
      0.5rem 0 ${bgColor},
      -0.5rem 0 ${bgColor}`,
      [padding]: '0.125rem 0.35rem',
      [margin]: '0.25rem 0.5rem',
    },
    margin: margin,
  },
});

export const taxonomyLink = style({
  whiteSpace: 'nowrap',
  verticalAlign: 'top',
  userSelect: 'none',
});

export const taxonomySpan = style({
  padding: padding,
  textAlign: 'center',
  color: fgColor,
  backgroundColor: bgColor,
  boxShadow: boxShadow,
  borderRadius: borderRadius,
});
