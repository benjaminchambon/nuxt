import { createError } from 'h3';

export function apiError(statusCode: number, message: string) {
  return createError({ statusCode, statusMessage: message });
}
