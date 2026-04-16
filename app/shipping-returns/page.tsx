import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Shipping & Returns | Ériu Sports',
    description: 'We ship to all countries and offer easy returns. Free shipping on orders over €49.',
    openGraph: {
        title: 'Shipping & Returns | Ériu Sports',
        description: 'We ship to all countries and offer easy returns.',
        url: '/shipping-returns',
    },
    alternates: {
        canonical: '/shipping-returns',
    },
};

export default function ShippingReturnsPage() {
    return (
        <div className="bg-white min-h-screen py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-[#0F2131] uppercase tracking-tight mb-4">
                        Shipping & Returns
                    </h1>
                    <p className="text-lg text-gray-600">
                        We want you to love your Ériu Sports jersey. That's why we make shipping and returns easy.
                    </p>
                </div>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold text-[#0F2131] mb-6">
                            How We Ship Your Order
                        </h2>

                        <div className="space-y-6">
                            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                <h3 className="text-xl font-bold text-[#0F2131] mb-3">Free Shipping</h3>
                                <p className="text-gray-700">
                                    We offer free shipping on all orders over €49. That's our way of saying thanks for shopping with us.
                                </p>
                            </div>

                            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                <h3 className="text-xl font-bold text-[#0F2131] mb-3">Shipping Times</h3>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-[#1A533E] mr-3 mt-1">✓</span>
                                        <span><strong>Ireland & UK:</strong> 2-3 business days</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-[#1A533E] mr-3 mt-1">✓</span>
                                        <span><strong>Europe:</strong> 3-5 business days</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-[#1A533E] mr-3 mt-1">✓</span>
                                        <span><strong>USA & Canada:</strong> 5-8 business days</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-[#1A533E] mr-3 mt-1">✓</span>
                                        <span><strong>Rest of the world:</strong> 7-14 business days</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                <h3 className="text-xl font-bold text-[#0F2131] mb-3">Shipping Costs</h3>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-[#1A533E] mr-3 mt-1">✓</span>
                                        <span>All orders over €49: <strong>FREE</strong></span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-[#1A533E] mr-3 mt-1">✓</span>
                                        <span>Ireland & UK: €4.95</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-[#1A533E] mr-3 mt-1">✓</span>
                                        <span>Europe: €7.95</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-[#1A533E] mr-3 mt-1">✓</span>
                                        <span>USA & Canada: €12.95</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0F2131] mb-6">
                            Returns & Exchanges
                        </h2>

                        <div className="space-y-6">
                            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                <h3 className="text-xl font-bold text-[#0F2131] mb-3">30-Day Returns</h3>
                                <p className="text-gray-700">
                                    If you're not happy with your jersey, you can return it within 30 days for a full refund.
                                    Just make sure it's unworn and in its original packaging with all tags still attached.
                                </p>
                            </div>

                            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                <h3 className="text-xl font-bold text-[#0F2131] mb-3">How to Return</h3>
                                <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                                    <li>Fill out the returns form that came with your order</li>
                                    <li>Pack the jersey securely in its original packaging</li>
                                    <li>Send it back to us using the address on the returns form</li>
                                    <li>Once we receive and check your return, we'll process your refund</li>
                                </ol>
                            </div>

                            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                <h3 className="text-xl font-bold text-[#0F2131] mb-3">Exchanges</h3>
                                <p className="text-gray-700">
                                    We can exchange your jersey for a different size or style. Just let us know what you'd like
                                    instead when you contact us about your return.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mt-12 pt-8 border-t border-gray-200">
                        <h2 className="text-2xl font-bold text-[#0F2131] mb-6">
                            Need Help With Shipping or Returns?
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
