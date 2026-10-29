"use client";

import { useState } from "react";

/** Newsletter signup. Each signup is emailed to the shop through /api/subscribe. */
export default function JoinMovement() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again in a minute.");
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again in a minute.");
      setStatus("error");
    }
  }

  return (
    <section className="bg-[#0F2131] text-white py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1C7C83] mb-3">Newsletter</p>
        <h2 className="text-4xl sm:text-5xl font-bold uppercase mb-4">New jerseys first</h2>
        <p className="text-white/70 text-base max-w-lg mx-auto mb-10">
          Hear about new jerseys and restocks before anyone else. We only email when there&apos;s something new.
        </p>

        {status === "sent" ? (
          <div role="status" className="bg-[#1A533E] text-white py-4 px-8 inline-block">
            <p className="font-bold uppercase tracking-wide text-sm">Thanks, you&apos;re on the list.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              autoComplete="email"
              className="flex-1 bg-[#1a3347] border border-[#1a3347] text-white placeholder-[#757575] px-4 py-3 text-sm focus:outline-none focus:border-[#1C7C83] transition-colors"
            />
            {/* Hidden from people; bots fill it in. */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-[#1A533E] text-white text-sm font-bold uppercase tracking-widest px-6 py-3 hover:bg-[#133d2d] transition-colors whitespace-nowrap disabled:opacity-60"
            >
              {status === "sending" ? "Signing up…" : "Sign up"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p role="alert" className="text-red-300 text-sm mt-4">
            {error}
          </p>
        )}

        <p className="text-white/50 text-xs mt-4">
          Unsubscribe any time. See our{" "}
          <a href="/privacy-policy" className="underline underline-offset-2 hover:text-white">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </section>
  );
}
