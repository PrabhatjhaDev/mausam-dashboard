import { X, Check, Car, Dumbbell, Heart, Plane, Sprout, Calendar, PawPrint, Camera, type LucideIcon } from 'lucide-react';
import { interests } from '../../data/interests';
import { useInterest } from '../../hooks/useInterest';
import clsx from 'clsx';
import type { InterestId } from '../../types/weather';

const IM: Record<string, LucideIcon> = { Car, Dumbbell, Heart, Plane, Sprout, Calendar, PawPrint, Camera };

interface InterestProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInterestChanged?: () => void;
}

export function InterestProfileModal({ isOpen, onClose, onInterestChanged }: InterestProfileModalProps) {
  const { selected, setSelected } = useInterest();

  if (!isOpen) return null;

  const handleSelect = (id: InterestId) => {
    setSelected(id);
    onInterestChanged?.();
    setTimeout(onClose, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="relative w-full sm:max-w-2xl sm:max-h-[85vh] flex flex-col rounded-t-3xl sm:rounded-3xl glass-strong border border-white/[0.12] overflow-hidden animate-slideUp">
        <div className="relative p-5 sm:p-6 border-b border-white/[0.08] shrink-0">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/10 blur-3xl" />
            <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-gradient-to-br from-violet-500/15 to-fuchsia-500/10 blur-3xl" />
          </div>
          <div className="relative flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Choose your MAUSAM profile</h2>
              <p className="text-xs text-slate-400 mt-1">Personalize weather insights for what matters to you</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl glass hover:bg-white/10 text-slate-400 hover:text-white transition" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative p-4 sm:p-5 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {interests.map(interest => {
              const Icon = IM[interest.icon] ?? Camera;
              const isSelected = selected === interest.id;
              return (
                <button key={interest.id} onClick={() => handleSelect(interest.id)}
                  className={clsx('relative text-left p-4 rounded-2xl border transition group',
                    isSelected ? 'bg-white/[0.06]' : 'bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.04] hover:border-white/[0.16]')}
                  style={isSelected ? { borderColor: interest.color, boxShadow: `0 0 0 1px ${interest.color}40, 0 0 24px ${interest.color}25` } : undefined}>
                  <div className="flex items-start gap-3 mb-2">
                    <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition"
                      style={{ backgroundColor: `${interest.color}20`, border: `1px solid ${interest.color}40` }}>
                      <Icon className="w-5 h-5" style={{ color: interest.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-sm font-semibold text-white">{interest.label}</h3>
                        {isSelected && (
                          <span className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: interest.color }}>
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{interest.summary}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {interest.alertPriorities.slice(0, 3).map(m => (
                      <span key={m} className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-300 font-medium">{m}</span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-5 sm:px-6 py-4 border-t border-white/[0.08] shrink-0 flex items-center justify-between gap-3">
          <p className="text-[11px] text-slate-400">Selection is saved on this device</p>
          <button onClick={onClose} className="text-xs font-semibold px-3 py-1.5 rounded-xl glass hover:bg-white/10 text-slate-200 transition">Done</button>
        </div>
      </div>
    </div>
  );
}
