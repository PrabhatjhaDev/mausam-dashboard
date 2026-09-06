import { useState, useRef, useEffect, useMemo } from 'react';
import { X, Send, Mic, Bot, Sparkles, CloudRain, Shirt, Activity, CalendarDays, Lightbulb } from 'lucide-react';
import type { ChatMessage, InterestId } from '../../types/weather';
import { ChatBubble, TypingBubble } from './VayronBubble';
import { useInterest } from '../../hooks/useInterest';
import { getInterestColor, getInterestLabel, getVayronGreeting } from '../../utils/personalization';
import { askVayron, getVayronQuickPrompts } from '../../api';
import clsx from 'clsx';

interface VayronAssistantProps { isOpen: boolean; onClose: () => void; }

export function VayronAssistant({ isOpen, onClose }: VayronAssistantProps) {
  const { selected } = useInterest();
  const color = getInterestColor(selected);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [qpLoading, setQpLoading] = useState(false);
  const [qpError, setQpError] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    setMessages([{ id: `m-${Date.now()}`, role: 'assistant', content: getVayronGreeting(selected, { temp: 31, description: 'partly cloudy', humidity: 72 }), timestamp: new Date() }]);
    setQpLoading(true); setQpError(false);
    getVayronQuickPrompts(selected as InterestId)
      .then(() => setQpLoading(false))
      .catch(() => { setQpLoading(false); setQpError(true); });
  }, [selected, isOpen]);

  useEffect(() => { if (isOpen) setTimeout(() => inputRef.current?.focus(), 150); }, [isOpen]);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isTyping]);
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const qps = useMemo(() => {
    if (qpLoading) return [];
    return [
      { icon: CloudRain, text: 'Will it rain today?', color: 'text-cyan-300 bg-cyan-500/10' },
      { icon: Shirt, text: 'What to wear?', color: 'text-violet-300 bg-violet-500/10' },
      { icon: Activity, text: 'Best time to exercise?', color: 'text-emerald-300 bg-emerald-500/10' },
      { icon: CalendarDays, text: 'Weekend weather?', color: 'text-amber-300 bg-amber-500/10' },
    ];
  }, [qpLoading, qpError]);

  const handleSend = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: 'user', content: trimmed, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput(''); setIsTyping(true);
    try {
      const res = await askVayron({ userInput: trimmed, interest: selected });
      setMessages(prev => [...prev, { id: `a-${Date.now()}`, role: 'assistant', content: res.response, timestamp: new Date() }]);
    } catch {
      setMessages(prev => [...prev, { id: `e-${Date.now()}`, role: 'assistant', content: "I'm having trouble reaching the weather service right now. Please try again.", timestamp: new Date() }]);
    } finally { setIsTyping(false); }
  };

  const handleMic = () => {
    setIsListening(true);
    setTimeout(() => { setIsListening(false); if (qps[0]) handleSend(qps[0].text); }, 1200);
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
      <div className="relative w-full sm:max-w-lg sm:max-h-[85vh] h-full sm:h-auto flex flex-col rounded-t-3xl sm:rounded-3xl glass-strong border border-white/[0.12] overflow-hidden animate-slideUp">
        <div className="relative p-4 sm:p-5 border-b border-white/[0.08] shrink-0 flex items-center justify-between" style={{ borderColor: `${color}20` }}>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">VAYRON AI</h3>
              <p className="text-[10px] text-slate-400">Weather Intelligence · {getInterestLabel(selected)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:flex text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: `${color}20`, color }}>
              {getInterestLabel(selected)}
            </span>
            <button onClick={onClose} className="p-1.5 rounded-lg glass text-slate-400 hover:text-white transition">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="px-4 pt-3 pb-0 shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-3 h-3 text-slate-500" />
            <p className="text-[10px] text-slate-500 font-medium">Quick prompts</p>
            {qpLoading && <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-pulse" />}
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-3">
            {qps.map(({ icon: Icon, text, color: cls }, i) => (
              <button key={i} onClick={() => handleSend(text)}
                className={clsx('flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[11px] font-medium border border-white/10 transition hover:scale-105 hover:border-cyan-400/40', cls)}>
                <Icon className="w-3 h-3 shrink-0" /><span className="whitespace-nowrap">{text}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0">
          {messages.map(msg => <ChatBubble key={msg.id} message={msg} />)}
          {isTyping && <TypingBubble />}
          {isListening && (
            <div className="flex items-center gap-2 p-3 rounded-2xl glass border border-rose-400/30 max-w-[80%]">
              <div className="flex gap-1 items-center">
                {[0,1,2,3].map(i => (
                  <span key={i} className="w-1 bg-rose-400 rounded-full bar-wave" style={{ height: 8 + (i*4)%12, animationDelay: `${i*0.12}s` }} />
                ))}
              </div>
              <span className="text-xs text-rose-300 font-medium">Listening…</span>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="px-4 pb-4 pt-3 border-t border-white/[0.08] shrink-0">
          <div className="flex items-center gap-2 p-2 rounded-2xl glass-strong">
            <button onClick={handleMic}
              className={clsx('shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition',
                isListening ? 'bg-rose-500/20 text-rose-300 ring-2 ring-rose-400/50' : 'text-slate-400 hover:text-white hover:bg-white/10')}
              aria-label="Voice input">
              <Mic className={clsx('w-4 h-4', isListening && 'animate-pulse')} />
            </button>
            <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend(input)}
              placeholder={`Ask about ${getInterestLabel(selected).toLowerCase()}…`}
              className="flex-1 min-w-0 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none" />
            <button onClick={() => handleSend(input)} disabled={!input.trim()}
              className={clsx('shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition',
                input.trim() ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-[0_0_16px_rgba(168,85,247,0.5)]' : 'text-slate-600')}
              aria-label="Send message">
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center justify-center gap-3 mt-2 text-[10px] text-slate-500 flex-wrap">
            <span className="flex items-center gap-1"><Sparkles className="w-2.5 h-2.5" /> VAYRON AI</span>
            <span>·</span><span>Weather Intelligence</span>
            <span>·</span><span className="flex items-center gap-1"><Lightbulb className="w-2.5 h-2.5" /> Personalized</span>
          </div>
        </div>
      </div>
    </div>
  );
}

