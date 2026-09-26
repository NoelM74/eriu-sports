import { Metadata } from 'next';
import Link from 'next/link';

const EMAIL = 'noel@eriusports.com';

export const metadata: Metadata = {
  title: 'Delivery & Returns | Worldwide, Free Over €49',
  description:
    'We deliver worldwide for a flat €5, free on orders over €49. Tracked, and 8–14 days to Ireland and the UK. 30-day returns on unworn items.',
  alternates: { canonical: '/shipping-returns' },
  openGraph: {
    title: 'Delivery & Returns | Ériu Sports',
    description: 'Worldwide delivery for €5, free over €49. 8–14 days to Ireland and the UK. 30-day returns.',
    url: '/shipping-returns',
  },
};

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-6 bg-gray-50 border border-gray-200">
      <h3 className="text-lg font-bold text-[#0F2131] mb-2">{title}</h3>
      <div className="text-gray-700 leading-relaxed">{children}</div>
    </div>
  );
}

export default function ShippingReturnsPage() {
  return (
    <div className="bg-white min-h-screen py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-[#0F2131] uppercase tracking-tight mb-3">Delivery &amp; Returns</h1>
          <p className="text-lg text-gray-600">One flat delivery price worldwide, and easy returns.</p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#0F2131] mb-5">Delivery</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card title="€5, or free over €49">
              Delivery is a flat €5 per order, wherever you are. Spend €49 or more and it is free.
            </Card>
            <Card title="Worldwide">
              We deliver to any country, for the same price.
            </Card>
            <Card title="How long it takes">
              Orders to Ireland and the UK arrive 8–14 days from the day you order. Delivery times to other countries vary.
              Email us before you order and we&apos;ll give you an idea for your country.
            </Card>
            <Card title="Tracking">
              Orders ship from our warehouse in China. You get a tracking link once your order is on its way, so you can
              follow it to your door.
            </Card>
            <Card title="No customs charges">
              Every order is sent duties paid, so there are no import charges or taxes to pay when it arrives.
            </Card>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#0F2131] mb-5">Returns</h2>
          <div className="space-y-4">
            <Card title="30-day returns">
              Not happy? Return any unworn item with the tags still on within 30 days of receiving it for a refund. You pay the return postage, unless the item is faulty or not what you ordered.
            </Card>
            <Card title="How to return">
              <ol className="list-decimal pl-5 space-y-1">
                <li>
                  Email <a href={`mailto:${EMAIL}`} className="text-[#1C7C83] font-semibold hover:underline">{EMAIL}</a> with your order reference.
                </li>
                <li>We will send you the return address.</li>
                <li>Pack the shirt securely and send it back, ideally by a tracked service.</li>
                <li>Once it arrives and is checked, we refund you to your original payment method.</li>
              </ol>
            </Card>
            <Card title="Wrong size?">
              We can swap it for a different size. Just say which size you need when you get in touch.
            </Card>
          </div>
        </section>

        <section className="pt-8 border-t border-gray-200">
          <h2 className="text-xl font-bold text-[#0F2131] mb-3">Questions about your order?</h2>
          <p className="text-gray-700 mb-5">
            Email <a href={`mailto:${EMAIL}`} className="text-[#1C7C83] font-semibold hover:underline">{EMAIL}</a>, or see the{' '}
            <Link href="/faq" className="text-[#1C7C83] font-semibold hover:underline">FAQ</Link>.
          </p>
          <Link href="/contact" className="inline-block bg-[#1A533E] text-white px-8 py-4 uppercase font-bold tracking-widest hover:bg-[#133d2d] transition-colors">
            Contact us
          </Link>
        </section>
      </div>
    </div>
  );
}
