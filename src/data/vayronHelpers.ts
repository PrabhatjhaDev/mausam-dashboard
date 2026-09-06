import { intents } from './vayron';
import { currentLocation, currentWeather } from './mockWeather';
import { getInterestLabel, getInterestProfile } from '../utils/personalization';
import type { InterestId } from '../types/weather';

export function buildVayronResponse(
  input: string,
  interestId: InterestId | null = null,
): { id: string; role: 'assistant'; content: string; timestamp: Date } {
  const matched = intents.find(({ patterns }) =>
    patterns.some(p => p.test(input))
  );
  const contextStr = `${currentLocation.city} · ${currentWeather.temp}°C · ${currentWeather.description}`;

  let body: string;
  if (matched) {
    body = matched.response(input, { location: contextStr, weather: currentWeather });
  } else {
    body = "I can help with rain, temperature, outfit, commute, workout, weekend plans, AQI, UV, and wind. Try one of the suggested prompts above. 🤖";
  }

  // Append a "Why this matters" line when an interest is selected
  const profile = interestId ? getInterestProfile(interestId) : null;
  let suffix = '';
  if (profile && matched) {
    suffix = `\n\n💡 Why this matters for ${getInterestLabel(interestId)}: ${profile.summary}`;
  } else if (profile) {
    suffix = `\n\n💡 For your ${getInterestLabel(interestId)} profile, focus on ${profile.alertPriorities.slice(0, 2).join(' and ')} metrics.`;
  }

  return {
    id: `a-${Date.now()}`,
    role: 'assistant',
    content: body + suffix,
    timestamp: new Date(),
  };
}

export function buildUserMessage(
  text: string,
): { id: string; role: 'user'; content: string; timestamp: Date } {
  return { id: `u-${Date.now()}`, role: 'user', content: text, timestamp: new Date() };
}
