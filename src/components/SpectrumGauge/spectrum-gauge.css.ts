import {
  createVar,
  keyframes,
  style,
  styleVariants,
} from '@vanilla-extract/css'
import { calc } from '@vanilla-extract/css-utils'
import { lineColor } from '@/styles/styles.css'

export const gaugeWrapper = style({
  display: 'none',
  '@media': {
    '(min-width: 360px)': {
      width: '100%',
      maxWidth: '22rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '0.375rem',
    },
  },
})

export const labelWrapper = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
})

export const endLabel = style({
  fontSize: '0.725rem',
  display: 'flex',
  alignItems: 'center',
  '@media': {
    '(min-width: 640px)': {
      fontSize: '0.975rem',
    },
  },
})

const blink = keyframes({
  '0%': {
    opacity: 1,
  },
  '50%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
})

const position = createVar()
const padding = createVar()

export const pointVariants = styleVariants({
  0: {
    vars: {
      [position]: 'start',
    },
  },
  1: {
    vars: {
      [position]: 'start',
      [padding]: `0 0 0 ${calc('100%').divide(5).toString()}`,
    },
  },
  2: {
    vars: {
      [position]: 'center',
    },
  },
  3: {
    vars: {
      [position]: 'end',
      [padding]: `0 ${calc('100%').divide(5).toString()} 0 0`,
    },
  },
  4: {
    vars: {
      [position]: 'end',
    },
  },
})

export const spectrumGauge = style({
  vars: {
    [lineColor]: 'hsla(60, 0.52%, 75.55%, 1)',
  },
  width: '100%',
  height: '2.25rem',
  margin: '4px',
  backgroundColor: 'transparent',
  appearance: 'none',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  borderImageSource: `url("data:image/svg+xml;utf8,<?xml version='1.0' encoding='UTF-8' ?><svg version='1.1' width='5' height='5' xmlns='http://www.w3.org/2000/svg'><path d='M2 1 h1 v1 h-1 z M1 2 h1 v1 h-1 z M3 2 h1 v1 h-1 z M2 3 h1 v1 h-1 z' fill='rgb(28, 27, 34)' /></svg>")`,
  border: `4px solid ${lineColor}`,
  borderImageSlice: 2,
  borderImageWidth: 2,
  borderImageRepeat: 'repeat',
  borderImageOutset: 1.75,
  selectors: {
    '&::after': {
      content: '🌟',
      fontSize: '1.215rem',
      marginTop: '-25px',
      display: 'flex',
      padding: padding,
      justifyContent: position,
      width: '100%',
      backgroundColor: 'transparent',
      animation: `${blink} 1.25s step-end 2`,
      WebkitAnimation: `${blink} 1.25s step-end 2`,
      MozAnimation: `${blink} 1.25s step-end 2`,
    },
    '&::-webkit-progress-bar': {
      background: 'linear-gradient(0.25turn, #93b3bcff, 50%, #0fbbf2ff)',
    },
    '&::-moz-progress-bar': {
      background: 'linear-gradient(0.25turn, #93b3bcff, 50%, #0fbbf2ff)',
    },
    '&::-webkit-progress-value': {
      background: 'transparent',
    },
    '&::-ms-fill': {
      background: 'transparent',
    },
  },
})
