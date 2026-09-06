/**
 * SavedPlacesView — manage saved locations via GET/PUT /profile.
 */
import { useState, useEffect } from 'react';
import { MapPin, Home, Star, Trash2, Plus, Map } from 'lucide-react';
import { getProfile, updateProfile } from '../api/profile';
import type { UserProfile } from '../api/types';

const KNOWN: Record<string, string> = {
  'delhi-ncr': 'New Delhi, Delhi NCR', 'mumbai-in': 'Mumbai, Maharashtra',
  'bangalore-in': 'Bengaluru, Karnataka', 'kolkata-in': 'Kolkata, West Bengal',
  'chennai-in': 'Chennai, Tamil Nadu',
};

export function SavedPlacesView() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getProfile().then(p => setProfile(p)).catch(() => setMsg('Could not load saved places.')).finally(() => setLoading(false));
  }, []);

  const act = (fn: () => Promise<void>) => { setBusy(true); fn().catch(() => setMsg('Action failed.')).finally(() => setBusy(false)); };

  const setHome = (id: string) => act(async () => { const u = await updateProfile({ homeLocationId: id }); setProfile(u); });
  const addPlace = (id: string) => { if (profile && !profile.savedLocations.includes(id)) act(async () => { const u = await updateProfile({ savedLocations: [...profile.savedLocations, id] }); setProfile(u); }); };
  const removePlace = (id: string) => act(async () => { const u = await updateProfile({ savedLocations: profile!.savedLocations.filter(x => x !== id) }); setProfile(u); });

  const locs = Object.entries(KNOWN);
  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-4 space-y-4 max-w-[1400px] w-full mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center"><MapPin className="w-5 h-5 text-cyan-400" /></div>
        <div><h1 className="text-xl font-semibold text-white">Saved Places</h1><p className="text-sm text-slate-400">Manage your saved locations</p></div>
      </div>
      {msg && <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-400/30 text-sm text-rose-300">{msg}</div>}
      {loading ? (
        <div className="flex items-center justify-center py-20"><div className="w-6 h-6 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" /></div>
      ) : (
        <>
          <section className="p-5 sm:p-6 rounded-2xl glass-strong border-cyan-400/30">
            <h3 className="text-sm font-semibold text-cyan-300 uppercase tracking-widest mb-4 flex items-center gap-2"><Home className="w-4 h-4" /> Home Location</h3>
            <p className="text-white font-medium mb-3">{profile?.homeLocationId ? (KNOWN[profile.homeLocationId] ?? profile.homeLocationId) : 'Not set'}</p>
            <div className="flex flex-wrap gap-2">
              {locs.map(([id, name]) => (
                <button key={id} onClick={() => setHome(id)} disabled={busy || profile?.homeLocationId === id}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition ${profile?.homeLocationId === id ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-300' : 'bg-white/[0.04] border-white/10 text-slate-300 hover:border-cyan-400/40 hover:text-white'}`}>{name}</button>
              ))}
            </div>
          </section>
          <section className="p-5 sm:p-6 rounded-2xl glass">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2"><Star className="w-4 h-4" /> Saved Places</h3>
            {(!profile?.savedLocations || profile.savedLocations.length === 0) ? (
              <div className="text-center py-8"><MapPin className="w-10 h-10 text-slate-600 mx-auto mb-3" /><p className="text-sm text-slate-400">No saved places yet.</p></div>
            ) : (
              <div className="space-y-2">
                {profile.savedLocations.map(id => (
                  <div key={id} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center shrink-0"><Map className="w-4 h-4 text-cyan-300" /></div>
                    <div className="flex-1"><p className="text-sm font-medium text-white">{KNOWN[id] ?? id}</p></div>
                    <button onClick={() => removePlace(id)} disabled={busy} className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4 pt-4 border-t border-white/[0.06]">
              <p className="text-xs text-slate-500 mb-3 flex items-center gap-1.5"><Plus className="w-3 h-3" /> Add a place</p>
              <div className="flex flex-wrap gap-2">
                {locs.filter(([id]) => !profile?.savedLocations?.includes(id)).map(([id, name]) => (
                  <button key={id} onClick={() => addPlace(id)} disabled={busy}
                    className="text-xs px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300 hover:border-cyan-400/40 hover:text-white transition">+ {name}</button>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
