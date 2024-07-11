import type { WretchError } from 'wretch'

export function isWretchError(e: unknown): e is WretchError {
  return (
    e instanceof Error &&
    Object.hasOwn(e, 'status') &&
    Object.hasOwn(e, 'response') &&
    Object.hasOwn(e, 'url')
  )
}
