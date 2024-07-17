import { createVar, style } from '@vanilla-extract/css'
import { fillColor } from '@/styles/styles.css'

export const starFillColor = fillColor
export const emptyFillColor = createVar()
export const glowFillColor = createVar()

export const ratingWrapper = style({
  display: 'none',
  '@media': {
    '(min-width: 300px)': {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '0.85rem',
    },
  },
})

export const labels = style({
  width: '100%',
  maxWidth: '32rem',
  display: 'flex',
  justifyContent: 'space-between',
})

export const labelWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '6rem',
})

export const spanBase = style({
  fontSize: '0.825rem',
  '@media': {
    '(min-width: 640px)': {
      fontSize: '0.975rem',
    },
  },
})

export const endLabel = style({
  width: '100%',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
})

export const stars = style({
  vars: {
    [emptyFillColor]: 'hsla(60, 0.52%, 75.55%, 1)',
    [fillColor]: '#ffac33',
    [glowFillColor]: '#ffd983',
  },
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.75rem',
})
