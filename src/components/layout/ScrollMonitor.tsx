/**
 * ScrollMonitor — TEMPORARY DEBUG COMPONENT
 * Remove after confirming scroll behavior.
 * This component logs window.scrollY to the console every time it changes,
 * so you can observe whether the page is actually scrolling.
 */
import { useEffect, useRef } from 'react';

export function ScrollMonitor() {
  const lastY = useRef<number | null>(null);

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      if (lastY.current === null || y !== lastY.current) {
        console.log('[ScrollMonitor] scrollY changed:', lastY.current, '->', y);
        lastY.current = y;
      }
    };

    // Log initial position
    console.log('[ScrollMonitor] Initial scrollY:', window.scrollY);
    lastY.current = window.scrollY;

    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return null; // renders nothing
}
