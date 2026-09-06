import type { CurrentWeather } from '../types/weather';

// ──────────── VAYRON Intent Engine ────────────
// Context-aware weather responses powered by mock data.
// Each response function receives current weather + location context.

export interface IntentResponse {
  patterns: RegExp[];
  response: (input: string, context?: { location?: string; weather?: CurrentWeather }) => string;
}

// Contextual greeting generator
export function buildGreeting(weather: CurrentWeather, location: string): string {
  const h = new Date().getHours();
  const greeting = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : h < 21 ? 'Good evening' : 'Good night';
  const condition = weather.description;
  const temp = weather.temp;

  return `${greeting}! I'm VAYRON — your personal weather intelligence companion. I've analyzed conditions for ${location}: ${temp}°C, ${condition}, humidity ${weather.humidity}%. Ask me anything about rain, outfit, commute, workouts, or weekend plans.`;
}

export const intents: IntentResponse[] = [
  {
    patterns: [/\b(rain|rainy|will it rain|shower|precipitation)\b/i],
    response: () =>
      'Yes — rain is expected around 7 PM with ~70% probability. Precipitation will last approximately 2 hours. Total expected rainfall: 8–12 mm. Plan outdoor activities before 5 PM. ☔',
  },
  {
    patterns: [/\b(temperature|how hot|how cold|temp|feels like)\b/i],
    response: (_, ctx) => {
      const w = ctx?.weather;
      const base = w ? `Currently ${w.temp}°C, feels like ${w.feelsLike}°C.` : 'Currently 31°C.';
      return `${base} High around 2 PM: ${w?.temp ?? 34}°C. Low tonight: ${w?.temp ?? 24}°C. Stay hydrated! 🌡️`;
    },
  },
  {
    patterns: [/\b(outfit|wear|clothes|dress|clothing|what to wear)\b/i],
    response: () =>
      'I suggest light cotton or linen — breathable and moisture-wicking fabrics. Skip dark colors (they absorb heat). A light cardigan may help during post-rain cooling after 7 PM. 👕',
  },
  {
    patterns: [/\b(commute|traffic|travel to work|leave|driving|road)\b/i],
    response: () =>
      'Best window: leave between 8:30–9:00 AM for work. Evening commute will be slower due to rain from 7 PM — plan an extra 20–25 minutes. Avoid NH-8 after 6 PM if possible. 🚗',
  },
  {
    patterns: [/\b(workout|exercise|run|jog|gym|fitness|training)\b/i],
    response: () =>
      'Best window for outdoor exercise: 6–8 AM (26°C, low humidity). Avoid outdoor activity 12–3 PM (UV index 6 — high). Rain expected after 7 PM. Drink 250ml water every 20 minutes. 💪',
  },
  {
    patterns: [/\b(weekend|plan|saturday|sunday|outing)\b/i],
    response: () =>
      "Saturday looks rainy (80% precip). Sunday partly cloudy, 30°C — much better for outdoor plans! Consider an indoor activity on Saturday. 📅",
  },
  {
    patterns: [/\b(air quality|aqi|pollution|dust|pm2)\b/i],
    response: () =>
      'AQI currently 180 (Unhealthy for sensitive groups). PM2.5 elevated. Limit prolonged outdoor exertion. Air purifiers recommended indoors. Sensitive individuals should wear N95 masks outdoors. 🌫️',
  },
  {
    patterns: [/\b(uv|sunburn|sunscreen|ultraviolet)\b/i],
    response: () =>
      "UV index is 6 (High) between 10 AM – 4 PM. Apply SPF 30+, wear UV-protective sunglasses and a wide-brim hat if you're heading out. ☀️",
  },
  {
    patterns: [/\b(wind|windy|breeze|gust)\b/i],
    response: () =>
      "Winds from the southwest at 14 km/h, gusting to 22 km/h later this evening. Secure loose objects outdoors. Motorcyclists: expect reduced stability on exposed roads. 🌬️",
  },
  {
    patterns: [/\b(hello|hi|hey|namaste|greetings)\b/i],
    response: () =>
      'Namaste! 🙏 I\'m VAYRON — your weather co-pilot. Ask me anything: rain, outfit, commute, workout, or even weekend plans. I\'ve got you covered.',
  },
  {
    patterns: [/\b(thanks|thank you|thx|appreciate)\b/i],
    response: () =>
      "You're welcome! Stay prepared and enjoy your day. Weather is dynamic — check back anytime for updates. ☀️",
  },
  {
    patterns: [/\b(who are you|your name|vayron|about you)\b/i],
    response: () =>
      "I'm VAYRON — Virtual AI Yield for Responsive weather & Optimized Navigation. I'm your personal weather intelligence companion built into MAUSAM. I know your location, interests, and weather patterns. 🤖",
  },
];

export const quickPrompts = [
  { id: 'p1', label: 'Will it rain today?', icon: 'CloudRain' },
  { id: 'p2', label: 'What should I wear?', icon: 'Shirt' },
  { id: 'p3', label: 'Best time for a run?', icon: 'Activity' },
  { id: 'p4', label: 'Weekend weather?', icon: 'CalendarDays' },
];