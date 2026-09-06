/** Weather API — /weather/*.
 *
 * GET /weather/current?location_id=…
 * GET /weather/forecast?location_id=…&hours=…&days=…
 * GET /weather/alerts?location_id=…
 *
 * All response shapes are camelCase to match existing frontend types.
 */
import type {
  CurrentWeather,
  DayForecast,
  HourlyForecast,
  WeatherAlert,
} from '../types/weather.js';
import { apiGet } from './client.js';

// ── Current ────────────────────────────────────────────────────────────────────

export interface CurrentWeatherResponse extends CurrentWeather {
  locationId: string;
  /** Optional location name (city) — populated when the response includes it. */
  city?: string;
  /** Optional state — populated when the response includes it. */
  state?: string;
  /** Today's high (from daily forecast summary). */
  highTemp?: number;
  /** Today's low (from daily forecast summary). */
  lowTemp?: number;
}

export function getCurrentWeather(
  locationId: string,
  signal?: AbortSignal,
): Promise<CurrentWeatherResponse> {
  return apiGet('/weather/current', { location_id: locationId }, signal);
}

// ── Forecast ───────────────────────────────────────────────────────────────────

export interface ForecastResponse {
  locationId: string;
  hourly: HourlyForecast[];
  daily: DayForecast[];
}

export interface ForecastOptions {
  hours?: number; // 1-48, default 12
  days?: number;  // 1-14, default 7
}

export function getWeatherForecast(
  locationId: string,
  options: ForecastOptions = {},
  signal?: AbortSignal,
): Promise<ForecastResponse> {
  return apiGet('/weather/forecast', {
    location_id: locationId,
    hours: options.hours,
    days: options.days,
  }, signal);
}

// ── Alerts ─────────────────────────────────────────────────────────────────────

export interface AlertsResponse {
  locationId: string;
  alerts: WeatherAlert[];
}

export function getWeatherAlerts(
  locationId: string,
  signal?: AbortSignal,
): Promise<AlertsResponse> {
  return apiGet('/weather/alerts', { location_id: locationId }, signal);
}
