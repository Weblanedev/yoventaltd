'use client';

import { useChatWidget } from '@/context/ChatWidgetContext';

export function ChatUsButton() {
  const { toggle, open } = useChatWidget();
  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed bottom-4 right-4 z-50 rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg hover:bg-emerald-700"
      aria-expanded={open}
    >
      {open ? 'Close' : 'Live chat'}
    </button>
  );
}
