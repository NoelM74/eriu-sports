import { Metadata } from 'next';
import { JerseyResearchAgent } from '@/lib/research';

export const metadata: Metadata = {
    title: 'The Cork City 1988/89 Home Jersey | Ériu Sports Blog',
    description: 'The story behind Cork City\'s 1988/89 home jersey - their first Premier Division season, the iconic Guinness sponsorship, and the players who wore it.',
    openGraph: {
        title: 'The Cork City 1988/89 Home Jersey',
        description: 'The story behind Cork City\'s 1988/89 home jersey.',
        url: '/blog/cork-city-1988-89',
    },
    alternates: {
        canonical: '/blog/cork-city-1988-89',
    },
};

export default async function CorkCity198889Page() {
    const agent = new JerseyResearchAgent();
    const research = await agent.researchCorkCity198889();

    return (
        <div className="bg-white min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-[#0F2131] uppercase tracking-tight mb-2">
                        {research.title}
                    </h1>
                    <p className="text-lg text-gray-600 mb-4">
                        {research.summary}
                    </p>
                    <div className="flex items-center justify-center text-sm text-gray-500">
                        <span>April 15, 2026</span>
                        <span className="mx-2">•</span>
                        <span>12 min read</span>
                        <span className="mx-2">•</span>
                        <span className="text-[#1C7C83] font-bold">Verified by Ériu Sports Historical Research Team</span>
                    </div>
                </div>

                <div className="prose prose-lg max-w-none">
                    <p>
                        {research.content}
                    </p>

                    <div className="bg-gray-50 border-l-4 border-[#1A533E] p-6 my-12">
                        <h2 className="text-xl font-bold text-[#0F2131] mb-4">Historical Context</h2>
                        <p className="text-gray-700">
                            <strong>{research.metadata.club} {research.metadata.season}:</strong> {research.metadata.historicalContext}
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-[#0F2131] mt-12 mb-4">Verified Sources</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        {research.sources.map((source: string, index: number) => (
                            <li key={index} className="flex items-start">
                                <span className="text-[#1A533E] mt-1 mr-2">✓</span>
                                {source}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-16 text-center">
                    <div className="bg-gray-100 p-6 rounded-lg max-w-2xl mx-auto">
                        <h3 className="text-xl font-bold text-[#0F2131] mb-4">
                            Want to learn more about this jersey?
                        </h3>
                        <p className="text-gray-700 mb-6">
                            This jersey is available now in our Ireland Classics collection.
                        </p>
                        <a
                            href="/collections/ireland-classics"
                            className="inline-block bg-[#1A533E] text-white px-8 py-4 uppercase font-bold tracking-widest hover:bg-[#133d2d] transition-colors"
                        >
                            Shop the Ireland Classics Collection
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
