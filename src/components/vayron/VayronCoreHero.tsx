import { Activity, ShieldCheck, Cpu, Radio } from 'lucide-react';

/**
 * VayronCoreHero
 * ---------------
 * Isolated, purely visual top-area component for the Mausam PS76 dashboard.
 *
 * Renders a premium "Arc Reactor" / AI Weather Intelligence Core inspired by
 * futuristic HUDs. It is intentionally decorative:
 *   - No API calls.
 *   - No state.
 *   - No interaction beyond hover-glow.
 *   - Does NOT replace the existing VayronAssistant / VayronLauncher.
 *
 * Mounts ABOVE the existing sticky <Header /> in App.tsx so the layout
 * remains: [Hero] -> [Header] -> [Dashboard content].
 *
 * Performance & a11y:
 *   - Pure CSS + inline SVG, no images, no new deps.
 *   - All animations are GPU-cheap (transform / opacity only).
 *   - Honors `prefers-reduced-motion: reduce`.
 */
export function VayronCoreHero() {
  return (
    <section
      aria-label="VAYRON AI Weather Intelligence Core"
      className="vayron-hero relative w-full min-h-[160px] sm:min-h-[180px] md:min-h-[220px] overflow-hidden border-b border-white/[0.06]"
    >
      {/* Soft ambient background — navy / cyan glow, matches index.css palette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(34,211,238,0.18), transparent 65%),' +
            'radial-gradient(ellipse 40% 60% at 20% 50%, rgba(59,130,246,0.14), transparent 60%),' +
            'radial-gradient(ellipse 40% 60% at 80% 50%, rgba(99,102,241,0.14), transparent 60%),' +
            'linear-gradient(180deg, #050a1a 0%, #070d20 50%, #050a1a 100%)',
        }}
      />

      {/* Subtle grid lines for HUD feel */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(110,158,230,0.6) 1px, transparent 1px),' +
            'linear-gradient(to bottom, rgba(110,158,230,0.6) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage:
            'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 80%)',
        }}
      />

      {/* Content container — three-column layout on desktop */}
      <div className="relative z-10 mx-auto max-w-[1400px] w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-5 md:py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 md:gap-6">
          {/* LEFT — identity */}
          <div className="hidden md:flex flex-col items-start gap-2 text-left">
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400"
                style={{ boxShadow: '0 0 10px rgba(34,211,238,0.9)' }}
                aria-hidden="true"
              />
              <span className="text-[10px] tracking-[0.3em] text-cyan-300/80 font-semibold uppercase">
                System Online
              </span>
            </div>
            <h1
              className="text-2xl lg:text-3xl font-extrabold tracking-[0.35em] text-white"
              style={{ textShadow: '0 0 18px rgba(34,211,238,0.55)' }}
            >
              VAYRON
            </h1>
            <p className="text-[11px] lg:text-xs tracking-[0.25em] text-cyan-200/70 uppercase">
              AI Weather Intelligence
            </p>
            <div className="mt-1 flex items-center gap-2 text-[10px] tracking-[0.3em] text-slate-400 uppercase">
              <span>Analyze</span>
              <span className="text-cyan-400/70">•</span>
              <span>Predict</span>
              <span className="text-cyan-400/70">•</span>
              <span>Personalize</span>
            </div>
          </div>

          {/* CENTER — Arc Reactor */}
          <div className="flex items-center justify-center">
            <ArcReactor />
          </div>

          {/* RIGHT — status panel */}
          <div className="hidden md:flex flex-col items-end gap-2 text-right">
            <div className="vayron-pill">
              <Cpu className="w-3 h-3 text-cyan-300" aria-hidden="true" />
              <span>Vayron Core</span>
            </div>
            <div className="vayron-pill">
              <Radio className="w-3 h-3 text-cyan-300" aria-hidden="true" />
              <span>Weather Intelligence</span>
            </div>
            <div className="vayron-pill">
              <ShieldCheck className="w-3 h-3 text-emerald-300" aria-hidden="true" />
              <span className="text-emerald-200/90">System Online</span>
            </div>
            <div className="vayron-pill">
              <Activity className="w-3 h-3 text-cyan-300" aria-hidden="true" />
              <span>Live Telemetry</span>
            </div>
          </div>

          {/* MOBILE-ONLY compact identity */}
          <div className="md:hidden col-span-1 flex items-center justify-between text-[10px] tracking-[0.3em] uppercase">
            <span className="text-cyan-300/80 font-semibold">VAYRON</span>
            <span className="text-slate-400">AI Weather Intelligence</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * ArcReactor
 * ----------
 * Pure-SVG concentric ring assembly. All animation is via CSS classes defined
 * in index.css (additive, scoped via `.vayron-hero` selectors).
 */
