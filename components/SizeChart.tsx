"use client";

import { useState } from "react";
import { CHART_SIZES, sizeChart, type ChartUnit } from "@/lib/size-chart";

interface Props {
  /** Sizes this shirt comes in. Other columns are greyed out. Omit to show all. */
  available?: string[];
}

/** Body-measurement size chart with a cm / inches switch. Scrolls sideways on small screens. */
export default function SizeChart({ available }: Props) {
  const [unit, setUnit] = useState<ChartUnit>("cm");
  const rows = sizeChart(unit);
  const has = (s: string) => !available || available.includes(s);

  return (
    <div>
      <div role="group" aria-label="Units" className="inline-flex border border-gray-300 mb-4">
        {(["cm", "in"] as const).map((u) => (
          <button
            key={u}
            type="button"
            onClick={() => setUnit(u)}
            aria-pressed={unit === u}
            className={`px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-colors ${
              unit === u ? "bg-[#0F2131] text-white" : "bg-white text-[#0F2131] hover:bg-gray-50"
            }`}
          >
            {u === "cm" ? "cm / kg" : "inches / lb"}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto border border-gray-200">
        <table className="w-full min-w-[560px] text-sm text-center border-collapse">
          <thead>
            <tr className="bg-[#0F2131] text-white">
              <th scope="col" className="sticky left-0 bg-[#0F2131] py-3 px-3 text-left font-semibold">Size</th>
              {CHART_SIZES.map((s) => (
                <th key={s} scope="col" className={`py-3 px-3 font-bold ${has(s) ? "" : "text-white/40"}`}>
                  {s}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t border-gray-100 bg-white even:bg-gray-50">
                <th scope="row" className="sticky left-0 bg-inherit py-3 px-3 text-left font-semibold text-[#0F2131] whitespace-nowrap">
                  {row.label}
                </th>
                {row.values.map((v, i) => (
                  <td key={i} className={`py-3 px-3 whitespace-nowrap ${has(CHART_SIZES[i]) ? "text-gray-700" : "text-gray-300"}`}>
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-gray-500">
        These are body measurements. A difference of 2–3 cm is normal when measuring by hand.
        {available && !CHART_SIZES.every(has) && " Greyed-out sizes aren't available for this shirt."}
      </p>
    </div>
  );
}
