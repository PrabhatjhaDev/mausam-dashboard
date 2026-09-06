/**
 * WeatherMapView — full-page weather radar view.
 * Reuses the existing WeatherMap component.
 */
import { Map } from 'lucide-react';
import { WeatherMap } from '../components/dashboard/WeatherMap';
import { useInterest } from '../hooks/useInterest';
import { usePersonalizedHome } from '../hooks/usePersonalizedHome';
import type { Location, InterestId } from '../types/weather';

const DEFAULT_LOCATION: Location = {
  id: 'delhi-ncr', name: 'New Delhi', city: 'New Delhi', state: 'Delhi',
  country: 'India', lat: 28.6139, lng: 77.2090, timezone: 'Asia/Kolkata',
};


export function WeatherMapView() {
  const { selected } = useInterest();
  const { data } = usePersonalizedHome(null, selected as InterestId | null);
  const location: Location = data?.location ?? DEFAULT_LOCATION;

  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-4 space-y-4 max-w-[1400px] w-full mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
          <Map className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-white">Weather Radar</h1>
          <p className="text-sm text-slate-400">Live radar & regional map · {location.city} Region</p>
        </div>
      </div>
      <WeatherMap location={location} />
    </main>
  );
}
