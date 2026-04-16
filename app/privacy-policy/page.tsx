import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | Ériu Sports',
    description: 'Ériu Sports Privacy Policy - How we collect, use, and protect your personal information.',
    openGraph: {
        title: 'Privacy Policy | Ériu Sports',
        description: 'Ériu Sports Privacy Policy - How we collect, use, and protect your personal information.',
        url: '/privacy-policy',
    },
    alternates: {
        canonical: '/privacy-policy',
    },
};

export default function PrivacyPolicyPage() {
    return (
        <div className="bg-white min-h-screen py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-[#0F2131] uppercase tracking-tight mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Last updated: April 15, 2026
                    </p>
                </div>

                <div className="prose prose-lg max-w-none">
                    <h2 className="text-2xl font-bold text-[#0F2131] mt-12 mb-4">Introduction</h2>
                    <p>
                        At Ériu Sports, we respect your privacy and are committed to protecting your personal data.
                        This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                        when you visit our website (eriusports.com) or make purchases from us.
                    </p>

                    <h2 className="text-2xl font-bold text-[#0F2131] mt-12 mb-4">Information We Collect</h2>
                    <p>
                        We collect information you provide directly to us, including:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                        <li>Your name, email address, and contact information</li>
                        <li>Shipping and billing addresses</li>
                        <li>Payment information (processed securely through Stripe or PayPal)</li>
                        <li>Order history and preferences</li>
                        <li>Newsletter subscription details</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-[#0F2131] mt-12 mb-4">How We Use Your Information</h2>
                    <p>
                        We use the information we collect to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                        <li>Process and fulfill your orders</li>
                        <li>Provide customer service and support</li>
                        <li>Send you order confirmations and shipping notifications</li>
                        <li>Improve our website, products, and services</li>
                        <li>Send marketing communications (with your consent)</li>
                        <li>Comply with legal obligations</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-[#0F2131] mt-12 mb-4">Information Sharing and Disclosure</h2>
                    <p>
                        We do not sell or rent your personal information to third parties. We may share your information with:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                        <li>Payment processors (Stripe, PayPal) to process transactions</li>
                        <li>Shipping providers to fulfill orders</li>
                        <li>Service providers who assist with our business operations</li>
                        <li>Legal authorities when required by law</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-[#0F2131] mt-12 mb-4">Data Security</h2>
                    <p>
                        We implement appropriate security measures to protect your personal information from unauthorized access,
                        alteration, disclosure, or destruction. Your payment information is processed securely through
                        Stripe and PayPal - we never store full credit card numbers on our servers.
                    </p>

                    <h2 className="text-2xl font-bold text-[#0F2131] mt-12 mb-4">Your Rights</h2>
                    <p>
                        You have the right to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                        <li>Access, correct, or delete your personal information</li>
                        <li>Withdraw consent for marketing communications</li>
                        <li>Request a copy of your personal data</li>
                        <li>Object to certain processing activities</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-[#0F2131] mt-12 mb-4">Contact Information</h2>
                    <p>
                        If you have questions about this Privacy Policy, please contact us at:
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
