import Link from 'next/link';
import type { AboutCopy } from '@/lib/page-copy';

/** Longer copy under a product grid, with links to the stories it comes from. */
export default function AboutSection({ copy }: { copy?: AboutCopy }) {
  if (!copy) return null;
  return (
    <section className="border-t border-gray-100 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <h2 className="text-2xl font-bold uppercase text-[#0F2131] mb-5">{copy.heading}</h2>
        <div className="space-y-4 text-base text-gray-700 leading-relaxed">
          {copy.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        {copy.links && copy.links.length > 0 && (
          <ul className="mt-6 space-y-2">
            {copy.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm font-semibold text-[var(--color-teal)] underline underline-offset-4">
                  {l.label} →
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
