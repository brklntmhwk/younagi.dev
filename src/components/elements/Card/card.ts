const cardBorderTypes = ['pixel', 'double', 'solid'] as const;

export type CardBorderType = (typeof cardBorderTypes)[number];

export type ElementCardProps = {
  'data-border-type': string;
};

export type ComponentCardProps = {
  borderType: CardBorderType;
  isAnimated: boolean;
};

export const isElementCard = (props: object): props is ElementCardProps =>
  Object.hasOwn(props, 'data-border-type');

export const isValidBorderType = (type: string): type is CardBorderType =>
  cardBorderTypes.some((borderType) => borderType === type);
