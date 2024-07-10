import { style } from '@vanilla-extract/css'
import {
  bgColor,
  fgColor,
  hoverBgColor,
  fillColor,
  lineColor,
} from '@/styles/styles.css'

export const likesFillColor = fillColor
export const likesFgColor = fgColor

export const likesWrapper = style({
  vars: {
    [bgColor]: 'hsla(180, 58%, 42%, 1)',
    [hoverBgColor]: 'hsla(180, 58%, 42%, 0.9)',
  },
  '@media': {
    '(prefers-color-scheme: dark)': {
      vars: {
        [bgColor]: 'hsla(180, 58%, 32%, 1)',
        [hoverBgColor]: 'hsla(180, 58%, 32%, 0.8)',
      },
    },
  },
  backgroundColor: bgColor,
  padding: '0.65rem 0.95rem',
  borderRadius: '0.5rem',
  ':hover': {
    backgroundColor: hoverBgColor,
  },
})

export const likesButton = style({
  vars: {
    [fgColor]: 'hsla(0, 0%, 96%, 1)',
    [fillColor]: 'hsla(50, 100%, 72%, 1)',
    [lineColor]: 'hsla(260.87, 10.13%, 88.49%, 0.33)',
  },
  '@media': {
    '(prefers-color-scheme: dark)': {
      vars: {
        [fgColor]: 'hsla(0, 0%, 96%, 1)',
        [fillColor]: 'hsla(50, 100%, 49%, 1)',
      },
    },
  },
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
})

export const likesSpan = style({
  color: fgColor,
  fontSize: '1.025rem',
  fontWeight: 700,
  '@media': {
    '(min-width: 768px)': {
      fontSize: '1.125rem',
    },
  },
  selectors: {
    [`${likesButton} &:last-child`]: {
      borderLeft: `1px solid ${lineColor}`,
      paddingLeft: '0.875rem',
    },
  },
})
