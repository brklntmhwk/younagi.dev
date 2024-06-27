import { createVar, style, styleVariants } from '@vanilla-extract/css'

const selectedColor = createVar()
const selectedBgColor = createVar()
const borderRadius = createVar()
const boxShadow = createVar()
const padding = createVar()
const margin = createVar()

export const colorVariants = styleVariants({
  primary: {
    vars: {
      [selectedColor]: 'hsla(0, 0%, 96.7%, 1)',
      [selectedBgColor]: 'hsla(240.24, 100%, 48.63%, 1)',
    },
    '@media': {
      '(prefers-color-scheme: dark)': {
        vars: {
          [selectedColor]: 'hsla(0, 0%, 96.7%, 1)',
          [selectedBgColor]: 'hsla(215.24, 100%, 52.63%, 1)',
        },
      },
    },
    color: selectedColor,
    backgroundColor: selectedBgColor,
  },
  secondary: {
    vars: {
      [selectedColor]: 'hsla(0, 0%, 96.7%, 1)',
      [selectedBgColor]: 'hsla(32.94, 100%, 50%, 1)',
    },
    '@media': {
      '(prefers-color-scheme: dark)': {
        vars: {
          [selectedColor]: 'hsla(0, 0%, 96.7%, 1)',
          [selectedBgColor]: 'hsla(29, 96%, 42%, 1)',
        },
      },
    },
    color: selectedColor,
    backgroundColor: selectedBgColor,
  },
  green: {
    vars: {
      [selectedColor]: 'hsla(0, 0%, 96.7%, 1)',
      [selectedBgColor]: 'hsla(117, 65%, 60%, 1)',
    },
    '@media': {
      '(prefers-color-scheme: dark)': {
        vars: {
          [selectedColor]: 'hsla(0, 0%, 96.7%, 1)',
          [selectedBgColor]: 'hsla(117, 42%, 58%, 1)',
        },
      },
    },
    color: selectedColor,
    backgroundColor: selectedBgColor,
  },
  purple: {
    vars: {
      [selectedColor]: 'hsla(0, 0%, 96.7%, 1)',
      [selectedBgColor]: 'hsla(253, 56%, 70%, 1)',
    },
    '@media': {
      '(prefers-color-scheme: dark)': {
        vars: {
          [selectedColor]: 'hsla(0, 0%, 96.7%, 1)',
          [selectedBgColor]: 'hsla(258, 42%, 65%, 1)',
        },
      },
    },
    color: selectedColor,
    backgroundColor: selectedBgColor,
  },
})

export const taxonomyVariants = styleVariants({
  categories: {
    vars: {
      [borderRadius]: '0.25rem',
      [boxShadow]: 'none',
      [padding]: '0.425rem 0.975rem',
      [margin]: '0',
    },
    margin: margin,
  },
  tags: {
    vars: {
      [borderRadius]: 'unset',
      [boxShadow]: `0 0.25rem ${selectedBgColor},
      0 -0.25rem ${selectedBgColor},
      0.5rem 0 ${selectedBgColor},
      -0.5rem 0 ${selectedBgColor}`,
      [padding]: '0.175rem 0.375rem',
      [margin]: '0.25rem 0.5rem',
    },
    margin: margin,
  },
})

export const taxonomyLink = style({
  fontSize: '1.075rem',
  whiteSpace: 'nowrap',
  verticalAlign: 'top',
  userSelect: 'none',
})

export const taxonomySpan = style({
  padding: padding,
  textAlign: 'center',
  color: selectedColor,
  backgroundColor: selectedBgColor,
  boxShadow: boxShadow,
  borderRadius: borderRadius,
})
