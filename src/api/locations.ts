/** Location API — /locations.
 *
 * GET /locations          → all locations
 * GET /locations?query=… → filtered by search term
 *
 * Reuses the Location type already defined in src/types/weather.ts.
 */
import type { Location } from '../types/weather.js';
import { apiGet } from './client.js';

export interface LocationsResponse {
  locations: Location[];
  count: number;
}

/** List all known locations. */
export function getLocations(signal?: AbortSignal): Promise<LocationsResponse> {
  return apiGet('/locations', undefined, signal);
}

/** Search locations by name / query string. */
export function searchLocations(query: string, signal?: AbortSignal): Promise<LocationsResponse> {
  return apiGet('/locations', { query }, signal);
}
