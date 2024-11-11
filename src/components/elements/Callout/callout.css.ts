import {
  createVar,
  globalStyle,
  style,
  styleVariants,
} from '@vanilla-extract/css';

const calloutKind = createVar();
const fgColor = createVar();
const bgColor = createVar();

export const calloutVariants = styleVariants({
  info: {
    vars: {
      [calloutKind]: 'info',
      [fgColor]: 'hsla(215, 90%, 55%, 1)',
      [bgColor]: 'hsla(211, 100%, 95%, 1)',
    },
    '@media': {
      '(prefers-color-scheme: dark)': {
        vars: {
          [fgColor]: 'hsla(211, 100%, 70%, 1)',
          [bgColor]: 'hsla(211, 42%, 25%, 1)',
        },
      },
    },
    color: fgColor,
    backgroundColor: bgColor,
  },
  check: {
    vars: {
      [calloutKind]: 'check',
      [fgColor]: 'hsla(117, 64%, 48%, 1)',
      [bgColor]: 'hsla(117, 64%, 92%, 1)',
    },
    '@media': {
      '(prefers-color-scheme: dark)': {
        vars: {
          [fgColor]: 'hsla(132, 64%, 52%, 1)',
          [bgColor]: 'hsla(107, 14%, 38%, 1)',
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
          [fgColor]: 'hsla(0, 95%, 92%, 1)',
          [bgColor]: 'hsla(0, 38%, 62%, 1)',
        },
      },
    },
    color: fgColor,
    backgroundColor: bgColor,
  },
  question: {
    vars: {
      [calloutKind]: 'question',
      [fgColor]: 'hsla(263, 56%, 52%, 1)',
      [bgColor]: 'hsla(263, 56%, 85%, 1)',
    },
    '@media': {
      '(prefers-color-scheme: dark)': {
        vars: {
          [fgColor]: 'hsla(263, 56%, 82%, 1)',
          [bgColor]: 'hsla(243, 26%, 35%, 1)',
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
          [bgColor]: 'hsla(19, 38%, 25%, 1)',
        },
      },
    },
    color: fgColor,
    backgroundColor: bgColor,
  },
  quote: {
    vars: {
      [calloutKind]: 'quote',
      [fgColor]: 'hsla(212, 16%, 35%, 1)',
      [bgColor]: 'hsla(212, 16%, 82%, 1)',
    },
    '@media': {
      '(prefers-color-scheme: dark)': {
        vars: {
          [fgColor]: 'hsla(212, 16%, 90%, 1)',
          [bgColor]: 'hsla(205, 5%, 48%, 1)',
        },
      },
    },
    color: fgColor,
    backgroundColor: bgColor,
  },
  note: {
    vars: {
      [calloutKind]: 'note',
      [fgColor]: 'hsla(51, 65%, 32%, 1)',
      [bgColor]: 'hsla(55, 60%, 67%, 1)',
    },
    '@media': {
      '(prefers-color-scheme: dark)': {
        vars: {
          [fgColor]: 'hsla(51, 65%, 65%, 1)',
          [bgColor]: 'hsla(51, 52%, 28%, 1)',
        },
      },
    },
    color: fgColor,
    backgroundColor: bgColor,
  },
});

export const callout = style({
  padding: '0.75rem 0.85rem',
  margin: '1.5rem 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  borderRadius: '0.25rem',
});

export const calloutToggleCheck = style({
  display: 'none',
});

export const calloutTitle = style({
  display: 'flex',
  gap: '0.5875rem',
  alignItems: 'center',
  userSelect: 'none',
  selectors: {
    [`${callout}[data-expandable='true'] > &::after`]: {
      content: '›',
      color: 'inherit',
      display: 'inline-block',
      fontSize: '1.785rem',
      transition: 'transform 0.3s ease',
    },
    [`&:has(+ ${calloutToggleCheck}:checked)::after`]: {
      transform: 'rotate(90deg)',
    },
  },
});

globalStyle('.callout-content', {
  fontSize: '1rem',
  lineHeight: '1.95',
});

globalStyle('.callout-content > a', {
  textDecoration: 'underline',
  textUnderlineOffset: '5px',
});

globalStyle(`${calloutToggleCheck}:checked ~ ${callout}`, {
  display: 'block',
});

globalStyle(`${calloutToggleCheck}:checked ~ .callout-content`, {
  display: 'inline-block',
});

globalStyle(`${calloutToggleCheck}:not(:checked) ~ ${callout}`, {
  display: 'none',
});

globalStyle(`${calloutToggleCheck}:not(:checked) ~ .callout-content`, {
  display: 'none',
});
