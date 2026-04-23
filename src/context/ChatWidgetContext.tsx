'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

type Ctx = { open: boolean; setOpen: (v: boolean) => void; toggle: () => void };
const C = createContext<Ctx | null>(null);

export function ChatWidgetProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((o) => !o), []);
  const value = useMemo(
    () => ({ open, setOpen, toggle }),
    [open, toggle],
  );
  return <C.Provider value={value}>{children}</C.Provider>;
}

export function useChatWidget() {
  const c = useContext(C);
  if (!c) throw new Error('useChatWidget needs ChatWidgetProvider');
  return c;
}
