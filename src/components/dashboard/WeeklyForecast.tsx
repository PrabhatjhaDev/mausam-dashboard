import { CalendarDays, Droplets, Sun, Moon } from 'lucide-react';
import { weatherIconMap } from '../../utils/weather';
import type { DayForecast, WeatherCondition } from '../../types/weather';

interface WeeklyForecastProps { weekly: DayForecast[] | null; loading: boolean; }

const FALLBACK: DayForecast[] = [
  { day: 'Today', date: '5 Sep', high: 31, low: 24, condition: 'partly-cloudy', sunrise: '5:42 AM', sunset: '7:14 PM', precipChance: 20 },
  { day: 'Fri', date: '6 Sep', high: 29, low: 23, condition: 'rainy', sunrise: '5:43 AM', sunset: '7:13 PM', precipChance: 80 },
  { day: 'Sat', date: '7 Sep', high: 28, low: 22, condition: 'rainy', sunrise: '5:43 AM', sunset: '7:12 PM', precipChance: 75 },
  { day: 'Sun', date: '8 Sep', high: 30, low: 23, condition: 'cloudy', sunrise: '5:44 AM', sunset: '7:11 PM', precipChance: 40 },
  { day: 'Mon', date: '9 Sep', high: 32, low: 24, condition: 'partly-cloudy', sunrise: '5:44 AM', sunset: '7:10 PM', precipChance: 25 },
  { day: 'Tue', date: '10 Sep', high: 33, low: 25, condition: 'sunny', sunrise: '5:45 AM', sunset: '7:09 PM', precipChance: 10 },
  { day: 'Wed', date: '11 Sep', high: 34, low: 25, condition: 'sunny', sunrise: '5:45 AM', sunset: '7:08 PM', precipChance: 5 },
];

export function WeeklyForecast({ weekly, loading }: WeeklyForecastProps) {
  const data = weekly ?? FALLBACK;

  return (
    <section className="p-5 sm:p-6 rounded-2xl glass">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-indigo-400" />
            7-Day Forecast
            {loading && <span className="ml-2 w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Plan your week ahead</p>
        </div>
      </div>
      <div className="space-y-1.5">
        {data.map((day, i) => {
          const Icon = weatherIconMap[day.condition as WeatherCondition] ?? Sun;
          const min = day.low;
          const max = day.high;
          const minAll = Math.min(...data.map(d => d.low)) - 1;
          const maxAll = Math.max(...data.map(d => d.high)) + 1;
          const range = maxAll - minAll || 1;
          const barLeft = ((min - minAll) / range) * 100;
          const barWidth = ((max - min) / range) * 100;

          return (
            <div key={i} className={`flex items-center gap-3 sm:gap-4 p-3 rounded-xl transition ${i === 0 ? 'bg-white/[0.08] border border-cyan-400/20' : 'hover:bg-white/[0.04]'}`}>
              <div className="w-16 sm:w-20 shrink-0">
                <p className="text-sm font-semibold text-white">{day.day}</p>
                <p className="text-[10px] text-slate-500">{day.date}</p>
              </div>
              <div className="flex items-center gap-2 w-20 sm:w-24 shrink-0">
                <Icon className="w-6 h-6 text-cyan-300" />
                {day.precipChance > 20 && (
                  <div className="flex items-center gap-0.5 text-[10px] text-cyan-300">
                    <Droplets className="w-3 h-3" />{day.precipChance}%
                  </div>
                )}
              </div>
              <span className="text-xs text-slate-400 w-8 text-right tabular-nums">{min}°</span>
              <div className="flex-1 relative h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <div className="absolute h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-amber-400"
                  style={{ left: `${barLeft}%`, width: `${Math.max(barWidth, 8)}%` }} />
              </div>
              <span className="text-xs text-white font-semibold w-8 tabular-nums">{max}°</span>
              <div className="hidden xl:flex items-center gap-2 text-[10px] text-slate-500 ml-2">
                <span className="flex items-center gap-0.5"><Sun className="w-2.5 h-2.5 text-amber-400" />{day.sunrise.slice(0, 5)}</span>
                <span className="flex items-center gap-0.5"><Moon className="w-2.5 h-2.5 text-indigo-300" />{day.sunset.slice(0, 5)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
