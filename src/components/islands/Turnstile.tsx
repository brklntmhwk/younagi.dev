import {
  type Component,
  type JSX,
  onMount,
  splitProps,
  onCleanup,
} from 'solid-js'
import { type Languages } from '@/utils/i18n/data'
import { cfTurnstile } from '@/styles/styles.css'

type Props = {
  siteKey: string
  size?: 'normal' | 'compact'
  locale?: Languages
  'retry-interval'?: number
  onVerify?: (token: string) => void
} & Omit<JSX.HTMLAttributes<HTMLDivElement>, 'class'>

const Turnstile: Component<Props> = (props) => {
  const [local, others] = splitProps(props, [
    'siteKey',
    'size',
    'locale',
    'retry-interval',
    'onVerify',
  ])
  let element: HTMLDivElement
  let widgetId: string

  const setUpTurnstile = () => {
    if (!element) return

    widgetId = window.turnstile.render(element, {
      sitekey: local.siteKey,
      size: local.size ?? 'normal',
      language: local.locale ?? 'auto',
      'retry-interval': local['retry-interval'] ?? 8000,
      callback: local.onVerify ?? (() => {}),
    })
  }

  onMount(() => {
    window.onloadTurnstileCallback = setUpTurnstile

    if (document.getElementById('cf-turnstile')) return setUpTurnstile()

    const script = document.createElement('script')
    script.src =
      'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback&render=explicit'
    script.id = 'cf-turnstile'
    script.async = true
    script.defer = true
    document.body.appendChild(script)
  })

  onCleanup(() => {
    window.onloadTurnstileCallback = undefined
    if (widgetId) window.turnstile.remove(widgetId)
  })

  return (
    <div {...others} class={cfTurnstile} ref={(el) => void (element = el)} />
  )
}

export default Turnstile
