"use client";

import { useState } from "react";

export default function JoinMovement() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  return (
    <section className="bg-[#0F2131] text-white py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1C7C83] mb-3">
          Community
        </p>
        <h2 className="text-4xl sm:text-5xl font-bold uppercase mb-4">
          Join the Movement
        </h2>
        <p className="text-[#757575] text-base max-w-lg mx-auto mb-10">
          Get early access to new drops, exclusive club deals, and performance
          content straight to your inbox.
        </p>

        {submitted ? (
          <div className="bg-[#1A533E] text-white py-4 px-8 inline-block">
            <p className="font-bold uppercase tracking-wide text-sm">
              ✓ You&apos;re in — welcome to the movement!
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 bg-[#1a3347] border border-[#1a3347] text-white placeholder-[#757575] px-4 py-3 text-sm focus:outline-none focus:border-[#1C7C83] transition-colors"
            />
            <button
              type="submit"
              className="bg-[#1A533E] text-white text-sm font-bold uppercase tracking-widest px-6 py-3 hover:bg-[#133d2d] transition-colors whitespace-nowrap"
            >
              Join Now
            </button>
          </form>
        )}

        <p className="text-[#404040] text-xs mt-4">
          No spam. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
