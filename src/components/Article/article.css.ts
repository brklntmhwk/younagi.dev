import { createVar, style, styleVariants } from '@vanilla-extract/css'

const contentKind = createVar()

export const contentVariants = styleVariants({
  blog: {
    vars: {
      [contentKind]: 'blog',
    },
  },
  news: {
    vars: {
      [contentKind]: 'news',
    },
  },
  page: {
    vars: {
      [contentKind]: 'page',
    },
  },
  about: {
    vars: {
      [contentKind]: 'about',
    },
  },
})

export const contentHr = style({
  width: '100%',
})

export const articleBase = style({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  gap: '0.5rem',
})
