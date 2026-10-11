'use client';

import { useState } from 'react';

const INPUT =
  'w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A533E] focus:border-[#1A533E]';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please email noel@eriusports.com instead.');
      form.reset();
      setStatus('sent');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please email noel@eriusports.com instead.');
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="p-6 bg-gray-50 border border-gray-200">
        <p className="font-bold text-[#0F2131] mb-1">Thanks, your message is on its way.</p>
        <p className="text-gray-700">We&apos;ll reply by email as soon as we can.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Your name</label>
        <input type="text" id="name" name="name" required maxLength={100} autoComplete="name" className={INPUT} placeholder="John Smith" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
        <input type="email" id="email" name="email" required maxLength={200} autoComplete="email" className={INPUT} placeholder="john@example.com" />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
        <input type="text" id="subject" name="subject" maxLength={120} className={INPUT} placeholder="About my order" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your message</label>
        <textarea id="message" name="message" rows={5} required maxLength={4000} className={INPUT} placeholder="Tell us about your question or order" />
      </div>
      {/* Hidden from people; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this empty</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      {status === 'error' && (
        <p role="alert" className="text-sm text-red-600">{error}</p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-[#1A533E] text-white px-8 py-4 uppercase font-bold tracking-widest hover:bg-[#133d2d] transition-colors disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
