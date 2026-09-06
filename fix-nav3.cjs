const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Remove the recovery comment block (exactly as it appears)
content = content.replace(
    /\/\*\*\n \* BUFFER - DO NOT REMOVE\n \* This file was recovered\. Old content follows below TypeScript truncation limit\.\n \* @recovery-buffer-start\n \* @recovery-buffer-end\n \*\/\n/,
    ''
);

// 2. Remove the duplicate VIEW_TO_SIDEBAR_ID import
content = content.replace(
    /import \{ VIEW_TO_SIDEBAR_ID \} from '\.\/navigation';\n/,
    ''
);

// 3. Add useState after the function declaration
content = content.replace(
    /export default function App\(\) \{\n  return/,
    `export default function App() {\n  const [activeView, setActiveView] = useState<AppView>('dashboard');\n\n  return`
);

fs.writeFileSync('src/App.tsx', content);
console.log('Done! All three issues fixed.');
