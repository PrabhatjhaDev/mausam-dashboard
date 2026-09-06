import { Sparkles, Droplets, Wind, Sun, CloudRain, Activity, AlertTriangle, Eye } from 'lucide-react';
import { useInterest } from '../../hooks/useInterest';
import { getInterestColor } from '../../utils/personalization';
import type { MetricTag, InterestInsight } from '../../types/weather';

const MI: Record<MetricTag, React.ComponentType<{ className?: string }>> = {
  temp: Sun, humidity: Droplets, wind: Wind, uv: Sun, rain: CloudRain, aqi: Wind, visibility: Eye, pressure: Activity,
};

const MC: Record<MetricTag, { color: string; bg: string }> = {
  temp: { color: 'text-amber-300', bg: 'from-amber-500/10 to-orange-500/10 border-amber-400/20' },
  humidity: { color: 'text-sky-300', bg: 'from-sky-500/10 to-blue-500/10 border-sky-400/20' },
  wind: { color: 'text-emerald-300', bg: 'from-emerald-500/10 to-teal-500/10 border-emerald-400/20' },
  uv: { color: 'text-yellow-300', bg: 'from-yellow-500/10 to-amber-500/10 border-yellow-400/20' },
  rain: { color: 'text-cyan-300', bg: 'from-cyan-500/10 to-blue-500/10 border-cyan-400/20' },
  aqi: { color: 'text-rose-300', bg: 'from-rose-500/10 to-red-500/10 border-rose-400/20' },
  visibility: { color: 'text-violet-300', bg: 'from-violet-500/10 to-fuchsia-500/10 border-violet-400/20' },
  pressure: { color: 'text-indigo-300', bg: 'from-indigo-500/10 to-blue-500/10 border-indigo-400/20' },
};

interface QuickInsightsProps { insights: InterestInsight[] | null; loading: boolean; }

export function QuickInsights({ insights, loading }: QuickInsightsProps) {
  const { selected } = useInterest();
  const color = getInterestColor(selected);
  const data = insights ?? [];

  return (
    <section className="p-5 sm:p-6 rounded-2xl glass">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4" style={{ color }} />
            Quick Insights
            {loading && <span className="ml-2 w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Personalized for your selected interest</p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-violet-400/10 text-violet-300">AI</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {data.length === 0 && !loading && (
          <p className="col-span-2 text-xs text-slate-400 text-center py-4">Loading insights…</p>
        )}
        {data.map(ins => {
          const style = MC[ins.metric] ?? MC.temp;
          const Icon = MI[ins.metric] ?? AlertTriangle;
          return (
            <div key={ins.id} className={`relative p-3.5 rounded-xl bg-gradient-to-br ${style.bg} border hover:scale-[1.02] transition cursor-pointer group`}>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <Icon className={`w-4 h-4 ${style.color}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white mb-1">{ins.text.slice(0, 60)}{ins.text.length > 60 ? '…' : ''}</p>
                  <p className="text-xs text-slate-300 leading-relaxed">{ins.text}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
