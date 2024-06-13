import {
  type Component,
  type JSX,
  createEffect,
  /* onMount, */ splitProps,
  onCleanup,
} from 'solid-js'
import { type Languages } from '@/utils/i18n/data'

type Props = {
  size?: 'normal' | 'compact'
  locale?: Languages
} & Omit<JSX.HTMLAttributes<HTMLDivElement>, 'class'>

const Turnstile: Component<Props> = (props) => {
  const [local, others] = splitProps(props, ['size', 'locale'])
  let element: HTMLDivElement

  const setUpTurnstile = () => {
    window.onloadTurnstileCallback = undefined
    window.turnstile.render(element, {
      sitekey: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY,
      size: local.size ?? 'normal',
      language: local.locale ?? 'auto',
    })
  }

  createEffect(() => {
    const script = document.createElement('script')
    script.src =
      'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback'
    script.async = true
    script.defer = true
    document.head.appendChild(script)
    window.onloadTurnstileCallback = setUpTurnstile

    onCleanup(() => {
      window.turnstile.remove(element)
    })
  })

  return (
    <div {...others} class="cf-turnstile" ref={(el) => void (element = el)} />
  )
}

export default Turnstile
