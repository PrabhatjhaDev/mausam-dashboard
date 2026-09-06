/** Profile API — /profile.
 *
 * GET  /profile      — fetch current user profile
 * PUT  /profile      — update user profile
 *
 * The profile stores user preferences including the selected interest, home
 * location, and saved locations.  This is the persistence layer integrated
 * in Phase 4F.
 */
import { apiGet, apiPut } from './client.js';
import type { UserProfile, ProfileUpdate } from './types.js';

export type { UserProfile, ProfileUpdate };

/** GET /profile — retrieve the current user profile. */
export function getProfile(signal?: AbortSignal): Promise<UserProfile> {
  return apiGet('/profile', undefined, signal);
}

/** PUT /profile — update the current user profile. */
export function updateProfile(
  payload: ProfileUpdate,
  signal?: AbortSignal,
): Promise<UserProfile> {
  return apiPut('/profile', payload, signal);
}

/** Convenience: set only the selected interest. */
export function setSelectedInterest(
  interest: string | null,
  signal?: AbortSignal,
): Promise<UserProfile> {
  return updateProfile({ selectedInterest: interest }, signal);
}
