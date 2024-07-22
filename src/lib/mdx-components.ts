import { Balloon } from '@/components/Balloon';
import { FormattedDate } from '@/components/FormattedDate';
import { StarRating } from '@/components/StarRating';
import { Callout, CalloutTitle } from '@/components/elements/Callout';
import { Figure } from '@/components/elements/Figure';
import { Link } from '@/components/elements/Link';
import { OEmbed } from '@/components/elements/OEmbed';

export const mdxComponents = {
  a: Link,
  Balloon,
  callout: Callout,
  'callout-title': CalloutTitle,
  figure: Figure,
  FormattedDate,
  oembed: OEmbed,
  StarRating,
};
