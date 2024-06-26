import { Callout, CalloutTitle } from '@/components/elements/Callout'
import Figure from '@/components/elements/Figure.astro'
import FormattedDate from '@/components/FormattedDate.astro'
import Link from '@/components/elements/Link.astro'
import Message from '@/components/Message.astro'

export const mdxComponents = {
  a: Link,
  callout: Callout,
  'callout-title': CalloutTitle,
  figure: Figure,
  FormattedDate,
  Message,
}