function ArcReactor() {
  // Pre-compute tick marks once (36 ticks, every 10°)
  const ticks = Array.from({ length: 36 }, (_, i) => {
    const angle = (i * 10 * Math.PI) / 180;
    const x1 = 100 + Math.cos(angle) * 88;
    const y1 = 100 + Math.sin(angle) * 88;
    const x2 = 100 + Math.cos(angle) * 94;
    const y2 = 100 + Math.sin(angle) * 94;
    return (
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="rgba(110,158,230,0.55)"
        strokeWidth="0.6"
      />
    );
  });

  return (
    <div
      className="vayron-reactor relative"
      style={{ width: 'min(220px, 42vw)', height: 'min(220px, 42vw)' }}
      aria-hidden="true"
    >
      {/* Outer dashed ring (rotates) */}
      <svg
        className="vayron-ring vayron-ring-outer absolute inset-0"
        viewBox="0 0 200 200"
      >
        <circle
          cx="100"
          cy="100"
          r="96"
          fill="none"
          stroke="rgba(34,211,238,0.55)"
          strokeWidth="0.8"
          strokeDasharray="3 6"
        />
      </svg>

      {/* Tick-mark ring (static) */}
      <svg className="vayron-ring absolute inset-0" viewBox="0 0 200 200">
        {ticks}
      </svg>

      {/* Counter-rotating mid ring */}
      <svg
        className="vayron-ring vayron-ring-mid absolute inset-0"
        viewBox="0 0 200 200"
      >
        <circle
          cx="100"
          cy="100"
          r="78"
          fill="none"
          stroke="rgba(34,211,238,0.7)"
          strokeWidth="1"
          strokeDasharray="60 14 6 14"
        />
      </svg>

      {/* Pulsing core ring */}
      <svg
        className="vayron-ring vayron-ring-core absolute inset-0"
        viewBox="0 0 200 200"
      >
        <circle
          cx="100"
          cy="100"
          r="60"
          fill="none"
          stroke="rgba(59,130,246,0.85)"
          strokeWidth="1.4"
        />
      </svg>

      {/* Inner radial halo */}
      <svg className="vayron-ring absolute inset-0" viewBox="0 0 200 200">
        <defs>
          <radialGradient id="vayron-core-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(34,211,238,0.65)" />
            <stop offset="55%" stopColor="rgba(59,130,246,0.35)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0)" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="50" fill="url(#vayron-core-grad)" />
      </svg>

      {/* Central "V" mark */}
      <svg
        className="vayron-ring vayron-mark absolute inset-0"
        viewBox="0 0 200 200"
      >
        <g
          stroke="rgba(224,247,255,0.95)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          <path d="M70 78 L100 138 L130 78" />
        </g>
      </svg>

      {/* Orbiting data dots */}
      <span
        className="vayron-orbit absolute left-1/2 top-1/2"
        style={{ '--orbit-r': '92px' } as React.CSSProperties}
      >
        <span
          className="block w-1.5 h-1.5 rounded-full bg-cyan-300"
          style={{ boxShadow: '0 0 10px rgba(34,211,238,0.95)' }}
        />
      </span>
      <span
        className="vayron-orbit vayron-orbit-rev absolute left-1/2 top-1/2"
        style={{ '--orbit-r': '74px' } as React.CSSProperties}
      >
        <span
          className="block w-1 h-1 rounded-full bg-blue-300"
          style={{ boxShadow: '0 0 8px rgba(59,130,246,0.9)' }}
        />
      </span>
    </div>
  );
}