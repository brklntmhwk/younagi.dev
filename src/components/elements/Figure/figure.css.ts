import { createVar, globalStyle, style } from '@vanilla-extract/css'

export const codeFigure = style({
  margin: '3.75rem 0 1.75rem 0',
  position: 'relative',
  fontSize: '0.85rem',
  selectors: {
    '&:not(:has([data-rehype-pretty-code-title]))': {
      margin: '1.75rem 0',
    },
  },
})

globalStyle(`${codeFigure} pre`, {
  maxHeight: '30rem',
  borderRadius: '0.25rem',
  overflow: 'auto',
})

const counterLine = createVar()

globalStyle(`${codeFigure} code`, {
  vars: {
    [counterLine]: 'line',
  },
  fontFamily: 'Menlo, Consolas, monospace',
  counterReset: counterLine,
  display: 'grid',
})

globalStyle(`${codeFigure} code [data-line]`, {
  borderLeft: '4px solid transparent',
  padding: '0 0.55rem',
})

const lineNumberColor = createVar()

globalStyle(`${codeFigure} code [data-line]::before`, {
  vars: {
    [lineNumberColor]: 'hsla(60, 0.52%, 55.55%, 1)',
  },
  '@media': {
    '(prefers-color-scheme: dark)': {
      vars: {
        [lineNumberColor]: 'hsla(60, 0.52%, 75.55%, 1)',
      },
    },
  },
  counterIncrement: counterLine,
  content: `counter(${counterLine})`,
  display: 'inline-block',
  width: '1rem',
  marginRight: '1.05rem',
  textAlign: 'right',
  color: lineNumberColor,
})

const highlightColor = createVar()
const highlightBorderColor = createVar()

globalStyle(`${codeFigure} code [data-highlighted-line]`, {
  vars: {
    [highlightColor]: 'hsla(242, 100%, 90%, 0.3)',
    [highlightBorderColor]: 'hsla(242, 94.78%, 82.45%, 0.8)',
  },
  '@media': {
    '(prefers-color-scheme: dark)': {
      vars: {
        [highlightColor]: 'hsla(213.49, 87.31%, 82%, 0.2)',
        [highlightBorderColor]: 'hsla(213.49, 84.31%, 70%, 0.8)',
      },
    },
  },
  backgroundColor: highlightColor,
  borderLeftColor: highlightBorderColor,
})

globalStyle(`${codeFigure} code [data-highlighted-line] span`, {
  backgroundColor: 'unset',
})

const codeCharBg = createVar()

globalStyle(`${codeFigure} code [data-highlighted-chars]`, {
  vars: {
    [codeCharBg]: highlightColor,
  },
  '@media': {
    '(prefers-color-scheme: dark)': {
      vars: {
        [codeCharBg]: highlightColor,
      },
    },
  },
  backgroundColor: codeCharBg,
  padding: '0.25rem',
  borderRadius: '0.25rem',
})

globalStyle(`${codeFigure} code [data-highlighted-chars] span`, {
  backgroundColor: 'unset',
})

const codeTitleFg = createVar()
const codeTitleBg = createVar()

globalStyle(`${codeFigure} [data-rehype-pretty-code-title]`, {
  vars: {
    [codeTitleFg]: 'hsla(0, 1.27%, 20.98%, 1)',
    [codeTitleBg]: 'hsla(220, 1.5%, 87.55%, 1)',
  },
  '@media': {
    '(prefers-color-scheme: dark)': {
      vars: {
        [codeTitleFg]: 'hsla(60, 0.52%, 85.55%, 1)',
        [codeTitleBg]: 'hsla(0, 1.27%, 30.98%, 1)',
      },
    },
  },
  fontFamily: 'Menlo, Consolas, monospace',
  width: '100%',
  position: 'absolute',
  top: '-30px',
  left: '0',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  padding: '0.25rem 0.75rem',
  color: codeTitleFg,
  backgroundColor: codeTitleBg,
  borderRadius: '0.15rem 0.15rem 0.15rem 0',
})

globalStyle(`${codeFigure} [data-rehype-pretty-code-title] + pre`, {
  marginTop: '2.85rem',
  padding: '0.85rem 0',
})

globalStyle(`${codeFigure} pre:not([data-rehype-pretty-code-title] + pre)`, {
  padding: '0.75rem 0',
})

globalStyle(`pre[data-theme*=' ']`, {
  color: 'var(--shiki-light)',
  backgroundColor: 'var(--shiki-light-bg)',
  '@media': {
    '(prefers-color-scheme: dark)': {
      color: 'var(--shiki-dark)',
      backgroundColor: 'var(--shiki-dark-bg)',
    },
  },
})

globalStyle(`pre[data-theme*=' '] span`, {
  color: 'var(--shiki-light)',
  backgroundColor: 'var(--shiki-light-bg)',
  '@media': {
    '(prefers-color-scheme: dark)': {
      color: 'var(--shiki-dark)',
      backgroundColor: 'var(--shiki-dark-bg)',
    },
  },
})
