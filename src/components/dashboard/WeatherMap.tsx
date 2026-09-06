import { Map, Maximize2, Navigation } from 'lucide-react';
import { useState } from 'react';
import type { Location } from '../../types/weather';

type ML = 'radar' | 'satellite' | 'temperature';
const CD = [
  { x: '50%', y: '45%', l: 'Delhi',     t: '31°', c: 'Partly Cloudy' },
  { x: '36%', y: '52%', l: 'Noida',      t: '30°', c: 'Clear' },
  { x: '63%', y: '48%', l: 'Gurugram',   t: '32°', c: 'Sunny' },
  { x: '28%', y: '68%', l: 'Faridabad',  t: '31°', c: 'Partly Cloudy' },
  { x: '74%', y: '60%', l: 'Ghaziabad',  t: '30°', c: 'Clear' },
];

interface WeatherMapProps { location: Location | null; }
export function WeatherMap({ location }: WeatherMapProps) {
  const [layer, setLayer] = useState<ML>('radar');
  const [full, setFull] = useState(false);
  const loc = location ?? { id: 'delhi-ncr', name: 'New Delhi', city: 'New Delhi', state: 'Delhi', country: 'India', lat: 28.6139, lng: 77.2090, timezone: 'Asia/Kolkata' };

  return (
    <section className={`p-5 sm:p-6 rounded-2xl glass overflow-hidden transition-all ${full ? 'fixed inset-4 z-50' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Map className="w-4 h-4 text-emerald-400" />Live Weather Radar
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">{loc.city} Region · Updated 5 min ago · {loc.lat.toFixed(2)}°N {loc.lng.toFixed(2)}°E</p>
        </div>
        <div className="flex items-center gap-2">
          {(['radar', 'satellite', 'temperature'] as ML[]).map(l => (
            <button key={l} onClick={() => setLayer(l)}
              className={`text-xs px-3 py-1.5 rounded-lg glass transition ${layer === l ? 'text-white border border-cyan-400/40 bg-cyan-400/10' : 'text-slate-400 hover:text-white'}`}>
              {l === 'radar' ? 'Live Radar' : l === 'satellite' ? 'Satellite' : 'Temp Map'}
            </button>
          ))}
          <button onClick={() => setFull(!full)} className="text-slate-400 hover:text-white p-1.5 rounded-lg glass transition">
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="relative rounded-2xl overflow-hidden h-56 sm:h-72 map-pattern">
        {layer === 'radar' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative">
              {[60, 120, 180, 240].map(r => (
                <div key={r} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/10" style={{ width: r * 2, height: r * 2 }} />
              ))}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: 480, height: 480 }}>
                <svg viewBox="0 0 480 480" className="w-full h-full radar-sweep">
                  <defs>
                    <linearGradient id="ms" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                      <stop offset="60%" stopColor="#22d3ee" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                  <path d="M 240 240 L 240 0 A 240 240 0 0 1 480 240 Z" fill="url(#ms)" opacity="0.6" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {layer === 'temperature' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-6xl font-extralight text-white/20">—</p>
              <p className="text-sm text-cyan-400/60 mt-1">Current Temperature</p>
            </div>
          </div>
        )}

        {CD.map((city, i) => (
          <div key={i} className="absolute" style={{ left: city.x, top: city.y, transform: 'translate(-50%, -50%)' }}>
            <div className="relative group">
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold bg-emerald-500/90 text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                <div>{city.l}</div><div className="text-[9px] opacity-75">{city.t} · {city.c}</div>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse" />
              <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-400/30 animate-ping" />
            </div>
          </div>
        ))}

        <div className="absolute bottom-3 left-3 flex items-center gap-3 text-[10px] text-slate-400 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400" />City</span>
          <span className="flex items-center gap-1"><span className="w-4 h-0.5 bg-cyan-400 rounded" />Radar</span>
          <span className="flex items-center gap-1"><Navigation className="w-2.5 h-2.5 text-cyan-400" />{loc.lat.toFixed(2)}°N {loc.lng.toFixed(2)}°E</span>
        </div>

        <div className="absolute top-3 right-3">
          <span className="text-[9px] font-semibold px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/20 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />LIVE
          </span>
        </div>
      </div>

      {full && (
        <button onClick={() => setFull(false)} className="absolute top-4 right-4 z-10 p-2 rounded-xl glass text-white hover:bg-white/10 transition">
          <Maximize2 className="w-5 h-5" />
        </button>
      )}
    </section>
  );
}
