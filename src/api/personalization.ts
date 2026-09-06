/** Personalization API — /personalized/*.
 *
 * GET /personalized/home?location_id=…&interest=…
 * GET /personalized/quick-prompts?interest=…
 *
 * The frontend client only transports/serializes data — business logic stays
 * on the server.  Response types are camelCase to match existing frontend types.
 */
import type { InterestId } from '../types/weather.js';
import { apiGet } from './client.js';
import type {
  PersonalizedHomeResponse,
  PersonalizationQuickPromptsResponse,
} from './types.js';

export type { PersonalizedHomeResponse, PersonalizationQuickPromptsResponse };

/** GET /personalized/home — full personalized payload for a location + interest. */
export function getPersonalizedHome(
  locationId: string,
  interest: InterestId,
  signal?: AbortSignal,
): Promise<PersonalizedHomeResponse> {
  return apiGet('/personalized/home', { location_id: locationId, interest }, signal);
}

/** GET /personalized/quick-prompts — list of suggested prompts for an interest. */
export function getPersonalizedQuickPrompts(
  interest: InterestId,
  signal?: AbortSignal,
): Promise<PersonalizationQuickPromptsResponse> {
  return apiGet('/personalized/quick-prompts', { interest }, signal);
}
