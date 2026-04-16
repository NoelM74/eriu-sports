import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ériu Sports Blog',
    description: 'Discover the stories behind our retro jerseys - the history, famous games, and legendary players who wore them.',
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-8 border-b border-gray-200">
                    <h1 className="text-3xl font-bold text-[#0F2131] uppercase tracking-tight">
                        Ériu Sports Blog
                    </h1>
                    <p className="text-gray-600 mt-2">
                        The history behind our retro football jerseys
                    </p>
                </div>
                <main>{children}</main>
            </div>
        </div>
    );
}
