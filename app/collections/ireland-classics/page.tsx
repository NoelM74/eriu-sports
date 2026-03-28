import Image from 'next/image';
import Link from 'next/link';
import { getProductsByCollection } from '@/lib/products';

export default function IrelandClassicsCollection() {
  const products = getProductsByCollection('Ireland Classics');

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner */}
      <section className="bg-[var(--color-midnight-navy)] py-20 px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[var(--color-eriu-emerald)] bg-gradient-to-r from-transparent to-[var(--color-eriu-emerald)] mix-blend-overlay"></div>
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-widest text-[var(--color-atlantic-teal)] mb-6">
            Ireland Classics
          </h1>
          <p className="text-xl md:text-2xl font-light text-zinc-300 max-w-2xl px-4 leading-relaxed">
            The definitive collection of iconic Irish football heritage. 
            DESIGNED IN IRELAND • BUILT FOR PERFORMANCE.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`} className="group relative">
              <div className="aspect-[4/5] w-full overflow-hidden rounded-md bg-zinc-100">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  width={600}
                  height={800}
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                
                {/* Image Overlay for Quick Add visual effect */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[var(--color-eriu-emerald)] text-white px-6 py-3 uppercase tracking-wider font-semibold shadow-lg text-sm">
                    View Details
                  </span>
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
                    {product.title}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--color-heather-grey)] font-medium">
                    Sizes S-XL Available
                  </p>
                </div>
                <p className="text-lg font-bold text-gray-900">
                  €{product.price.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
