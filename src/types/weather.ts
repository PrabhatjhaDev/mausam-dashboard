// ──────────── Location type ────────────
export interface Location {
  id: string;
  name: string;
  city: string;
  state: string;
  country: string;
  lat: number;
  lng: number;
  timezone: string;
}

// ──────────── Weather types ────────────
export interface CurrentWeather {
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
}

export type WeatherCondition =
  | 'sunny'
  | 'partly-cloudy'
  | 'cloudy'
  | 'rainy'
  | 'stormy'
  | 'snowy'
  | 'foggy'
  | 'windy';

export interface HourlyForecast {
  time: string;
  temp: number;
  condition: WeatherCondition;
  windSpeed: number;
  precip: number;
}

export interface DayForecast {
  day: string;
  date: string;
  high: number;
  low: number;
  condition: WeatherCondition;
  sunrise: string;
  sunset: string;
  precipChance: number;
}

// ──────────── Alert system (full hierarchy) ────────────
export type AlertSeverity = 'information' | 'advisory' | 'watch' | 'warning' | 'extreme';
export type AlertType = 'storm' | 'flood' | 'heat' | 'cold' | 'wind' | 'air' | 'uv' | 'fog' | 'general';

export interface WeatherAlert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  description: string;
  time: string;
  expires: string;
  location: string;
  /** Interest IDs for which this alert is particularly relevant */
  interestTags: InterestId[];
  /** Weather metrics this alert is related to */
  metricTags: MetricTag[];
}

export type MetricTag = 'temp' | 'humidity' | 'wind' | 'uv' | 'rain' | 'aqi' | 'visibility' | 'pressure';

// ──────────── Interest / personalization types ────────────
export type InterestId =
  | 'commute'
  | 'fitness'
  | 'health'
  | 'travel'
  | 'agriculture'
  | 'events'
  | 'pets'
  | 'photography';

export interface InterestInsight {
  id: string;
  text: string;
  metric: MetricTag;
  priority: number; // 1 = highest
}

export interface InterestQuickPrompt {
  text: string;
  intent: string; // keywords that match VAYRON intents
}

export interface InterestUtilityMapping {
  utilityId: string;
  priority: number;
}

export interface Interest {
  id: InterestId;
  label: string;
  icon: string;
  color: string;
  enabled: boolean;
  insights: InterestInsight[];
  quickPrompts: InterestQuickPrompt[];
  utilityMappings: InterestUtilityMapping[];
  alertPriorities: MetricTag[];
  /** Summary shown in InterestSelector header */
  summary: string;
  /** VAYRON context line shown in the assistant */
  vayronContext: string;
}

// ──────────── Utility types ────────────
export interface UtilityCard {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  value: string;
  unit: string;
  status: 'good' | 'moderate' | 'poor';
  trend: 'up' | 'down' | 'stable';
  tip: string;
  metric: MetricTag;
}

// ──────────── Chat / VAYRON types ────────────
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  typing?: boolean;
}

export interface VayronState {
  isOpen: boolean;
  isListening: boolean;
  messages: ChatMessage[];
  isTyping: boolean;
  selectedInterest: InterestId | null;
}

export interface VayronContext {
  selectedInterest: InterestId | null;
  weather: CurrentWeather;
  location: Location;
  hourlyForecast: HourlyForecast[];
}
