import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Size Guide | Ériu Sports',
    description: 'Find your perfect fit with our easy-to-use size guide for jerseys and sportswear.',
    openGraph: {
        title: 'Size Guide | Ériu Sports',
        description: 'Find your perfect fit with our easy-to-use size guide.',
        url: '/size-guide',
    },
    alternates: {
        canonical: '/size-guide',
    },
};

export default function SizeGuidePage() {
    return (
        <div className="bg-white min-h-screen py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-[#0F2131] uppercase tracking-tight mb-4">
                        Size Guide
                    </h1>
                    <p className="text-lg text-gray-600">
                        Finding the right size is easy with our simple guide. Just measure yourself and compare to our chart.
                    </p>
                </div>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold text-[#0F2131] mb-6">
                            How to Measure Yourself
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                <h3 className="text-xl font-bold text-[#0F2131] mb-3">Chest Measurement</h3>
                                <p className="text-gray-700 mb-4">
                                    Wrap a tape measure around the fullest part of your chest, keeping the tape level and snug.
                                </p>
                                <div className="flex items-center justify-center bg-gray-200 rounded-lg h-32">
                                    <span className="text-gray-500">Chest Measurement Diagram</span>
                                </div>
                            </div>

                            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                <h3 className="text-xl font-bold text-[#0F2131] mb-3">Length Measurement</h3>
                                <p className="text-gray-700 mb-4">
                                    Measure from the top of your shoulder to the bottom of your chest where you want the jersey to end.
                                </p>
                                <div className="flex items-center justify-center bg-gray-200 rounded-lg h-32">
                                    <span className="text-gray-500">Length Measurement Diagram</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0F2131] mb-6">
                            Jersey Size Chart
                        </h2>

                        <div className="overflow-x-auto rounded-lg border border-gray-200">
                            <table className="min-w-full">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-sm font-bold text-[#0F2131] uppercase tracking-wider">
                                            Size
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-bold text-[#0F2131] uppercase tracking-wider">
                                            Chest (cm)
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-bold text-[#0F2131] uppercase tracking-wider">
                                            Length (cm)
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-bold text-[#0F2131] uppercase tracking-wider">
                                            Fit
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#0F2131]">
                                            S
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            92-96 cm
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            68 cm
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            Regular fit
                                        </td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#0F2131]">
                                            M
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            96-100 cm
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            70 cm
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            Regular fit
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#0F2131]">
                                            L
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            100-104 cm
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            72 cm
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            Regular fit
                                        </td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#0F2131]">
                                            XL
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            104-108 cm
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            74 cm
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            Regular fit
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-6 p-6 bg-[#F8F9FA] rounded-lg border border-gray-200">
                            <h3 className="text-xl font-bold text-[#0F2131] mb-3">Tips for Getting the Right Fit</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start">
                                    <span className="text-[#1A533E] mr-3 mt-1">✓</span>
                                    <span>Retro jerseys are designed for a comfortable fit - not too tight, not too loose</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#1A533E] mr-3 mt-1">✓</span>
                                    <span>If you're between sizes, go for the larger one for comfort</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#1A533E] mr-3 mt-1">✓</span>
                                    <span>All our jerseys are made from high-quality, breathable fabric</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section className="mt-12 pt-8 border-t border-gray-200">
                        <h2 className="text-2xl font-bold text-[#0F2131] mb-6">
                            Need Help With Sizing?
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Our team is happy to help you find the perfect size. Contact us at <a href="mailto:borufashions@gmail.com" className="text-[#1C7C83] font-bold hover:underline">borufashions@gmail.com</a>
                            and tell us your measurements and which jersey you're interested in.
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
