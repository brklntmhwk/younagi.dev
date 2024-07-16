import { pointVariants } from './spectrum-gauge.css'

export type SpectrumPoints = keyof typeof pointVariants
export type SpectrumPointsEnum = [SpectrumPoints, ...SpectrumPoints[]]

export const spectrumPoints = [...Object.keys(pointVariants)] as const

// export type Range<
//   N extends number,
//   Result extends number = never,
//   C extends never[] = [],
// > = C['length'] extends N
//   ? Result
//   : Range<N, Result | C['length'], [...C, never]>
