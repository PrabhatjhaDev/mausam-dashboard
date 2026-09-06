const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');
let changed = false;

// 1. Remove the recovery comment block (lines 1-6)
// Match /** followed by lines starting with * and ending with */ on its own line
const before = content.length;
content = content.replace(
    /^\/\*\*\r?\n(?: \*[^\n]*\r?\n){5} \*\/\r?\n/,
    ''
);
if (content.length !== before) {
    console.log('Removed recovery comment block');
    changed = true;
} else {
    console.log('Recovery comment block NOT found - trying alternate pattern');
    // Try without leading ^
    content = fs.readFileSync('src/App.tsx', 'utf8');
    content = content.replace(
        /\/\*\*\r?\n(?: \*[^\n]*\r?\n){5} \*\/\r?\n/,
        ''
    );
    if (content.length !== before) {
        console.log('Removed recovery comment block (alternate)');
        changed = true;
    }
}

// 2. Remove the duplicate VIEW_TO_SIDEBAR_ID import (standalone line)
const before2 = content.length;
content = content.replace(
    /^import \{ VIEW_TO_SIDEBAR_ID \} from '\.\/navigation';\r?\n/m,
    ''
);
if (content.length !== before2) {
    console.log('Removed duplicate VIEW_TO_SIDEBAR_ID import');
    changed = true;
} else {
    console.log('Duplicate import NOT found');
}

// 3. Add useState after function declaration
const before3 = content.length;
content = content.replace(
    /export default function App\(\) \{\r?\n  return/,
    "export default function App() {\n  const [activeView, setActiveView] = useState<AppView>('dashboard');\n\n  return"
);
if (content.length !== before3) {
    console.log('Added useState declaration');
    changed = true;
} else {
    console.log('useState pattern NOT found');
}

fs.writeFileSync('src/App.tsx', content);
console.log('Done!');
