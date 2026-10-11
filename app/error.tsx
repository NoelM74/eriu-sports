'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(`[page-error] ${error.digest ?? ''} ${error.message}`);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 bg-white text-center">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-teal)] mb-3">Something went wrong</p>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-navy)] uppercase tracking-tight mb-4">
        We couldn&apos;t load this page
      </h1>
      <p className="text-gray-600 max-w-md mb-8 text-lg">
        It&apos;s our end, not yours. Try again, or head back to the shop. If it keeps happening, email{' '}
        <a href="mailto:noel@eriusports.com" className="text-[var(--color-teal)] underline">noel@eriusports.com</a>.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="button"
          onClick={reset}
          className="bg-[var(--color-emerald)] text-white px-8 py-4 uppercase font-bold tracking-widest hover:bg-[var(--color-emerald-dark)] transition-colors"
        >
          Try again
        </button>
        <Link
          href="/catalog"
          className="bg-[var(--color-navy)] text-white px-8 py-4 uppercase font-bold tracking-widest hover:bg-[var(--color-teal)] transition-colors text-center"
        >
          Shop all shirts
        </Link>
      </div>
    </div>
  );
}
