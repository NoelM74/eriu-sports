import { Metadata } from 'next';
import { OG_IMAGES } from '@/lib/seo';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
    title: 'Contact Us | Ériu Sports',
    description: 'Get in touch with our friendly team. We\'re here to help with any questions about our retro jerseys.',
    openGraph: {
        title: 'Contact Us | Ériu Sports',
        description: 'Get in touch with our friendly team. We\'re here to help.',
        url: '/contact',
    images: OG_IMAGES,
    },
    alternates: {
        canonical: '/contact',
    },
};

export default function ContactPage() {
    return (
        <div className="bg-white min-h-screen py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-[#0F2131] uppercase tracking-tight mb-4">
                        Contact Us
                    </h1>
                    <p className="text-lg text-gray-600">
                        Our friendly team is here to help with any questions about our retro jerseys.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <section>
                        <h2 className="text-2xl font-bold text-[#0F2131] mb-6">
                            Get in Touch
                        </h2>

                        <div className="space-y-6">
                            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                <h3 className="text-xl font-bold text-[#0F2131] mb-3">Email</h3>
                                <p className="text-gray-700">
                                    We reply as soon as we can. You can reach us at:
                                </p>
                                <a href="mailto:noel@eriusports.com" className="text-[#1C7C83] font-bold hover:underline text-lg mt-3 block">
                                    noel@eriusports.com
                                </a>
                            </div>

                            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                <h3 className="text-xl font-bold text-[#0F2131] mb-3">Hours</h3>
                                <p className="text-gray-700">
                                    We&apos;re open Monday to Saturday:
                                </p>
                                <ul className="mt-3 space-y-1 text-gray-700">
                                    <li>9:00 AM - 3:00 PM (Irish time)</li>
                                </ul>
                            </div>

                            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                <h3 className="text-xl font-bold text-[#0F2131] mb-3">Our Team</h3>
                                <p className="text-gray-700">
                                    We&apos;re an Irish-run shop based in Ennis, Co. Clare.
                                    Looking for a particular shirt? Just ask and we will see if we can find it.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0F2131] mb-6">
                            Send Us a Message
                        </h2>

                        <ContactForm />

                        <div className="mt-6 text-sm text-gray-500">
                            <p>
                                By sending this message, you agree that we may contact you by email
                                to answer your question. We won&apos;t share your information with anyone else.
                            </p>
                        </div>
                    </section>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-200">
                    <h2 className="text-2xl font-bold text-[#0F2131] mb-6 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="flex justify-center">
                        <a
                            href="/faq"
                            className="inline-block bg-[#1A533E] text-white px-8 py-4 uppercase font-bold tracking-widest hover:bg-[#133d2d] transition-colors"
                        >
                            View All Questions
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
