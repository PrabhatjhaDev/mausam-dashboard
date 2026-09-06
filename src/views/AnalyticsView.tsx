/**
 * AnalyticsView — frontend-only analytics shell.
 * No dedicated analytics backend exists yet.
 * Shows a polished empty state with future promise.
 */
import { BarChart3, Clock, TrendingUp } from 'lucide-react';

export function AnalyticsView() {
  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-4 space-y-4 max-w-[1400px] w-full mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-violet-400" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-white">Analytics</h1>
          <p className="text-sm text-slate-400">Weather activity insights</p>
        </div>
      </div>

      {/* Polished empty state */}
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-400/20 flex items-center justify-center">
            <BarChart3 className="w-10 h-10 text-violet-400" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg bg-[#050a1a] border border-white/10 flex items-center justify-center">
            <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>
        <h2 className="text-lg font-semibold text-white mb-2">Analytics coming soon</h2>
        <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
          As you use MAUSAM, personalized weather analytics — usage patterns, alert frequency, and activity trends — will appear here.
        </p>
        <div className="mt-8 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-left max-w-sm">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-slate-500" />
            <span className="text-xs text-slate-500">Expected features</span>
          </div>
          <ul className="space-y-2">
            {[
              'Weather check frequency & patterns',
              'Alert response times',
              'VAYRON usage statistics',
              'Location-based weather trends',
              'Personalized activity timeline',
            ].map(f => (
              <li key={f} className="flex items-start gap-2 text-xs text-slate-400">
                <span className="text-violet-400 mt-0.5">›</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
