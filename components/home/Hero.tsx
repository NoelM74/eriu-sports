import Link from "next/link";
import { HERO_REVIEW, REVIEWS } from "@/lib/reviews";
import { Stars } from "@/components/reviews/ReviewQuote";
import { getProductBySlug } from "@/lib/products";
import HeroPick from "./HeroPick";

/**
 * Shirts the hero can show. One is picked for each visit (never the same one twice in a
 * row), so repeat visitors see the shop change. Price, link and photo come from the
 * product data; the first entry is the fallback when scripts are off.
 */
const HERO_PICKS = [
  { slug: "ireland-1992-94-home-retro-jersey", tag: "Irish classic", name: "Ireland 1992-94 Home", alt: "Retro Ireland 1992-94 home jersey in green" },
  { slug: "ireland-1990-italia-90-world", tag: "Irish classic", name: "Ireland Italia 90 Home", alt: "Retro Ireland Italia 90 home jersey in green" },
  { slug: "ireland-euro-88-home-jersey", tag: "Irish classic", name: "Ireland Euro 88 Home", alt: "Retro Ireland Euro 88 home jersey in green" },
  { slug: "barcelona-2004-05-home-shirt-ronaldinho-10", tag: "European classic", name: "Barcelona 2004-05 Home, Ronaldinho 10", alt: "Back of a retro Barcelona 2004-05 home shirt printed RONALDINHO 10" },
  { slug: "dublin-gaa-2026-home-jersey", tag: "GAA 2026", name: "Dublin GAA 2026 Home", alt: "Dublin GAA 2026 home jersey in sky blue and navy" },
  { slug: "ireland-2026-away-kids-kit", tag: "Kids kit", name: "Ireland 2026 Away Kids Kit", alt: "Ireland 2026 white and green away kids kit" },
];

const euro = (n: number) => `€${Number.isInteger(n) ? n : n.toFixed(2)}`;

const PICKS = HERO_PICKS.map((p) => {
  const product = getProductBySlug(p.slug);
  if (!product) throw new Error(`Hero pick not found: ${p.slug}`);
  return { src: product.images[0], href: `/products/${p.slug}`, alt: p.alt, tag: p.tag, name: `${p.name} · ${euro(product.price)}` };
});

// Runs while the page is still loading, before the photo is fetched, so only the chosen
// photo downloads and nothing flashes.
const PICK_SCRIPT = `(function(){var P=${JSON.stringify(PICKS).replace(/</g, "\\u003c")};var last=-1;try{last=parseInt(localStorage.getItem('eriu-hero')||'-1',10)}catch(e){}var i=Math.floor(Math.random()*P.length);if(P.length>1&&i===last)i=(i+1)%P.length;try{localStorage.setItem('eriu-hero',String(i))}catch(e){}var p=P[i],d=document;var img=d.getElementById('hero-img');img.alt=p.alt;img.src=p.src;d.getElementById('hero-link').href=p.href;d.getElementById('hero-tag').textContent=p.tag;d.getElementById('hero-name').textContent=p.name})()`;

export default function Hero() {
  const first = PICKS[0];
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#1C7C83] mb-4">
              Irish-run · Worldwide delivery
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight text-[#0F2131] uppercase mb-6">
              Retro Football Shirts<span className="text-[#1C7C83]">.</span>{" "}
              <br />
              <span className="text-[#1A533E]">GAA Jerseys.</span>
            </h1>
            <p className="text-[#404040] text-base sm:text-lg max-w-md mb-8 leading-relaxed">
              Classic Ireland, Premier League and European shirts, county GAA jerseys and training
              vests. From €25, delivered worldwide.
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

            <a href="#buyer-reviews" className="mt-6 block max-w-md text-sm leading-snug text-[#404040] hover:text-[#0F2131]">
              <Stars /> <span className="text-gray-500">{REVIEWS.length} five-star reviews from our buyers</span>
              <span className="block mt-1">
                &ldquo;{HERO_REVIEW.text}&rdquo; <span className="text-gray-500">@{HERO_REVIEW.handle}</span>
              </span>
            </a>

            <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-xs font-medium text-[#555] uppercase tracking-wide">
              <li>✓ Worldwide delivery</li>
              <li>✓ Free delivery over €49</li>
              <li>✓ 30-day returns</li>
            </ul>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#f0f7f4] to-[#e8f4f5] rounded-sm" />
            <a
              id="hero-link"
              href={first.href}
              suppressHydrationWarning
              className="relative w-full aspect-[4/5] max-w-md mx-auto block"
            >
              {/* A plain img so the script below can choose the photo before it loads. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                id="hero-img"
                alt={first.alt}
                suppressHydrationWarning
                fetchPriority="high"
                className="absolute inset-0 h-full w-full object-contain object-center scale-110 drop-shadow-2xl"
              />
              <noscript>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={first.src} alt={first.alt} className="absolute inset-0 h-full w-full object-contain object-center scale-110 drop-shadow-2xl" />
              </noscript>
            </a>
            <div className="absolute bottom-6 left-0 bg-[#0F2131] text-white px-4 py-3 shadow-lg">
              <p id="hero-tag" suppressHydrationWarning className="text-[10px] uppercase tracking-widest text-[#1C7C83] font-bold">{first.tag}</p>
              <p id="hero-name" suppressHydrationWarning className="text-sm font-bold mt-0.5">{first.name}</p>
            </div>
            <script dangerouslySetInnerHTML={{ __html: PICK_SCRIPT }} />
            {/* In-site links to the home page don't run the script above; this covers them. */}
            <HeroPick picks={PICKS} />
          </div>
        </div>
      </div>
    </section>
  );
}
