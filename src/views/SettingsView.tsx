/**
 * SettingsView — profile settings via GET/PUT /profile.
 */
import { useState, useEffect } from 'react';
import { Settings, User } from 'lucide-react';
import { getProfile, updateProfile } from '../api/profile';
import type { UserProfile } from '../api/types';

export function SettingsView() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    getProfile().then(p => { setProfile(p); setName(p.name); }).catch(() => setMsg('Could not load settings.')).finally(() => setLoading(false));
  }, []);

  const saveName = () => {
    if (!profile || !name.trim() || name === profile.name) return;
    setSaving(true);
    updateProfile({ name: name.trim() }).then(u => { setProfile(u); setMsg('Name updated.'); }).catch(() => setMsg('Failed to update.')).finally(() => setSaving(false));
  };

  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-4 space-y-4 max-w-[1400px] w-full mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-slate-500/20 flex items-center justify-center"><Settings className="w-5 h-5 text-slate-400" /></div>
        <div><h1 className="text-xl font-semibold text-white">Settings</h1><p className="text-sm text-slate-400">Profile & preferences</p></div>
      </div>
      {msg && <div className={`p-4 rounded-xl text-sm ${msg.includes('updated') ? 'bg-emerald-500/10 border border-emerald-400/30 text-emerald-300' : 'bg-rose-500/10 border border-rose-400/30 text-rose-300'}`}>{msg}</div>}
      {loading ? (
        <div className="flex items-center justify-center py-20"><div className="w-6 h-6 rounded-full border-2 border-slate-400 border-t-transparent animate-spin" /></div>
      ) : profile ? (
        <section className="p-5 sm:p-6 rounded-2xl glass">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-widest mb-5 flex items-center gap-2"><User className="w-4 h-4" /> Profile</h3>
          <div className="flex gap-3">
            <input type="text" value={name} onChange={e => setName(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl glass text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/50" />
            <button onClick={saveName} disabled={saving || name === profile.name}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-sm font-semibold hover:opacity-90 transition disabled:opacity-40">
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"><p className="text-xs text-slate-500">User ID</p><p className="text-sm text-slate-300 font-mono">{profile.id}</p></div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"><p className="text-xs text-slate-500">Plan</p><p className="text-sm text-slate-300">Pro</p></div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
