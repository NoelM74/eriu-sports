import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | Ériu Sports',
    description: 'Get in touch with our friendly team. We\'re here to help with any questions about our retro jerseys.',
    openGraph: {
        title: 'Contact Us | Ériu Sports',
        description: 'Get in touch with our friendly team. We\'re here to help.',
        url: '/contact',
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
                                    We reply to all emails within 24 hours. You can reach us at:
                                </p>
                                <a href="mailto:borufashions@gmail.com" className="text-[#1C7C83] font-bold hover:underline text-lg mt-3 block">
                                    borufashions@gmail.com
                                </a>
                            </div>

                            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                <h3 className="text-xl font-bold text-[#0F2131] mb-3">Hours</h3>
                                <p className="text-gray-700">
                                    We're available to help you Monday to Friday:
                                </p>
                                <ul className="mt-3 space-y-1 text-gray-700">
                                    <li>9:00 AM - 5:30 PM (Ireland Time)</li>
                                    <li>9:00 AM - 5:30 PM (UK Time)</li>
                                    <li>4:00 AM - 12:30 PM (USA Eastern Time)</li>
                                </ul>
                            </div>

                            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                <h3 className="text-xl font-bold text-[#0F2131] mb-3">Our Team</h3>
                                <p className="text-gray-700">
                                    We're a small team of jersey lovers based in Cork and Dublin.
                                    Every jersey we sell has been carefully researched and verified.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0F2131] mb-6">
                            Send Us a Message
                        </h2>

                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Your name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A533E] focus:border-[#1A533E]"
                                    placeholder="John Smith"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A533E] focus:border-[#1A533E]"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A533E] focus:border-[#1A533E]"
                                    placeholder="About my order #12345"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Your message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A533E] focus:border-[#1A533E]"
                                    placeholder="Tell us about your question or order..."
                                ></textarea>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-[#1A533E] text-white px-8 py-4 uppercase font-bold tracking-widest hover:bg-[#133d2d] transition-colors"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>

                        <div className="mt-6 text-sm text-gray-500">
                            <p>
                                By sending this message, you agree that we may contact you by email
                                to answer your question. We won't share your information with anyone else.
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
