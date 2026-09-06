const fs = require('fs');
const content = `/**
 * App — MAUSAM root component.
 * Navigation: activeView state drives which view renders in the main column.
 * Sidebar + MobileNav both write to activeView via handleNavSelect.
 */
import { useState } from 'react';
import { InterestProvider } from './hooks/useInterest';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { VayronLauncher } from './components/vayron/VayronLauncher';
import { VayronAssistant } from './components/vayron/VayronAssistant';
import { SIDEBAR_ID_TO_VIEW } from './navigation';
import type { AppView } from './navigation';
import {
  DashboardView,
  WeatherMapView,
  AIInsightsView,
  AlertsView,
  ActivityLogView,
  SavedPlacesView,
// Step 2: overwrite App.tsx with correct content (no duplicate)
const appContent = `/**
 * App — MAUSAM root component.
 * Navigation: activeView state drives which view renders in the main column.
 * Sidebar + MobileNav both write to activeView via handleNavSelect.
 */
import { useState } from 'react';
import { InterestProvider } from './hooks/useInterest';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { VayronLauncher } from './components/vayron/VayronLauncher';
import { VayronAssistant } from './components/vayron/VayronAssistant';
import { SIDEBAR_ID_TO_VIEW, VIEW_TO_SIDEBAR_ID } from './navigation';
import type { AppView } from './navigation';
import { DashboardView, WeatherMapView, AIInsightsView, AlertsView, ActivityLogView, SavedPlacesView, AnalyticsView, SettingsView } from './views';

function AppShell() {
  const [activeView, setActiveView] = useState<AppView>('dashboard');
  const handleNavSelect = (id: string) => {
    const v = SIDEBAR_ID_TO_VIEW[id];
    if (v) setActiveView(v);
  };
  return (
    <div className="lg:ml-64 min-h-screen flex flex-col pb-20 lg:pb-0">
      <Sidebar active={VIEW_TO_SIDEBAR_ID[activeView]} onSelect={handleNavSelect} onVayronOpen={() => document.dispatchEvent(new CustomEvent('vayron:open'))} />
      <MobileNav active={VIEW_TO_SIDEBAR_ID[activeView]} onSelect={handleNavSelect} />
      {activeView === 'dashboard' && <DashboardView onVayronOpen={() => document.dispatchEvent(new CustomEvent('vayron:open'))} />}
      {activeView === 'weather-map' && <WeatherMapView onVayronOpen={() => document.dispatchEvent(new CustomEvent('vayron:open'))} />}
      {activeView === 'ai-insights' && <AIInsightsView onVayronOpen={() => document.dispatchEvent(new CustomEvent('vayron:open'))} />}
      {activeView === 'alerts' && <AlertsView />}
      {activeView === 'activity-log' && <ActivityLogView />}
      {activeView === 'saved-places' && <SavedPlacesView />}
      {activeView === 'analytics' && <AnalyticsView />}
      {activeView === 'settings' && <SettingsView />}
    </div>
  );
}

export default function App() {
  return (
    <InterestProvider>
      <AppShell />
      <VayronLauncher onClick={() => document.dispatchEvent(new CustomEvent('vayron:open'))} />
      <VayronAssistant isOpen={false} onClose={() => {}} />
    </InterestProvider>
  );
}
`;
fs.writeFileSync('src/App.tsx', appContent + '\n');
console.log('App.tsx overwritten with correct content (no duplicate).');

  AnalyticsView,
  SettingsView,
} from './views';

function AppShell() {
  const [activeView, setActiveView] = useState<AppView>('dashboard');

  const handleNavSelect = (id: string) => {
    const view = SIDEBAR_ID_TO_VIEW[id];
    if (view) setActiveView(view);
  };

  return (
    <div className="lg:ml-64 min-h-screen flex flex-col pb-20 lg:pb-0">
      <Sidebar active={activeView} onSelect={handleNavSelect} onVayronOpen={() => document.dispatchEvent(new CustomEvent('vayron:open'))} />
      <MobileNav active={activeView} onSelect={handleNavSelect} />

      {activeView === 'dashboard' && <DashboardView onVayronOpen={() => document.dispatchEvent(new CustomEvent('vayron:open'))} />}
      {activeView === 'weather-map' && <WeatherMapView onVayronOpen={() => document.dispatchEvent(new CustomEvent('vayron:open'))} />}
      {activeView === 'ai-insights' && <AIInsightsView onVayronOpen={() => document.dispatchEvent(new CustomEvent('vayron:open'))} />}
      {activeView === 'alerts' && <AlertsView />}
      {activeView === 'activity-log' && <ActivityLogView />}
      {activeView === 'saved-places' && <SavedPlacesView />}
      {activeView === 'analytics' && <AnalyticsView />}
      {activeView === 'settings' && <SettingsView />}
    </div>
  );
}

export default function App() {
  return (
    <InterestProvider>
      <AppShell />
      <VayronLauncher onClick={() => document.dispatchEvent(new CustomEvent('vayron:open'))} />
      <VayronAssistant isOpen={false} onClose={() => {}} />
    </InterestProvider>
  );
}
`;
fs.writeFileSync('src/App.tsx', content + '\n');
console.log('App.tsx written OK');
