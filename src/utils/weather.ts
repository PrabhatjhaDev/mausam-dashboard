import {
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  CloudLightning,
  CloudSnow,
  CloudFog,
  Wind,
  type LucideIcon,
} from 'lucide-react';
import type { WeatherCondition } from '../types/weather';

export const weatherIconMap: Record<WeatherCondition, LucideIcon> = {
  sunny: Sun,
  'partly-cloudy': CloudSun,
  cloudy: Cloud,
  rainy: CloudRain,
  stormy: CloudLightning,
  snowy: CloudSnow,
  foggy: CloudFog,
  windy: Wind,
};

export const weatherColorMap: Record<WeatherCondition, string> = {
  sunny: '#fbbf24',
  'partly-cloudy': '#60a5fa',
  cloudy: '#94a3b8',
  rainy: '#38bdf8',
  stormy: '#a78bfa',
  snowy: '#e0f2fe',
  foggy: '#cbd5e1',
  windy: '#34d399',
};

export const weatherGradient: Record<WeatherCondition, string> = {
  sunny: 'from-amber-400 to-orange-500',
  'partly-cloudy': 'from-sky-400 to-blue-500',
  cloudy: 'from-slate-400 to-slate-600',
  rainy: 'from-blue-500 to-indigo-600',
  stormy: 'from-indigo-600 to-purple-700',
  snowy: 'from-cyan-200 to-blue-300',
  foggy: 'from-slate-300 to-slate-500',
  windy: 'from-emerald-400 to-teal-500',
};

export const getTimeOfDay = (): 'morning' | 'afternoon' | 'evening' | 'night' => {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  if (h < 20) return 'evening';
  return 'night';
};

export const formatGreeting = (): string => {
  const tod = getTimeOfDay();
  switch (tod) {
    case 'morning': return 'Good Morning';
    case 'afternoon': return 'Good Afternoon';
    case 'evening': return 'Good Evening';
    case 'night': return 'Good Night';
  }
};
