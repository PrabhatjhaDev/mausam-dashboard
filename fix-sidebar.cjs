const fs = require('fs');
const path = 'src/components/layout/Sidebar.tsx';
let c = fs.readFileSync(path, 'utf8');
const oldStr = 'hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0';
const newStr = 'hidden lg:flex flex-col w-64 shrink-0 h-screen fixed top-0 left-0 z-30';
if (c.includes(oldStr)) {
  c = c.replace(oldStr, newStr);
  fs.writeFileSync(path, c);
  console.log('SUCCESS: Sidebar changed from sticky to fixed');
} else {
  console.log('ERROR: Target string not found in Sidebar.tsx');
  console.log('Current aside className:', c.match(/<aside className="[^"]+"/)?.[0]);
}
