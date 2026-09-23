import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/catalog/ProductCard';
import { POSTS, getPost, readingMinutes, formatDate } from '@/lib/blog';
import { getProductBySlug, type Product } from '@/lib/products';

const SITE = 'https://eriusports.com';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: 'Story not found' };
  return {
    title: post.seoTitle,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified ?? post.datePublished,
      images: [{ url: `${SITE}${post.heroImage}`, alt: post.heroAlt }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const products = post.products.map(getProductBySlug).filter((p): p is Product => Boolean(p));
  const minutes = readingMinutes(post);
  const url = `${SITE}/blog/${post.slug}`;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      image: `${SITE}${post.heroImage}`,
      datePublished: post.datePublished,
      dateModified: post.dateModified ?? post.datePublished,
      mainEntityOfPage: url,
      author: { '@type': 'Organization', name: 'Ériu Sports', url: SITE },
      publisher: { '@id': `${SITE}/#store` },
      inLanguage: 'en-IE',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
        { '@type': 'ListItem', position: 2, name: 'Stories', item: `${SITE}/blog` },
        { '@type': 'ListItem', position: 3, name: post.title, item: url },
      ],
    },
    ...(post.faqs?.length
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: post.faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          },
        ]
      : []),
  ];

  const contain = post.heroFit === 'contain';

  return (
    <article className="bg-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className={contain ? 'bg-[#f3f5f4]' : 'relative bg-gray-900'}>
        {contain ? (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12 grid md:grid-cols-[1fr_320px] gap-6 md:gap-10 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#1A533E] mb-3">{post.category}</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F2131] leading-tight">{post.title}</h1>
            </div>
            <div className="relative aspect-square w-full max-w-[320px] mx-auto bg-white">
              <Image src={post.heroImage} alt={post.heroAlt} fill priority sizes="320px" className="object-contain p-4" />
            </div>
          </div>
        ) : (
          <div className="relative w-full h-60 sm:h-80 md:h-[26rem] overflow-hidden">
            <Image src={post.heroImage} alt={post.heroAlt} fill priority sizes="100vw" className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-6 sm:pb-8">
                <p className="inline-block bg-[#1A533E] text-white text-xs uppercase tracking-widest font-bold px-3 py-1 mb-3">
                  {post.category}
                </p>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">{post.title}</h1>
              </div>
            </div>
          </div>
        )}
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-10">
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-[#1C7C83]">Home</Link>
          <span className="mx-2" aria-hidden>/</span>
          <Link href="/blog" className="hover:text-[#1C7C83]">Stories</Link>
        </nav>
        <p className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-100">
          <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
          {post.dateModified && (
            <>
              <span aria-hidden>·</span>
              <span>Updated <time dateTime={post.dateModified}>{formatDate(post.dateModified)}</time></span>
            </>
          )}
          <span aria-hidden>·</span>
          <span>{minutes} min read</span>
        </p>

        <p className="text-lg sm:text-xl text-gray-800 leading-relaxed mb-10">{post.intro}</p>

        <div className="space-y-10">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F2131] mb-4 border-l-4 border-[#1A533E] pl-4">
                {section.heading}
              </h2>
              {section.paragraphs.map((p) => (
                <p key={p} className="text-gray-700 leading-relaxed mb-4">{p}</p>
              ))}
              {section.bullets && (
                <ul className="mt-2 space-y-2">
                  {section.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-gray-700">
                      <span className="text-[#1A533E] font-bold" aria-hidden>–</span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {post.faqs && post.faqs.length > 0 && (
          <section className="mt-12 p-6 bg-gray-50 border border-gray-200" aria-labelledby="quick-answers">
            <h2 id="quick-answers" className="text-xl font-bold text-[#0F2131] mb-4">Quick answers</h2>
            <dl className="space-y-4">
              {post.faqs.map((f) => (
                <div key={f.q}>
                  <dt className="font-semibold text-[#0F2131]">{f.q}</dt>
                  <dd className="text-gray-700 leading-relaxed mt-1">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}
      </div>

      {products.length > 0 && (
        <section className="bg-[#f7f7f5] border-t border-gray-100" aria-labelledby="in-this-story">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
              <h2 id="in-this-story" className="text-2xl font-bold uppercase text-[#0F2131]">Shirts in this story</h2>
              <Link
                href={post.cta.href}
                className="text-xs font-bold uppercase tracking-widest text-[#1A533E] border-b border-[#1A533E] pb-0.5 self-start sm:self-auto"
              >
                {post.cta.label} →
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {products.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            {products.length > 4 && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                {products.slice(4).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
            <p className="mt-6 text-sm text-gray-600">From €25. Delivered to Ireland and the UK in 8–14 days.</p>
          </div>
        </section>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 text-center">
        <Link href="/blog" className="text-sm text-[#1C7C83] hover:underline">← More stories</Link>
      </div>
    </article>
  );
}
