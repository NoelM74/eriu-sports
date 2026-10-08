'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const GA_ID = 'G-NEML64KY0M';
const STORAGE_KEY = 'eriu-cookie-choice';
/** Footer link dispatches this to reopen the banner. */
export const OPEN_COOKIE_SETTINGS = 'eriu:open-cookie-settings';

type Choice = 'accepted' | 'declined';

function readChoice(): Choice | null {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === 'accepted' || v === 'declined' ? v : null;
  } catch {
    return null;
  }
}

function saveChoice(choice: Choice) {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    /* private mode: the choice just won't be remembered */
  }
}

/** Loads Google Analytics. Only ever called after the visitor accepts. */
function loadAnalytics() {
  const w = window as unknown as { dataLayer: unknown[]; gtag?: (...args: unknown[]) => void; __gaLoaded?: boolean };
  if (w.__gaLoaded) return;
  w.__gaLoaded = true;
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer.push(arguments);
  };
  w.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  w.gtag('js', new Date());
  w.gtag('config', GA_ID);
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

function clearAnalyticsCookies() {
  const host = window.location.hostname;
  const domains = [host, `.${host}`, `.${host.replace(/^www\./, '')}`];
  for (const name of document.cookie.split(';').map((c) => c.split('=')[0].trim())) {
    if (name === '_ga' || name.startsWith('_ga_') || name === '_gid' || name.startsWith('_gat')) {
      for (const d of domains) document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${d}`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
  }
}

/**
 * Cookie banner. Google Analytics is not loaded at all until the visitor accepts,
 * and rejecting is as easy as accepting. The choice is kept in this browser only.
 */
export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const choice = readChoice();
    if (choice === 'accepted') loadAnalytics();
    else if (choice === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, reopen);
  }, []);

  if (!open) return null;

  const choose = (choice: Choice) => {
    saveChoice(choice);
    if (choice === 'accepted') loadAnalytics();
    else clearAnalyticsCookies();
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie settings"
      className="fixed inset-x-0 bottom-0 z-[60] bg-[#0F2131] text-white border-t border-[#1a3347] shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-center gap-4">
        <p className="text-sm text-white/80 leading-relaxed md:flex-1">
          We use Google Analytics cookies to see which pages people visit, so we can improve the shop. They stay off
          unless you accept. Nothing else on the site needs them. See our{' '}
          <Link href="/privacy-policy#cookies" className="underline hover:text-white">Privacy Policy</Link>.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            type="button"
            onClick={() => choose('declined')}
            className="flex-1 md:flex-none px-5 py-2.5 text-sm font-bold uppercase tracking-wider border border-white/40 hover:bg-white/10"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => choose('accepted')}
            className="flex-1 md:flex-none px-5 py-2.5 text-sm font-bold uppercase tracking-wider bg-white text-[#0F2131] hover:bg-white/90"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
