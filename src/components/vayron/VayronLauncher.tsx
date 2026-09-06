import { Sparkles } from 'lucide-react';

interface VayronLauncherProps {
  onClick: () => void;
}

export function VayronLauncher({ onClick }: VayronLauncherProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-24 lg:bottom-8 right-5 z-40 group"
      aria-label="Open VAYRON AI"
    >
      <div className="relative pulse-ring">
        <div
          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 flex items-center justify-center transition group-hover:scale-110"
          style={{ boxShadow: '0 0 28px rgba(168,85,247,0.6)' }}
        >
          <Sparkles className="w-6 h-6 text-white" />
        </div>
      </div>
      <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[9px] font-bold ring-2 ring-[#050a1a]">
        AI
      </span>
    </button>
  );
}
