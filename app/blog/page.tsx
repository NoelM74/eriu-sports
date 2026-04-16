import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ériu Sports Blog | Jersey Histories & Football Stories',
    description: 'Discover the stories behind our retro jerseys - the history, famous games, and legendary players who wore them.',
    openGraph: {
        title: 'Ériu Sports Blog',
        description: 'Discover the stories behind our retro jerseys.',
        url: '/blog',
    },
    alternates: {
        canonical: '/blog',
    },
};

export default function BlogPage() {
    return (
        <div className="bg-white min-h-screen py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-[#0F2131] uppercase tracking-tight mb-4">
                        The Ériu Sports Blog
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover the stories behind our retro jerseys - the history, famous games,
                        and legendary players who wore them.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <article className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="h-48 bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">Cork City 1988/89</span>
                        </div>
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-[#0F2131] mb-2">
                                The Cork City 1988/89 Home Jersey
                            </h2>
                            <p className="text-gray-600 mb-4">
                                A tribute to Cork City's early years in the League of Ireland, featuring the classic Guinness sponsor logo.
                            </p>
                            <div className="flex items-center text-sm text-gray-500">
                                <span>April 15, 2026</span>
                                <span className="mx-2">•</span>
                                <span>12 min read</span>
                            </div>
                            <a
                                href="/blog/cork-city-1988-89"
                                className="mt-4 inline-block text-[#1C7C83] font-bold hover:text-[#1A533E] transition-colors"
                            >
                                Read the full story →
                            </a>
                        </div>
                    </article>

                    <article className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="h-48 bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">Ireland 1990 Italia 90</span>
                        </div>
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-[#0F2131] mb-2">
                                Ireland's Italia 90 World Cup Campaign
                            </h2>
                            <p className="text-gray-600 mb-4">
                                Relive the legendary World Cup campaign in Italy with the iconic green jersey that captured the nation's imagination.
                            </p>
                            <div className="flex items-center text-sm text-gray-500">
                                <span>April 14, 2026</span>
                                <span className="mx-2">•</span>
                                <span>15 min read</span>
                            </div>
                            <a
                                href="/blog/ireland-1990-italia-90"
                                className="mt-4 inline-block text-[#1C7C83] font-bold hover:text-[#1A533E] transition-colors"
                            >
                                Read the full story →
                            </a>
                        </div>
                    </article>

                    <article className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="h-48 bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">Liverpool 95-96 Carlsberg</span>
                        </div>
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-[#0F2131] mb-2">
                                Liverpool's 1995-96 Carlsberg Away Kit
                            </h2>
                            <p className="text-gray-600 mb-4">
                                The classic white and teal away shirt worn during one of Liverpool's most memorable mid-90s seasons.
                            </p>
                            <div className="flex items-center text-sm text-gray-500">
                                <span>April 13, 2026</span>
                                <span className="mx-2">•</span>
                                <span>10 min read</span>
                            </div>
                            <a
                                href="/blog/liverpool-95-96-carlsberg"
                                className="mt-4 inline-block text-[#1C7C83] font-bold hover:text-[#1A533E] transition-colors"
                            >
                                Read the full story →
                            </a>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
}
