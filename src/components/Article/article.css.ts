import {
  createVar,
  globalStyle,
  style,
  styleVariants,
} from '@vanilla-extract/css'

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
  contact: {
    vars: {
      [contentKind]: 'contact',
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

const blogMetadataGlobalRules = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.975rem',
  alignItems: 'center',
  margin: '0 auto',
  maxWidth: '50rem',
}
