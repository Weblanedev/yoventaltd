import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

/**
 * Full-area circle loader only (no visible text). Screen readers get a generic status.
 */
export function PageLoader({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex min-h-[40vh] w-full flex-col items-center justify-center px-4 py-16 ${className}`}
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Loading</span>
      <LoadingSpinner size="lg" decorative />
    </div>
  );
}
