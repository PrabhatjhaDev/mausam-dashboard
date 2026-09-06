/**
 * AlertsView — dedicated alerts view.
 * Reuses existing AlertsPanel with data from /personalized/home.
 */
import { Bell } from 'lucide-react';
import { AlertsPanel } from '../components/dashboard/AlertsPanel';
import { useInterest } from '../hooks/useInterest';
import { usePersonalizedHome } from '../hooks/usePersonalizedHome';
import type { InterestId } from '../types/weather';

export function AlertsView() {
  const { selected } = useInterest();
  const { data, loading } = usePersonalizedHome(null, selected as InterestId | null);

  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-4 space-y-4 max-w-[1400px] w-full mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center">
          <Bell className="w-5 h-5 text-rose-400" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-white">Weather Alerts</h1>
          <p className="text-sm text-slate-400">Active alerts for your region</p>
        </div>
      </div>

      <AlertsPanel alerts={data?.alerts ?? null} loading={loading} />
    </main>
  );
}
