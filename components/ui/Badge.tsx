interface BadgeProps {
  label: string;
  variant?: "new" | "bestseller" | "selling" | "sale" | "official" | "limited";
}

export default function Badge({ label, variant = "new" }: BadgeProps) {
  const variants = {
    new: "bg-[#1C7C83] text-white",
    bestseller: "bg-[#1A533E] text-white",
    selling: "bg-red-600 text-white",
    sale: "bg-[#0F2131] text-white",
    official: "bg-[#0F2131] text-[#1C7C83] border border-[#1C7C83]",
    limited: "bg-[#1A533E] text-white divide-x divide-white/20",
  };

  return (
    <span
      className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${variants[variant]}`}
    >
      {label}
    </span>
  );
}
