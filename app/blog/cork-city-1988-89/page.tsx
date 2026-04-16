import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { JerseyResearchAgent, ContentSection } from '@/lib/research';

export const metadata: Metadata = {
    title: 'Cork City 1988/89 Home Jersey | Ériu Sports Blog',
    description: "The story behind Cork City's 1988/89 home jersey — their first Premier Division season, the Guinness sponsorship, and the players who wore it.",
    openGraph: {
        title: 'Cork City 1988/89 Home Jersey',
        description: "Cork City's first full season in the League of Ireland Premier Division.",
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
        <article className="bg-white min-h-screen">
            {/* Hero image */}
            <div className="relative w-full h-56 sm:h-72 md:h-96 bg-gray-100 overflow-hidden">
                <Image
                    src={research.featuredImage}
                    alt={research.title}
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 sm:p-8">
                    <span className="inline-block bg-[#1A533E] text-white text-xs uppercase tracking-widest font-bold px-3 py-1 mb-3">
                        Ireland Classics
                    </span>
                    <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight max-w-3xl">
                        {research.title}
                    </h1>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-100">
                    <span>15 April 2026</span>
                    <span className="hidden sm:inline">·</span>
                    <span>12 min read</span>
                    <span className="hidden sm:inline">·</span>
                    <span className="text-[#1A533E] font-medium">Ériu Sports</span>
                </div>

                {/* Lead paragraph */}
                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-10 font-light">
                    {research.summary}
                </p>

                {/* Article sections */}
                <div className="space-y-10">
                    {research.sections.map((section: ContentSection, index: number) => (
                        <section key={index}>
                            <h2 className="text-xl sm:text-2xl font-bold text-[#0F2131] mb-4 border-l-4 border-[#1A533E] pl-4">
                                {section.heading}
                            </h2>
                            {section.paragraphs.map((paragraph: string, paraIndex: number) => (
                                <p key={paraIndex} className="text-gray-700 leading-relaxed mb-4">
                                    {paragraph}
                                </p>
                            ))}
                        </section>
                    ))}
                </div>

                {/* Historical context */}
                <div className="bg-[#f8faf9] border-l-4 border-[#1A533E] p-5 my-10 rounded-r-lg">
                    <p className="text-gray-700 text-sm">
                        <strong className="text-[#0F2131]">{research.metadata.club}, {research.metadata.season}: </strong>
                        {research.metadata.historicalContext}
                    </p>
                </div>

                {/* Sources */}
                <div className="mt-10 pt-8 border-t border-gray-100">
                    <h3 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-3">Sources</h3>
                    <ul className="space-y-1">
                        {research.sources.map((source: string, index: number) => (
                            <li key={index} className="text-sm text-gray-500 flex items-center gap-2">
                                <span className="text-[#1A533E] text-xs">✓</span>
                                {source}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* CTA */}
                <div className="mt-14 bg-[#0F2131] rounded-lg p-6 sm:p-8 text-center">
                    <p className="text-white/60 text-sm uppercase tracking-widest mb-2">Available Now</p>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                        Shop the Ireland Classics Collection
                    </h3>
                    <Link
                        href="/collections/ireland-classics"
                        className="inline-block bg-[#1A533E] text-white px-8 py-3 uppercase font-bold tracking-widest text-sm hover:bg-[#133d2d] transition-colors rounded"
                    >
                        Browse Collection
                    </Link>
                </div>

                {/* Back link */}
                <div className="mt-8 text-center">
                    <Link href="/blog" className="text-sm text-[#1C7C83] hover:underline">
                        ← Back to Stories
                    </Link>
                </div>
            </div>
        </article>
    );
}
