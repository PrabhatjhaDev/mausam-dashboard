/**
 * inspect.cjs — Minimal layout inspector.
 * Checks CSS rules and source structure to find the offset cause.
 */
const fs = require('fs');

const css = fs.readFileSync('src/index.css', 'utf8');
const app = fs.readFileSync('src/App.tsx', 'utf8');

console.log('===== LAYOUT INSPECTOR =====\n');

// 1) Main wrapper className
const mw = app.match(/<div\s+className="([^"]*lg:ml-64[^"]*)"/);
console.log('[1] Main wrapper className:', mw ? mw[1] : 'NOT FOUND');

// 2) Tailwind classes breakdown
const cls = mw ? mw[1] : '';
const checks = ['flex','flex-col','flex-1','min-h-screen','items-start','items-center','items-end','justify-center','justify-start','justify-end'];
checks.forEach(c => console.log('   ', c, ':', cls.includes(c) ? 'YES' : 'NO'));

// 3) Any padding-top in the main flex div's CSS rules
const mainDivStyle = css.match(/\.lg\\\\:ml-64[\s\S]*?\{[\s\S]*?\}/);
if (mainDivStyle) console.log('\n[2] .lg\\:ml-64 CSS:', mainDivStyle[0].replace(/\s+/g,' ').slice(0,200));
else console.log('\n[2] .lg\\:ml-64 CSS: NOT FOUND (Tailwind generates it at runtime)');

// 4) Body/html margin/padding
const bodyRule = css.match(/body\s*\{([^}]+)\}/);
const htmlRule = css.match(/html\s*\{([^}]+)\}/);
console.log('\n[3] html CSS:', htmlRule ? htmlRule[1].replace(/\s+/g,' ').trim() : 'NOT FOUND');
console.log('[4] body CSS:', bodyRule ? bodyRule[1].replace(/\s+/g,' ').trim() : 'NOT FOUND');

// 5) Sidebar position
const asideRule = css.match(/aside\.hidden\.lg\\\\:flex[\s\S]*?\{[\s\S]*?\}/);
console.log('\n[5] Sidebar aside CSS:', asideRule ? asideRule[0].replace(/\s+/g,' ').slice(0,200) : 'NOT FOUND');

// 6) WAVE top CSS
const wavRule = css.match(/\.wav-root\s*\{([^}]+)\}/);
console.log('\n[6] .wav-root CSS:', wavRule ? wavRule[1].replace(/\s+/g,' ').trim() : 'NOT FOUND');

// 7) WAVE stage CSS
const wavStageRule = css.match(/\.wav-stage\s*\{([^}]+)\}/);
console.log('\n[7] .wav-stage CSS:', wavStageRule ? wavStageRule[1].replace(/\s+/g,' ').trim() : 'NOT FOUND');

// 8) VCV root CSS
const vcvRule = css.match(/\.vcv-root\s*\{([^}]+)\}/);
console.log('\n[8] .vcv-root CSS:', vcvRule ? vcvRule[1].replace(/\s+/g,' ').trim() : 'NOT FOUND');

// 9) App component order
console.log('\n[9] Component render order in Dashboard return:');
const dashStart = app.indexOf('function Dashboard()');
const dashEnd = app.indexOf('export default function App()');
const dash = app.slice(dashStart, dashEnd);
['<Sidebar', '<MobileNav', 'lg:ml-64', 'WeatherAtmosphereVisual', 'VayronCommandVisual', '<Header', '<main', 'VayronLauncher', 'VayronAssistant'].forEach(el => {
  const idx = dash.indexOf(el);
  console.log('  ', el.padEnd(30), idx >= 0 ? `FOUND at pos ${idx}` : 'NOT FOUND');
});

// 10) THE KEY: Check if there's any margin-top or padding-top in any CSS rule
console.log('\n[10] CSS rules with margin-top or padding-top:');
const lines = css.split('\n');
lines.forEach((line, i) => {
  if (line.includes('margin-top') || line.includes('padding-top')) {
    console.log(`  Line ${i+1}: ${line.trim()}`);
  }
});

console.log('\n===== DONE =====');
