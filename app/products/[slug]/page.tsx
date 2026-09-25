import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { getProductBySlug, getRelatedProducts, toCard, getPlayerBySlug, products, type ProductDetails } from '@/lib/products';
import { CATEGORIES, getCollectionBySlug, DELIVERY, FREE_DELIVERY_OVER, MARKET_COUNTRIES, SHIPPING_FEE } from '@/lib/collections';
import ProductCard from '@/components/catalog/ProductCard';
import AddToCartForm from './AddToCartForm';
import PriceDisplay from './PriceDisplay';
import ImageGallery from './ImageGallery';

const SITE = 'https://eriusports.com';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

function formatPrice(p: number) {
  return `€${p % 1 ? p.toFixed(2) : p}`;
}

function firstSentence(text: string, max = 110) {
  const s = text.split(/(?<=\.)\s/)[0];
  return s.length > max ? `${s.slice(0, max - 1).trimEnd()}…` : s;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Product not found' };

  const price = formatPrice(product.price);
  const sizeRange = `${product.sizes[0]}–${product.sizes[product.sizes.length - 1]}`;
  const description = `${firstSentence(product.description)} ${price}, sizes ${sizeRange}. Worldwide delivery, free over €49.`;
  const image = product.images[0] ? `${SITE}${product.images[0]}` : undefined;

  return {
    title: `${product.title} | ${price}`,
    description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.title} | Ériu Sports`,
      description,
      url: `/products/${product.slug}`,
      type: 'website',
      images: image ? [{ url: image, alt: product.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} | Ériu Sports`,
      description,
      images: image ? [image] : undefined,
    },
  };
}

const DETAIL_LABELS: [keyof ProductDetails, string][] = [
  ['team', 'Team'],
  ['season', 'Season'],
  ['kit', 'Kit'],
  ['sponsor', 'Sponsor'],
  ['print', 'Name & number'],
  ['colours', 'Colours'],
  ['fit', 'Fit'],
  ['condition', 'Condition'],
];

/** Countries beyond Ireland and the UK, where we don't quote a delivery time. */
const OTHER_MARKETS = MARKET_COUNTRIES.filter((c) => c !== 'IE' && c !== 'GB');

/**
 * Offer shipping details: the flat worldwide fee, with a delivery time only for
 * Ireland and the UK (8–14 days from order). Other countries vary, so no time is given.
 */
function shippingTo(countries: string[], withTime: boolean) {
  return {
    '@type': 'OfferShippingDetails',
    shippingRate: { '@type': 'MonetaryAmount', value: SHIPPING_FEE, currency: 'EUR' },
    shippingDestination: countries.map((c) => ({ '@type': 'DefinedRegion', addressCountry: c })),
    ...(withTime && {
      deliveryTime: {
        '@type': 'ShippingDeliveryTime',
        handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 2, unitCode: 'DAY' },
        transitTime: { '@type': 'QuantitativeValue', minValue: 8, maxValue: 12, unitCode: 'DAY' },
      },
    }),
  };
}

