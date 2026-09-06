const fs = require('fs');
const path = 'src/App.tsx';
let c = fs.readFileSync(path, 'utf8');

// Remove LayoutInspector import
c = c.replace(/import \{ LayoutInspector \} from '\.\/components\/layout\/LayoutInspector';\n/, '');
c = c.replace(/import \{ LayoutInspector \} from '\.\/components\/layout\/LayoutInspector';/, '');

// Remove LayoutInspector usage
c = c.replace(/\n      <LayoutInspector \/>/, '');

fs.writeFileSync(path, c);
console.log('Done. Checking for remaining debug code...');
const remaining = ['ScrollMonitor', 'LayoutInspector'].filter(k => c.includes(k));
console.log('Remaining debug refs:', remaining.length ? remaining : 'NONE');
