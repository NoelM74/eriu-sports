import { Metadata } from 'next';
import Link from 'next/link';

const EMAIL = 'noel@eriusports.com';

export const metadata: Metadata = {
  title: 'FAQ | Delivery, Sizing & Returns',
  description:
    'How long delivery takes to Ireland and the UK (8–14 days), what it costs, how our retro football shirts and GAA jerseys fit, and how returns work.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'FAQ | Ériu Sports',
    description: 'Delivery to Ireland and the UK in 8–14 days, sizing and 30-day returns.',
    url: '/faq',
  },
};

const FAQS: { section: string; items: { q: string; a: string }[] }[] = [
  {
    section: 'Delivery',
    items: [
      {
        q: 'How long does delivery take?',
        a: 'Delivery takes 8–14 days from the day you order. Every parcel is tracked.',
      },
      {
        q: 'Do you deliver to the UK?',
        a: 'Yes. We deliver to Ireland and the UK, both in 8–14 days from the day you order.',
      },
      {
        q: 'How much is delivery?',
        a: 'Delivery is €4.95. It is free on orders over €49.',
      },
    ],
  },
  {
    section: 'Sizing',
    items: [
      {
        q: 'How do the retro football shirts fit?',
        a: 'They have a classic 90s cut, a little boxier than a modern shirt. Most people take their usual size. Each product page shows measurements for a sample size.',
      },
      {
        q: 'How do the GAA jerseys and vests fit?',
        a: 'GAA jerseys and training vests are a player fit, so they are snug through the body. If you prefer a looser fit, go up a size.',
      },
      {
        q: 'What sizes do you stock?',
        a: 'Most shirts and jerseys come in S, M, L and XL. Check the size guide if you are between sizes.',
      },
    ],
  },
  {
    section: 'Orders',
    items: [
      {
        q: 'How do I know my order went through?',
        a: 'You will see your order reference on screen as soon as you pay, and PayPal emails you a receipt.',
      },
      {
        q: 'Can I change or cancel my order?',
        a: `Yes, if it has not been sent yet. Email ${EMAIL} with your order reference as soon as possible.`,
      },
      {
        q: 'Are the shirts new?',
        a: 'Yes. Every shirt is brand new in the classic design from its era. Nothing is second-hand or match-worn.',
      },
      {
        q: 'Do you make custom jerseys?',
        a: 'No, we do not print names or make custom kits. If you are looking for a particular shirt, get in touch and we will see if we can find it.',
      },
    ],
  },
  {
    section: 'Returns',
    items: [
      {
        q: 'Can I return a shirt?',
        a: 'Yes. You can return unworn items with the tags on within 30 days of receiving it for a full refund.',
      },
      {
        q: 'What if my order arrives damaged?',
        a: `Email ${EMAIL} with a photo of the damage and your order reference, and we will sort out a replacement.`,
      },
      {
        q: 'How do I wash my shirt?',
        a: 'Wash cold on a gentle cycle with similar colours, skip the fabric softener, hang it to dry and never iron over the crest or sponsor.',
      },
    ],
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.flatMap((s) =>
    s.items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    }))
  ),
};

export default function FAQPage() {
  return (
    <div className="bg-white min-h-screen py-12 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-[#0F2131] uppercase tracking-tight mb-3">FAQ</h1>
          <p className="text-lg text-gray-600">Delivery, sizing, orders and returns.</p>
        </div>

        <div className="space-y-10">
          {FAQS.map((s) => (
            <section key={s.section}>
              <h2 className="text-xl font-bold text-[#0F2131] uppercase tracking-wide mb-4">{s.section}</h2>
              <div className="divide-y divide-gray-200 border-y border-gray-200">
                {s.items.map((f) => (
                  <details key={f.q} className="group py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#0F2131]">
                      {f.q}
                      <span className="text-[#1C7C83] text-xl leading-none transition-transform group-open:rotate-45" aria-hidden>+</span>
                    </summary>
                    <p className="mt-3 text-gray-700 leading-relaxed">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-bold text-[#0F2131] mb-3">Still have a question?</h2>
          <p className="text-gray-700 mb-5">
            Email <a href={`mailto:${EMAIL}`} className="text-[#1C7C83] font-semibold hover:underline">{EMAIL}</a> and we will get back to you.
          </p>
          <Link href="/contact" className="inline-block bg-[#1A533E] text-white px-8 py-4 uppercase font-bold tracking-widest hover:bg-[#133d2d] transition-colors">
            Contact us
          </Link>
        </section>
      </div>
    </div>
  );
}
