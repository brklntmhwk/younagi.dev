import type { CalloutType, Callouts } from './types'

export const callouts = {
  info: {
    label: 'Info',
    icon: 'info',
  },
  check: {
    label: 'Check',
    icon: 'check',
  },
  question: {
    label: 'Question',
    icon: 'question',
  },
  note: {
    label: 'Note',
    icon: 'pencil',
  },
  failure: {
    label: 'Failure',
    icon: 'failure',
  },
  quote: {
    label: 'Quote',
    icon: 'quote',
  },
  warning: {
    label: 'Warning',
    icon: 'warning',
  },
} as const satisfies Callouts

const defaultCalloutType: CalloutType = 'info'

const hasCallout = (type: string): type is CalloutType => type in callouts

export const getCalloutType = (type: string) => {
  const key = type.toLowerCase()
  if (hasCallout(key)) return key

  return defaultCalloutType
}

export const getCallout = (type: string) => {
  const key = type.toLowerCase()
  if (hasCallout(key)) return callouts[key]

  return callouts[defaultCalloutType]
}
