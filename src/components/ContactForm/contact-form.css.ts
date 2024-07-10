import { keyframes, style } from '@vanilla-extract/css'
import { bgColor, fgColor } from '@/styles/styles.css'
import { checkboxArea } from './Checkbox/checkbox.css'

const skeletonFade = keyframes({
  '0%': { opacity: 0.4 },
  '100%': { opacity: 0.4 },
  '50%': { opacity: 1 },
})

export const skeleton = style({
  position: 'relative',
  transform: 'translateZ(0)',
  WebkitTransform: 'translateZ(0)',
  selectors: {
    '&[data-animate="true"]::after': {
      animation: `${skeletonFade} 1500ms linear infinite`,
    },
    '&[data-visible="true"]': {
      overflow: 'hidden',
    },
    '&[data-visible="true"]::before': {
      position: 'absolute',
      content: '',
      inset: 0,
      zIndex: 10,
      backgroundColor: 'white',
    },
    '&[data-visible="true"]::after': {
      position: 'absolute',
      content: '',
      inset: 0,
      zIndex: 11,
      backgroundColor: 'gray',
    },
  },
})

export const contactForm = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.875rem',
})

export const fieldGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.875rem',
  zIndex: '1',
})

export const contactLabel = style({
  userSelect: 'none',
  selectors: {
    [`${checkboxArea} > &`]: {
      marginLeft: '0.675rem',
    },
  },
})

export const contactFormError = style({
  vars: {
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
  padding: '0.5rem',
  borderRadius: '0.25rem',
})
