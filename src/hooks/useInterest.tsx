/**
 * InterestContext — single source of truth for the user-selected interest.
 *
 * Startup sequence:
 *   1. Read localStorage for the last-selected interest (fast, no flicker).
 *   2. Fetch backend profile (GET /profile) in the background.
 *   3. If backend has a selectedInterest, use it — otherwise keep localStorage.
 *   4. On interest change: update local UI immediately (optimistic), then
 *      persist to backend (PUT /profile) in the background.
 *
 * localStorage is preserved as an offline fallback.
 */
import { createContext, useContext, useMemo, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { InterestId } from '../types/weather';
import { getProfile, setSelectedInterest } from '../api';

interface InterestContextValue {
  selected: InterestId | null;
  setSelected: (id: InterestId | null) => void;
  /** True while the initial profile fetch is in-flight */
  profileLoading: boolean;
}

const InterestContext = createContext<InterestContextValue | null>(null);
const STORAGE_KEY = 'mausam-selected-interest';
const DEFAULT_INTEREST: InterestId = 'commute';

export function InterestProvider({ children }: { children: ReactNode }) {
  const [selected, setSelectedRaw] = useState<InterestId | null>(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      return (v as InterestId | null) ?? DEFAULT_INTEREST;
    } catch {
      return DEFAULT_INTEREST;
    }
  });
  const [profileLoading, setProfileLoading] = useState(true);

  // Fetch backend profile on mount; override selected if backend has a value
  useEffect(() => {
    let cancelled = false;
    getProfile()
      .then(profile => {
        if (cancelled) return;
        if (profile.selectedInterest && profile.selectedInterest !== selected) {
          setSelectedRaw(profile.selectedInterest as InterestId);
          try { localStorage.setItem(STORAGE_KEY, profile.selectedInterest); } catch { /* ignore */ }
        }
      })
      .catch(() => { /* backend unavailable — keep local default */ })
      .finally(() => { if (!cancelled) setProfileLoading(false); });
    return () => { cancelled = true; };
  }, []); // intentionally empty — runs once on mount

  const setSelected = useCallback((id: InterestId | null) => {
    const next = id ?? DEFAULT_INTEREST;
    setSelectedRaw(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* ignore */ }
    // Persist to backend — fire-and-forget
    setSelectedInterest(next).catch(() => { /* backend unavailable — localStorage is the fallback */ });
  }, []);

  const value = useMemo(() => ({ selected, setSelected, profileLoading }), [selected, profileLoading]);
  return <InterestContext.Provider value={value}>{children}</InterestContext.Provider>;
}

export function useInterest(): InterestContextValue {
  const ctx = useContext(InterestContext);
  if (!ctx) {
    throw new Error('useInterest must be used inside <InterestProvider>');
  }
  return ctx;
}
