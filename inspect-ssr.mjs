/**
 * inspect-ssr.mjs — Render the App via react-dom/server + linkedom,
 * then inspect the HTML structure to find the layout offset.
 */
import { parseHTML } from 'linkedom';
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';

// Setup globals
const window = parseHTML('<!doctype html><html><head></head><body></body></html>');
const document = window.document;
global.window = window;
global.document = document;
global.HTMLElement = window.HTMLElement;
global.navigator = window.navigator;
global.location = window.location;
global.history = { pushState: () => {}, replaceState: () => {}, go: () => {} };

// Stub useEffect so hooks don't crash
const React = require('react');
const origUseEffect = React.useEffect;
React.useEffect = (...args) => { /* no-op in SSR */ };

// Import and render App
import('./src/App.tsx').then(({ default: App }) => {
  const html = renderToString(createElement(App));

  // Parse with linkedom
  const doc = parseHTML(`<!doctype html><html><body>${html}</body></html>`).document;
  const body = doc.body.innerHTML;

  console.log('\n===== SSR INSPECTION =====\n');

  // Find key elements
  const sel = (q) => Array.from(doc.querySelectorAll(q));

  const asides = sel('aside');
  const mainWrappers = sel('[class*="lg\\\\:ml-64"]');
  const wavRoots = sel('[class*="wav-root"]');
  const vcvRoots = sel('[class*="vcv-root"]');
  const headers = sel('header');
  const mains = sel('main');

  console.log('[1] Element counts:');
  console.log('  aside:', asides.length);
  console.log('  [class*="lg:ml-64"]:', mainWrappers.length);
  console.log('  [class*="wav-root"]:', wavRoots.length);
  console.log('  [class*="vcv-root"]:', vcvRoots.length);
  console.log('  header:', headers.length);
  console.log('  main:', mains.length);

  // Check #root children
  const root = doc.getElementById('root');
  if (root) {
    console.log('\n[2] #root children:');
    Array.from(root.children).forEach((c, i) => {
      const cls = c.getAttribute('class') || '';
      console.log(`  [${i}] <${c.tagName.toLowerCase()}> class="${cls.slice(0,80)}"`);
    });
  }

  // Check body children
  console.log('\n[3] Body children:');
  Array.from(doc.body.children).forEach((c, i) => {
    const cls = c.getAttribute('class') || '';
    console.log(`  [${i}] <${c.tagName.toLowerCase()}> class="${cls.slice(0,80)}"`);
  });

  // Check main wrapper children (first 20)
  if (mainWrappers.length > 0) {
    const mw = mainWrappers[0];
    const children = Array.from(mw.children);
    console.log('\n[4] Main wrapper children (' + children.length + ' total):');
    children.slice(0, 20).forEach((c, i) => {
      const cls = c.getAttribute('class') || '';
      const text = (c.textContent || '').trim().slice(0, 40);
      console.log(`  [${i}] <${c.tagName.toLowerCase()}> class="${cls.slice(0,80)}" text="${text}"`);
    });

    // Check first child
    if (children.length > 0) {
      const first = children[0];
      const firstClass = first.getAttribute('class') || '';
      console.log('\n[5] First child of main wrapper:');
      console.log(`  <${first.tagName.toLowerCase()}> class="${firstClass.slice(0,100)}"`);
      if (!firstClass.includes('wav')) {
        console.log('  *** FIRST CHILD IS NOT wav-root! This is the offset source! ***');
      } else {
        console.log('  OK: First child is wav-root.');
      }
    }
  }

  // Check for ANY element before WAVE in the DOM tree
  if (wavRoots.length > 0) {
    const wav = wavRoots[0];
    const prev = wav.previousElementSibling;
    console.log('\n[6] Previous sibling of .wav-root:');
    if (prev) {
      console.log(`  <${prev.tagName.toLowerCase()}> class="${(prev.getAttribute('class')||'').slice(0,80)}"`);
    } else {
      console.log('  null (wav-root is first child)');
    }

    // Walk up parent chain
    console.log('\n[7] Parent chain of .wav-root:');
    let p = wav.parentElement;
    let depth = 0;
    while (p && depth < 6) {
      const cls = p.getAttribute('class') || '';
      const style = p.getAttribute('style') || '';
      console.log(`  [${depth}] <${p.tagName.toLowerCase()}> class="${cls.slice(0,60)}" style="${style.slice(0,80)}"`);
      p = p.parentElement;
      depth++;
    }
  }

  // Check inline styles (padding/margin)
  console.log('\n[8] Elements with inline paddingTop > 0 or marginTop > 0:');
  const allEls = Array.from(doc.querySelectorAll('*'));
  let found = 0;
  allEls.forEach(el => {
    const st = el.style;
    const pt = parseFloat(st.paddingTop);
    const mt = parseFloat(st.marginTop);
    if (pt > 0 || mt > 0) {
      console.log(`  <${el.tagName.toLowerCase()}> class="${(el.getAttribute('class')||'').slice(0,60)}" paddingTop=${pt} marginTop=${mt}`);
      found++;
    }
  });
  if (found === 0) console.log('  None found (inline styles). Gap from CSS class rules.');

  console.log('\n[9] First 500 chars of rendered body HTML:');
  console.log(body.slice(0, 500));

  console.log('\n===== END =====\n');
}).catch(e => { console.error('Error:', e); process.exit(1); });
