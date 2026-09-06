import { useState } from 'react';
import type { AppView } from './navigation';
import { SIDEBAR_ID_TO_VIEW, VIEW_TO_SIDEBAR_ID } from './navigation';
import { InterestProvider } from './hooks/useInterest';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { VayronLauncher } from './components/vayron/VayronLauncher';
import { VayronAssistant } from './components/vayron/VayronAssistant';
import { DashboardView, WeatherMapView, AIInsightsView, AlertsView, ActivityLogView, SavedPlacesView, AnalyticsView, SettingsView } from './views';

export default function App() {
  const [activeView, setActiveView] = useState<AppView>('dashboard');
  const [vayronOpen, setVayronOpen] = useState(false);

  return (
    <InterestProvider>
      <div className="min-h-screen lg:pl-64">
        <Sidebar
          active={VIEW_TO_SIDEBAR_ID[activeView]}
          onSelect={(id) => setActiveView(SIDEBAR_ID_TO_VIEW[id])}
          onVayronOpen={() => setVayronOpen(true)}
        />
        <MobileNav
          active={VIEW_TO_SIDEBAR_ID[activeView]}
          onSelect={(id) => setActiveView(SIDEBAR_ID_TO_VIEW[id])}
        />

        {activeView === 'dashboard' ? (
          <DashboardView onVayronOpen={() => setVayronOpen(true)} />
        ) : activeView === 'weather-map' ? (
          <WeatherMapView />
        ) : activeView === 'ai-insights' ? (
          <AIInsightsView />
        ) : activeView === 'alerts' ? (
          <AlertsView />
        ) : activeView === 'activity-log' ? (
          <ActivityLogView />
        ) : activeView === 'saved-places' ? (
          <SavedPlacesView />
        ) : activeView === 'analytics' ? (
          <AnalyticsView />
        ) : (
          <SettingsView />
        )}

        <VayronLauncher onClick={() => setVayronOpen(true)} />

        <VayronAssistant
          isOpen={vayronOpen}
          onClose={() => setVayronOpen(false)}
        />
      </div>
    </InterestProvider>
  );
}