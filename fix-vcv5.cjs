const fs = require("fs");

// === FIX 1: Rewrite App.tsx with correct props ===
const appContent = [
  '/**',
  ' * App \u2014 MAUSAM root component.',
  ' * Navigation: activeView state drives which view renders in the main column.',
  ' * Sidebar + MobileNav both write to activeView via handleNavSelect.',
  ' */',
  '',
  'function AppShell() {',
  '  const handleNavSelect = (id: string) => {',
  '    const v = SIDEBAR_ID_TO_VIEW[id];',
  '    if (v) setActiveView(v);',
  '  };',
  '  return (',
  '      <MobileNav active={VIEW_TO_SIDEBAR_ID[activeView]} onSelect={handleNavSelect} />',
  '    </div>',
  '  );',
  '},',
  '',
  'export default function App() {',
  '  return (',
  '    <InterestProvider>',
  '      <AppShell />',
  '      <VayronAssistant isOpen={false} onClose={() => {}} />',
  '    </InterestProvider>',
  '  );',
  '},',
  '',
].join('\n') + '\n';
fs.writeFileSync('src/App.tsx', appContent);
console.log('1/3 App.tsx written');

// === FIX 2: Remove unused Props interface from AIInsightsView.tsx ===
let ai = fs.readFileSync('src/views/AIInsightsView.tsx', 'utf8');
const aiOld = '\n\ninterface AIInsightsViewProps {\n  onVayronOpen: () => void;\n}\n';
if (ai.includes(aiOld)) { ai = ai.replace(aiOld, '\n'); fs.writeFileSync('src/views/AIInsightsView.tsx', ai); console.log('2/3 AIInsightsView.tsx fixed'); } else { console.log('2/3 AIInsightsView.tsx - Props interface not found'); }

// === FIX 3: Remove unused Props interface from WeatherMapView.tsx ===
let wm = fs.readFileSync('src/views/WeatherMapView.tsx', 'utf8');
const wmOld = '\n\ninterface WeatherMapViewProps {\n  onVayronOpen: () => void;\n}\n';
if (wm.includes(wmOld)) { wm = wm.replace(wmOld, '\n'); fs.writeFileSync('src/views/WeatherMapView.tsx', wm); console.log('3/3 WeatherMapView.tsx fixed'); } else { console.log('3/3 WeatherMapView.tsx - Props interface not found'); }

console.log('\nAll fixes applied. Run: npm run build');
