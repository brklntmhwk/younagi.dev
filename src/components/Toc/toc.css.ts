import { style } from '@vanilla-extract/css'

export const TocUlList = style({
  height: 'fit-content',
  maxHeight: '75dvh',
  padding: '0.85rem 0.5rem 0.85rem 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  marginLeft: '1.25rem',
  overflowY: 'auto',
})

export const TocListElem = style({
  selectors: {
    '&.depth-2': {
      marginLeft: '0',
    },
    '&.depth-2::before': {
      content: '◆ ',
    },
    '&.depth-3': {
      marginLeft: '1.25rem',
    },
    '&.depth-3::before': {
      content: '▶ ',
    },
    '&.depth-4': {
      marginLeft: '2.5rem',
    },
    '&.depth-4::before': {
      content: '◇ ',
    },
    '&.depth-5': {
      marginLeft: '3.75rem',
    },
    '&.depth-5::before': {
      content: '▷ ',
    },
    '&.depth-6': {
      marginLeft: '5rem',
    },
    '&.depth-6::before': {
      content: '・ ',
    },
  },
})
