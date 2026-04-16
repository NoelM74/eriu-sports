import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Frequently Asked Questions | Ériu Sports',
    description: 'Answers to common questions about ordering, shipping, returns, and our retro jerseys.',
    openGraph: {
        title: 'Frequently Asked Questions | Ériu Sports',
        description: 'Answers to common questions about ordering, shipping, and returns.',
        url: '/faq',
    },
    alternates: {
        canonical: '/faq',
    },
};

export default function FAQPage() {
    return (
        <div className="bg-white min-h-screen py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-[#0F2131] uppercase tracking-tight mb-4">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-lg text-gray-600">
                        Answers to common questions about ordering, shipping, returns, and our retro jerseys.
                    </p>
                </div>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-[#0F2131] mb-6">
                            Ordering Questions
                        </h2>

                        <div className="space-y-4">
                            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                <h3 className="text-xl font-bold text-[#0F2131] mb-3">How do I place an order?</h3>
                                <p className="text-gray-700">
                                    It's simple! Browse our collection, choose a jersey, select your size, and click 'Add to Bag'.
                                    When you're ready, go to your cart and click 'Checkout'. You'll need to enter your shipping and payment details.
                                </p>
                            </div>

                            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                <h3 className="text-xl font-bold text-[#0F2131] mb-3">How do I know my order has been placed?</h3>
                                <p className="text-gray-700">
                                    You'll get an email confirmation with your order number as soon as your order is placed.
                                    You can also check your order status in your account or by contacting us.
                                </p>
                            </div>

                            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                <h3 className="text-xl font-bold text-[#0F2131] mb-3">Can I change or cancel my order?</h3>
                                <p className="text-gray-700">
                                    We can change or cancel your order if it hasn't been shipped yet.
                                    Just contact us at <a href="mailto:borufashions@gmail.com" className="text-[#1C7C83] font-bold hover:underline">borufashions@gmail.com</a>
                                    as soon as possible with your order number.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0F2131] mb-6">
                            Shipping & Returns
                        </h2>

                        <div className="space-y-4">
                            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                <h3 className="text-xl font-bold text-[#0F2131] mb-3">How long does shipping take?</h3>
                                <p className="text-gray-700">
                                    Shipping times depend on your location:
                                    <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                                        <li>Ireland & UK: 2-3 business days</li>
                                        <li>Europe: 3-5 business days</li>
                                        <li>USA & Canada: 5-8 business days</li>
                                        <li>Rest of the world: 7-14 business days</li>
                                    </ul>
                                </p>
                            </div>

                            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                <h3 className="text-xl font-bold text-[#0F2131] mb-3">What if my order arrives damaged?</h3>
                                <p className="text-gray-700">
                                    We're sorry that happened. Please contact us at <a href="mailto:borufashions@gmail.com" className="text-[#1C7C83] font-bold hover:underline">borufashions@gmail.com</a>
                                    with photos of the damage and your order number. We'll send a replacement right away.
                                </p>
                            </div>

                            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                <h3 className="text-xl font-bold text-[#0F2131] mb-3">Can I return a jersey after 30 days?</h3>
                                <p className="text-gray-700">
                                    We can only accept returns within 30 days of your order date.
                                    After that, we're not able to process returns or exchanges.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0F2131] mb-6">
                            Product Questions
                        </h2>

                        <div className="space-y-4">
                            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                <h3 className="text-xl font-bold text-[#0F2131] mb-3">Are your jerseys authentic?</h3>
                                <p className="text-gray-700">
                                    Yes! We carefully research and source authentic retro jerseys. Each jersey is verified by our
                                    historical research team before it goes on sale. We only sell high-quality, authentic pieces.
                                </p>
                            </div>

                            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                <h3 className="text-xl font-bold text-[#0F2131] mb-3">Do you offer custom jerseys?</h3>
                                <p className="text-gray-700">
                                    We don't offer custom jersey design, but we do have a wide range of authentic retro jerseys
                                    from different eras and clubs. If you're looking for something specific, just contact us and we'll do
                                    our best to help.
                                </p>
                            </div>

                            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                <h3 className="text-xl font-bold text-[#0F2131] mb-3">How do I care for my jersey?</h3>
                                <p className="text-gray-700">
                                    To keep your jersey looking great:
                                    <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                                        <li>Machine wash cold on gentle cycle</li>
                                        <li>Wash with similar colours</li>
                                        <li>Do not use fabric softener</li>
                                        <li>Hang to dry - do not tumble dry</li>
                                        <li>Do not iron the badge or sponsor logos</li>
                                    </ul>
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mt-12 pt-8 border-t border-gray-200">
                        <h2 className="text-2xl font-bold text-[#0F2131] mb-6">
                            Still Have Questions?
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Our friendly team is here to help. You can contact us at <a href="mailto:borufashions@gmail.com" className="text-[#1C7C83] font-bold hover:underline">borufashions@gmail.com</a>
                            or use our contact form.
                        </p>
                        <a
                            href="/contact"
                            className="inline-block bg-[#1A533E] text-white px-8 py-4 uppercase font-bold tracking-widest hover:bg-[#133d2d] transition-colors"
                        >
                            Contact Us
                        </a>
                    </section>
                </div>
            </div>
        </div>
    );
}
