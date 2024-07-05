import { style } from '@vanilla-extract/css'
import { bgColor, fgColor, lineColor, hoverBgColor } from '@/styles/styles.css'

export const bmcWrapper = style({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '0.5rem 0.25rem',
})

export const bmcModalWrapper = style({
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
  maxHeight: '77dvh',
})

export const bmcIframe = style({
  width: '100%',
  height: '55dvh',
})

export const bmcGreeting = style({
  vars: {
    [lineColor]: 'hsla(60, 0.52%, 75.55%, 1)',
  },
  fontSize: '0.785rem',
  position: 'relative',
  padding: '0.2rem 0 0.2rem 1.75rem',
  margin: '1.25rem 0',
  selectors: {
    '&::before': {
      content: '',
      position: 'absolute',
      top: '-8px',
      left: '0',
      width: '20px',
      height: '1px',
      transform: 'rotate(-38deg)',
      boxSizing: 'border-box',
      backgroundColor: lineColor,
    },
    '&::after': {
      content: '',
      position: 'absolute',
      bottom: '-8px',
      left: '0',
      width: '20px',
      height: '1px',
      transform: 'rotate(38deg)',
      boxSizing: 'border-box',
      backgroundColor: lineColor,
    },
  },
})

export const ornament = style({
  vars: {
    [lineColor]: 'hsla(60, 0.52%, 75.55%, 1)',
  },
  selectors: {
    [`${bmcGreeting} > &`]: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
    },
    [`${bmcGreeting} > &::before`]: {
      content: '',
      position: 'absolute',
      top: '-1px',
      left: '0',
      width: '28px',
      height: '1px',
      transform: 'rotate(-25deg)',
      boxSizing: 'border-box',
      backgroundColor: lineColor,
    },
    [`${bmcGreeting} > &::after`]: {
      content: '',
      position: 'absolute',
      bottom: '-1px',
      left: '0',
      width: '28px',
      height: '1px',
      transform: 'rotate(25deg)',
      boxSizing: 'border-box',
      backgroundColor: lineColor,
    },
  },
})

export const bmcButton = style({
  vars: {
    [fgColor]: 'hsla(0, 0%, 96.7%, 1)',
    [bgColor]: 'hsla(228, 95%, 68%, 1)',
    [hoverBgColor]: 'hsla(228, 95%, 68%, 0.9)',
  },
  '@media': {
    '(prefers-color-scheme: dark)': {
      vars: {
        [fgColor]: 'hsla(0, 0%, 96.7%, 1)',
        [bgColor]: 'hsla(228, 65%, 68%, 1)',
        [hoverBgColor]: 'hsla(228, 65%, 68%, 0.9)',
      },
    },
  },
  ':hover': {
    backgroundColor: hoverBgColor,
  },
  justifyContent: 'center',
  // width: '12.75rem',
  // height: '2.75rem',
  color: fgColor,
  backgroundColor: bgColor,
  fontWeight: 700,
  borderRadius: '0.375rem',
  padding: '0.55rem 0.95rem',
})
