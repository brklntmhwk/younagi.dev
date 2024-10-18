import { Balloon } from '@/components/Balloon';
import { StarRating } from '@/components/StarRating';
import { Callout, CalloutTitle } from '@/components/elements/Callout';
import { Card, CardGrid } from '@/components/elements/Card';
import { Figure } from '@/components/elements/Figure';
import { Link } from '@/components/elements/Link';
import { OEmbed } from '@/components/elements/OEmbed';
import { FormattedDate } from '@/components/models/FormattedDate';

export const mdxComponents = {
  a: Link,
  Balloon,
  callout: Callout,
  'callout-title': CalloutTitle,
  card: Card,
  'card-grid': CardGrid,
  figure: Figure,
  FormattedDate,
  oembed: OEmbed,
  StarRating,
};
