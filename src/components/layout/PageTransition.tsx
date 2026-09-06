import { useEffect, useRef, type ReactNode } from 'react';
import type { AppView } from '../../navigation';

interface PageTransitionProps {
  isAnimating: boolean;
  activeView: AppView;
  pendingView: AppView | null;
  children: (view: AppView) => ReactNode;
  onTransitionEnd: () => void;
}

export function PageTransition({
  isAnimating,
  activeView,
  pendingView,
  children,
  onTransitionEnd,
}: PageTransitionProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReduced = useRef(
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (!isAnimating) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    if (prefersReduced.current) {
      onTransitionEnd();
      return;
    }

    const DURATION = 620;
    timerRef.current = setTimeout(() => {
      onTransitionEnd();
    }, DURATION);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isAnimating, onTransitionEnd]);

  const currentView = pendingView ?? activeView;

  return (
    <div
      className={`page-transition-root${isAnimating ? ' transitioning' : ''}`}
    >
      {/* Transition overlay — full-screen, fixed, above sidebar (z-35) */}
      <div
        className={`page-transition-overlay${isAnimating ? ' pt-overlay-active' : ''}`}
        aria-hidden="true"
      >
        <div className="pt-sweep-line" />
        <div className="pt-radial" />
        <canvas className="pt-canvas" id="ptCanvas" />
        <div className="pt-hud-ring pt-hud-ring--outer" />
        <div className="pt-hud-ring pt-hud-ring--inner" />
        <div className="pt-hud-cross" />
        <div className="pt-edge pt-edge--top" />
        <div className="pt-edge pt-edge--bottom" />
      </div>

      {/* Content layer — fades/scales during transition */}
      <div
        className={`page-transition-content${isAnimating ? ' pt-content-exit' : ' pt-content-enter'}`}
      >
        {children(currentView)}
      </div>
    </div>
  );
}

