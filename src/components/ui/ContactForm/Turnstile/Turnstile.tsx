import type { Language } from '@/utils/i18n/data';
import {
  type Component,
  type JSX,
  onCleanup,
  onMount,
  splitProps,
} from 'solid-js';

type Props = {
  siteKey: string;
  size?: 'normal' | 'compact';
  locale?: Language;
  onVerify?: (token: string) => void;
} & Omit<JSX.HTMLAttributes<HTMLDivElement>, 'class'>;

export const Turnstile: Component<Props> = (props) => {
  const [local, others] = splitProps(props, [
    'siteKey',
    'size',
    'locale',
    'onVerify',
  ]);
  let element: HTMLDivElement;
  let widgetId: string;

  const setUpTurnstile = () => {
    if (!element) return;

    widgetId = window.turnstile.render(element, {
      sitekey: local.siteKey,
      size: local.size ?? 'normal',
      language: local.locale ?? 'auto',
      callback: local.onVerify ?? (() => {}),
    });
  };

  onMount(() => {
    window.onloadTurnstileCallback = setUpTurnstile;

    if (document.getElementById('cf-turnstile')) return setUpTurnstile();

    const script = document.createElement('script');
    script.src =
      'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback&render=explicit';
    script.id = 'cf-turnstile';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  });

  onCleanup(() => {
    window.onloadTurnstileCallback = undefined;
    if (widgetId) window.turnstile.remove(widgetId);
  });

  const setRef = (el: HTMLDivElement) => {
    element = el;
  };

  return <div {...others} class="mx-auto" ref={setRef} />;
};
