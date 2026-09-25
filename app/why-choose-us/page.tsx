import { Metadata } from 'next';
import Link from 'next/link';
import { products, getClubs } from '@/lib/products';

const EMAIL = 'noel@eriusports.com';

export const metadata: Metadata = {
  title: 'Why Choose Us | Retro Shirts from €25',
  description:
    'Low prices and high quality. Retro football shirts from €25, €5 delivery worldwide and free over €49, 30-day returns and bulk pricing for teams and resellers.',
  alternates: { canonical: '/why-choose-us' },
  openGraph: {
    title: 'Why Choose Ériu Sports?',
    description: 'Retro shirts from €25, worldwide delivery free over €49, easy returns and bulk discounts.',
    url: '/why-choose-us',
  },
};

const clubCount = getClubs().length;

const REASONS: { title: string; lead: string; body: React.ReactNode }[] = [
  {
    title: 'Low prices, top quality',
    lead: 'Top-quality shirts at prices that are hard to beat.',
    body: (
      <>
        Retro shirts start at €25, or €35 with a player name and number. We cut out the middleman to bring you classic
        designs at a fraction of the usual cost.
      </>
    ),
  },
  {
    title: 'Free delivery over €49',
    lead: 'No hidden fees. What you see is what you pay.',
    body: (
      <>
        We deliver worldwide, tracked, for a flat €5, or free when you spend €49 or more. Orders to Ireland and the UK arrive in 8–14 days.{' '}
        <Link href="/shipping-returns" className="text-[#1C7C83] font-semibold hover:underline">Delivery details</Link>
      </>
    ),
  },
  {
    title: 'Easy returns and exchanges',
    lead: 'Your satisfaction is our priority.',
    body: (
      <>
        Not happy? Return any unworn item with the tags on within 30 days for a full refund, or swap it for another
        size.{' '}
        <Link href="/shipping-returns" className="text-[#1C7C83] font-semibold hover:underline">How returns work</Link>
      </>
    ),
  },
  {
    title: 'Wholesale discounts',
    lead: 'The more you buy, the more you save.',
    body: (
      <>
        Bulk pricing and deals for team, club and group orders, and for resellers. Email{' '}
        <a href={`mailto:${EMAIL}?subject=Bulk%20order`} className="text-[#1C7C83] font-semibold hover:underline">{EMAIL}</a>{' '}
        with what you need and we will send you a price.
      </>
    ),
  },
  {
    title: 'A wide selection',
    lead: 'A huge range of teams and styles, so you will find what you are looking for.',
    body: (
      <>
        {products.length} shirts from {clubCount} clubs, countries and counties: retro football shirts from Arsenal,
        Liverpool, Manchester United, Barcelona, Real Madrid, Juventus and more, plus GAA county jerseys, training vests
        and AFL jerseys.{' '}
        <Link href="/clubs" className="text-[#1C7C83] font-semibold hover:underline">Shop by club</Link>
      </>
    ),
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Why Choose Ériu Sports?',
  url: 'https://eriusports.com/why-choose-us',
  description: metadata.description,
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://eriusports.com/' },
      { '@type': 'ListItem', position: 2, name: 'Why Choose Us', item: 'https://eriusports.com/why-choose-us' },
    ],
  },
};

export default function WhyChooseUsPage() {
  return (
    <div className="bg-white min-h-screen py-12 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-[#0F2131] uppercase tracking-tight mb-4">Why Choose Ériu Sports?</h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-3">
            At Ériu Sports, we pride ourselves on offering the perfect mix of low prices and high quality.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Whether you are a die-hard fan looking for your team&apos;s shirt or a reseller stocking up, we have what you
            need, at prices that are hard to beat.
          </p>
        </div>

        <ol className="space-y-4 mb-12">
          {REASONS.map((r, i) => (
            <li key={r.title} className="p-6 bg-gray-50 border border-gray-200 flex gap-4">
              <span className="shrink-0 w-9 h-9 flex items-center justify-center bg-[#1A533E] text-white font-bold" aria-hidden>
                {i + 1}
              </span>
              <div>
                <h2 className="text-lg font-bold text-[#0F2131] mb-1">{r.title}</h2>
                <p className="font-semibold text-[#0F2131] mb-2">{r.lead}</p>
                <p className="text-gray-700 leading-relaxed">{r.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <section className="pt-8 border-t border-gray-200">
          <p className="text-xl font-bold text-[#0F2131] mb-2">
            Join 5,000+ satisfied customers who trust Ériu Sports for quality, value and service.
          </p>
          <p className="text-gray-700 mb-6">Shop smarter and support your team in style.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/catalog" className="inline-block text-center bg-[#1A533E] text-white px-8 py-4 uppercase font-bold tracking-widest hover:bg-[#133d2d] transition-colors">
              Shop all shirts
            </Link>
            <Link href="/clubs" className="inline-block text-center border-2 border-[#0F2131] text-[#0F2131] px-8 py-4 uppercase font-bold tracking-widest hover:bg-[#0F2131] hover:text-white transition-colors">
              Shop by club
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
