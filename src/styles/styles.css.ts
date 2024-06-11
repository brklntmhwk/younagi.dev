import { style } from '@vanilla-extract/css'

export const likesWrapper = style({
  backgroundColor: 'hsla(0, 100%, 84%, 1)',
  padding: '0.65rem 0.95rem',
  borderRadius: '0.5rem',
  ':hover': {
    backgroundColor: 'hsla(0, 100%, 85%, 1)',
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
