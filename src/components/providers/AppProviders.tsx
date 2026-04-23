'use client';

import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { ChatWidgetProvider } from '@/context/ChatWidgetContext';
import { HotToaster } from '@/components/HotToaster';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <ChatWidgetProvider>
          {children}
          <HotToaster />
        </ChatWidgetProvider>
      </CartProvider>
    </AuthProvider>
  );
}
