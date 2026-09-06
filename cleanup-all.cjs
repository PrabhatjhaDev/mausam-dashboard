const fs = require('fs');
const path = 'src/App.tsx';
let c = fs.readFileSync(path, 'utf8');

// Remove LayoutInspector import
c = c.replace(/import \{ LayoutInspector \} from '\.\/components\/layout\/LayoutInspector';\n/, '');
c = c.replace(/import \{ LayoutInspector \} from '\.\/components\/layout\/LayoutInspector';/, '');

// Remove LayoutInspector usage  
c = c.replace(/\n      <LayoutInspector \/>/, '');

fs.writeFileSync(path, c);
console.log('App.tsx cleanup done. Remaining debug refs:', ['ScrollMonitor','LayoutInspector'].filter(k=>c.includes(k)));

// Delete debug files
const toDelete = [
  'src/components/layout/ScrollMonitor.tsx',
  'src/components/layout/LayoutInspector.tsx',
  'src/__tests__/layout.test.tsx',
  'src/__tests__/layout-inspect.test.tsx',
  'src/inspect-ssr.tsx',
  'inspect-ssr.mjs',
  'browser-inspect.mjs',
  'fix-sidebar.cjs',
  'fix-vcv.cjs',
  'fix-vcv2.cjs',
  'fix-vcv3.cjs',
  'find-rule.cjs',
  'cleanup-app.cjs',
  'cleanup-all.cjs',
  'inspect.cjs',
];

let deleted = 0;
for (const f of toDelete) {
  try {
    fs.unlinkSync(f);
    console.log('Deleted:', f);
    deleted++;
  } catch (e) {
    // File may not exist - that's fine
  }
}
console.log(`\nDeleted ${deleted} debug/temp files.`);
