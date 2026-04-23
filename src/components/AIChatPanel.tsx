'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useChatWidget } from '@/context/ChatWidgetContext';
import { ApiError, api } from '@/lib/api-client';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import ReactMarkdown from 'react-markdown';

type Msg = { role: 'user' | 'assistant'; content: string };

export function AIChatPanel() {
  const { user } = useAuth();
  const { open, setOpen } = useChatWidget();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Msg[]>([]);
  const [sending, setSending] = useState(false);
  const [unavailable, setUnavailable] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const send = useCallback(async () => {
    if (!user || !input.trim() || sending) return;
    const text = input.trim();
    setInput('');
    setUnavailable(null);
    setMessages((m) => [...m, { role: 'user', content: text }]);
    setSending(true);
    const convo: Msg[] = [
      ...messages,
      { role: 'user', content: text },
    ];
    try {
      const r = await api<{ reply: string }>('/api/ai/chat', {
        method: 'POST',
        body: JSON.stringify({ messages: convo }),
      });
      setMessages((m) => [...m, { role: 'assistant', content: r.reply }]);
    } catch (e) {
      if (e instanceof ApiError) {
        if (e.status === 503) {
          setUnavailable(
            (e as ApiError & { message?: string }).message ||
              'Chat is not configured. Add OPENAI_API_KEY in Netlify environment variables.',
          );
        } else {
          setUnavailable(e.message || 'Could not get a reply.');
        }
        setInput(text);
        setMessages((m) => m.slice(0, -1));
        return;
      }
      setInput(text);
      setMessages((m) => m.slice(0, -1));
    } finally {
      setSending(false);
    }
  }, [user, input, sending, messages]);

  if (!open) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50 w-[min(100vw-2rem,24rem)] rounded-xl border border-slate-200 bg-white p-3 shadow-2xl">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-900">Product assistant</p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-sm text-slate-500 hover:text-slate-800"
        >
          Close
        </button>
      </div>
      {!user && (
        <p className="text-sm text-slate-600">Log in to use the assistant.</p>
      )}
      {user && (
        <>
          {unavailable && (
            <p className="mb-2 rounded-md bg-amber-50 p-2 text-xs text-amber-900">
              {unavailable}
            </p>
          )}
          <div className="mb-2 max-h-60 space-y-2 overflow-y-auto text-sm">
            {messages.length === 0 && (
              <p className="text-slate-500">Ask about laptops, accessories, or order help.</p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={[
                  'rounded-md px-2 py-1.5',
                  m.role === 'user'
                    ? 'ml-4 bg-slate-100 text-slate-900'
                    : 'mr-4 border border-slate-100 text-slate-800',
                ].join(' ')}
              >
                {m.role === 'assistant' ? (
                  <div className="prose prose-sm max-w-none prose-p:my-0">
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                ) : (
                  m.content
                )}
              </div>
            ))}
            {sending && (
              <div
                className="mr-4 flex items-center justify-center rounded-md border border-slate-100 px-3 py-2"
                role="status"
                aria-label="Loading"
              >
                <LoadingSpinner size="sm" decorative className="!text-emerald-600" />
              </div>
            )}
            <div ref={endRef} />
          </div>
          <div className="flex gap-2">
            <input
              className="flex-1 rounded-md border border-slate-300 px-2 py-1.5 text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  void send();
                }
              }}
              placeholder="Type a message…"
              disabled={sending}
            />
            <button
              type="button"
              onClick={() => void send()}
              disabled={sending || !input.trim()}
              aria-busy={sending}
              aria-label={sending ? 'Sending' : 'Send'}
              className="inline-flex min-h-8 min-w-14 items-center justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm text-white disabled:opacity-40"
            >
              {sending ? (
                <LoadingSpinner size="sm" decorative className="!text-white" />
              ) : (
                'Send'
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
