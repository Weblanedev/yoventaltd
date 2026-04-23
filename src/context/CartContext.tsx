'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { LineItem } from '@/types/cart';
import type { StoreProduct } from '@/lib/store-types';

const STORAGE = 'yoventa_cart_v1';

type Cart = {
  items: LineItem[];
  add: (p: StoreProduct, qty: number) => void;
  setQty: (cartKey: string, qty: number) => void;
  remove: (cartKey: string) => void;
  clear: () => void;
};

const Ctx = createContext<Cart | null>(null);

function makeKey(p: StoreProduct) {
  return p.sku;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<LineItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (raw) {
        const parsed = JSON.parse(raw) as LineItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const add = useCallback((p: StoreProduct, qty: number) => {
    setItems((prev) => {
      const key = makeKey(p);
      const i = prev.findIndex((x) => x.cartKey === key);
      if (i < 0) {
        return [...prev, { cartKey: key, product: p, quantity: Math.max(1, qty) }];
      }
      const next = [...prev];
      next[i] = {
        ...next[i],
        quantity: next[i].quantity + Math.max(1, qty),
      };
      return next;
    });
  }, []);

  const setQty = useCallback((cartKey: string, qty: number) => {
    setItems((prev) => {
      if (qty < 1) return prev.filter((x) => x.cartKey !== cartKey);
      return prev.map((x) =>
        x.cartKey === cartKey ? { ...x, quantity: qty } : x,
      );
    });
  }, []);

  const remove = useCallback((cartKey: string) => {
    setItems((prev) => prev.filter((x) => x.cartKey !== cartKey));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({ items, add, setQty, remove, clear }),
    [items, add, setQty, remove, clear],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error('useCart needs CartProvider');
  return c;
}
