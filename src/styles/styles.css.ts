import { style } from '@vanilla-extract/css'

export const likesWrapper = style({
  backgroundColor: 'hsla(0, 100%, 84%, 1)',
  padding: '0.65rem 0.95rem',
  borderRadius: '0.5rem',
  ':hover': {
    backgroundColor: 'hsla(0, 100%, 84%, 0.8)',
  },
})

export const likesButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.875rem',
})

export const likesSpan = style({
  color: 'hsla(0, 0%, 96%, 1)',
  fontSize: '1.15rem',
  fontWeight: 500,
  selectors: {
    [`${likesButton} &:last-child`]: {
      borderLeft: '1px solid var(--line)',
      paddingLeft: '0.875rem',
    },
  },
})

export const contactForm = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.875rem',
})

export const contactLabel = style({
  userSelect: 'none',
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
  display: 'flex',
  gap: '0.65rem',
})

export const contactFormError = style({
  color: 'var(--callout-failure-fg)',
  backgroundColor: 'var(--callout-failure-bg)',
  padding: '0.5rem',
  borderRadius: '0.25rem',
})

export const cfTurnstile = style({
  margin: '0 auto',
})
