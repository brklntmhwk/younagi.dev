import { style } from '@vanilla-extract/css'

export const likesClass = style({
  backgroundColor: 'hsla(0, 100%, 84%, 1)',
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  padding: '0.5rem 0.85rem',
  borderRadius: '0.5rem',
  selectors: {
    span: {
      color: 'hsla(0, 0%, 96%, 1)',
      fontSize: '1.125rem',
    },
    'span:nth-child(2)': {
      borderLeft: '1px solid var(--line)',
      paddingLeft: '0.875rem',
    },
  },
})
