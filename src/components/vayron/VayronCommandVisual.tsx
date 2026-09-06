import { useEffect, useRef } from 'react';

/**
 * VayronCommandVisual
 * --------------------
 * Premium cinematic JARVIS-style visual that fills the empty dark region
 * ABOVE VayronCoreHero in the main content column.
 *
 * Mounts ABOVE VayronCoreHero in App.tsx. Zero API calls, zero state.
 * GPU-cheap: only CSS transform/opacity animations.
 * Honors prefers-reduced-motion.
 */
export function VayronCommandVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Lightweight particle system for background depth
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const particles: Array<{
      x: number; y: number;
      vx: number; vy: number;
      size: number; opacity: number;
      color: string;
    }> = [];
    const COUNT = 60;
    const colors = ['34,211,238', '59,130,246', '99,102,241', '168,85,247'];

    const initParticles = () => {
      const w = parseInt(canvas.style.width) || 800;
      const h = parseInt(canvas.style.height) || 300;
      particles.length = 0;
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          size: Math.random() * 1.3 + 0.3,
          opacity: Math.random() * 0.5 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };
    initParticles();

    let animId = 0;
    const animate = () => {
      const w = parseInt(canvas.style.width) || 800;
      const h = parseInt(canvas.style.height) || 300;
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.opacity})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };

    const ro = new ResizeObserver(() => { resize(); initParticles(); });
    ro.observe(parent);
    animate();
    return () => {
      ro.disconnect();
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="vcv-root" aria-hidden="true">
      <canvas ref={canvasRef} className="vcv-particles" />
      <div className="vcv-glow-tint" />

      <div className="vcv-stage">

        {/* LEFT PANEL — Branding & Telemetry */}
        <div className="vcv-panel-left">
          <div className="vcv-tag">
            <span className="vcv-dot" />
            AI WEATHER COMMAND CENTER
          </div>

          <h2 className="vcv-brand">VAYRON</h2>
          <p className="vcv-subtitle">INTELLIGENCE SYSTEM</p>

          <div className="vcv-divider" />

          <div className="vcv-telemetry">
            <div className="vcv-tele-row">
              <span className="vcv-tele-label">WEATHER AI</span>
              <span className="vcv-tele-bar"><span className="vcv-tele-fill" style={{ width: '97%' }} /></span>
              <span className="vcv-tele-val">97%</span>
            </div>
            <div className="vcv-tele-row">
              <span className="vcv-tele-label">ATMOSPHERE</span>
              <span className="vcv-tele-bar"><span className="vcv-tele-fill" style={{ width: '83%' }} /></span>
              <span className="vcv-tele-val">83%</span>
            </div>
            <div className="vcv-tele-row">
              <span className="vcv-tele-label">PREDICTION</span>
              <span className="vcv-tele-bar"><span className="vcv-tele-fill" style={{ width: '91%' }} /></span>
              <span className="vcv-tele-val">91%</span>
            </div>
            <div className="vcv-tele-row">
              <span className="vcv-tele-label">SAFETY ALERT</span>
              <span className="vcv-tele-bar"><span className="vcv-tele-fill vcv-tele-amber" style={{ width: '74%' }} /></span>
              <span className="vcv-tele-val">74%</span>
            </div>
          </div>

          <div className="vcv-divider" />

          <p className="vcv-mission">
            ANALYZE &nbsp;·&nbsp; PREDICT &nbsp;·&nbsp; PERSONALIZE &nbsp;·&nbsp; PROTECT
          </p>

          <div className="vcv-data-streams">
            <span className="vcv-ds-line">SYS.READY</span>
            <span className="vcv-ds-line">W.INTEL.ONLINE</span>
            <span className="vcv-ds-line">VAYRON.CORE.ACTIVE</span>
          </div>
        </div>

        {/* CENTER — Massive Arc Reactor */}
        <div className="vcv-center">
          <div className="vcv-reactor-wrap">
            <CommandReactor />
          </div>
        </div>

        {/* RIGHT PANEL — VAYRON Guardian + Earth */}
        <div className="vcv-panel-right">
          <div className="vcv-guardian-wrap">
            <VayronGuardian />
          </div>

          <div className="vcv-earth-wrap">
            <EarthGlobe />
          </div>

          <div className="vcv-status-tags">
            <div className="vcv-stag vcv-stag-green">
              <span className="vcv-stag-dot" />
              SYSTEM NOMINAL
            </div>
            <div className="vcv-stag vcv-stag-cyan">
              <span className="vcv-stag-dot" />
              VAYRON GUARDIAN
            </div>
            <div className="vcv-stag vcv-stag-cyan">
              <span className="vcv-stag-dot" />
              EARTH SYNC ACTIVE
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* CommandReactor — 6+ concentric rings */
function CommandReactor() {
  const ticks = Array.from({ length: 48 }, (_, i) => {
    const a = (i * 7.5 * Math.PI) / 180;
    return (
      <line
        key={i}
        x1={200 + Math.cos(a) * 178}
        y1={200 + Math.sin(a) * 178}
        x2={200 + Math.cos(a) * 192}
        y2={200 + Math.sin(a) * 192}
        stroke="rgba(34,211,238,0.5)"
        strokeWidth="0.8"
      />
    );
  });

  return (
    <div className="vcv-reactor">
      {/* Ring 1 — outer dashed CW */}
      <svg className="vcv-ring vcv-r1" viewBox="0 0 400 400">
        <circle cx="200" cy="200" r="195" fill="none"
          stroke="rgba(34,211,238,0.45)" strokeWidth="0.8"
          strokeDasharray="4 8" />
      </svg>

      {/* Ring 2 — tick marks static */}
      <svg className="vcv-ring vcv-r2" viewBox="0 0 400 400">
        {ticks}
      </svg>

      {/* Ring 3 — CCW triple-dash */}
      <svg className="vcv-ring vcv-r3" viewBox="0 0 400 400">
        <circle cx="200" cy="200" r="168" fill="none"
          stroke="rgba(59,130,246,0.75)" strokeWidth="1.2"
          strokeDasharray="100 20 10 20" />
      </svg>

      {/* Ring 4 — CW dotted */}
      <svg className="vcv-ring vcv-r4" viewBox="0 0 400 400">
        <circle cx="200" cy="200" r="148" fill="none"
          stroke="rgba(34,211,238,0.8)" strokeWidth="1.4"
          strokeDasharray="2 12" />
      </svg>

      {/* Ring 5 — solid inner pulse */}
      <svg className="vcv-ring vcv-r5" viewBox="0 0 400 400">
        <circle cx="200" cy="200" r="120" fill="none"
          stroke="rgba(99,102,241,0.9)" strokeWidth="1.8" />
      </svg>

      {/* Ring 6 — radial glow */}
      <svg className="vcv-ring vcv-r6" viewBox="0 0 400 400">
        <defs>
          <radialGradient id="vcv-core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(34,211,238,0.7)" />
            <stop offset="40%" stopColor="rgba(59,130,246,0.4)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0)" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="115" fill="url(#vcv-core-glow)" />
      </svg>

      {/* Ring 7 — violet detail */}
      <svg className="vcv-ring vcv-r7" viewBox="0 0 400 400">
        <circle cx="200" cy="200" r="90" fill="none"
          stroke="rgba(168,85,247,0.5)" strokeWidth="0.8"
          strokeDasharray="30 10 5 10" />
      </svg>

      {/* Central V mark */}
      <svg className="vcv-ring vcv-r8" viewBox="0 0 400 400">
        <g stroke="rgba(224,247,255,1)" strokeWidth="6" strokeLinecap="round"
          strokeLinejoin="round" fill="none"
          style={{ filter: 'drop-shadow(0 0 8px rgba(34,211,238,0.9))' }}>
          <path d="M140 148 L200 280 L260 148" />
        </g>
      </svg>

      {/* Orbiting energy dots */}
      <span className="vcv-orbit vcv-orbit-1" style={{ '--or': '186px' } as React.CSSProperties}>
        <span className="vcv-dot-orbit" />
      </span>
      <span className="vcv-orbit vcv-orbit-2" style={{ '--or': '162px' } as React.CSSProperties}>
        <span className="vcv-dot-orbit2" />
      </span>
      <span className="vcv-orbit vcv-orbit-3" style={{ '--or': '140px' } as React.CSSProperties}>
        <span className="vcv-dot-orbit3" />
      </span>

      {/* Center energy core */}
      <div className="vcv-core-center">
        <div className="vcv-core-inner" />
      </div>
    </div>
  );
}

/* VayronGuardian — abstract JARVIS-style silhouette (SVG) */
function VayronGuardian() {
  return (
    <div className="vcv-guardian">
      <svg viewBox="0 0 140 260" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="vcv-gbody" x1="70" y1="0" x2="70" y2="260" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(34,211,238,0.15)" />
            <stop offset="50%" stopColor="rgba(59,130,246,0.08)" />
            <stop offset="100%" stopColor="rgba(99,102,241,0.05)" />
          </linearGradient>
          <linearGradient id="vcv-gline" x1="70" y1="0" x2="70" y2="260" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(34,211,238,0.9)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0.3)" />
          </linearGradient>
          <filter id="vcv-glow-filter">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <path d="M70 60 L110 90 L115 160 L105 200 L95 220 L70 235 L45 220 L35 200 L25 160 L30 90 Z"
          fill="url(#vcv-gbody)" stroke="url(#vcv-gline)" strokeWidth="1.2" filter="url(#vcv-glow-filter)" />

        <circle cx="70" cy="130" r="16" fill="rgba(34,211,238,0.1)" stroke="rgba(34,211,238,0.8)" strokeWidth="1" />
        <circle cx="70" cy="130" r="8" fill="rgba(34,211,238,0.3)" />
        <circle cx="70" cy="130" r="3" fill="rgba(34,211,238,0.9)" />

        <rect x="62" y="50" width="16" height="14" rx="2" fill="rgba(34,211,238,0.05)" stroke="rgba(34,211,238,0.6)" strokeWidth="0.8" />

        <path d="M50 48 L70 30 L90 48 L85 58 L70 50 L55 58 Z" fill="rgba(34,211,238,0.08)" stroke="rgba(34,211,238,0.8)" strokeWidth="1.2" filter="url(#vcv-glow-filter)" />

        <path d="M55 46 L70 36 L85 46 L82 50 L70 42 L58 50 Z" fill="rgba(59,130,246,0.2)" stroke="rgba(34,211,238,0.5)" strokeWidth="0.6" />

        <ellipse cx="65" cy="44" rx="3" ry="2" fill="rgba(34,211,238,0.9)" />
        <ellipse cx="75" cy="44" rx="3" ry="2" fill="rgba(34,211,238,0.9)" />

        <path d="M25 80 L50 68 L50 92 L30 100 Z" fill="rgba(34,211,238,0.06)" stroke="rgba(34,211,238,0.6)" strokeWidth="0.8" />
        <path d="M115 80 L90 68 L90 92 L110 100 Z" fill="rgba(34,211,238,0.06)" stroke="rgba(34,211,238,0.6)" strokeWidth="0.8" />

        <line x1="70" y1="70" x2="70" y2="220" stroke="rgba(34,211,238,0.3)" strokeWidth="0.6" strokeDasharray="4 6" />
        <line x1="55" y1="100" x2="55" y2="180" stroke="rgba(34,211,238,0.2)" strokeWidth="0.5" />
        <line x1="85" y1="100" x2="85" y2="180" stroke="rgba(34,211,238,0.2)" strokeWidth="0.5" />

        <rect x="50" y="195" width="40" height="12" rx="3" fill="rgba(34,211,238,0.05)" stroke="rgba(34,211,238,0.5)" strokeWidth="0.8" />
        <circle cx="70" cy="201" r="4" fill="rgba(34,211,238,0.2)" stroke="rgba(34,211,238,0.7)" strokeWidth="0.8" />

        <path d="M50 207 L45 245 L55 250 L65 230 L70 235 L75 230 L85 250 L95 245 L90 207 Z" fill="rgba(34,211,238,0.04)" stroke="rgba(34,211,238,0.4)" strokeWidth="0.8" />
      </svg>
    </div>
  );
}

