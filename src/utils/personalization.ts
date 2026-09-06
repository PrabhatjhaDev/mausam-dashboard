/**
 * Personalization Engine
 *
 * Configuration-driven system that maps selected interests to
 * dashboard content, alert priorities, and VAYRON context.
 * This is the single source of truth for interest-driven content selection.
 */

import type { Interest, InterestId, WeatherAlert, UtilityCard, MetricTag } from '../types/weather';
import { interests } from '../data/interests';
import { personalizedUtilities } from '../data/personalization';
import { weatherAlerts } from '../data/mockWeather';

// ──────────── Interest profile lookup ────────────
export function getInterestProfile(id: InterestId): Interest | undefined {
  return interests.find(i => i.id === id);
}

// ──────────── Utility cards filtered + ranked by interest ────────────
export function getUtilitiesForInterest(interestId: InterestId | null): UtilityCard[] {
  if (!interestId) return personalizedUtilities;

  const profile = getInterestProfile(interestId);
  if (!profile) return personalizedUtilities;

  // Sort by priority defined in interest profile
  const mapped = profile.utilityMappings
    .sort((a, b) => a.priority - b.priority)
    .map(m => personalizedUtilities.find(u => u.id === m.utilityId))
    .filter(Boolean) as UtilityCard[];

  // Pad with remaining utilities not in the profile
  const mappedIds = new Set(mapped.map(u => u.id));
  const remaining = personalizedUtilities.filter(u => !mappedIds.has(u.id));

  return [...mapped, ...remaining];
}

// ──────────── Alerts filtered + ranked by interest ────────────
export function getAlertsForInterest(
  interestId: InterestId | null,
  allAlerts: WeatherAlert[] = weatherAlerts,
): WeatherAlert[] {
  if (!interestId) return allAlerts;

  const profile = getInterestProfile(interestId);
  if (!profile) return allAlerts;

  // Priority order for sorting
  const severityOrder: Record<string, number> = {
    extreme: 0,
    warning: 1,
    watch: 2,
    advisory: 3,
    information: 4,
  };

  return [...allAlerts].sort((a, b) => {
    const aMatch = a.interestTags.includes(interestId) ? 0 : 1;
    const bMatch = b.interestTags.includes(interestId) ? 0 : 1;
    if (aMatch !== bMatch) return aMatch - bMatch;

    const aSev = severityOrder[a.severity] ?? 99;
    const bSev = severityOrder[b.severity] ?? 99;
    return aSev - bSev;
  });
}

// ──────────── Insight items filtered + ranked by interest ────────────
export function getInsightsForInterest(interestId: InterestId | null) {
  if (!interestId) {
    // Default: top insights from all enabled interests
    return interests
      .filter(i => i.enabled)
      .flatMap(i => i.insights)
      .sort((a, b) => a.priority - b.priority)
      .slice(0, 6);
  }

  const profile = getInterestProfile(interestId);
  if (!profile) return [];

  return profile.insights
    .filter(() => profile.enabled)
    .sort((a, b) => a.priority - b.priority);
}

// ──────────── Quick prompt suggestions ────────────
export function getQuickPromptsForInterest(interestId: InterestId | null) {
  if (!interestId) {
    // Default: first prompt from each enabled interest
    return interests
      .filter(i => i.enabled)
      .map(i => i.quickPrompts[0])
      .filter(Boolean);
  }

  const profile = getInterestProfile(interestId);
  return profile?.quickPrompts ?? [];
}

// ──────────── VAYRON greeting (context-aware) ────────────
export function getVayronGreeting(
  interestId: InterestId | null,
  weather: { temp: number; description: string; humidity: number },
): string {
  const profile = interestId ? getInterestProfile(interestId) : null;

  if (profile) {
    return `${profile.vayronContext} Currently ${weather.temp}°C, ${weather.description}, ${weather.humidity}% humidity. How can I help?`;
  }

  const hour = new Date().getHours();
  const timeGreeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return `${timeGreeting}! I'm VAYRON — your weather intelligence companion. I've analyzed today's conditions: ${weather.temp}°C, ${weather.description}. Ask me anything about rain, outfits, commute, workouts, or weekend plans.`;
}

// ──────────── Metric tag to human label ────────────
export const metricLabel: Record<MetricTag, string> = {
  temp: 'Temperature',
  humidity: 'Humidity',
  wind: 'Wind',
  uv: 'UV Index',
  rain: 'Rain',
  aqi: 'Air Quality',
  visibility: 'Visibility',
  pressure: 'Pressure',
};

// ──────────── Interest color helpers ────────────
export function getInterestColor(id: InterestId | null): string {
  if (!id) return '#60a5fa';
  const profile = getInterestProfile(id);
  return profile?.color ?? '#60a5fa';
}

export function getInterestLabel(id: InterestId | null): string {
  if (!id) return 'All';
  const profile = getInterestProfile(id);
  return profile?.label ?? id;
}
