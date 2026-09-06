import { Shirt, Sun, Zap, Route, Wind, Flower2, ArrowUp, ArrowDown, Minus, Info, type LucideIcon } from 'lucide-react';
import { useInterest } from '../../hooks/useInterest';
import { getInterestColor } from '../../utils/personalization';
import type { UtilityCard } from '../../types/weather';

const IM: Record<string, LucideIcon> = { Shirt, Sun, Zap, Route, Wind, Flower2 };
const SS: Record<string, { bg: string; text: string; dot: string }> = {
  good: { bg: 'bg-emerald-500/10 border-emerald-400/20', text: 'text-emerald-300', dot: 'bg-emerald-400' },
  moderate: { bg: 'bg-amber-500/10 border-amber-400/20', text: 'text-amber-300', dot: 'bg-amber-400' },
  poor: { bg: 'bg-rose-500/10 border-rose-400/20', text: 'text-rose-300', dot: 'bg-rose-400' },
};
const TI: Record<string, React.ComponentType<{ className?: string }>> = { up: ArrowUp, down: ArrowDown, stable: Minus };

interface PersonalizedUtilityProps { utilities: UtilityCard[] | null; loading: boolean; }

export function PersonalizedUtility({ utilities, loading }: PersonalizedUtilityProps) {
  const { selected } = useInterest();
  const color = getInterestColor(selected);
  const data = utilities ?? [];

  return (
    <section className="p-5 sm:p-6 rounded-2xl glass">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-white">Smart Utilities</h3>
          <p className="text-xs text-slate-400 mt-0.5">Rearranged for your interest{loading && '…'}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {data.length === 0 && !loading && (
          <p className="col-span-3 text-xs text-slate-400 text-center py-4">Loading utilities…</p>
        )}
        {data.map((util, idx) => {
          const Icon = IM[util.icon] || Info;
          const style = SS[util.status] ?? SS.good;
          const TrendIcon = TI[util.trend] ?? Minus;
          const top = selected && idx < 3;
          return (
            <div key={util.id}
              className={`relative p-4 rounded-2xl border group cursor-pointer hover:scale-[1.02] transition ${style.bg}`}
              style={top ? { boxShadow: `inset 0 0 0 1px ${color}30` } : undefined}>
              <div className="absolute top-3 right-3">
                <div className={`w-2 h-2 rounded-full ${style.dot} shadow-[0_0_6px_currentColor]`} />
              </div>
              <div className="absolute bottom-3 right-3 opacity-50 group-hover:opacity-100 transition">
                <TrendIcon className={`w-3.5 h-3.5 ${style.text}`} />
              </div>
              <div className="mb-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center mb-3">
                  <Icon className={`w-4 h-4 ${style.text}`} />
                </div>
                <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">{util.subtitle}</p>
                <h4 className="text-sm font-semibold text-white">{util.title}</h4>
              </div>
              <div className="mb-3">
                <span className={`text-2xl font-bold ${style.text}`}>{util.value}</span>
                <span className="text-xs text-slate-400 ml-1.5">{util.unit}</span>
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-3 rounded-xl bg-[#0f1733] border border-white/20 text-[11px] text-slate-300 leading-relaxed opacity-0 group-hover:opacity-100 pointer-events-none transition shadow-2xl z-20">
                {util.tip}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0f1733] border-b border-r border-white/20 rotate-45 -mt-1" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
