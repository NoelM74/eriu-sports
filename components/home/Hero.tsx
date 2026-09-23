import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#1C7C83] mb-4">
              Irish-run · Ireland &amp; UK delivery
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight text-[#0F2131] uppercase mb-6">
              Retro Football Shirts<span className="text-[#1C7C83]">.</span>{" "}
              <br />
              <span className="text-[#1A533E]">GAA Jerseys.</span>
            </h1>
            <p className="text-[#404040] text-base sm:text-lg max-w-md mb-8 leading-relaxed">
              Classic Ireland, Premier League and European shirts, county GAA jerseys and training
              vests. From €25, delivered in 8–14 days.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <Link
                href="/catalog?category=football"
                className="bg-[#1A533E] text-white text-sm font-bold uppercase tracking-widest px-8 py-4 hover:bg-[#133d2d] transition-colors"
              >
                Shop Football Shirts
              </Link>
              <Link
                href="/collections/gaa-jerseys"
                className="text-sm font-semibold uppercase tracking-wide text-[#0F2131] border-b-2 border-[#1C7C83] pb-0.5 hover:text-[#1C7C83] transition-colors"
              >
                Shop GAA Jerseys →
              </Link>
            </div>

            <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-10 text-xs font-medium text-[#555] uppercase tracking-wide">
              <li>✓ Delivered in 8–14 days</li>
              <li>✓ Free delivery over €49</li>
              <li>✓ 30-day returns</li>
            </ul>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#f0f7f4] to-[#e8f4f5] rounded-sm" />
            <Link href="/products/ireland-1992-94-home-retro-jersey" className="relative w-full aspect-[4/5] max-w-md mx-auto block">
              <Image
                src="/images/ireland-classics/677983042-1.webp"
                alt="Retro Ireland 1992-94 home jersey in green"
                fill
                sizes="(max-width: 1024px) 90vw, 450px"
                className="object-contain object-center scale-110 drop-shadow-2xl"
                priority
              />
            </Link>
            <div className="absolute bottom-6 left-0 bg-[#0F2131] text-white px-4 py-3 shadow-lg">
              <p className="text-[10px] uppercase tracking-widest text-[#1C7C83] font-bold">Irish classic</p>
              <p className="text-sm font-bold mt-0.5">Ireland 1992-94 Home · €25</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