/* EarthGlobe — lightweight holographic globe */
function EarthGlobe() {
  return (
    <div className="vcv-earth">
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="vcv-earth-grad" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="rgba(59,130,246,0.35)" />
            <stop offset="60%" stopColor="rgba(34,211,238,0.15)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0.05)" />
          </radialGradient>
          <radialGradient id="vcv-earth-shine" cx="35%" cy="35%" r="40%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        <circle cx="100" cy="100" r="98" fill="rgba(34,211,238,0.05)" stroke="rgba(34,211,238,0.25)" strokeWidth="0.6" strokeDasharray="4 8" />
        <circle cx="100" cy="100" r="88" fill="url(#vcv-earth-grad)" />

        <path d="M110 60 Q130 65 135 80 Q140 95 130 105 Q125 115 115 110 Q105 108 100 95 Q95 82 100 70 Z" fill="rgba(34,211,238,0.25)" stroke="rgba(34,211,238,0.5)" strokeWidth="0.5" />
        <path d="M85 55 Q95 52 100 60 Q105 65 100 72 Q95 78 88 74 Q82 70 80 62 Z" fill="rgba(34,211,238,0.2)" stroke="rgba(34,211,238,0.45)" strokeWidth="0.5" />
        <path d="M45 70 Q55 65 60 75 Q65 85 58 95 Q52 102 48 95 Q42 88 40 78 Z" fill="rgba(34,211,238,0.18)" stroke="rgba(34,211,238,0.4)" strokeWidth="0.5" />

        <ellipse cx="100" cy="100" rx="88" ry="30" fill="none" stroke="rgba(34,211,238,0.2)" strokeWidth="0.5" />
        <ellipse cx="100" cy="100" rx="88" ry="60" fill="none" stroke="rgba(34,211,238,0.15)" strokeWidth="0.5" />
        <ellipse cx="100" cy="100" rx="30" ry="88" fill="none" stroke="rgba(34,211,238,0.2)" strokeWidth="0.5" />
        <ellipse cx="100" cy="100" rx="60" ry="88" fill="none" stroke="rgba(34,211,238,0.15)" strokeWidth="0.5" />

        <circle cx="100" cy="100" r="88" fill="url(#vcv-earth-shine)" />

        <circle cx="122" cy="88" r="3" fill="rgba(255,100,100,0.9)" stroke="rgba(255,150,150,0.8)" strokeWidth="0.5" />
        <circle cx="122" cy="88" r="6" fill="none" stroke="rgba(255,100,100,0.4)" strokeWidth="0.5" strokeDasharray="2 3" />

        <ellipse cx="100" cy="100" rx="95" ry="35" fill="none" stroke="rgba(34,211,238,0.3)" strokeWidth="0.6" strokeDasharray="8 4" />
      </svg>
    </div>
  );
}