export default async function ProductDetail({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const collection = getCollectionBySlug(product.collectionSlug)!;
  const category = CATEGORIES.find((c) => c.key === product.category)!;
  const related = getRelatedProducts(product);
  const player = product.player ? getPlayerBySlug(product.player.slug) : undefined;
  const url = `${SITE}/products/${product.slug}`;
  const details = DETAIL_LABELS.filter(([key]) => product.details[key]);
  const altBase = product.details.colours
    ? `${product.title} in ${product.details.colours.replace(/ \/ /g, ', ').toLowerCase()}`
    : product.title;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.title,
      description: product.description,
      image: product.images.map((img) => `${SITE}${img}`),
      sku: product.originalId,
      category: collection.name,
      ...(product.details.colours ? { color: product.details.colours } : {}),
      offers: {
        '@type': 'Offer',
        url,
        price: product.price,
        priceCurrency: product.currency,
        availability: product.sizes.every((sz) => product.soldOut.includes(sz))
          ? 'https://schema.org/OutOfStock'
          : 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        seller: { '@type': 'Organization', name: 'Ériu Sports' },
        shippingDetails: [shippingTo(['IE', 'GB'], true), shippingTo(OTHER_MARKETS, false)],
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          applicableCountry: MARKET_COUNTRIES,
          returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
          merchantReturnDays: 30,
          returnMethod: 'https://schema.org/ReturnByMail',
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
        { '@type': 'ListItem', position: 2, name: category.label, item: `${SITE}/catalog?category=${category.key}` },
        { '@type': 'ListItem', position: 3, name: collection.name, item: `${SITE}/collections/${collection.slug}` },
        ...(product.club
          ? [{ '@type': 'ListItem', position: 4, name: product.club.name, item: `${SITE}/clubs/${product.club.slug}` }]
          : []),
        { '@type': 'ListItem', position: product.club ? 5 : 4, name: product.title, item: url },
      ],
    },
  ];

  return (
    <div className="bg-white min-h-screen text-[var(--color-foreground)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <ol className="flex flex-wrap items-center gap-x-2 text-sm text-gray-500">
          <li><Link href="/" className="hover:text-[var(--color-teal)]">Home</Link></li>
          <li aria-hidden>/</li>
          <li><Link href={`/collections/${collection.slug}`} className="hover:text-[var(--color-teal)]">{collection.name}</Link></li>
          {product.club && (
            <>
              <li aria-hidden>/</li>
              <li><Link href={`/clubs/${product.club.slug}`} className="hover:text-[var(--color-teal)]">{product.club.name}</Link></li>
            </>
          )}
          <li aria-hidden>/</li>
          <li aria-current="page" className="text-gray-900 font-medium truncate max-w-[220px]">{product.title}</li>
        </ol>
      </nav>

      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
          <ImageGallery images={product.images} title={altBase} badge={product.badge} />

          <div className="mt-8 lg:mt-0">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-teal)]">{collection.name}</p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 uppercase leading-tight">
              {product.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <PriceDisplay eurPrice={product.price} />
              <span className="text-sm text-gray-500">Free delivery on orders over €49</span>
            </div>

            <p className="mt-6 text-base text-gray-700 leading-relaxed">{product.description}</p>

            {details.length > 0 && (
              <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm border-t border-gray-200 pt-6">
                {details.map(([key, label]) => (
                  <div key={key} className="contents">
                    <dt className="font-semibold text-gray-900">{label}</dt>
                    <dd className="text-gray-600">{product.details[key]}</dd>
                  </div>
                ))}
              </dl>
            )}

            {player && player.count > 1 && (
              <Link
                href={`/players/${player.slug}`}
                className="mt-4 inline-block text-sm font-semibold text-[var(--color-teal)] underline underline-offset-4"
              >
                See all {player.count} {player.name} shirts →
              </Link>
            )}

            <AddToCartForm product={product} sizes={product.sizes} />

            <div className="mt-8 border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700">
              <p className="font-semibold text-gray-900">Tracked delivery worldwide</p>
              <ul className="mt-2 space-y-1">
                <li>{DELIVERY} to Ireland and the UK</li>
                <li>€{SHIPPING_FEE} delivery, free on orders over €{FREE_DELIVERY_OVER}</li>
                <li>30-day returns on unworn items with tags on</li>
              </ul>
              <Link href="/shipping-returns" className="mt-3 inline-block text-[var(--color-teal)] underline underline-offset-4">
                Delivery &amp; returns
              </Link>
            </div>

            {product.sizeGuide && (
              <div className="mt-6">
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-widest">Fit guide</h2>
                <p className="mt-1 text-sm text-gray-600">
                  Measured flat on a size {product.sizeGuide.size}. Other sizes scale up or down from here.
                </p>
                <table className="mt-3 w-full max-w-sm text-sm">
                  <tbody>
                    {product.sizeGuide.rows.map(([label, value]) => (
                      <tr key={label} className="border-b border-gray-100">
                        <th scope="row" className="py-2 pr-4 text-left font-medium text-gray-900">{label}</th>
                        <td className="py-2 text-gray-600">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Link href="/size-guide" className="mt-3 inline-block text-sm text-[var(--color-teal)] underline underline-offset-4">
                  Full size guide
                </Link>
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16 border-t border-gray-200 pt-10" aria-labelledby="related">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
              <h2 id="related" className="text-2xl font-bold uppercase text-[#0F2131]">You might also like</h2>
              <Link
                href={product.club ? `/clubs/${product.club.slug}` : `/collections/${collection.slug}`}
                className="shrink-0 text-xs font-bold uppercase tracking-widest text-[#1A533E] border-b border-[#1A533E] pb-0.5"
              >
                More {product.club?.name ?? collection.name} →
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={toCard(p)} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
