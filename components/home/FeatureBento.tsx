export default function FeatureBento() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[220px]">
          {/* Moisture-Lock Tech — dark navy, tall */}
          <div className="col-span-2 row-span-1 lg:col-span-1 lg:row-span-2 bg-[#0F2131] text-white p-8 flex flex-col justify-between border-l-4 border-[#1A533E]">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1C7C83] mb-4">
                Technology
              </p>
              <h3 className="text-2xl font-bold leading-tight uppercase tracking-tighter">
                Moisture-Lock™<br />Adaptive
              </h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              Advanced technical yarn wicks sweat instantly. Stay dry, stay focused, dominate the pitch.
            </p>
          </div>

          {/* 72° Temp Regulation — teal, wide */}
          <div className="col-span-2 row-span-1 bg-[#1C7C83] text-white p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-4 -top-4 text-8xl font-black opacity-10 select-none">72°</div>
            <div className="relative z-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/80 mb-4">
                Climate Control
              </p>
              <h3 className="text-2xl font-bold uppercase tracking-tighter mb-2">Thermal Regulating</h3>
              <p className="text-white/80 text-sm max-w-sm font-medium">
                Engineered for the Irish climate. Deep-tissue warmth in the cold, peak breathability in the heat.
              </p>
            </div>
          </div>

          {/* Sustainable — green */}
          <div className="col-span-1 bg-[#1A533E] text-white p-6 flex flex-col justify-between">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 mb-2">Eco-System</p>
            <div>
              <h3 className="text-lg font-bold uppercase leading-tight mb-1 tracking-tighter">
                Built to<br />Outlast
              </h3>
              <p className="text-white/60 text-xs font-medium">100% Recycled Technical Fibers.</p>
            </div>
          </div>

          {/* Endorsed */}
          <div className="col-span-1 bg-[#f9fafb] text-[#0F2131] p-6 flex flex-col justify-between border border-gray-100">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1C7C83] mb-2">Verified</p>
            <div>
              <h3 className="text-lg font-bold uppercase leading-tight mb-1 tracking-tighter">
                Official<br />Spec
              </h3>
              <p className="text-[#757575] text-xs font-medium">GAA Discipline Tested.</p>
            </div>
          </div>

          {/* Explore CTA */}
          <div className="col-span-2 lg:col-span-2 bg-[#0F2131] text-white p-8 flex items-center justify-between gap-6 border-r-4 border-[#1C7C83]">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1C7C83] mb-2">
                Innovation
              </p>
              <h3 className="text-2xl font-bold uppercase tracking-tighter">Explore the Tech</h3>
            </div>
            <a
              href="/catalog"
              className="shrink-0 bg-[#1C7C83] text-white text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-4 hover:bg-white hover:text-[#0F2131] transition-all duration-300"
            >
              Shop Collection →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
