import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SizeChart from '@/components/SizeChart';

export const metadata: Metadata = {
  title: 'Size Guide | Retro Football Shirt Sizes S–2XL',
  description:
    'Size charts in cm and inches for retro football shirts (S to 2XL, with a height and weight guide), GAA jerseys (S to XL) and AFL jerseys (S to 2XL).',
  alternates: { canonical: '/size-guide' },
  openGraph: {
    title: 'Size Guide | Ériu Sports',
    description: 'Retro football shirt size chart in cm and inches, S to 2XL, plus GAA and AFL sizing.',
    url: '/size-guide',
  },
};

const STEPS = [
  { title: 'Chest', text: 'Lay a shirt that fits you well flat. Measure straight across, just under the arms, then double it.' },
  { title: 'Waist', text: 'Measure straight across the shirt at the narrowest point, then double it.' },
  { title: 'Length', text: 'From the top of the shoulder, next to the collar, straight down to the hem.' },
  { title: 'Shoulder', text: 'Across the back, from one shoulder seam to the other.' },
];

const TIPS = [
  'No shirt to hand? Use the height and weight rows as a guide.',
  'Chest is the measurement that matters most for a football shirt.',
  'Between two sizes? Go up one for a relaxed fit.',
  '90s shirts are cut a bit boxier than modern ones. Each listing tells you the fit.',
  'Many listings also show the shirt measured flat, so you can compare with a shirt you own.',
];

export default function SizeGuidePage() {
  return (
    <div className="bg-white min-h-screen py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-[#0F2131] uppercase tracking-tight mb-3">Size Guide</h1>
          <p className="text-lg text-gray-600">Compare the chart with a shirt that fits you well, or go by your height and weight.</p>
        </header>

        <section aria-labelledby="chart" className="mb-12">
          <h2 id="chart" className="text-2xl font-bold text-[#0F2131] mb-4">Retro football shirt size chart</h2>
          <SizeChart chart="football" />
          <p className="mt-4 text-sm text-gray-600">Each shirt page shows which sizes that shirt comes in.</p>
        </section>

        <section aria-labelledby="gaa" className="mb-12">
          <h2 id="gaa" className="text-2xl font-bold text-[#0F2131] mb-4">GAA jersey size chart</h2>
          <SizeChart chart="gaa" />
          <p className="mt-4 text-sm text-gray-600">
            GAA jerseys are a player fit, so they sit close to the body. See our{' '}
            <Link href="/blog/gaa-jersey-size-guide" className="text-[#1C7C83] underline underline-offset-4">GAA size guide</Link>{' '}
            for more.
          </p>
        </section>

        <section aria-labelledby="afl" className="mb-12">
          <h2 id="afl" className="text-2xl font-bold text-[#0F2131] mb-4">AFL jersey size chart</h2>
          <SizeChart chart="afl" />
        </section>

        <section aria-labelledby="measure" className="mb-12">
          <h2 id="measure" className="text-2xl font-bold text-[#0F2131] mb-6">How to measure</h2>
          <div className="grid md:grid-cols-[260px_1fr] gap-8 items-center">
            <Image
              src="/images/size-guide/how-to-measure.webp"
              alt="Shirt diagram showing where to measure the chest and waist"
              width={260}
              height={260}
              className="mx-auto border border-gray-100"
            />
            <ol className="space-y-4">
              {STEPS.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="shrink-0 w-8 h-8 flex items-center justify-center bg-[#1A533E] text-white font-bold">{i + 1}</span>
                  <div>
                    <p className="font-bold text-[#0F2131]">{s.title}</p>
                    <p className="text-gray-700">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="tips" className="mb-12 p-6 bg-[#F8F9FA] border border-gray-200">
          <h2 id="tips" className="text-xl font-bold text-[#0F2131] mb-3">Tips for the right fit</h2>
          <ul className="space-y-2 text-gray-700">
            {TIPS.map((t) => (
              <li key={t} className="flex gap-3">
                <span className="text-[#1A533E] font-bold" aria-hidden>✓</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="help" className="pt-8 border-t border-gray-200">
          <h2 id="help" className="text-2xl font-bold text-[#0F2131] mb-3">Still not sure?</h2>
          <p className="text-gray-700 mb-5">
            Email your height and weight to{' '}
            <a href="mailto:noel@eriusports.com" className="text-[#1C7C83] font-bold hover:underline">noel@eriusports.com</a>{' '}
            with the shirt you like, and we&apos;ll tell you which size to order.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#1A533E] text-white px-8 py-4 uppercase font-bold tracking-widest hover:bg-[#133d2d] transition-colors"
          >
            Contact Us
          </Link>
        </section>
      </div>
    </div>
  );
}
