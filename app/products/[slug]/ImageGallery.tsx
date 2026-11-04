"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
  title: string;
  badge: string | null;
}

/**
 * Product photos as a swipeable row: on phones each photo fills the width and
 * snaps into place as you swipe. Thumbnails underneath jump straight to a photo,
 * and arrows do the same on larger screens.
 */
export default function ImageGallery({ images, title, badge }: ImageGalleryProps) {
  const photos = images.length ? images : ['/placeholder.png'];
  const [selectedIdx, setSelectedIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const many = photos.length > 1;

  // Keep the highlighted thumbnail in step with whichever photo is in view.
  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el || !el.clientWidth) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    setSelectedIdx((cur) => (cur === idx ? cur : Math.min(Math.max(idx, 0), photos.length - 1)));
  }, [photos.length]);

  const goTo = (idx: number) => {
    const el = trackRef.current;
    if (!el) return;
    const next = (idx + photos.length) % photos.length;
    el.scrollTo({ left: next * el.clientWidth });
    setSelectedIdx(next);
  };

  // Scroll the active thumbnail into view when there are more than fit.
  useEffect(() => {
    const strip = thumbsRef.current;
    const thumb = strip?.children[selectedIdx] as HTMLElement | undefined;
    if (!strip || !thumb) return;
    const left = thumb.offsetLeft - (strip.clientWidth - thumb.clientWidth) / 2;
    strip.scrollTo({ left: Math.max(0, left) });
  }, [selectedIdx]);

  return (
    <div className="flex flex-col lg:self-start">
      <div className="relative -mx-4 sm:mx-0">
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth motion-reduce:scroll-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-white sm:rounded-lg sm:border sm:border-zinc-200 sm:shadow-sm"
          aria-roledescription="carousel"
          aria-label={`${title} photos`}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') { e.preventDefault(); goTo(selectedIdx + 1); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(selectedIdx - 1); }
          }}
        >
          {photos.map((src, idx) => (
            <div
              key={src + idx}
              className="relative aspect-square w-full shrink-0 snap-center snap-always"
              aria-roledescription="slide"
              aria-label={`${idx + 1} of ${photos.length}`}
            >
              <Image
                src={src}
                alt={idx === 0 ? title : `${title}, view ${idx + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
                priority={idx === 0}
                draggable={false}
              />
            </div>
          ))}
        </div>

        {badge && (
          <div className="pointer-events-none absolute top-4 left-4 bg-red-100 text-red-800 text-xs px-3 py-1.5 uppercase font-bold tracking-wider rounded-sm shadow-sm">
            {badge}
          </div>
        )}

        {many && (
          <>
            <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-semibold text-white tabular-nums">
              {selectedIdx + 1} / {photos.length}
            </span>
            <button
              type="button"
              onClick={() => goTo(selectedIdx - 1)}
              className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-900 shadow-md transition hover:bg-white sm:block"
              aria-label="Previous photo"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button
              type="button"
              onClick={() => goTo(selectedIdx + 1)}
              className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-900 shadow-md transition hover:bg-white sm:block"
              aria-label="Next photo"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </>
        )}
      </div>

      {many && (
        <div
          ref={thumbsRef}
          className="mt-3 flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {photos.map((src, idx) => (
            <button
              key={src + idx}
              type="button"
              onClick={() => goTo(idx)}
              className={`relative aspect-square ${photos.length > 4 ? 'w-[calc((100%-2rem)/4.4)]' : 'w-[calc((100%-1.5rem)/4)]'} shrink-0 overflow-hidden rounded-md border-2 bg-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-teal)] ${
                selectedIdx === idx
                  ? 'border-[var(--color-emerald)] shadow-md'
                  : 'border-zinc-200 hover:border-[var(--color-teal)]'
              }`}
              aria-label={`Show photo ${idx + 1}`}
              aria-current={selectedIdx === idx ? 'true' : undefined}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="(max-width: 768px) 25vw, 150px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
