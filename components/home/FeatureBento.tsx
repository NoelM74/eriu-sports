export default function FeatureBento() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[220px]">
          
          {/* Box 1: The Archive (Tall Left) */}
          <div className="col-span-2 row-span-1 lg:col-span-1 lg:row-span-2 bg-[#0F2131] text-white p-8 flex flex-col justify-between border-l-4 border-[#1A533E]">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1C7C83] mb-4">
                THE ARCHIVE
              </p>
              <h3 className="text-2xl font-bold leading-tight uppercase tracking-tighter">
                TIMELESS<br />ICONS
              </h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              Recreating the golden era of the beautiful game. Premium fabrics meet the designs that defined a generation.
            </p>
          </div>

          {/* Box 2: Gaelic Pride (Top Mid Wide) */}
          <div className="col-span-2 row-span-1 bg-[#1C7C83] text-white p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/80 mb-4">
                GAELIC PRIDE
              </p>
              <h3 className="text-2xl font-bold uppercase tracking-tighter mb-2">PROVINCIAL SOUL</h3>
              <p className="text-white/80 text-sm max-w-sm font-medium">
                From the parish to the peaks of Croke Park. Durable, vibrant jerseys built for the sideline and the stands.
              </p>
            </div>
          </div>

          {/* Box 3: The Finish (Top Right) */}
          <div className="col-span-1 bg-[#1A533E] text-white p-6 flex flex-col justify-between">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 mb-2">THE FINISH</p>
            <div>
              <h3 className="text-lg font-bold uppercase leading-tight mb-1 tracking-tighter">
                BUILT TO<br />LAST
              </h3>
              <p className="text-white/60 text-xs font-medium">Reinforced stitching and fade-resistant pigments. A jersey that ages as well as the memories.</p>
            </div>
          </div>

          {/* Box 4: Authentic (Bottom Mid) */}
          <div className="col-span-1 bg-[#f9fafb] text-[#0F2131] p-6 flex flex-col justify-between border border-gray-100">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1C7C83] mb-2">AUTHENTIC</p>
            <div>
              <h3 className="text-lg font-bold uppercase leading-tight mb-1 tracking-tighter">
                FIELD<br />SPEC
              </h3>
              <p className="text-[#757575] text-xs font-medium">Traditional collars, classic weights. Reimagined for the modern supporter.</p>
            </div>
          </div>

          {/* Box 5: The Studio (Bottom Right) */}
          <div className="col-span-2 lg:col-span-2 bg-[#0F2131] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-r-4 border-[#1C7C83]">
            <div className="max-w-md">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1C7C83] mb-2">
                THE STUDIO
              </p>
              <h3 className="text-2xl font-bold uppercase tracking-tighter mb-2">CREATE YOUR LEGACY</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-medium">
                Your colors, your crest, your way. Bespoke kits crafted specifically for your squad or solo style.
              </p>
            </div>
            <a
              href="/catalog"
              className="shrink-0 bg-[#1C7C83] text-white text-[10px] font-bold uppercase tracking-[0.2em] px-6 py-4 hover:bg-white hover:text-[#0F2131] transition-all duration-300 text-center"
            >
              Start<br className="hidden sm:block"/>Design 
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
