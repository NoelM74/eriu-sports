import type { Family } from "@/lib/catalog/types";

// Coloured SVG garment silhouettes — placeholders until real photography (Phase 5).
// `body` fills the garment, `trim` the contrast detail.

const PATHS: Record<Family, (body: string, trim: string) => React.ReactNode> = {
  tank: (body, trim) => (
    <>
      <path
        d="M74 26 C82 36 118 36 126 26 L150 40 L160 70 L142 80 L138 66 L138 178 L62 178 L62 66 L58 80 L40 70 L50 40 Z"
        fill={body}
      />
      <path d="M74 26 C82 36 118 36 126 26 L122 32 C112 40 88 40 78 32 Z" fill={trim} />
      <path d="M64 88 L64 172 M136 88 L136 172" stroke="rgba(255,255,255,.12)" strokeWidth={2} />
    </>
  ),
  tee: (body, trim) => (
    <>
      <path
        d="M64 30 L80 22 C88 32 112 32 120 22 L136 30 L172 52 L156 82 L140 72 L140 176 L60 176 L60 72 L44 82 L28 52 Z"
        fill={body}
      />
      <path d="M80 22 C88 32 112 32 120 22 L114 30 C106 38 94 38 86 30 Z" fill={trim} />
      <path d="M60 90 L60 172 M140 90 L140 172" stroke="rgba(255,255,255,.12)" strokeWidth={2} />
    </>
  ),
  compression: (body, trim) => (
    <>
      <path
        d="M72 26 C80 34 120 34 128 26 L150 34 L184 64 L168 92 L150 78 L150 180 L50 180 L50 78 L32 92 L16 64 L50 34 Z"
        fill={body}
      />
      <path d="M100 40 L100 176" stroke={trim} strokeWidth={2.5} />
      <path d="M60 84 L60 176 M140 84 L140 176" stroke="rgba(255,255,255,.14)" strokeWidth={2} />
      <path d="M72 26 C80 34 120 34 128 26 L122 32 C112 40 88 40 78 32 Z" fill={trim} />
    </>
  ),
  shorts: (body, trim) => (
    <>
      <path d="M50 44 L150 44 L150 96 L112 96 L100 118 L88 96 L50 96 Z" fill={trim} />
      <path d="M50 96 L88 96 L96 156 L58 156 Z" fill={body} />
      <path d="M150 96 L112 96 L104 156 L142 156 Z" fill={body} />
      <path d="M50 50 L150 50" stroke="rgba(255,255,255,.2)" strokeWidth={3} />
    </>
  ),
  leggings: (body, trim) => (
    <>
      <path d="M64 24 L136 24 L134 60 L108 182 L92 182 L100 84 L92 182 L66 182 Z" fill={body} />
      <path d="M64 42 L136 42" stroke={trim} strokeWidth={4} />
    </>
  ),
  yoga: (body, trim) => (
    <>
      <path d="M62 62 C62 46 138 46 138 62 L138 98 C138 122 62 122 62 98 Z" fill={body} />
      <path d="M62 62 C78 76 122 76 138 62" fill="none" stroke={trim} strokeWidth={3} />
      <path d="M70 46 L84 60 M130 46 L116 60" stroke={body} strokeWidth={8} strokeLinecap="round" />
    </>
  ),
  layer: (body, trim) => (
    <>
      <path
        d="M72 28 L100 40 L128 28 L150 36 L182 66 L166 94 L150 82 L150 180 L50 180 L50 82 L34 94 L18 66 L50 36 Z"
        fill={body}
      />
      <path d="M100 40 L100 180" stroke={trim} strokeWidth={3} />
      <circle cx="100" cy="150" r="4" fill={trim} />
    </>
  ),
  accessory: (body, trim) => (
    <>
      <path d="M64 96 C64 66 136 66 136 96" fill="none" stroke={body} strokeWidth={12} />
      <rect x="52" y="94" width="96" height="30" rx="15" fill={body} />
      <path d="M92 92 L108 92" stroke={trim} strokeWidth={4} />
    </>
  ),
};

export default function Garment({
  family,
  body,
  trim,
  className,
  title,
}: {
  family: Family;
  body: string;
  trim: string;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label={title ?? `${family} in ${body}`}
    >
      {PATHS[family](body, trim)}
    </svg>
  );
}
