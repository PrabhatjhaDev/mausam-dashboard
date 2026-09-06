/** VAYRON API — /vayron/*.
 *
 * GET  /vayron/quick-prompts?interest=…
 * POST /vayron/context
 *
 * VAYRON is the context-aware intent engine.  This client only transports
 * data — no LLM / intent logic is implemented on the frontend.
 */
import type { InterestId } from '../types/weather.js';
import { apiGet, apiPost } from './client.js';
import type {
  VayronQuickPromptsResponse,
  VayronContextRequest,
  VayronContextResponse,
} from './types.js';

export type {
  VayronQuickPromptsResponse,
  VayronContextRequest,
  VayronContextResponse,
};

/** GET /vayron/quick-prompts — list of quick prompts for an interest. */
export function getVayronQuickPrompts(
  interest: InterestId,
  signal?: AbortSignal,
): Promise<VayronQuickPromptsResponse> {
  return apiGet('/vayron/quick-prompts', { interest }, signal);
}

/** POST /vayron/context — send a user question and receive a context-aware reply. */
export function askVayron(
  payload: VayronContextRequest,
  signal?: AbortSignal,
): Promise<VayronContextResponse> {
  return apiPost('/vayron/context', payload, signal);
}
