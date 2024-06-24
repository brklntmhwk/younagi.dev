import type { IconName } from '@/components/Icon/types'
import { callouts } from './callouts'

type Callout = {
  label: string
  icon: IconName
}

export type Callouts = {
  [key: string]: Readonly<Callout>
}

export type CalloutType = keyof typeof callouts
