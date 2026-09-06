/**
 * DashboardView — default landing page. All dashboard content lives here
 * so it can be conditionally rendered based on navigation state.
 */
import { useState } from 'react';
import { WeatherHero } from '../components/dashboard/WeatherHero';
import { InterestSelector } from '../components/dashboard/InterestSelector';
import { QuickInsights } from '../components/dashboard/QuickInsights';
import { HourlyForecast } from '../components/dashboard/HourlyForecast';
import { WeeklyForecast } from '../components/dashboard/WeeklyForecast';
import { WeatherMap } from '../components/dashboard/WeatherMap';
import { AlertsPanel } from '../components/dashboard/AlertsPanel';
import { PersonalizedUtility } from '../components/dashboard/PersonalizedUtility';
import { RecommendationStrip } from '../components/dashboard/RecommendationStrip';
import { InterestProfileModal } from '../components/dashboard/InterestProfileModal';
import { Header } from '../components/layout/Header';
import WeatherAtmosphereVisual from '../components/vayron/WeatherAtmosphereVisual';
import { VayronCommandVisual } from '../components/vayron/VayronCommandVisual';
import { useInterest } from '../hooks/useInterest';
import { usePersonalizedHome } from '../hooks/usePersonalizedHome';
import type { Location, InterestId } from '../types/weather';
import type { CurrentWeatherResponse } from '../api/types';

const DEFAULT_LOCATION: Location = {
  id: 'delhi-ncr', name: 'New Delhi', city: 'New Delhi', state: 'Delhi',
  country: 'India', lat: 28.6139, lng: 77.2090, timezone: 'Asia/Kolkata',
};

interface DashboardViewProps {
  location?: Location;
  onVayronOpen: () => void;
}

export function DashboardView({ location: propLocation, onVayronOpen }: DashboardViewProps) {
  const { selected } = useInterest();
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const { data, loading, refresh } = usePersonalizedHome(null, selected as InterestId | null);

  const location: Location = data?.location ?? propLocation ?? DEFAULT_LOCATION;
  const current: CurrentWeatherResponse | null = data?.current ?? null;

  return (
    <>
      <WeatherAtmosphereVisual />
      <VayronCommandVisual />
      <Header
        location={location}
        onVayronOpen={onVayronOpen}
        unreadAlerts={data?.alerts?.length ?? 0}
      />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-4 space-y-4 max-w-[1400px] w-full mx-auto">
        <WeatherHero userName="Aarav" current={current} loading={loading} />
        <RecommendationStrip
          onProfileOpen={() => setProfileModalOpen(true)}
          recommendations={data?.recommendations ?? []}
        />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-3">
            <HourlyForecast hourly={data?.hourlyForecast ?? null} loading={loading} />
          </div>
          <div className="lg:col-span-2">
            <QuickInsights insights={data?.insights ?? null} loading={loading} />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div><AlertsPanel alerts={data?.alerts ?? null} loading={loading} /></div>
          <div><InterestSelector /></div>
          <div><PersonalizedUtility utilities={data?.utilities ?? null} loading={loading} /></div>
        </div>
        <WeeklyForecast weekly={data?.weeklyForecast ?? null} loading={loading} />
        <WeatherMap location={location} />
      </main>
      <InterestProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        onInterestChanged={refresh}
      />
    </>
  );
}
