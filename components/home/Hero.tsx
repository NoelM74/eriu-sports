import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative bg-white overflow-hidden min-h-[600px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#1C7C83] mb-4">
              ★★★★★ &nbsp; Excellent 4.8 / 5
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-none tracking-tight text-[#0F2131] uppercase mb-6">
              Designed<br />
              in Ireland<span className="text-[#1C7C83]">.</span><br />
              Built for<br />
              <span className="text-[#1A533E]">Performance.</span>
            </h1>
            <p className="text-[#404040] text-base sm:text-lg max-w-md mb-8 leading-relaxed">
              Premium retro sportswear and classic jersey designs. 
              From the history books to the streets.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <Link
                href="/collections/ireland-classics"
                className="bg-[#1A533E] text-white text-sm font-bold uppercase tracking-widest px-8 py-4 hover:bg-[#133d2d] transition-colors"
              >
                Shop Ireland Classics
              </Link>
              <Link
                href="#latest-arrivals"
                className="text-sm font-semibold uppercase tracking-wide text-[#0F2131] border-b-2 border-[#1C7C83] pb-0.5 hover:text-[#1C7C83] transition-colors"
              >
                Latest Arrivals →
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 mt-10 text-xs font-medium text-[#757575] uppercase tracking-wide">
              <span>✓ Free Returns</span>
              <span>✓ Classic Designs</span>
              <span>✓ Premium Quality</span>
            </div>
          </div>

          {/* Right: Hero image */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#f0f7f4] to-[#e8f4f5] rounded-sm" />
            <div className="relative w-full aspect-[4/5] max-w-md mx-auto">
              <Image
                src="/images/ireland-classics/677983042-1.jpg"
                alt="Ireland 1992 94 Home Retro Jersey"
                fill
                className="object-contain object-center scale-110 drop-shadow-2xl"
                priority
              />
            </div>

            {/* Floating badge */}
            <div className="absolute bottom-8 left-0 bg-[#0F2131] text-white px-4 py-3 shadow-lg">
              <p className="text-[10px] uppercase tracking-widest text-[#1C7C83] font-bold">Trending</p>
              <p className="text-sm font-bold mt-0.5">Ireland 92/94 Home</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
