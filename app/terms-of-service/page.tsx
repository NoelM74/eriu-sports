import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service | Ériu Sports',
    description: 'Ériu Sports Terms of Service - Our policies for purchases, shipping, returns, and website use.',
    openGraph: {
        title: 'Terms of Service | Ériu Sports',
        description: 'Ériu Sports Terms of Service - Our policies for purchases, shipping, returns, and website use.',
        url: '/terms-of-service',
    },
    alternates: {
        canonical: '/terms-of-service',
    },
};

export default function TermsOfServicePage() {
    return (
        <div className="bg-white min-h-screen py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-[#0F2131] uppercase tracking-tight mb-4">
                        Terms of Service
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Last updated: April 15, 2026
                    </p>
                </div>

                <div className="prose prose-lg max-w-none">
                    <h2 className="text-2xl font-bold text-[#0F2131] mt-12 mb-4">1. Introduction</h2>
                    <p>
                        These Terms of Service govern your access to and use of Ériu Sports (eriusports.com).
                        By accessing or using our website, you agree to comply with these Terms.
                    </p>

                    <h2 className="text-2xl font-bold text-[#0F2131] mt-12 mb-4">2. Purchasing</h2>
                    <p>
                        All orders placed on our website are subject to acceptance by Ériu Sports.
                        We reserve the right to refuse or cancel any order for any reason.
                        You will be notified if your order is cancelled and any payments will be refunded.
                    </p>

                    <h2 className="text-2xl font-bold text-[#0F2131] mt-12 mb-4">3. Shipping & Delivery</h2>
                    <p>
                        <strong>Standard Shipping:</strong> 10-15 business days for international orders.
                        Orders are processed within 2-3 business days of payment confirmation.
                    </p>
                    <p>
                        <strong>Tracking:</strong> All orders include tracking numbers that are emailed to you
                        once your order ships. You can track your order on our website or through the carrier.
                    </p>
                    <p>
                        <strong>Shipping Costs:</strong> Free shipping on orders over €49.
                        Standard shipping is €4.95 for orders under €49.
                    </p>

                    <h2 className="text-2xl font-bold text-[#0F2131] mt-12 mb-4">4. Returns & Exchanges</h2>
                    <p>
                        We accept returns on items in unused condition within 30 days of receipt.
                        Returned items must be in original packaging with all tags and labels intact.
                    </p>
                    <p>
                        To initiate a return, please email <a href="mailto:noel@eriusports.com" className="text-[#1C7C83] hover:underline">noel@eriusports.com</a>
                        with your order number and reason for return. We will provide return instructions
                        and a return shipping label.
                    </p>
                    <p>
                        Once we receive and inspect your return, we will process your refund
                        within 5-7 business days. Refunds are processed to the original payment method.
                    </p>

                    <h2 className="text-2xl font-bold text-[#0F2131] mt-12 mb-4">5. Products & Services</h2>
                    <p>
                        All products are subject to availability. We reserve the right to limit quantities,
                        discontinue items, or correct pricing errors. Product images are for illustration purposes only.
                    </p>

                    <h2 className="text-2xl font-bold text-[#0F2131] mt-12 mb-4">6. Intellectual Property</h2>
                    <p>
                        All content on Ériu Sports, including text, graphics, logos, and images,
                        is the property of Ériu Sports and is protected by copyright laws.
                    </p>

                    <h2 className="text-2xl font-bold text-[#0F2131] mt-12 mb-4">7. Limitation of Liability</h2>
                    <p>
                        Ériu Sports is not liable for any indirect, incidental, or consequential damages
                        arising from your use of our website or products.
                    </p>

                    <h2 className="text-2xl font-bold text-[#0F2131] mt-12 mb-4">8. Governing Law</h2>
                    <p>
                        These Terms are governed by and construed in accordance with the laws of Ireland.
                    </p>

                    <h2 className="text-2xl font-bold text-[#0F2131] mt-12 mb-4">9. Contact Information</h2>
                    <p>
                        If you have questions about these Terms, please contact us at:
                    </p>
                    <div className="mt-4 bg-gray-50 p-6 rounded-lg">
                        <p className="font-bold text-[#0F2131] mb-2">Ériu Sports</p>
                        <p className="mb-1">Elevation Business Park</p>
                        <p className="mb-1">Ennis</p>
                        <p className="mb-1">Co. Clare</p>
                        <p className="mb-1">Email: <a href="mailto:noel@eriusports.com" className="text-[#1C7C83] hover:underline">noel@eriusports.com</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
