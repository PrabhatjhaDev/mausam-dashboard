import { Clock, CloudRain, Wind } from 'lucide-react';
import { weatherIconMap } from '../../utils/weather';
import type { HourlyForecast as HF, WeatherCondition } from '../../types/weather';

interface HourlyForecastProps { hourly: HF[] | null; loading: boolean; }

const FALLBACK: HF[] = [
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

export function HourlyForecast({ hourly, loading }: HourlyForecastProps) {
  const data = hourly ?? FALLBACK;
  const temps = data.map(h => h.temp);
  const minT = Math.min(...temps) - 2;
  const maxT = Math.max(...temps) + 2;
  const range = maxT - minT || 1;
  const W = 600, H = 100;
  const stepX = W / (data.length - 1);
  const pts = data.map((hr, i) => ({ x: i * stepX, y: H - ((hr.temp - minT) / range) * H }));
  const pathD = pts.reduce((d, p, i) => i === 0 ? `M ${p.x} ${p.y}` : `${d} L ${p.x} ${p.y}`, '');
  const areaD = `${pathD} L ${W} ${H} L 0 ${H} Z`;

  return (
    <section className="p-5 sm:p-6 rounded-2xl glass">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            Hourly Forecast
            {loading && <span className="ml-2 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Next 12 hours</p>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-400" />Temp</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-400" />Rain</span>
        </div>
      </div>
      <div className="relative mb-3 px-1">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-24" preserveAspectRatio="none">
          <defs>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 0.25, 0.5, 0.75, 1].map(p => (
            <line key={p} x1="0" y1={H*p} x2={W} y2={H*p} stroke="rgba(110,158,230,0.08)" strokeWidth="1" />
          ))}
          <path d={areaD} fill="url(#tempGradient)" />
          <path d={pathD} fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {pts.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="3" fill="#22d3ee" stroke="#050a1a" strokeWidth="2" />
          ))}
        </svg>
      </div>
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1">
        {data.map((hour, i) => {
          const Icon = weatherIconMap[hour.condition as WeatherCondition] ?? Clock;
          return (
            <div key={i} className={`flex flex-col items-center min-w-[68px] py-3 px-2 rounded-xl transition ${hour.time === 'Now' ? 'glass-strong border-cyan-400/40 text-white' : 'bg-white/[0.03] border border-white/[0.06] text-slate-300 hover:bg-white/[0.06]'}`}>
              <span className="text-[10px] font-semibold mb-1.5">{hour.time}</span>
              <Icon className="w-5 h-5 mb-1.5 text-cyan-300" />
              <span className="text-base font-bold">{hour.temp}°</span>
              {hour.precip > 0 && <div className="flex items-center gap-0.5 text-[10px] text-cyan-300 mt-0.5"><CloudRain className="w-2.5 h-2.5" />{hour.precip}%</div>}
              <div className="flex items-center gap-0.5 text-[10px] text-slate-500 mt-0.5"><Wind className="w-2.5 h-2.5" />{hour.windSpeed}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
