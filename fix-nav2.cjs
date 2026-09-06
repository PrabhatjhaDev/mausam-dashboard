const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Remove the recovery comment block (lines 1-6)
content = content.replace(
    /^\/\*\*\r?\n \* BUFFER[^*]*\*\/\r?\n/,
    ''
);

// 2. Remove the duplicate VIEW_TO_SIDEBAR_ID import (keep the one with SIDEBAR_ID_TO_VIEW)
content = content.replace(
    /import \{ VIEW_TO_SIDEBAR_ID \} from '\.\/navigation';\n/,
    ''
);

// 3. Add useState in the App function - match the actual format
// The current format has `export default function App() {` on one line
// and `  return (` on the next
content = content.replace(
    /(export default function App\(\) \{)\n(  return \()/,
    "$1\n  const [activeView, setActiveView] = useState<AppView>('dashboard');\n\n$2"
);

fs.writeFileSync('src/App.tsx', content);
console.log('Done! Fixed comment block, duplicate import, and useState.');
