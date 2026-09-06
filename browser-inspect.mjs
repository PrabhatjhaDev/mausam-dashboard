/**
 * browser-inspect.mjs — Headless browser DOM inspection via Playwright
 * Run: node browser-inspect.mjs
 */
import { chromium } from '@playwright/test';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });

console.log('Navigating...');
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 15000 });
await page.waitForTimeout(3000);

console.log('\n===== INSPECTION =====\n');

// 1) Window scroll
const scrollInfo = await page.evaluate(() => ({
  windowScrollY: window.scrollY,
  docScrollTop: document.documentElement.scrollTop,
}));
console.log('[1] Scroll:', scrollInfo);

// 2) Scrollable elements
const scrollables = await page.evaluate(() => {
  const results = [];
  document.querySelectorAll('*').forEach(el => {
    const anyEl = el;
    const ch = anyEl.clientHeight;
    const sh = anyEl.scrollHeight;
    const cs = window.getComputedStyle(anyEl);
    if (sh > ch + 2 && (cs.overflowY === 'auto' || cs.overflowY === 'scroll')) {
      results.push({ tag: anyEl.tagName.toLowerCase(), cls: (anyEl.className||'').toString().slice(0,50), ch, sh, st: anyEl.scrollTop });
    }
  });
  return results;
});
console.log('[2] Scrollable elements:');
scrollables.length ? scrollables.forEach(s => console.log(`  <${s.tag}> cls="${s.cls}" ch=${s.ch} sh=${s.sh} st=${s.st}`)) : console.log('  NONE');

// 3) Body children
const bodyChildren = await page.evaluate(() => {
  return Array.from(document.body.children).map((c, i) => {
    const r = (c).getBoundingClientRect();
    return { i, tag: c.tagName.toLowerCase(), cls: (c.className||'').toString().slice(0,40), top: Math.round(r.top), h: Math.round(r.height) };
  });
});
console.log('\n[3] Body children (body scrollHeight:', await page.evaluate(() => document.body.scrollHeight), '):');
bodyChildren.forEach(c => console.log(`  [${c.i}] <${c.tag}> cls="${c.cls}" top=${c.top} h=${c.h}`));

// 4) Key element geometry
const geo = await page.evaluate(() => {
  const g = (q, n) => { const el = document.querySelector(q); if(!el) return {name:n,found:false}; const r=el.getBoundingClientRect(); return {name:n,found:true,top:Math.round(r.top),h:Math.round(r.height)}; };
  return [g('html','html'), g('body','body'), g('#root','#root'), g('aside','sidebar'), g('[class*="lg:ml-64"]','mainWrapper'), g('.wav-root','wav'), g('.vcv-root','vcv'), g('header','header'), g('main','main')];
});
console.log('\n[4] Key geometries:');
geo.forEach(g => { if(g.found) console.log(`  ${g.name}: top=${g.top} h=${g.h}`); else console.log(`  ${g.name}: NOT FOUND`); });

// 5) Computed styles of main wrapper
const mwStyles = await page.evaluate(() => {
  const el = document.querySelector('[class*="lg:ml-64"]');
  if(!el) return null;
  const cs = window.getComputedStyle(el);
  return { display:cs.display, position:cs.position, marginTop:cs.marginTop, paddingTop:cs.paddingTop, minHeight:cs.minHeight, alignItems:cs.alignItems, justifyContent:cs.justifyContent, flexDirection:cs.flexDirection, overflowY:cs.overflowY, height:cs.height, top:cs.top };
});
console.log('\n[5] Main wrapper styles:', mwStyles);

// 6) Main wrapper children
const mwChildren = await page.evaluate(() => {
  const el = document.querySelector('[class*="lg:ml-64"]');
  if(!el) return [];
  return Array.from(el.children).map((c,i) => { const r=(c).getBoundingClientRect(); return {i, tag:c.tagName.toLowerCase(), cls:(c.className||'').toString().slice(0,50), top:Math.round(r.top), h:Math.round(r.height)}; });
});
console.log('\n[6] Main wrapper children:');
mwChildren.forEach(c => console.log(`  [${c.i}] <${c.tag}> cls="${c.cls}" top=${c.top} h=${c.h}`));

// 7) Focused element
const focused = await page.evaluate(() => {
  const el = document.activeElement;
  if(!el) return null;
  const r = (el).getBoundingClientRect();
  return { tag: el.tagName.toLowerCase(), cls: (el.className||'').toString().slice(0,40), top: Math.round(r.top), h: Math.round(r.height) };
});
console.log('\n[7] Active element:', focused);

// 8) First body child - critical
const firstBody = await page.evaluate(() => {
  const el = document.body.firstElementChild;
  if(!el) return null;
  const r = el.getBoundingClientRect();
  return { tag: el.tagName.toLowerCase(), cls: (el.className||'').toString().slice(0,40), top: Math.round(r.top), h: Math.round(r.height) };
});
console.log('\n[8] First body element:', firstBody);
if(firstBody && firstBody.top > 0) {
  console.log(`  *** ISSUE: First body element at top=${firstBody.top}, NOT at top:0! ***`);
}

// 9) Check #root
const rootEl = await page.evaluate(() => {
  const el = document.getElementById('root');
  if(!el) return null;
  const r = el.getBoundingClientRect();
  return { top: Math.round(r.top), h: Math.round(r.height), sh: el.scrollHeight, st: el.scrollTop, overflowY: window.getComputedStyle(el).overflowY };
});
console.log('\n[9] #root:', rootEl);
if(rootEl && rootEl.top > 0) {
  console.log(`  *** #root is at top=${rootEl.top}, NOT top:0! ***`);
}
if(rootEl && rootEl.st > 0) {
  console.log(`  *** #root scrollTop=${rootEl.st}, NOT 0! ***`);
}
if(rootEl && (rootEl.overflowY === 'auto' || rootEl.overflowY === 'scroll')) {
  console.log(`  *** #root has overflow-y:${rootEl.overflowY} — THIS IS THE SCROLL CONTAINER! ***`);
}

await browser.close();
console.log('\n===== END =====');
