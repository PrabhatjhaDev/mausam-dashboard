import { Bell, CloudLightning, Wind, Flame, Snowflake, CloudFog, AlertTriangle, Clock, MapPin } from 'lucide-react';
import type { WeatherAlert, AlertSeverity, AlertType } from '../../types/weather';
import clsx from 'clsx';
import { useInterest } from '../../hooks/useInterest';
import { getInterestColor } from '../../utils/personalization';

const TI: Record<AlertType, React.ComponentType<{ className?: string }>> = {
  storm: CloudLightning, flood: CloudLightning, heat: Flame, cold: Snowflake, wind: Wind, air: CloudFog, uv: Flame, fog: CloudFog, general: AlertTriangle,
};

const SC: Record<AlertSeverity, { bg: string; text: string; dot: string; label: string }> = {
  extreme:    { bg: 'bg-fuchsia-500/15 border-fuchsia-400/40', text: 'text-fuchsia-300', dot: 'bg-fuchsia-400 shadow-[0_0_8px_rgba(232,121,249,0.8)]', label: 'Extreme' },
  warning:    { bg: 'bg-rose-500/10 border-rose-400/30',       text: 'text-rose-300',    dot: 'bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.8)]',    label: 'Warning' },
  watch:      { bg: 'bg-amber-500/10 border-amber-400/30',     text: 'text-amber-300',   dot: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]',    label: 'Watch' },
  advisory:   { bg: 'bg-sky-500/10 border-sky-400/20',         text: 'text-sky-300',     dot: 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]',     label: 'Advisory' },
  information:{ bg: 'bg-slate-500/10 border-slate-400/20',     text: 'text-slate-300',   dot: 'bg-slate-400',                                          label: 'Info' },
};

interface AlertsPanelProps { alerts: WeatherAlert[] | null; loading: boolean; }

export function AlertsPanel({ alerts, loading }: AlertsPanelProps) {
  const { selected } = useInterest();
  const color = getInterestColor(selected);
  const data = alerts ?? [];
  const relevant = selected ? data.filter(a => a.interestTags?.includes(selected)) : [];

  return (
    <section className="p-5 sm:p-6 rounded-2xl glass">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Bell className="w-4 h-4 text-rose-400" />Active Alerts
            {loading && <span className="ml-2 w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Prioritized for your interests</p>
        </div>
        <span className="text-xs text-rose-300 bg-rose-500/10 px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />{data.length} Live
        </span>
      </div>

      {selected && relevant.length > 0 && (
        <div className="mb-4 p-3 rounded-xl border text-xs text-slate-300 leading-relaxed"
          style={{ backgroundColor: `${color}10`, borderColor: `${color}30` }}>
          <span style={{ color }} className="font-semibold">{selected.charAt(0).toUpperCase() + selected.slice(1)} priority alerts:</span>{' '}{relevant.length} relevant alert{relevant.length > 1 ? 's' : ''}.
        </div>
      )}

      <div className="space-y-3">
        {data.length === 0 && !loading && (
          <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-400/20">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center"><Bell className="w-3.5 h-3.5 text-emerald-300" /></div>
            <p className="text-xs text-emerald-200"><span className="font-semibold">All clear</span> — no severe weather in your area for the next 24 hours.</p>
          </div>
        )}
        {data.map(alert => {
          const Icon = TI[alert.type] ?? AlertTriangle;
          const s = SC[alert.severity];
          const rel = selected ? (alert.interestTags?.includes(selected) ?? false) : false;
          return (
            <div key={alert.id} className={clsx('p-4 rounded-xl border transition', s.bg, rel && 'shadow-[0_0_0_1px_rgba(255,255,255,0.04)]')}>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0"><Icon className={`w-4 h-4 ${s.text}`} /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <h4 className="text-sm font-semibold text-white">{alert.title}</h4>
                    <span className={clsx('text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wider', s.text, 'bg-white/10')}>{s.label}</span>
                    {rel && <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wider" style={{ backgroundColor: `${color}20`, color }}>Relevant</span>}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-2.5">{alert.description}</p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Issued {alert.time} · Expires {alert.expires}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{alert.location}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
