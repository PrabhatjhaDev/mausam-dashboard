const fs = require('fs');

// 1. Write clean App.tsx
// Write clean App.tsx
const appContent = [
  '/**',
  ' * App — MAUSAM root component.',
  ' * Navigation: activeView state drives which view renders in the main column.',
  ' * Sidebar + MobileNav both write to activeView via handleNavSelect.',
  ' */',
  "import { useState } from 'react';",
  "import { InterestProvider } from './hooks/useInterest';",
  "import { Sidebar } from './components/layout/Sidebar';",
  "import { MobileNav } from './components/layout/MobileNav';",
  "import { VayronLauncher } from './components/vayron/VayronLauncher';",
  "import { VayronAssistant } from './components/vayron/VayronAssistant';",
  "import { SIDEBAR_ID_TO_VIEW, VIEW_TO_SIDEBAR_ID } from './navigation';",
  "import type { AppView } from './navigation';",
  "import { DashboardView, WeatherMapView, AIInsightsView, AlertsView, ActivityLogView, SavedPlacesView, AnalyticsView, SettingsView } from './views';",
  '',
  'function AppShell() {',
  "  const [activeView, setActiveView] = useState<AppView>('dashboard');",
  '  const handleNavSelect = (id: string) => {',
  '    const v = SIDEBAR_ID_TO_VIEW[id];',
  '    if (v) setActiveView(v);',
  '  };',
  '  return (',
  '    <div className="lg:ml-64 min-h-screen flex flex-col pb-20 lg:pb-0">',
  '      <Sidebar active={VIEW_TO_SIDEBAR_ID[activeView]} onSelect={handleNavSelect} onVayronOpen={() => document.dispatchEvent(new CustomEvent("vayron:open"))} />',
  '      <MobileNav active={VIEW_TO_SIDEBAR_ID[activeView]} onSelect={handleNavSelect} />',
  '      {activeView === "dashboard" && <DashboardView onVayronOpen={() => document.dispatchEvent(new CustomEvent("vayron:open"))} />}',
  '      {activeView === "weather-map" && <WeatherMapView />}',
  '      {activeView === "ai-insights" && <AIInsightsView />}',
  '      {activeView === "alerts" && <AlertsView />}',
  '      {activeView === "activity-log" && <ActivityLogView />}',
  '      {activeView === "saved-places" && <SavedPlacesView />}',
  '      {activeView === "analytics" && <AnalyticsView />}',
  '      {activeView === "settings" && <SettingsView />}',
  '    </div>',
  '  );',
  '}',
  '',
  'export default function App() {',
  '  return (',
  '    <InterestProvider>',
  '      <AppShell />',
  '      <VayronLauncher onClick={() => document.dispatchEvent(new CustomEvent("vayron:open"))} />',
  '      <VayronAssistant isOpen={false} onClose={() => {}} />',
  '    </InterestProvider>',
  '  );',
  '}',
  '',
// REMOVE duplicate const fs from old section below
let lines = fs.readFileSync('fix-vcv4.cjs', 'utf8').split('\n');
const newLines = [];
let skipNext = false;
for (let i = 0; i < lines.length; i++) {
  const l = lines[i].trim();
  if (l === 'const fs = require(\'fs\');' && i > 10) {
    console.log('Skipping duplicate const fs at line ' + (i+1));
    skipNext = true;
    continue;
  }
  newLines.push(lines[i]);
}
fs.writeFileSync('fix-vcv4.cjs', newLines.join('\n'));
console.log('Duplicates removed, re-run this script now');

].join('\n') + '\n';
fs.writeFileSync('src/App.tsx', appContent);
console.log('App.tsx rewritten cleanly');

const fs = require('fs');
const path = 'c:\\Users\\prabh\\OneDrive\\Desktop\\SIH PS76\\mausam-dashboard\\src\\index.css';
let css = fs.readFileSync(path, 'utf8');

// Simply remove '  min-height: 100%;\n' from .vcv-stage blocks
const before = css;
css = css.replace(/\.vcv-stage\s*\{[^}]*min-height:\s*100%;\s*\n/g, (match) => {
  // Remove the min-height line, keep everything else
  return match.replace(/min-height:\s*100%;\s*\n/, '');
});

if (css !== before) {
  fs.writeFileSync(path, css, 'utf8');
  console.log('SUCCESS: removed min-height: 100% from .vcv-stage');
} else {
  // Try a simpler regex
  const simple = css.replace(/min-height:\s*100%;\s*/g, '');
  if (simple !== css) {
    fs.writeFileSync(path, simple, 'utf8');
    console.log('SUCCESS: removed all min-height: 100% lines globally');
  } else {
    console.log('WARNING: nothing changed');
  }
}

// Verify
const verify = fs.readFileSync(path, 'utf8');
const stillHas = /\.vcv-stage\s*\{[^}]*min-height:\s*100%/.test(verify);
console.log('Still has min-height 100% in .vcv-stage:', stillHas);
// Fix App.tsx - remove onVayronOpen from WeatherMapView and AIInsightsView
let app = fs.readFileSync('src/App.tsx', 'utf8');
app = app.replace(
  "<WeatherMapView onVayronOpen={() => document.dispatchEvent(new CustomEvent('vayron:open'))} />",
  '<WeatherMapView />'
);
app = app.replace(
  "<AIInsightsView onVayronOpen={() => document.dispatchEvent(new CustomEvent('vayron:open'))} />",
  '<AIInsightsView />'
);
fs.writeFileSync('src/App.tsx', app);
console.log('App.tsx fixed');

// Fix AIInsightsView.tsx - remove unused Props interface
let ai = fs.readFileSync('src/views/AIInsightsView.tsx', 'utf8');
ai = ai.replace(/\n\ninterface AIInsightsViewProps \{\n  onVayronOpen: \(\) => void;\n\}\n/, '\n');
fs.writeFileSync('src/views/AIInsightsView.tsx', ai);
console.log('AIInsightsView.tsx fixed');

// Fix WeatherMapView.tsx - remove unused Props interface
let wm = fs.readFileSync('src/views/WeatherMapView.tsx', 'utf8');
wm = wm.replace(/\n\ninterface WeatherMapViewProps \{\n  onVayronOpen: \(\) => void;\n\}\n/, '\n');
fs.writeFileSync('src/views/WeatherMapView.tsx', wm);
console.log('WeatherMapView.tsx fixed');

console.log('All done!');
