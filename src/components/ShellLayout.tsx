import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ChatUsButton } from './ChatUsButton';
import { AIChatPanel } from './AIChatPanel';

export function ShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-cyan-600 focus:px-3 focus:py-1 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <ChatUsButton />
      <AIChatPanel />
    </div>
  );
}
