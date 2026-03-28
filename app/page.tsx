import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="bg-white min-h-screen font-sans">
      <main className="w-full flex flex-col">
        {/* Simple Hero */}
        <section className="bg-zinc-50 py-24 sm:py-32 flex flex-col items-center justify-center border-b border-zinc-200">
          <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-[var(--color-midnight-navy)] mb-6">
            EriuSports
          </h1>
          <p className="text-lg sm:text-xl text-[var(--color-heather-grey)] max-w-xl text-center mb-8 px-4">
            Premium D2C gear designed in Ireland, built for performance. Check out our latest collections.
          </p>
          <Link
            href="/collections/ireland-classics"
            className="bg-[var(--color-eriu-emerald)] hover:bg-[var(--color-atlantic-teal)] text-white px-8 py-4 font-bold uppercase tracking-widest rounded-sm transition-all hover:scale-105 shadow-md hover:shadow-lg"
          >
            Shop Ireland Classics
          </Link>
        </section>

        {/* Featured Products */}
        <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-200">
            <h2 className="text-3xl font-extrabold uppercase text-[var(--color-midnight-navy)]">
              Trending Now
            </h2>
            <Link 
              href="/collections/ireland-classics" 
              className="text-[var(--color-eriu-emerald)] hover:text-[var(--color-atlantic-teal)] font-bold uppercase text-sm tracking-wide"
            >
              View All +
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`} className="group relative">
                <div className="aspect-[4/5] w-full overflow-hidden bg-zinc-100 rounded-md">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    width={500}
                    height={600}
                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>
                <div className="mt-4 flex flex-col items-center text-center">
                  <h3 className="text-sm font-bold text-gray-900 uppercase">
                    {product.title}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-[var(--color-atlantic-teal)]">
                    €{product.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
