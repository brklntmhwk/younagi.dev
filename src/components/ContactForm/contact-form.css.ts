import { style } from '@vanilla-extract/css'
import { bgColor, fgColor } from '@/styles/styles.css'

export const contactForm = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.875rem',
})

export const contactButton = style({
  fontWeight: '600',
  marginTop: '1.25rem',
  padding: '0.25rem 1.85rem',
  alignSelf: 'center',
})

export const contactField = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: '0.5rem',
  backgroundColor: 'var(--bg)',
  outline: 'none',
})

export const contactCheckboxArea = style({
  marginTop: '1.5rem',
})

export const contactLabel = style({
  userSelect: 'none',
  selectors: {
    [`${contactCheckboxArea} &`]: {
      paddingLeft: '0.65rem',
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

export const cfTurnstile = style({
  margin: '0 auto',
})
