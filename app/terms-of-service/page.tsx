import { Metadata } from 'next';
import Link from 'next/link';

const EMAIL = 'noel@eriusports.com';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Ériu Sports',
  description:
    'Terms for buying from Ériu Sports: our products, prices, worldwide delivery with duties paid, returns and your rights.',
  openGraph: {
    title: 'Terms & Conditions | Ériu Sports',
    description: 'Our products, prices, worldwide delivery with duties paid, returns and your rights.',
    url: '/terms-of-service',
  },
  alternates: {
    canonical: '/terms-of-service',
  },
};

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-[#0F2131] mb-4">
        {n}. {title}
      </h2>
      <div className="space-y-4 text-gray-700 leading-relaxed">{children}</div>
    </section>
  );
}

const Mail = () => (
  <a href={`mailto:${EMAIL}`} className="text-[#1C7C83] hover:underline">
    {EMAIL}
  </a>
);

export default function TermsOfServicePage() {
  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-[#0F2131] uppercase tracking-tight mb-3">Terms &amp; Conditions</h1>
          <p className="text-gray-600">Last updated: 26 September 2026</p>
        </div>

        <p className="text-gray-700 leading-relaxed">
          These terms apply when you use eriusports.com or buy from us. Please read them before you order. Nothing
          here takes away your legal rights as a consumer.
        </p>

        <Section n={1} title="About us">
          <p>
            Ériu Sports is an Irish-run online shop based at Elevation Business Park, Ennis, Co. Clare, Ireland. You
            can reach us at <Mail />.
          </p>
        </Section>

        <Section n={2} title="Our products">
          <p>
            Our shirts, jerseys and kits are fan replicas. They are not official merchandise. Ériu Sports is not
            affiliated with, sponsored by or endorsed by any football club, GAA county board, AFL club, national
            federation or kit manufacturer.
          </p>
          <p>
            Club names, crests, sponsor logos and kit-maker logos belong to their owners. We use them only to describe
            which shirt a product is.
          </p>
          <p>
            Some shirts come printed with a player&apos;s name and number. Where a print is in the style of the era rather
            than a copy of a shirt the player actually wore, the product page says so.
          </p>
          <p>
            We describe and photograph every product as accurately as we can. Small differences in shade, badge
            position or fabric texture from the photos can happen and aren&apos;t a fault. Size charts show measurements
            of the item laid flat, and a difference of 2–3 cm is normal.
          </p>
        </Section>

        <Section n={3} title="Prices and payment">
          <p>
            Prices are in euro. If you choose another currency on the site, the price shown is a guide and you are
            charged in euro. We are not registered for VAT, so no VAT is added to our prices.
          </p>
          <p>
            Payment is taken through PayPal, which also accepts debit and credit cards. We don&apos;t see or store your
            card details.
          </p>
          <p>
            If a product is listed at the wrong price by mistake, we&apos;ll contact you before sending it. You can pay the
            correct price or cancel for a full refund.
          </p>
        </Section>

        <Section n={4} title="Orders">
          <p>
            Your order is accepted when we email to confirm it. We may decline or cancel an order, for example if an
            item has sold out, and we&apos;ll refund you in full if we do.
          </p>
          <p>
            To cancel an order before it ships, email <Mail /> as soon as you can with your order reference.
          </p>
        </Section>

        <Section n={5} title="Delivery">
          <p>
            Orders ship from our warehouse in China by tracked delivery, and we email you a tracking link once your
            order is on its way. We deliver worldwide.
          </p>
          <p>
            Delivery is a flat €5 per order to any country, and free on orders of €49 or more.
          </p>
          <p>
            Orders to Ireland and the UK usually arrive 8–14 days from the day you order. Delivery times to other
            countries vary; email us before you order if you&apos;d like an estimate. Busy periods such as Christmas and
            Black Friday, or delays at the border, can add time.
          </p>
        </Section>

        <Section n={6} title="Customs, duties and taxes">
          <p>
            We send every order Delivered Duty Paid. Any import duties and taxes are paid before your parcel arrives,
            so there is nothing extra to pay on delivery. If a courier ever asks you for a customs or import charge on
            one of our parcels, don&apos;t pay it; contact us and we&apos;ll sort it out.
          </p>
        </Section>

        <Section n={7} title="Delivery problems">
          <p>
            Please check your address carefully at checkout. If a parcel can&apos;t be delivered because the address
            given was wrong or incomplete, we can reship it once the address is corrected, but you will need to pay
            the delivery again.
          </p>
          <p>
            If your parcel hasn&apos;t arrived 10 working days after the end of the estimated delivery time, email us
            with your order reference. We&apos;ll check with the carrier, and if the parcel is lost we will send a
            replacement or refund you in full.
          </p>
          <p>
            If a parcel is sent to a collection point and not collected in time, the carrier may return it. Once it is
            back with us, we&apos;ll either reship it, with you paying the delivery again, or refund the price of the
            items.
          </p>
        </Section>

        <Section n={8} title="Returns and refunds">
          <p>
            You can return any unworn item with its tags still on within 30 days of receiving it. Email <Mail /> with
            your order reference and we&apos;ll send you the return address.
          </p>
          <p>
            You pay the cost of sending a return back to us. We recommend a tracked service, as we can&apos;t refund an
            item that doesn&apos;t reach us.
          </p>
          <p>
            Once your return arrives and we&apos;ve checked it, we refund the price of the item to your original payment
            method within 14 days. If you return your whole order within 14 days of receiving it, we also refund the
            original delivery charge. If you&apos;d prefer a different size instead, tell us when you get in touch.
          </p>
          <p>
            If an item arrives faulty or isn&apos;t what you ordered, email us with a photo. We&apos;ll cover the return
            postage and send a replacement or give you a full refund.
          </p>
        </Section>

        <Section n={9} title="Your legal rights">
          <p>
            If you are a consumer in Ireland, the EU or the UK, you have a legal right to cancel an online order within
            14 days of receiving it. Our 30-day returns policy is in addition to this, and to your rights if goods are
            faulty or not as described. These terms don&apos;t affect any of those rights.
          </p>
        </Section>

        <Section n={10} title="Our website">
          <p>
            The Ériu Sports name, and the text and design of this website, belong to us. Trademarks, crests and logos
            shown in product photos belong to their owners.
          </p>
          <p>
            We try to keep the website available and accurate, but we can&apos;t promise it will always be available or
            free of errors.
          </p>
        </Section>

        <Section n={11} title="Our liability">
          <p>
            We are responsible for loss or damage you suffer that is a foreseeable result of us breaking these terms.
            We are not responsible for losses that were not foreseeable, or for business losses. Nothing in these terms
            limits our liability where it would be unlawful to do so.
          </p>
        </Section>

        <Section n={12} title="Changes to these terms">
          <p>
            We may update these terms from time to time. The terms that apply to your order are the ones shown here on
            the day you place it.
          </p>
        </Section>

        <Section n={13} title="Governing law">
          <p>
            These terms are governed by Irish law. If you live elsewhere, you keep any protections your local consumer
            law gives you.
          </p>
        </Section>

        <Section n={14} title="Contact">
          <div className="bg-gray-50 p-6">
            <p className="font-bold text-[#0F2131] mb-2">Ériu Sports</p>
            <p className="mb-1">Elevation Business Park</p>
            <p className="mb-1">Ennis</p>
            <p className="mb-1">Co. Clare, Ireland</p>
            <p className="mb-1">
              Email: <Mail />
            </p>
          </div>
          <p>
            See also our <Link href="/shipping-returns" className="text-[#1C7C83] hover:underline">Delivery &amp; Returns</Link>{' '}
            page and <Link href="/privacy-policy" className="text-[#1C7C83] hover:underline">Privacy Policy</Link>.
          </p>
        </Section>
      </div>
    </div>
  );
}
