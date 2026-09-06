import { Bot, User, Clock } from 'lucide-react';
import type { ChatMessage } from '../../types/weather';
import clsx from 'clsx';

export function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';
  return (
    <div className={clsx('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div className={clsx('max-w-[85%] flex items-start gap-2.5', isUser ? 'flex-row-reverse' : 'flex-row')}>
        <div className={clsx('w-8 h-8 rounded-xl flex items-center justify-center shrink-0', isUser ? 'bg-blue-500/20' : 'bg-gradient-to-br from-violet-500 to-fuchsia-500')}>
          {isUser ? <User className="w-3.5 h-3.5 text-blue-300" /> : <Bot className="w-3.5 h-3.5 text-white" />}
        </div>
        <div>
          <div className={clsx('px-4 py-3 rounded-2xl text-sm leading-relaxed', isUser ? 'bg-gradient-to-br from-blue-500/80 to-cyan-500/80 text-white rounded-tr-md' : 'glass-strong border border-white/[0.1] text-slate-200 rounded-tl-md')}>
            {message.content}
          </div>
          <p className="text-[10px] text-slate-500 mt-1 px-1">
            <Clock className="inline w-2.5 h-2.5 mr-0.5" />
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    </div>
  );
}

export function TypingBubble() {
  return (
    <div className="flex items-start gap-2.5">
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shrink-0">
        <Bot className="w-3.5 h-3.5 text-white" />
      </div>
      <div className="px-4 py-3 rounded-2xl rounded-tl-md glass-strong border border-white/[0.1]">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="w-2 h-2 rounded-full bg-slate-400 dot-thinking" />
          ))}
        </div>
      </div>
    </div>
  );
}
