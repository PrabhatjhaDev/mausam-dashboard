/** API-level request / response DTOs.
 *
 * These types represent the raw JSON shapes returned by the FastAPI backend.
 * Where a shape matches an existing frontend type (src/types/weather.ts), that
 * type is reused via `import type`.  Where no existing type exists (e.g. the
 * aggregated PersonalizedHome response), a dedicated interface is defined here.
 *
 * All field names use camelCase to match the backend JSON contract.
 */

import type {
  Interest,
  InterestInsight,
  InterestQuickPrompt,
  Location,
  MetricTag,
  UtilityCard,
  WeatherAlert,
  WeatherCondition,
} from '../types/weather.js';

// Re-export shared types so consumers can import from api/types
export type { Location };
export type { WeatherAlert, MetricTag };
export type { Interest, InterestInsight, UtilityCard };
export type { WeatherCondition };

// ── Location ───────────────────────────────────────────────────────────────────

export interface LocationsResponse {
  locations: Location[];
  count: number;
}

// ── Weather ────────────────────────────────────────────────────────────────────

/** GET /weather/current — same shape as CurrentWeather but with locationId. */
export interface CurrentWeatherResponse extends Location {
  locationId: string;
  temp: number;
  feelsLike: number;
  condition: WeatherCondition;
  description: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  sunrise: string;
  sunset: string;
  highTemp: number;
  lowTemp: number;
}

// ── Personalization ─────────────────────────────────────────────────────────────

/** GET /personalized/home */
export interface PersonalizedHomeResponse {
  location: Location;
  current: CurrentWeatherResponse;
  hourlyForecast: Array<{
    time: string;
    temp: number;
    condition: WeatherCondition;
    windSpeed: number;
    precip: number;
  }>;
  weeklyForecast: Array<{
    day: string;
    date: string;
    high: number;
    low: number;
    condition: WeatherCondition;
    sunrise: string;
    sunset: string;
    precipChance: number;
  }>;
  alerts: WeatherAlert[];
  insights: InterestInsight[];
  utilities: UtilityCard[];
  recommendations: Array<{
    id: string;
    label: string;
    icon: string;
    text: string;
    priority: number;
  }>;
  interest: Interest | null;
}

/** GET /personalized/quick-prompts */
export interface PersonalizationQuickPromptsResponse {
  interest: string;
  prompts: InterestQuickPrompt[];
}

// ── Profile ─────────────────────────────────────────────────────────────────────

export interface UserProfile {
  id: string;
  name: string;
  selectedInterest: string | null;
  homeLocationId: string | null;
  savedLocations: string[];
  preferences: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileUpdate {
  name?: string;
  selectedInterest?: string | null;
  homeLocationId?: string | null;
  savedLocations?: string[];
  preferences?: Record<string, unknown>;
}

// ── VAYRON ─────────────────────────────────────────────────────────────────────

export interface VayronQuickPromptsResponse {
  interest: string;
  prompts: InterestQuickPrompt[];
}

export interface VayronContextRequest {
  userInput: string;
  interest: string | null;
}

export interface VayronContextSnapshot {
  locationId: string;
  interest: string | null;
  temp: number;
  condition: WeatherCondition;
  description: string;
}

export interface VayronContextResponse {
  userInput: string;
  matchedIntent: string;
  response: string;
  relevanceExplanation: string;
  /** Backend returns plain strings for follow-up prompts */
  followUpPrompts: string[];
  contextSnapshot: VayronContextSnapshot;
}
