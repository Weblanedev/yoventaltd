import type { HTMLAttributes } from 'react';

const sizeClass = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
} as const;

type Props = {
  size?: keyof typeof sizeClass;
  className?: string;
  /** When a parent (e.g. button) already has the accessible name, hide the spinner from AT. */
  decorative?: boolean;
} & Omit<HTMLAttributes<HTMLSpanElement>, 'size'>;

export function LoadingSpinner({
  size = 'md',
  className = '',
  decorative = false,
  'aria-label': ariaLabel = 'Loading',
  ...rest
}: Props) {
  const content = (
    <svg
      className="h-full w-full animate-spin [color:inherit]"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden
    >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path
          className="opacity-80"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
    </svg>
  );

  if (decorative) {
    return (
      <span
        aria-hidden
        className={[
          'inline-flex shrink-0 items-center justify-center text-emerald-600',
          sizeClass[size],
          className,
        ].join(' ')}
        {...rest}
      >
        {content}
      </span>
    );
  }

  return (
    <span
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
      className={[
        'inline-flex shrink-0 items-center justify-center text-emerald-600',
        sizeClass[size],
        className,
      ].join(' ')}
      {...rest}
    >
      {content}
    </span>
  );
}
