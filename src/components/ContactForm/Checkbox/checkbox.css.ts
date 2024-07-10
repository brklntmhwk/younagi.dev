import { style } from '@vanilla-extract/css'
import { bgColor, lineColor } from '@/styles/styles.css'

export const checkboxArea = style({
  marginTop: '1.5rem',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.25rem',
})

export const checkboxControl = style({
  vars: {
    [bgColor]: 'hsla(0, 0%, 96.7%, 1)',
    [lineColor]: 'hsla(260.87, 10.13%, 55.49%, 0.33)',
  },
  '@media': {
    '(prefers-color-scheme: dark)': {
      vars: {
        [bgColor]: 'hsla(248.57, 11.48%, 11.96%, 1)',
      },
    },
  },
  height: '20px',
  width: '20px',
  borderRadius: '0.15rem',
  border: `1px solid ${lineColor}`,
  backgroundColor: bgColor,
})