/**
 * usePersonalizedHome — fetches the full personalized dashboard payload
 * from the backend and provides loading / error states.
 *
 * The hook:
 *   1. Accepts locationId + interest
 *   2. Calls GET /personalized/home?location_id=…&interest=…
 *   3. Returns { data, loading, error, refresh }
 *   4. Uses AbortSignal to cancel stale requests on re-render
 *   5. Does NOT throw — errors are surfaced as `error` state
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import { getPersonalizedHome } from '../api';
import { asApiError } from '../api/errors';
import type { PersonalizedHomeResponse } from '../api';
import type { InterestId } from '../types/weather';

export interface PersonalizedHomeState {
  data: PersonalizedHomeResponse | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

const DEFAULT_LOCATION = 'delhi-ncr';
const DEFAULT_INTEREST: InterestId = 'commute';

export function usePersonalizedHome(
  locationId: string | null,
  interest: InterestId | null,
): PersonalizedHomeState {
  const [data, setData] = useState<PersonalizedHomeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Track the current abort controller so we can cancel in-flight requests
  const abortRef = useRef<AbortController | null>(null);

  const fetch_ = useCallback(() => {
    const loc = locationId ?? DEFAULT_LOCATION;
    const int = interest ?? DEFAULT_INTEREST;

    // Cancel any in-flight request
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    setLoading(true);
    setError(null);

    getPersonalizedHome(loc, int, ctrl.signal)
      .then(setData)
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        const apiErr = asApiError(err);
        setError(apiErr.error);
      })
      .finally(() => {
        // Only flip loading→false if this controller hasn't been superseded
        if (ctrl.signal.aborted) return;
        setLoading(false);
      });
  }, [locationId, interest]);

  useEffect(() => {
    fetch_();
    return () => { abortRef.current?.abort(); };
  }, [fetch_]);

  return { data, loading, error, refresh: fetch_ };
}
