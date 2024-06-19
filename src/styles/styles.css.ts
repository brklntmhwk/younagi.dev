import { createVar, style } from '@vanilla-extract/css'

export const textColor = createVar()
export const bgColor = createVar()
export const hoverBgColor = createVar()
export const fillColor = createVar()

export const likesWrapper = style({
  vars: {
    [bgColor]: 'hsla(180, 58%, 42%, 1)',
    [hoverBgColor]: 'hsla(180, 58%, 42%, 0.8)',
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
  display: 'flex',
  alignItems: 'center',
  gap: '0.875rem',
})

export const likesLabelWrapper = style({
  vars: {
    [fillColor]: 'hsla(84, 82%, 79%, 1)',
  },
  '@media': {
    '(prefers-color-scheme: dark)': {
      vars: {
        [textColor]: 'hsla(84, 90%, 79%, 0.8)',
      },
    },
  },
  display: 'flex',
  gap: '0.5rem',
})

export const likesSpan = style({
  vars: {
    [textColor]: 'hsla(0, 0%, 96%, 1)',
  },
  '@media': {
    '(prefers-color-scheme: dark)': {
      vars: {
        [textColor]: 'hsla(0, 0%, 96%, 1)',
      },
    },
  },
  color: textColor,
  fontSize: '1.175rem',
  fontWeight: 500,
  selectors: {
    [`${likesLabelWrapper} &:last-child`]: {
      borderRight: '1px solid var(--line)',
      paddingRight: '0.875rem',
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
    [textColor]: 'hsla(0, 95%, 65%, 1)',
    [bgColor]: 'hsla(0, 100%, 93%, 1)',
  },
  '@media': {
    '(prefers-color-scheme: dark)': {
      vars: {
        [textColor]: 'hsla(0, 95%, 85%, 1)',
        [bgColor]: 'hsla(0, 100%, 75%, 0.5)',
      },
    },
  },
  color: textColor,
  backgroundColor: bgColor,
  padding: '0.5rem',
  borderRadius: '0.25rem',
})

export const cfTurnstile = style({
  margin: '0 auto',
})
