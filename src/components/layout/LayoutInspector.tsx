/**
 * LayoutInspector — TEMPORARY DEBUG COMPONENT
 * Logs the actual DOM geometry of every key element to identify WHY
 * WeatherAtmosphereVisual starts lower than the Sidebar.
 *
 * Remove after diagnosis.
 */
import { useEffect } from 'react';

export function LayoutInspector() {
  useEffect(() => {
    // Wait a tick for layout to settle
    const t = setTimeout(() => {
      console.log('===== LAYOUT INSPECTION (t=0.5s) =====');

      // 1) Scrollable elements anywhere
      const all = document.querySelectorAll('*');
      const scrollables: Array<{ tag: string; cls: string; id: string; ch: number; sh: number; top: number; oy: string }> = [];
      all.forEach((el) => {
        const anyEl = el as HTMLElement;
        const ch = anyEl.clientHeight;
        const sh = anyEl.scrollHeight;
        const cs = window.getComputedStyle(anyEl);
        const oy = cs.overflowY;
        if (sh > ch + 1 && (oy === 'auto' || oy === 'scroll')) {
          scrollables.push({
            tag: anyEl.tagName.toLowerCase(),
            cls: anyEl.className?.toString().slice(0, 80) || '',
            id: anyEl.id || '',
            ch, sh,
            top: anyEl.scrollTop,
            oy,
          });
        }
      });
      console.log('[1] Scrollable elements (overflow-y in {auto,scroll} AND scrollHeight>clientHeight):');
      console.table(scrollables);
    }, 500);

    const t2 = setTimeout(() => {
      // 2) Geometry of key structural elements
      const sel = (q: string): HTMLElement | null => document.querySelector(q);
      const keys: Array<[string, string]> = [
        ['html', 'html'],
        ['body', 'body'],
        ['#root', '#root'],
        ['Sidebar <aside>', 'aside.hidden.lg\\:flex'],
        ['App root wrapper', '.lg\\:ml-64.min-h-screen'],
        ['WeatherAtmosphereVisual', '.wav-root'],
        ['VayronCommandVisual', '.vcv-root'],
        ['Header <header>', 'header.sticky'],
        ['Main <main>', 'main.flex-1'],
        ['Hero (WeatherHero)', 'main section:first-of-type'],
      ];
      console.log('[2] Geometry of key elements:');
      const rows: Array<{ name: string; top: number; bottom: number; height: number; width: number }> = [];
      keys.forEach(([name, q]) => {
        const el = sel(q);
        if (el) {
          const r = el.getBoundingClientRect();
          rows.push({ name, top: Math.round(r.top), bottom: Math.round(r.bottom), height: Math.round(r.height), width: Math.round(r.width) });
        } else {
          rows.push({ name, top: NaN, bottom: NaN, height: NaN, width: NaN });
        }
      });
      console.table(rows);
    }, 600);

    const t3 = setTimeout(() => {
      // 3) Computed styles of the main content wrapper + parents
      const sel = (q: string): HTMLElement | null => document.querySelector(q);
      const wrapper = sel('.lg\\:ml-64.min-h-screen');
      if (wrapper) {
        const cs = window.getComputedStyle(wrapper);
        const props = ['display','position','top','marginTop','paddingTop','height','minHeight','maxHeight','overflow','overflowY','alignItems','justifyContent','alignSelf','transform','flex','flexGrow','flexShrink','flexBasis','placeItems','placeContent'];
        const obj: Record<string, string> = {};
        props.forEach(p => { obj[p] = cs.getPropertyValue(p); });
        console.log('[3] Computed styles of main-content wrapper (.lg\\:ml-64.min-h-screen):');
        console.log(obj);

        // Walk up parents
        let p: HTMLElement | null = wrapper.parentElement;
        let depth = 0;
        while (p && depth < 5) {
          const ps = window.getComputedStyle(p);
          console.log(`[3.${depth+1}] Parent (${p.tagName.toLowerCase()}.${p.className.toString().slice(0,40)}):`, {
            display: ps.display, position: ps.position, height: ps.height, minHeight: ps.minHeight,
            flexDirection: ps.flexDirection, alignItems: ps.alignItems, justifyContent: ps.justifyContent,
            paddingTop: ps.paddingTop, marginTop: ps.marginTop, overflow: ps.overflow,
          });
          p = p.parentElement; depth++;
        }
      }
    }, 700);

    const t4 = setTimeout(() => {
      // 4) Sidebar computed styles + bounding box + scroll state
      const sel = (q: string): HTMLElement | null => document.querySelector(q);
      const sb = sel('aside.hidden.lg\\:flex');
      if (sb) {
        const r = sb.getBoundingClientRect();
        const cs = window.getComputedStyle(sb);
        console.log('[4] Sidebar geometry+styles:', {
          rectTop: Math.round(r.top), rectBottom: Math.round(r.bottom), rectHeight: Math.round(r.height), rectWidth: Math.round(r.width),
          cssPosition: cs.position, cssHeight: cs.height, cssMaxHeight: cs.maxHeight, overflow: cs.overflow, overflowY: cs.overflowY,
          cssTop: cs.top, cssBottom: cs.bottom, cssDisplay: cs.display, cssFlexDir: cs.flexDirection,
        });
        const children = Array.from(sb.children) as HTMLElement[];
        console.log('[4.1] Sidebar direct children positions:');
        children.forEach((c, i) => {
          const cr = c.getBoundingClientRect();
          console.log(`  child[${i}]: ${c.tagName.toLowerCase()}.${c.className.toString().slice(0,40)} top=${Math.round(cr.top)} height=${Math.round(cr.height)}`);
        });
        console.log('[4.2] Sidebar scroll state:', { clientHeight: sb.clientHeight, scrollHeight: sb.scrollHeight, scrollTop: sb.scrollTop });
      }
    }, 800);

    return () => { clearTimeout(t); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return null;
}
