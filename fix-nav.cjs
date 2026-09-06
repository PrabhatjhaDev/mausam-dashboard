const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Remove the recovery comment block
content = content.replace(
    /\/\*\*\r?\n(?: \*[^\n]*\r?\n){5} \*\/(\r?\n)/,
    '$1'
);

// 2. Add navigation imports at the top
content = content.replace(
    /import \{ InterestProvider \} from '\.\/hooks\/useInterest';/,
    `import { useState } from 'react';\nimport type { AppView } from './navigation';\nimport { SIDEBAR_ID_TO_VIEW, VIEW_TO_SIDEBAR_ID } from './navigation';\nimport { InterestProvider } from './hooks/useInterest';`
);

// 3. Add useState in the App function
content = content.replace(
    /export default function App\(\) \{\n  return \(\n/,
    `export default function App() {\n  const [activeView, setActiveView] = useState<AppView>('dashboard');

  return (\n`
);

// 4. Verify imports are correct - ensure we have SIDEBAR_ID_TO_VIEW
// (already added in step 2)

fs.writeFileSync('src/App.tsx', content);
console.log('Done! Navigation imports and state added.');
