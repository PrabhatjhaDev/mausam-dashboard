/** Typed error for MAUSAM backend API errors.
 *
 * Backend uses FastAPI which returns `{ detail: { error, code, request_id? } }`.
 * `code` matches one of the well-known error codes below.
 */

export interface ApiError {
  status: number;
  error: string;
  code?: string;
  valid_interests?: string[];
}

export class ApiRequestError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly valid_interests?: string[];

  constructor(detail: ApiError) {
    super(detail.error);
    this.name = 'ApiRequestError';
    this.status = detail.status;
    this.code = detail.code;
    this.valid_interests = detail.valid_interests;
  }
}

/** Well-known error codes returned by the backend. */
export const ApiErrorCode = {
  InvalidInterest: 'INVALID_INTEREST',
  LocationNotFound: 'LOCATION_NOT_FOUND',
  ValidationError: 'VALIDATION_ERROR',
  StorageError: 'STORAGE_ERROR',
  InternalError: 'INTERNAL_ERROR',
} as const;

export type ApiErrorCodeValue = (typeof ApiErrorCode)[keyof typeof ApiErrorCode];

/** Convert any thrown value (including ApiRequestError) into a typed object. */
export function asApiError(err: unknown): ApiError {
  if (err instanceof ApiRequestError) {
    return { status: err.status, error: err.message, code: err.code, valid_interests: err.valid_interests };
  }
  if (err instanceof Error) return { status: 0, error: err.message };
  return { status: 0, error: String(err) };
}
