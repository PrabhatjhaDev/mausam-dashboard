/**
 * inspect-ssr.tsx — SSR the actual App and inspect the DOM structure
 * to identify why WAVE top != Sidebar top.
 *
 * Run with: npx vite-node src/inspect-ssr.tsx
 */
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';
import App from './App';

// Stub the data fetch hook so SSR doesn't blow up
import { usePersonalizedHome } from './hooks/usePersonalizedHome';
(usePersonalizedHome as any) = () => ({
  data: null,
  loading: true,
  error: null,
  refresh: () => {},
});

const html = renderToString(createElement(App));

// Now parse the HTML and inspect
console.log('===== SSR RENDERED HTML =====');
console.log(html);
console.log('\n===== INSPECTION =====\n');

// Find all elements with class="aside" / "lg:ml-64" / "wav-root" / "vcv-root" / "header" / "main"
function findAll(html: string, className: string): Array<{ idx: number; tag: string; attrs: string }> {
  const results: Array<{ idx: number; tag: string; attrs: string }> = [];
  const re = new RegExp(`<(\\w+)([^>]*class="[^"]*\\b${className}\\b[^"]*"[^>]*)>`, 'g');
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    results.push({ idx: m.index, tag: m[1], attrs: m[2] });
  }
  return results;
}

console.log('[1] Sidebar aside elements:');
const asides = findAll(html, 'aside');
asides.forEach(a => console.log(`  tag=${a.tag} attrs=${a.attrs.slice(0, 200)}`));

console.log('\n[2] Main wrapper (lg:ml-64):');
const wrappers = findAll(html, 'lg:ml-64');
wrappers.forEach(w => console.log(`  tag=${w.tag} attrs=${w.attrs.slice(0, 200)}`));

console.log('\n[3] WAVE root (.wav-root):');
const wavs = findAll(html, 'wav-root');
wavs.forEach(w => console.log(`  tag=${w.tag} attrs=${w.attrs.slice(0, 200)}`));

console.log('\n[4] VCV root (.vcv-root):');
const vcvs = findAll(html, 'vcv-root');
vcvs.forEach(v => console.log(`  tag=${v.tag} attrs=${v.attrs.slice(0, 200)}`));

console.log('\n[5] Header (sticky top-0):');
const headers = findAll(html, 'sticky top-0');
headers.forEach(h => console.log(`  tag=${h.tag} attrs=${h.attrs.slice(0, 200)}`));

console.log('\n[6] The first 3000 chars of HTML to see top-level structure:');
console.log(html.slice(0, 3000));

console.log('\n===== DONE =====');
