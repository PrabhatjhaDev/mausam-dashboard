/** MAUSAM Frontend API Client
 * ============================
 *
 * Typed API layer for the FastAPI backend (Phase 4G).
 *
 * Usage:
 *   import { getCurrentWeather } from './api/index.js';
 *   const weather = await getCurrentWeather('delhi-ncr');
 *
 * All functions are cancellable via AbortSignal:
 *   const ctrl = new AbortController();
 *   const data = await getWeatherAlerts('delhi-ncr', ctrl.signal);
 *   ctrl.abort(); // cancels in-flight request
 */

// ── Client ────────────────────────────────────────────────────────────────────
export { BASE_URL } from './client.js';
export { apiGet, apiPost, apiPut } from './client.js';

// ── Errors ───────────────────────────────────────────────────────────────────
export { ApiRequestError, ApiErrorCode, asApiError } from './errors.js';
export type { ApiError, ApiErrorCodeValue } from './errors.js';

// ── Locations ────────────────────────────────────────────────────────────────
export { getLocations, searchLocations } from './locations.js';
export type { LocationsResponse } from './locations.js';

// ── Weather ────────────────────────────────────────────────────────────────
export { getCurrentWeather, getWeatherForecast, getWeatherAlerts } from './weather.js';
export type {
  CurrentWeatherResponse,
  ForecastResponse,
  ForecastOptions,
  AlertsResponse,
} from './weather.js';

// ── Personalization ───────────────────────────────────────────────────────
export { getPersonalizedHome, getPersonalizedQuickPrompts } from './personalization.js';
export type {
  PersonalizedHomeResponse,
  PersonalizationQuickPromptsResponse,
} from './personalization.js';

// ── Profile ───────────────────────────────────────────────────────────────
export { getProfile, updateProfile, setSelectedInterest } from './profile.js';
export type { UserProfile, ProfileUpdate } from './profile.js';

// ── VAYRON ───────────────────────────────────────────────────────────────
export { getVayronQuickPrompts, askVayron } from './vayron.js';
export type {
  VayronQuickPromptsResponse,
  VayronContextRequest,
  VayronContextResponse,
} from './vayron.js';
