import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { getProductBySlug, products } from '@/lib/products';
import AddToCartForm from './AddToCartForm';
import PriceDisplay from './PriceDisplay';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found | Ériu Sports',
    };
  }

  const imageUrl = product.images[0] ? `https://eriusports.com${product.images[0]}` : undefined;

  return {
    title: `${product.title} | Ériu Sports`,
    description: product.description,
    keywords: [product.title, product.category, 'retro jersey', 'vintage football shirt', 'Ériu Sports'],
    openGraph: {
      title: `${product.title} | Ériu Sports`,
      description: product.description,
      type: 'website',
      url: `/products/${product.slug}`,
      images: imageUrl ? [{ url: imageUrl, width: 800, height: 1000, alt: product.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} | Ériu Sports`,
      description: product.description,
      images: imageUrl ? [imageUrl] : undefined,
    },
    alternates: {
      canonical: `/products/${product.slug}`,
    },
  };
}

export default async function ProductDetail({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const sizes = product.sizes || ['S', 'M', 'L', 'XL'];

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.images.map((img) => `https://eriusports.com${img}`),
    brand: {
      '@type': 'Brand',
      name: 'Ériu Sports',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: product.currency,
      lowPrice: product.price,
      highPrice: product.price,
      offerCount: sizes.length,
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    sku: product.originalId,
  };

  return (
    <div className="bg-white min-h-screen text-[var(--color-foreground)]">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <ol className="flex items-center text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-[var(--color-teal)] transition-colors">
              Home
            </Link>
          </li>
          <li className="mx-2">/</li>
          <li>
            <Link href="/catalog" className="hover:text-[var(--color-teal)] transition-colors">
              Shop
            </Link>
          </li>
          <li className="mx-2">/</li>
          <li>
            <Link href={`/catalog?category=${product.category}`} className="hover:text-[var(--color-teal)] transition-colors">
              {product.category}
            </Link>
          </li>
          <li className="mx-2">/</li>
          <li aria-current="page" className="text-gray-900 font-medium truncate max-w-[200px]">
            {product.title}
          </li>
        </ol>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">

          {/* Image Gallery */}
          <div className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, idx) => (
                  <Image
                    key={idx}
                    src={image}
                    alt={`${product.title} view ${idx + 1}`}
                    width={200}
                    height={200}
                    className="object-cover rounded-md cursor-pointer hover:ring-2 hover:ring-[var(--color-emerald)] transition-all aspect-square"
                  />
                ))}
              </div>
            </div>

            {/* Main Image */}
            <div className="aspect-[4/5] w-full bg-zinc-100 rounded-lg overflow-hidden group shadow-md p-4 bg-gradient-to-t from-zinc-200 to-white relative">
              <Image
                src={product.images[0] || '/placeholder.png'}
                alt={product.title}
                width={800}
                height={1000}
                className="h-full w-full object-contain object-center sm:rounded-lg"
                priority
              />
              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 bg-red-100 text-red-800 text-xs px-3 py-1.5 uppercase font-bold tracking-wider rounded-sm shadow-sm">
                  {product.badge}
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-10 px-4 sm:px-0 lg:mt-0">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 uppercase">
              {product.title}
            </h1>

            <div className="mt-4 flex items-center gap-4">
              <PriceDisplay eurPrice={product.price} />
              {/* Rating */}
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-lg">★</span>
                <span className="text-sm text-gray-600">{product.rating}</span>
                <span className="text-sm text-gray-400">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-3">
                Description
              </h2>
              <div className="space-y-4 text-base text-gray-600 leading-relaxed font-light whitespace-pre-line">
                {product.description}
              </div>
            </div>

            {/* Specs */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-4">
                Product Details
              </h2>
              <ul className="space-y-2 text-sm text-gray-600">
                {product.specs.map((spec, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-[var(--color-teal)]">✓</span>
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            {/* Size Selector & Add to Cart (Client Component) */}
            <AddToCartForm product={product} sizes={sizes} />

            {/* Trust Signals */}
            <div className="mt-8 border-t border-gray-200 pt-8 flex flex-col gap-4">
              <div className="flex items-center text-sm text-gray-600">
                <svg className="h-5 w-5 mr-3 text-[var(--color-teal)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <span>Free shipping on orders over €49. Fast delivery worldwide.</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <svg className="h-5 w-5 mr-3 text-[var(--color-teal)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Quality verified retro classics.</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <svg className="h-5 w-5 mr-3 text-[var(--color-teal)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Returns within 30 days.</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
