import { Metadata } from 'next';
import { JerseyResearchAgent } from '@/lib/research';

export const metadata: Metadata = {
    title: 'Liverpool\'s 1995/96 Carlsberg Away Kit | Ériu Sports Blog',
    description: 'The Liverpool 1995/96 Carlsberg away jersey, with its distinctive white base and teal green trim, was worn during a memorable mid-90s season.',
    openGraph: {
        title: 'Liverpool\'s 1995/96 Carlsberg Away Kit',
        description: 'The Liverpool 1995/96 Carlsberg away jersey.',
        url: '/blog/liverpool-95-96-carlsberg',
    },
    alternates: {
        canonical: '/blog/liverpool-95-96-carlsberg',
    },
};

export default async function Liverpool9596CarlsbergPage() {
    const agent = new JerseyResearchAgent();
    const research = await agent.researchLiverpool199596Carlsberg();

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
                        <span>April 13, 2026</span>
                        <span className="mx-2">•</span>
                        <span>10 min read</span>
                        <span className="mx-2">•</span>
                        <span className="text-[#1C7C83] font-bold">Verified by Ériu Sports Historical Research Team</span>
                    </div>
                </div>

                <div className="prose prose-lg max-w-none">
                    <div className="w-full h-64 md:h-96 bg-gray-200 mb-8 flex items-center justify-center overflow-hidden">
                        <img
                            src={research.featuredImage}
                            alt={research.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <p className="text-gray-700 mb-8">
                        {research.content}
                    </p>

                    {research.sections.map((section, index) => (
                        <section key={index} className="mb-8">
                            <h2 className="text-2xl font-bold text-[#0F2131] mb-4">{section.heading}</h2>
                            {section.paragraphs.map((paragraph, paraIndex) => (
                                <p key={paraIndex} className="text-gray-700 mb-4">
                                    {paragraph}
                                </p>
                            ))}
                        </section>
                    ))}

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
                            This jersey is available now in our Premier League Classics collection.
                        </p>
                        <a
                            href="/collections/premier-league-classics"
                            className="inline-block bg-[#1A533E] text-white px-8 py-4 uppercase font-bold tracking-widest hover:bg-[#133d2d] transition-colors"
                        >
                            Shop the Premier League Classics Collection
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
