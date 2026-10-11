'use client';

/** Last-resort error page, shown if the root layout itself fails. Uses inline styles because the site CSS may not have loaded. */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en-IE">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#fff', color: '#0F2131' }}>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center' }}>
          <p style={{ letterSpacing: '0.25em', textTransform: 'uppercase', fontSize: 12, fontWeight: 700, color: '#1C7C83' }}>Ériu Sports</p>
          <h1 style={{ fontSize: 32, margin: '12px 0' }}>Something went wrong</h1>
          <p style={{ maxWidth: 420, lineHeight: 1.6, color: '#4b5563' }}>
            Please try again. If it keeps happening, email noel@eriusports.com.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{ marginTop: 24, background: '#1A533E', color: '#fff', border: 0, padding: '14px 32px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
