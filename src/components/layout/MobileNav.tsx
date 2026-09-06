import { Home, Map, Sparkles, Bell, Activity } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

const items: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'map', label: 'Map', icon: Map },
  { id: 'insights', label: 'AI', icon: Sparkles, badge: 1 },
  { id: 'alerts', label: 'Alerts', icon: Bell, badge: 2 },
  { id: 'activity', label: 'Logs', icon: Activity },
];

interface MobileNavProps {
  active: string;
  onSelect: (id: string) => void;
}

export function MobileNav({ active, onSelect }: MobileNavProps) {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-3 pb-3 pt-2 bg-[#050a1a]/85 backdrop-blur-lg border-t border-white/[0.06]">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className="relative flex flex-col items-center gap-1 py-1.5 px-3 min-w-[60px]"
            >
              <div
                className={`relative p-2 rounded-xl transition ${
                  isActive
                    ? 'bg-gradient-to-br from-blue-500 to-cyan-400 text-white glow-blue'
                    : 'text-slate-400'
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={2} />
                {item.badge && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-medium ${isActive ? 'text-white' : 'text-slate-500'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
