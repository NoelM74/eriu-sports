import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Page Not Found | Ériu Sports',
    description: 'The page you are looking for does not exist. Browse our collection of premium retro football jerseys and GAA gear.',
    robots: {
        index: false,
        follow: true,
    },
};

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 bg-white">
            {/* 404 Graphic */}
            <div className="relative mb-8">
                <span className="text-[12rem] font-extrabold text-[var(--color-navy)] leading-none tracking-tighter opacity-10">
                    404
                </span>
                <span className="absolute inset-0 flex items-center justify-center text-[8rem] font-extrabold text-[var(--color-emerald)] leading-none tracking-tighter">
                    404
                </span>
            </div>

            <h1 className="text-3xl font-bold text-[var(--color-navy)] mb-4 uppercase tracking-wider text-center">
                Page Not Found
            </h1>
            <p className="text-gray-500 mb-8 max-w-md text-center text-lg">
                Looks like this page has been substituted out of the squad. Let's get you back to the pitch.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    href="/"
                    className="bg-[var(--color-emerald)] text-white px-8 py-4 uppercase font-bold tracking-widest hover:bg-[var(--color-emerald-dark)] transition-colors text-center"
                >
                    Back to Home
                </Link>
                <Link
                    href="/catalog"
                    className="bg-[var(--color-navy)] text-white px-8 py-4 uppercase font-bold tracking-widest hover:bg-[var(--color-teal)] transition-colors text-center"
                >
                    Shop Collection
                </Link>
            </div>

            {/* Quick Links */}
            <div className="mt-12 text-center">
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
                    Popular Collections
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/collections/ireland-classics" className="text-sm text-[var(--color-teal)] hover:text-[var(--color-emerald)] transition-colors underline">
                        Ireland Classics
                    </Link>
                    <Link href="/collections/premier-league-classics" className="text-sm text-[var(--color-teal)] hover:text-[var(--color-emerald)] transition-colors underline">
                        Premier League Classics
                    </Link>
                    <Link href="/collections/gaa-gear" className="text-sm text-[var(--color-teal)] hover:text-[var(--color-emerald)] transition-colors underline">
                        GAA Gear
                    </Link>
                </div>
            </div>
        </div>
    );
}
