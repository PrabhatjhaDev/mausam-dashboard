import { useState } from 'react';
import { Car, Dumbbell, Heart, Plane, Sprout, Calendar, PawPrint, Camera, Zap, type LucideIcon } from 'lucide-react';
import { interests } from '../../data/interests';
import type { InterestId } from '../../types/weather';
import clsx from 'clsx';
import { useInterest } from '../../hooks/useInterest';
import { getInterestColor } from '../../utils/personalization';

const IM: Record<string, LucideIcon> = { Car, Dumbbell, Heart, Plane, Sprout, Calendar, PawPrint, Camera };

export function InterestSelector() {
  const { selected, setSelected } = useInterest();
  const [enabled, setEnabled] = useState<Record<InterestId, boolean>>(
    Object.fromEntries(interests.map(i => [i.id, i.enabled])) as Record<InterestId, boolean>
  );

  const current = interests.find(i => i.id === selected) ?? interests[0];
  const insights = enabled[selected!] ? current.insights.slice(0, 4) : [];
  const color = getInterestColor(selected);

  const toggle = (id: InterestId) => setEnabled(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <section className="p-5 sm:p-6 rounded-2xl glass">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-white">Personalized Insights</h3>
          <p className="text-xs text-slate-400 mt-0.5">{current.summary}</p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: `${color}20`, color }}>
          {Object.values(enabled).filter(Boolean).length} Active
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {interests.map(interest => {
          const Icon = IM[interest.icon] || Zap;
          const isOn = enabled[interest.id];
          const isSel = selected === interest.id;
          return (
            <div key={interest.id} className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] p-1">
              <button onClick={() => setSelected(interest.id)}
                className={clsx('flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                  isSel ? 'text-white shadow-md' : 'text-slate-300 hover:text-white hover:bg-white/[0.04]')}
                style={isSel ? { backgroundColor: color } : undefined}>
                <Icon className="w-3.5 h-3.5" strokeWidth={2} />{interest.label}
              </button>
              <button onClick={() => toggle(interest.id)}
                className={clsx('w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold transition',
                  isOn ? 'bg-emerald-400/20 text-emerald-300' : 'bg-white/10 text-slate-500')}
                title={isOn ? 'Disable' : 'Enable'}>
                {isOn ? '✓' : '—'}
              </button>
            </div>
          );
        })}
      </div>

      {insights.length > 0 ? (
        <div className="space-y-2.5">
          {insights.map((insight, i) => (
            <div key={insight.id} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
              <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center mt-0.5"
                style={{ backgroundColor: `${color}22` }}>
                <span className="text-xs font-bold" style={{ color }}>{(i + 1).toString()}</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{insight.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.04] flex items-center justify-center mb-3">
            <Zap className="w-6 h-6 text-slate-500" />
          </div>
          <p className="text-sm text-slate-400 mb-1">{current.label} insights are disabled</p>
          <p className="text-xs text-slate-500">Toggle the checkmark above to enable</p>
        </div>
      )}
    </section>
  );
}
