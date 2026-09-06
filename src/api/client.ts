/** Centralised HTTP client for the MAUSAM backend.
 *
 * All API functions are built on top of these primitives.
 * Provides:
 * - Typed error extraction from FastAPI responses
 * - AbortSignal support for request cancellation
 * - Centralised error handling (no raw `fetch` in endpoint files)
 *
 * Base URL is read from the `VITE_API_BASE_URL` environment variable
 * so the same build works in development and production.
 */

import type { ApiError } from './errors.js';
import { ApiRequestError } from './errors.js';

// ── Base URL ────────────────────────────────────────────────────────────────────

const BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ??
  'http://127.0.0.1:8000/api/v1';

// ── Helpers ────────────────────────────────────────────────────────────────────

/** Build a full URL from a path (prepends BASE_URL). */
function url(path: string, params?: Record<string, string | number | boolean | null | undefined>): URL {
  const u = new URL(BASE_URL + path);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v != null) u.searchParams.set(k, String(v));
    }
  }
  return u;
}

/** Parse the JSON body from a FastAPI error response. */
async function parseErrorBody(res: Response): Promise<ApiError> {
  let detail: string | undefined;
  let code: string | undefined;
  let valid_interests: string[] | undefined;

  try {
    const body = await res.json();
    const d = body?.detail ?? body;
    if (typeof d === 'object' && d !== null) {
      detail = d.error ?? (typeof d.msg === 'string' ? d.msg : JSON.stringify(d));
      code = d.code;
      valid_interests = d.valid_interests;
    } else {
      detail = String(d);
    }
  } catch {
    detail = res.statusText || 'Unknown error';
  }

  return { status: res.status, error: detail ?? 'Unknown error', code, valid_interests };
}

// ── Core fetch primitives ──────────────────────────────────────────────────────

export async function apiGet<T>(path: string, params?: Record<string, string | number | boolean | null | undefined>, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url(path, params), { signal, headers: { Accept: 'application/json' } });
  if (!res.ok) throw new ApiRequestError(await parseErrorBody(res));
  return res.json() as Promise<T>;
}

export async function apiPost<T>(path: string, body: unknown, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url(path), {
    method: 'POST',
    signal,
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new ApiRequestError(await parseErrorBody(res));
  return res.json() as Promise<T>;
}

export async function apiPut<T>(path: string, body: unknown, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url(path), {
    method: 'PUT',
    signal,
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new ApiRequestError(await parseErrorBody(res));
  return res.json() as Promise<T>;
}

export { BASE_URL };
