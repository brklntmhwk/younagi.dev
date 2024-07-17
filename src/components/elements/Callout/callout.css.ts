import {
  createVar,
  globalStyle,
  style,
  styleVariants,
} from '@vanilla-extract/css'
import { bgColor, fgColor } from '@/styles/styles.css'

const calloutKind = createVar()

export const calloutVariants = styleVariants({
  info: {
    vars: {
      [calloutKind]: 'info',
      [fgColor]: 'hsla(211, 100%, 65%, 1)',
      [bgColor]: 'hsla(211, 100%, 94%, 1)',
    },
    '@media': {
      '(prefers-color-scheme: dark)': {
        vars: {
          [fgColor]: 'hsla(211, 100%, 70%, 1)',
          [bgColor]: 'hsla(211, 100%, 25%, 0.5)',
        },
      },
    },
    color: fgColor,
    backgroundColor: bgColor,
  },
  check: {
    vars: {
      [calloutKind]: 'check',
      [fgColor]: 'hsla(117, 64%, 52%, 1)',
      [bgColor]: 'hsla(117, 64%, 90%, 1)',
    },
    '@media': {
      '(prefers-color-scheme: dark)': {
        vars: {
          [fgColor]: 'hsla(117, 64%, 72%, 1)',
          [bgColor]: 'hsla(117, 64%, 75%, 0.5)',
        },
      },
    },
    color: fgColor,
    backgroundColor: bgColor,
  },
  failure: {
    vars: {
      [calloutKind]: 'failure',
      [fgColor]: 'hsla(0, 95%, 65%, 1)',
      [bgColor]: 'hsla(0, 100%, 93%, 1)',
    },
    '@media': {
      '(prefers-color-scheme: dark)': {
        vars: {
          [fgColor]: 'hsla(0, 95%, 85%, 1)',
          [bgColor]: 'hsla(0, 100%, 75%, 0.5)',
        },
      },
    },
    color: fgColor,
    backgroundColor: bgColor,
  },
  question: {
    vars: {
      [calloutKind]: 'question',
      [fgColor]: 'hsla(263, 56%, 65%, 1)',
      [bgColor]: 'hsla(263, 56%, 85%, 1)',
    },
    '@media': {
      '(prefers-color-scheme: dark)': {
        vars: {
          [fgColor]: 'hsla(263, 56%, 80%, 1)',
          [bgColor]: 'hsla(263, 56%, 80%, 0.5)',
        },
      },
    },
    color: fgColor,
    backgroundColor: bgColor,
  },
  warning: {
    vars: {
      [calloutKind]: 'warning',
      [fgColor]: 'hsla(29, 96%, 46%, 1)',
      [bgColor]: 'hsla(29, 96%, 86%, 1)',
    },
    '@media': {
      '(prefers-color-scheme: dark)': {
        vars: {
          [fgColor]: 'hsla(29, 96%, 56%, 1)',
          [bgColor]: 'hsla(29, 96%, 25%, 0.5)',
        },
      },
    },
    color: fgColor,
    backgroundColor: bgColor,
  },
  quote: {
    vars: {
      [calloutKind]: 'quote',
      [fgColor]: 'hsla(212, 16%, 48%, 1)',
      [bgColor]: 'hsla(212, 16%, 82%, 1)',
    },
    '@media': {
      '(prefers-color-scheme: dark)': {
        vars: {
          [fgColor]: 'hsla(212, 16%, 88%, 1)',
          [bgColor]: 'hsla(205, 5%, 55%, 0.9)',
        },
      },
    },
    color: fgColor,
    backgroundColor: bgColor,
  },
  note: {
    vars: {
      [calloutKind]: 'note',
      [fgColor]: 'hsla(22, 74%, 58%, 1)',
      [bgColor]: 'hsla(22, 74%, 85%, 1)',
    },
    '@media': {
      '(prefers-color-scheme: dark)': {
        vars: {
          [fgColor]: 'hsla(22, 74%, 65%, 1)',
          [bgColor]: 'hsla(22, 74%, 70%, 0.5)',
        },
      },
    },
    color: fgColor,
    backgroundColor: bgColor,
  },
})

export const callout = style({
  padding: '0.75rem 0.85rem',
  margin: '1.5rem 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  borderRadius: '0.25rem',
})

export const calloutToggleCheck = style({
  display: 'none',
})

export const calloutTitle = style({
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
  userSelect: 'none',
  selectors: {
    [`${callout}[data-expandable='true'] > &::after`]: {
      content: '›',
      color: 'inherit',
      display: 'inline-block',
      fontSize: '1.35rem',
      transition: 'transform 0.3s ease',
    },
    [`&:has(+ ${calloutToggleCheck}:checked)::after`]: {
      transform: 'rotate(90deg)',
    },
  },
})

export const calloutTitleText = style({
  fontSize: '1.05rem',
  fontWeight: 800,
})

export const calloutTitleIcon = style({
  width: '20px',
  height: '20px',
})

globalStyle('.callout-content', {
  fontSize: '1rem',
})

globalStyle('.callout-content > a', {
  textDecoration: 'underline',
  textUnderlineOffset: '5px',
})

globalStyle(`${calloutToggleCheck}:checked ~ ${callout}`, {
  display: 'block',
})

globalStyle(`${calloutToggleCheck}:checked ~ .callout-content`, {
  display: 'inline-block',
})

globalStyle(`${calloutToggleCheck}:not(:checked) ~ ${callout}`, {
  display: 'none',
})

globalStyle(`${calloutToggleCheck}:not(:checked) ~ .callout-content`, {
  display: 'none',
})
