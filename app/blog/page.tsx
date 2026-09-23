import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getPosts, readingMinutes, formatDate } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Shirt Stories | Retro Football & GAA Jersey History',
  description:
    'The seasons, matches and players behind our retro football shirts and GAA jerseys, plus a GAA size guide. Italia 90, the 1999 Treble, Cork City and more.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Shirt Stories | Ériu Sports',
    description: 'The seasons, matches and players behind our retro shirts and GAA jerseys.',
    url: '/blog',
  },
};

export default function BlogPage() {
  const posts = getPosts();

  return (
    <div className="bg-white min-h-screen py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-[#0F2131] uppercase tracking-tight mb-3">Shirt Stories</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            The seasons, matches and players behind the shirts, plus a few guides to help you choose.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <article key={post.slug} className="group border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
              <Link href={`/blog/${post.slug}`} className="relative block h-52 bg-[#f3f5f4] overflow-hidden">
                <Image
                  src={post.heroImage}
                  alt={post.heroAlt}
                  fill
                  priority={i < 3}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={`${post.heroFit === 'contain' ? 'object-contain p-4' : 'object-cover'} group-hover:scale-105 transition-transform duration-500`}
                />
              </Link>
              <div className="p-6 flex flex-col flex-1">
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#1C7C83] mb-2">{post.category}</p>
                <h2 className="text-xl font-bold text-[#0F2131] mb-2 leading-snug">
                  <Link href={`/blog/${post.slug}`} className="hover:text-[#1A533E]">{post.title}</Link>
                </h2>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{post.description}</p>
                <p className="mt-auto text-sm text-gray-500">
                  <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
                  <span className="mx-2" aria-hidden>·</span>
                  {readingMinutes(post)} min read
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
