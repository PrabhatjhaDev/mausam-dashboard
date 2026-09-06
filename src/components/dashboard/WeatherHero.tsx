import { MapPin, Calendar, Thermometer, Wind, Droplets, Eye, Sun, Moon, Cloud, Sparkles } from 'lucide-react';
import { formatGreeting } from '../../utils/weather';
import { useInterest } from '../../hooks/useInterest';
import { getInterestColor, getInterestLabel } from '../../utils/personalization';
import type { CurrentWeatherResponse } from '../../api';

interface WeatherHeroProps {
  userName?: string;
  current: CurrentWeatherResponse | null;
  loading: boolean;
}

export function WeatherHero({ userName = 'Aarav', current, loading }: WeatherHeroProps) {
  const { selected } = useInterest();
  const accentColor = getInterestColor(selected);
  const interestLabel = getInterestLabel(selected);
  const dateString = new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const temp = current?.temp ?? 31;
  const feelsLike = current?.feelsLike ?? 34;
  const desc = current?.description ?? '—';
  const humidity = current?.humidity ?? 72;
  const windSpeed = current?.windSpeed ?? 14;
  const vis = current?.visibility ?? 8;
  const sr = current?.sunrise ?? '5:42 AM';
  const ss = current?.sunset ?? '7:14 PM';
  const high = current?.highTemp ?? 34;
  const low = current?.lowTemp ?? 24;
  const city = current?.city ?? 'New Delhi';
  const state = current?.state ?? 'Delhi';

  return (
    <section className="relative overflow-hidden rounded-3xl">
      <div className="hero-scene absolute inset-0" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-12 right-16 sm:right-28 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-yellow-200 to-amber-500 shadow-[0_0_80px_rgba(251,191,36,0.7)] float-slow" />
        <Cloud className="absolute top-20 left-[10%] w-20 h-20 text-white/40" strokeWidth={1.5} />
        <Cloud className="absolute top-32 right-[5%] w-28 h-28 text-white/30" strokeWidth={1.5} />
        <Cloud className="absolute bottom-32 left-[40%] w-16 h-16 text-white/30" strokeWidth={1.5} />
      </div>
      <div className="relative z-10 p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="text-white drop-shadow-lg">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-white/80 mb-2">
              <Calendar className="w-3.5 h-3.5" /><span>{dateString}</span>
              {loading && <span className="ml-2 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-1">{formatGreeting()}, {userName}</h2>
            <div className="flex items-center gap-2 text-sm sm:text-base text-white/90 mb-2">
              <MapPin className="w-4 h-4" /><span>{city}, {state}</span>
              <span className="px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-sm text-[10px] uppercase tracking-wider font-semibold">Live</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md"
              style={{ backgroundColor: `${accentColor}25`, color: accentColor, border: `1px solid ${accentColor}40` }}>
              <Sparkles className="w-3 h-3" />Your MAUSAM · {interestLabel}
            </div>
          </div>
          <div className="flex items-end gap-4">
            <p className="text-[10rem] sm:text-[11rem] lg:text-[13rem] leading-[0.85] font-extralight text-white tracking-tighter">{loading ? '—' : `${temp}°`}</p>
            <div className="pb-4 sm:pb-6 lg:pb-10">
              <p className="text-lg sm:text-xl font-semibold text-white capitalize">{loading ? 'Loading…' : desc}</p>
              <p className="text-sm text-white/80 mt-1">Feels like {loading ? '—' : `${feelsLike}°`}</p>
              <p className="text-xs text-white/70 mt-2">High {high}° · Low {low}°</p>
            </div>
          </div>
        </div>
        <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
          <HeroStat icon={Thermometer} label="Feels Like" value={loading ? '—' : `${feelsLike}°`} />
          <HeroStat icon={Wind} label="Wind" value={loading ? '—' : `${windSpeed} km/h`} />
          <HeroStat icon={Droplets} label="Humidity" value={loading ? '—' : `${humidity}%`} />
          <HeroStat icon={Eye} label="Visibility" value={loading ? '—' : `${vis} km`} />
          <div className="hidden lg:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/15 backdrop-blur-md text-white">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-xs"><Sun className="w-3.5 h-3.5 text-amber-300" /><span className="opacity-80">Rise</span></div>
              <p className="text-sm font-semibold">{loading ? '—' : sr}</p>
            </div>
            <div className="w-px h-8 bg-white/25" />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-xs"><Moon className="w-3.5 h-3.5 text-indigo-200" /><span className="opacity-80">Set</span></div>
              <p className="text-sm font-semibold">{loading ? '—' : ss}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroStat({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/15 backdrop-blur-md text-white">
      <div className="p-2 rounded-lg bg-white/15"><Icon className="w-4 h-4" /></div>
      <div><p className="text-[10px] uppercase tracking-wider opacity-80">{label}</p><p className="text-sm font-semibold">{value}</p></div>
    </div>
  );
}
