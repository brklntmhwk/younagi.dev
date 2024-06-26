import { colorVariants } from './taxonomy.css'

export type TaxonomyColor = keyof typeof colorVariants
export type TaxonomyColorEnum = [TaxonomyColor, ...TaxonomyColor[]]

export const taxonomyColors = [...Object.keys(colorVariants)] as const
