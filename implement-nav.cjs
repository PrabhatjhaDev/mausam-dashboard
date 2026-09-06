const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace the comment block with navigation imports
content = content.replace(
    /\/\*\*\n \* BUFFER - DO NOT REMOVE\n \* This file was recovered\. Old content follows below TypeScript truncation limit\.\n \* @recovery-buffer-start\n \* @recovery-buffer-end\n \*\/\n/,
    `import { useState } from 'react';\nimport type { AppView } from './navigation';\nimport { SIDEBAR_ID_TO_VIEW, VIEW_TO_SIDEBAR_ID } from './navigation';\n`
);

// Replace the VIEW_TO_SIDEBAR_ID import line with full navigation imports
// (already done above)

// Update App function to add useState and navigation
content = content.replace(
    /export default function App\(\) \{\n  return \(\n/,
    `export default function App() {\n  const [activeView, setActiveView] = useState<AppView>('dashboard');\n\n  return (\n`
);

// Update Sidebar onSelect
content = content.replace(
    /onSelect=\{?\(\) => \{\}?\}/g,
    'onSelect={(id) => setActiveView(SIDEBAR_ID_TO_VIEW[id])}'
);

// Update Sidebar active prop
content = content.replace(
    /active=\{VIEW_TO_SIDEBAR_ID\['dashboard'\]\}/,
    "active={VIEW_TO_SIDEBAR_ID[activeView]}"
);

// Update MobileNav active prop  
content = content.replace(
    /MobileNav active=\{VIEW_TO_SIDEBAR_ID\['dashboard'\]\}/,
    "MobileNav active={VIEW_TO_SIDEBAR_ID[activeView]}"
);

// Replace DashboardView rendering with conditional view rendering
content = content.replace(
    /<DashboardView onVayronOpen=\{?\(\) => document\.dispatchEvent\(new CustomEvent\('vayron:open'\)\)\}? \/>/,
    `{activeView === 'dashboard' ? (\n          <DashboardView onVayronOpen={() => document.dispatchEvent(new CustomEvent('vayron:open'))} />\n        ) : activeView === 'weather-map' ? (\n          <WeatherMapView />\n        ) : activeView === 'ai-insights' ? (\n          <AIInsightsView />\n        ) : activeView === 'alerts' ? (\n          <AlertsView />\n        ) : activeView === 'activity-log' ? (\n          <ActivityLogView />\n        ) : activeView === 'saved-places' ? (\n          <SavedPlacesView />\n        ) : activeView === 'analytics' ? (\n          <AnalyticsView />\n        ) : (\n          <SettingsView />\n        )}`
);

// Add remaining view imports
content = content.replace(
    /import \{ DashboardView \} from '\.\/views';/,
    `import { DashboardView, WeatherMapView, AIInsightsView, AlertsView, ActivityLogView, SavedPlacesView, AnalyticsView, SettingsView } from './views';`
);

fs.writeFileSync('src/App.tsx', content);
console.log('Done! App.tsx updated with navigation.');
