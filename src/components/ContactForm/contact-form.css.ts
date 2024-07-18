import { style, createVar } from '@vanilla-extract/css'
import { checkboxArea } from './Checkbox/checkbox.css'

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

const fgColor = createVar()
const bgColor = createVar()

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
