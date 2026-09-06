import type { CurrentWeather, HourlyForecast, DayForecast, WeatherAlert, Location } from '../types/weather';

// ──────────── Location ────────────
export const currentLocation: Location = {
  id: 'delhi-ncr',
  name: 'New Delhi',
  city: 'New Delhi',
  state: 'Delhi',
  country: 'India',
  lat: 28.6139,
  lng: 77.2090,
  timezone: 'Asia/Kolkata',
};

export const currentWeather: CurrentWeather = {
  temp: 31,
  feelsLike: 34,
  condition: 'partly-cloudy',
  description: 'Partly Cloudy',
  humidity: 72,
  windSpeed: 14,
  pressure: 1008,
  visibility: 8,
  uvIndex: 6,
  sunrise: '5:42 AM',
  sunset: '7:14 PM',
};

export const hourlyForecast: HourlyForecast[] = [
  { time: 'Now', temp: 31, condition: 'partly-cloudy', windSpeed: 14, precip: 10 },
  { time: '1 PM', temp: 33, condition: 'sunny', windSpeed: 12, precip: 5 },
  { time: '2 PM', temp: 34, condition: 'sunny', windSpeed: 11, precip: 0 },
  { time: '3 PM', temp: 33, condition: 'sunny', windSpeed: 13, precip: 0 },
  { time: '4 PM', temp: 32, condition: 'partly-cloudy', windSpeed: 15, precip: 5 },
  { time: '5 PM', temp: 30, condition: 'partly-cloudy', windSpeed: 16, precip: 10 },
  { time: '6 PM', temp: 28, condition: 'cloudy', windSpeed: 18, precip: 20 },
  { time: '7 PM', temp: 27, condition: 'rainy', windSpeed: 20, precip: 60 },
  { time: '8 PM', temp: 26, condition: 'rainy', windSpeed: 22, precip: 70 },
  { time: '9 PM', temp: 25, condition: 'rainy', windSpeed: 18, precip: 55 },
  { time: '10 PM', temp: 24, condition: 'cloudy', windSpeed: 14, precip: 30 },
  { time: '11 PM', temp: 24, condition: 'cloudy', windSpeed: 12, precip: 20 },
];

export const weeklyForecast: DayForecast[] = [
  { day: 'Today', date: '5 Sep', high: 31, low: 24, condition: 'partly-cloudy', sunrise: '5:42 AM', sunset: '7:14 PM', precipChance: 20 },
  { day: 'Fri', date: '6 Sep', high: 29, low: 23, condition: 'rainy', sunrise: '5:43 AM', sunset: '7:13 PM', precipChance: 80 },
  { day: 'Sat', date: '7 Sep', high: 28, low: 22, condition: 'rainy', sunrise: '5:43 AM', sunset: '7:12 PM', precipChance: 75 },
  { day: 'Sun', date: '8 Sep', high: 30, low: 23, condition: 'cloudy', sunrise: '5:44 AM', sunset: '7:11 PM', precipChance: 40 },
  { day: 'Mon', date: '9 Sep', high: 32, low: 24, condition: 'partly-cloudy', sunrise: '5:44 AM', sunset: '7:10 PM', precipChance: 25 },
  { day: 'Tue', date: '10 Sep', high: 33, low: 25, condition: 'sunny', sunrise: '5:45 AM', sunset: '7:09 PM', precipChance: 10 },
  { day: 'Wed', date: '11 Sep', high: 34, low: 25, condition: 'sunny', sunrise: '5:45 AM', sunset: '7:08 PM', precipChance: 5 },
];

// Alerts with interest context tags for personalization
export const weatherAlerts: WeatherAlert[] = [
  {
    id: 'a1',
    type: 'storm',
    severity: 'watch',
    title: 'Thunderstorm Watch',
    description: 'Conditions are favorable for thunderstorm development this evening. Stay indoors and avoid open areas.',
    time: '2:30 PM',
    expires: '10:00 PM',
    location: 'Delhi NCR',
    interestTags: ['commute', 'fitness', 'events', 'pets'],
    metricTags: ['rain', 'wind'],
  },
  {
    id: 'a2',
    type: 'wind',
    severity: 'advisory',
    title: 'Strong Winds Advisory',
    description: 'Wind speeds up to 40 km/h expected between 5–8 PM. Secure loose objects outdoors.',
    time: '12:00 PM',
    expires: '9:00 PM',
    location: 'Delhi NCR',
    interestTags: ['commute', 'travel', 'events', 'photography'],
    metricTags: ['wind'],
  },
  {
    id: 'a3',
    type: 'air',
    severity: 'advisory',
    title: 'Air Quality Alert',
    description: 'AQI 180 — Unhealthy for sensitive groups. PM2.5 levels elevated. Limit prolonged outdoor exertion.',
    time: '8:00 AM',
    expires: 'Tomorrow 8:00 AM',
    location: 'Delhi NCR',
    interestTags: ['health', 'fitness', 'pets'],
    metricTags: ['aqi'],
  },
  {
    id: 'a4',
    type: 'heat',
    severity: 'information',
    title: 'Heat Advisory',
    description: 'Feels-like temperature 34°C this afternoon. UV index 6 (High). Drink water and avoid direct sun exposure.',
    time: '10:00 AM',
    expires: '6:00 PM',
    location: 'Delhi NCR',
    interestTags: ['health', 'fitness', 'pets', 'agriculture'],
    metricTags: ['temp', 'uv'],
  },
  {
    id: 'a5',
    type: 'uv',
    severity: 'information',
    title: 'High UV Index',
    description: 'UV index 6 (High) between 11 AM – 4 PM. Apply SPF 30+ and wear UV-protective sunglasses.',
    time: '10:00 AM',
    expires: '4:00 PM',
    location: 'Delhi NCR',
    interestTags: ['health', 'fitness', 'photography'],
    metricTags: ['uv'],
  },
];

export const mapData = {
  center: { lat: 28.6139, lng: 77.2090 },
  zoom: 8,
  markers: [
    { lat: 28.6139, lng: 77.2090, label: 'Delhi' },
    { lat: 28.5355, lng: 77.3910, label: 'Noida' },
    { lat: 28.4595, lng: 77.0266, label: 'Gurugram' },
    { lat: 28.4089, lng: 77.3028, label: 'Faridabad' },
    { lat: 28.6692, lng: 77.4538, label: 'Ghaziabad' },
  ],
};
