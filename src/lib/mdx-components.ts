import { Callout, CalloutTitle } from '@/components/elements/Callout'
import { Figure } from '@/components/elements/Figure'
import { FormattedDate } from '@/components/FormattedDate'
import { Link } from '@/components/elements/Link'
import Message from '@/components/Message.astro'

export const mdxComponents = {
  a: Link,
  callout: Callout,
  'callout-title': CalloutTitle,
  figure: Figure,
  FormattedDate,
  Message,
}
