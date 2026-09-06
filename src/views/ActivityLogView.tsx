/**
 * ActivityLogView — frontend-only activity log.
 * No dedicated backend activity-log API exists yet.
 * Shows a polished empty state.
 */
import { Activity, Clock, Cloud, MapPin, Sparkles } from 'lucide-react';

export function ActivityLogView() {
  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-4 space-y-4 max-w-[1400px] w-full mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
          <Activity className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-white">Activity Log</h1>
          <p className="text-sm text-slate-400">Your recent weather activity</p>
        </div>
      </div>

      {/* Polished empty state */}
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-400/20 flex items-center justify-center">
            <Activity className="w-10 h-10 text-emerald-400" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg bg-[#050a1a] border border-white/10 flex items-center justify-center">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>
        <h2 className="text-lg font-semibold text-white mb-2">No recent activity</h2>
        <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
          Your weather activity — searches, alerts viewed, and VAYRON conversations — will appear here as you use the app.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          {[
            { icon: MapPin, label: 'Search locations', desc: 'Find weather for any city' },
            { icon: Cloud, label: 'View forecasts', desc: 'Check hourly & weekly predictions' },
            { icon: Sparkles, label: 'Ask VAYRON', desc: 'Get AI-powered weather insights' },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <Icon className="w-4 h-4 text-slate-400 shrink-0" />
              <div className="text-left">
                <p className="text-xs font-medium text-white">{label}</p>
                <p className="text-[10px] text-slate-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
