import { ChevronRight, type LucideIcon } from 'lucide-react';
import { useInterest } from '../../hooks/useInterest';
import { getInterestColor, getInterestLabel } from '../../utils/personalization';
import { weatherIconMap } from '../../utils/weather';

// Backend-recommended icon name -> Lucide component
import { Zap, Clock, AlertTriangle, Sun, CloudRain, Wind, Eye, MapPin } from 'lucide-react';
const RICON: Record<string, LucideIcon> = {
  Zap, Clock, AlertTriangle, Sun, CloudRain, Wind, Eye, MapPin, ...weatherIconMap,
};

export interface Recommendation {
  id: string;
  label: string;
  icon: string;
  text: string;
  priority: number;
}

interface RecommendationStripProps {
  onProfileOpen: () => void;
  recommendations: Recommendation[];
}

export function RecommendationStrip({ onProfileOpen, recommendations }: RecommendationStripProps) {
  const { selected } = useInterest();
  const color = getInterestColor(selected);
  const label = getInterestLabel(selected);

  // Pick the highest-priority recommendation (priority 1 == highest)
  const rec = recommendations[0] ?? null;
  const Icon = rec ? (RICON[rec.icon] ?? ChevronRight) : ChevronRight;

  if (!rec) {
    return (
      <div className="relative flex items-center gap-4 p-4 sm:p-5 rounded-2xl overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}06 100%)`, border: `1px solid ${color}30`, boxShadow: `0 0 24px ${color}0d` }}>
        <div className="flex-1 text-sm text-slate-300">Personalized recommendation loading…</div>
        <button onClick={onProfileOpen} className="text-xs font-semibold px-3 py-1.5 rounded-xl glass hover:bg-white/10 text-slate-200 transition">Profile</button>
      </div>
    );
  }

  return (
    <div className="relative flex items-center gap-4 p-4 sm:p-5 rounded-2xl overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}06 100%)`, border: `1px solid ${color}30`, boxShadow: `0 0 24px ${color}0d` }}>
      <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${color}20, transparent 70%)` }} />
      <div className="relative flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
        <div className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}20`, border: `1px solid ${color}35` }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
              style={{ backgroundColor: `${color}20`, color }}>
              {rec.label}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">· Personalized for you</span>
          </div>
          <p className="text-sm font-medium text-white leading-snug">{rec.text}</p>
        </div>
      </div>
      <button onClick={onProfileOpen}
        className="relative shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition hover:scale-105"
        style={{ backgroundColor: `${color}18`, border: `1px solid ${color}35`, color }}>
        <Icon className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{label}</span>
        <ChevronRight className="w-3 h-3" />
      </button>
    </div>
  );
}
