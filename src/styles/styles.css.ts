import { createVar, style } from '@vanilla-extract/css'

export const fgColor = createVar()
export const bgColor = createVar()
export const lineColor = createVar()
export const hoverBgColor = createVar()
export const defaultFillColor = createVar()
export const fillColor = createVar()

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
  fontSize: '1.15rem',
  fontWeight: 600,
  selectors: {
    [`${likesButton} &:last-child`]: {
      borderLeft: `1px solid ${lineColor}`,
      paddingLeft: '0.875rem',
    },
  },
})

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
