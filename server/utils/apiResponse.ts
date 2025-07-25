// server/utils/apiResponse.ts
import type { ApiResponse } from '~/types/formation';

export function apiResponse<T>(data: T, message = ''): ApiResponse<T> {
  return {
    data,
    message,
  };
}
