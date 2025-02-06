import type { ActionError } from 'astro:actions';

export function isAstroActionError(e: unknown): e is ActionError {
  return (
    e instanceof Error &&
    Object.hasOwn(e, 'code') &&
    Object.hasOwn(e, 'message') &&
    Object.hasOwn(e, 'status')
  );
}
