import { Search, Bell, Globe, Menu, Sparkles, MapPin } from 'lucide-react';
import type { Location } from '../../types/weather';

interface HeaderProps {
  location: Location;
  onMenuClick?: () => void;
  onVayronOpen: () => void;
  unreadAlerts?: number;
}

export function Header({ location, onMenuClick, onVayronOpen, unreadAlerts = 2 }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 px-4 sm:px-6 lg:px-8 py-4 backdrop-blur-md bg-[#050a1a]/70 border-b border-white/[0.06]">
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Mobile menu */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl glass text-white"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile location pill */}
        <div className="flex lg:hidden items-center gap-1.5 px-2.5 py-1.5 rounded-lg glass">
          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-xs text-white font-medium">{location.city}</span>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-xl">
          <div className="relative group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-cyan-400 transition" />
            <input
              type="text"
              placeholder="Search city, district, or coordinates…"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl glass text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.08] transition"
            />
            <kbd className="hidden sm:inline-block absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 px-1.5 py-0.5 rounded border border-white/10">
              ⌘ K
            </kbd>
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-2">
          <button className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl glass text-xs font-medium text-slate-200 hover:text-white hover:border-cyan-400/40 transition">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>EN</span>
          </button>

          <button className="relative p-2.5 rounded-xl glass text-slate-200 hover:text-white hover:border-cyan-400/40 transition">
            <Bell className="w-4 h-4" />
            {unreadAlerts > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-[#050a1a] animate-pulse" />
            )}
          </button>

          <button
            onClick={onVayronOpen}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:opacity-90 text-white text-xs font-semibold transition shadow-[0_0_20px_rgba(168,85,247,0.4)]"
          >
            <Sparkles className="w-4 h-4" />
            <span>VAYRON</span>
          </button>

          {/* Profile */}
          <div className="flex items-center gap-2.5 pl-2 pr-1 py-1 rounded-xl glass">
            <div className="text-right hidden md:block">
              <p className="text-xs font-semibold text-white leading-tight">Aarav S.</p>
              <p className="text-[10px] text-slate-400">Pro Plan</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
              AS
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
