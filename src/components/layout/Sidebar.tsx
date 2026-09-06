import { Home, Map, BarChart3, Bell, Settings, Sparkles, Cloud, Activity, Bookmark } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
}

const primaryNav: NavItem[] = [
  { id: 'home', label: 'Dashboard', icon: Home },
  { id: 'map', label: 'Weather Map', icon: Map, badge: 'Live' },
  { id: 'insights', label: 'AI Insights', icon: Sparkles, badge: 'New' },
  { id: 'alerts', label: 'Alerts', icon: Bell, badge: '2' },
  { id: 'activity', label: 'Activity Log', icon: Activity },
  { id: 'saved', label: 'Saved Places', icon: Bookmark },
];

const secondaryNav: NavItem[] = [
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  active: string;
  onSelect: (id: string) => void;
  onVayronOpen: () => void;
}

export function Sidebar({ active, onSelect, onVayronOpen }: SidebarProps) {
  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 h-screen fixed top-0 left-0 z-30 px-5 py-6 border-r border-white/[0.06] bg-black/15 backdrop-blur-md">
      {/* Logo */}
      <div className="flex items-center gap-3 px-2 mb-9">
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center glow-blue">
            <Cloud className="w-5 h-5 text-white" strokeWidth={2.2} />
          </div>
          <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-cyan-400 ring-2 ring-[#050a1a] animate-pulse" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-wide text-white text-glow">MAUSAM</h1>
          <p className="text-[10px] text-cyan-300/80 tracking-widest uppercase">Smarter Weather</p>
        </div>
      </div>

      {/* Location pill */}
      <button className="flex items-center justify-between gap-2 w-full px-3 py-2.5 mb-7 rounded-xl glass hover:border-cyan-400/40 transition group">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <div className="text-left min-w-0">
            <p className="text-sm text-white font-medium truncate">New Delhi</p>
            <p className="text-[11px] text-slate-400 truncate">Delhi NCR, IN</p>
          </div>
        </div>
        <span className="text-cyan-400 group-hover:translate-x-0.5 transition text-xs">›</span>
      </button>

      {/* Primary nav */}
      <nav className="flex-1 flex flex-col gap-1.5">
        <p className="text-[10px] uppercase tracking-widest text-slate-500 px-3 mb-2">Main Menu</p>
        {primaryNav.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                isActive
                  ? 'nav-active'
                  : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <Icon className="w-[18px] h-[18px] shrink-0" strokeWidth={2} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${
                    item.badge === 'New'
                      ? 'bg-cyan-400/20 text-cyan-300'
                      : item.badge === 'Live'
                      ? 'bg-rose-500/20 text-rose-300'
                      : 'bg-amber-400/20 text-amber-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}
              {isActive && (
                <span className="absolute -right-5 top-1/2 -translate-y-1/2 w-1 h-6 rounded-l-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.7)]" />
              )}
            </button>
          );
        })}

        <div className="my-5 divider-glow" />

        <p className="text-[10px] uppercase tracking-widest text-slate-500 px-3 mb-2">Preferences</p>
        {secondaryNav.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                isActive
                  ? 'nav-active'
                  : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <Icon className="w-[18px] h-[18px] shrink-0" strokeWidth={2} />
              <span className="flex-1 text-left">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* VAYRON promo card */}
      <div className="mt-5 p-4 rounded-2xl glass-strong border-cyan-400/20">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-white">VAYRON AI</span>
        </div>
        <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
          Ask anything about weather — outfit, commute, plans, alerts.
        </p>
        <button
          onClick={onVayronOpen}
          className="w-full text-[11px] font-semibold py-1.5 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:opacity-90 transition text-white"
        >
          Try Now →
        </button>
      </div>
    </aside>
  );
}
