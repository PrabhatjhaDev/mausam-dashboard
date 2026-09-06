import React from 'react';
import { useEffect, useRef } from 'react';

const WeatherAtmosphereVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
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
    window.addEventListener('resize', resize);

    const draw = () => {
      const w = parseInt(canvas.style.width) || 800;
      const h = parseInt(canvas.style.height) || 300;
      ctx.clearRect(0, 0, w, h);

      // Deep night-blue sky gradient
      const skyGradient = ctx.createLinearGradient(0, 0, 0, h);
      skyGradient.addColorStop(0, '#0a0f1a');
      skyGradient.addColorStop(0.5, '#1a2040');
      skyGradient.addColorStop(1, '#0d1117');
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, w, h);

      // Horizon glow
      const horizonY = h * 0.55;
      const horizonGradient = ctx.createLinearGradient(0, horizonY, 0, h);
      horizonGradient.addColorStop(0, 'rgba(100, 180, 255, 0.15)');
      horizonGradient.addColorStop(1, 'rgba(100, 180, 255, 0.05)');
      ctx.fillStyle = horizonGradient;
      ctx.fillRect(0, horizonY, w, h - horizonY);

      // Stars (subtle, random)
      const starCount = 30;
      for (let i = 0; i < starCount; i++) {
        const sx = Math.random() * w;
        const sy = Math.random() * h;
        const size = Math.random() * 1.5 + 0.5;
        ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.random() * 0.5})`;
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Clouds (soft, drifting)
      const cloudCount = 8;
      for (let i = 0; i < cloudCount; i++) {
        const cx = Math.random() * w;
        const cy = Math.random() * (h * 0.4) + 100;
        const cw = Math.random() * 120 + 80;
        ctx.fillStyle = 'rgba(20, 30, 60, 0.08)';
        ctx.beginPath();
        ctx.arc(cx, cy, cw, 0, Math.PI * 2);
        ctx.fill();
      }

      // Wind flow lines (subtle)
      for (let i = 0; i < 6; i++) {
        const cx = Math.random() * w;
        const ly = Math.random() * h * 0.3 + 50;
        const lw = Math.random() * 2 + 1;
        ctx.strokeStyle = 'rgba(80, 120, 255, 0.06)';
        ctx.lineWidth = lw;
        ctx.beginPath();
        ctx.moveTo(cx, ly);
        ctx.lineTo(cx + (Math.random() - 0.5) * 80, ly + (Math.random() - 0.5) * 40);
        ctx.stroke();
      }

      requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(() => resize());
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    draw();

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="wav-root" aria-hidden="true">
      <div className="wav-sky" />
      <div className="wav-stars"><span /></div>
      <div className="wav-hudgrid" />
      <div className="wav-clouds" />
      <div className="wav-wind" />
      <div className="wav-isobars" />
      <div className="wav-aurora" />
      <canvas
        ref={canvasRef}
        className="wav-particles"
      />
      <div className="wav-stage">
        <div className="wav-side wav-side--left">
          <div className="wav-vayron-sigil">
            <span className="wav-vayron-label">VAYRON&nbsp;AI</span>
          </div>
        </div>
        <div className="wav-center">
          <h2 className="wav-title">Atmospheric Intelligence</h2>
          <p className="wav-subtitle">Real&#8209;time weather awareness</p>
        </div>
        <div className="wav-side wav-side--right">
          <div className="wav-tele">
            <span className="wav-tele-label">TEMP</span>
            <span className="wav-tele-bar"><span style={{ width: '68%' }} /></span>
            <span className="wav-tele-val">31&deg;C</span>
          </div>
          <div className="wav-tele">
            <span className="wav-tele-label">HUM</span>
            <span className="wav-tele-bar"><span style={{ width: '58%' }} /></span>
            <span className="wav-tele-val">58%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherAtmosphereVisual;
