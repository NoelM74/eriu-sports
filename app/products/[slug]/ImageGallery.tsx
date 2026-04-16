"use client";

import { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
  title: string;
  badge: string | null;
}

export default function ImageGallery({ images, title, badge }: ImageGalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const mainImage = images[selectedIdx] || images[0] || '/placeholder.png';

  return (
    <div className="flex flex-col-reverse">
      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="mx-auto mt-4 w-full max-w-2xl sm:block lg:max-w-none">
          <div className="grid grid-cols-4 gap-3">
            {images.map((image, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIdx(idx)}
                className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all focus:outline-none ${
                  selectedIdx === idx
                    ? 'border-[var(--color-emerald)] shadow-md'
                    : 'border-transparent hover:border-[var(--color-teal)]'
                }`}
                aria-label={`View image ${idx + 1}`}
              >
                <Image
                  src={image}
                  alt={`${title} view ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 25vw, 200px"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Image */}
      <div className="aspect-[4/5] w-full bg-zinc-100 rounded-lg overflow-hidden shadow-md p-4 bg-gradient-to-t from-zinc-200 to-white relative">
        <Image
          src={mainImage}
          alt={title}
          width={800}
          height={1000}
          className="h-full w-full object-contain object-center sm:rounded-lg transition-opacity duration-200"
          priority
        />
        {/* Badge */}
        {badge && (
          <div className="absolute top-4 left-4 bg-red-100 text-red-800 text-xs px-3 py-1.5 uppercase font-bold tracking-wider rounded-sm shadow-sm">
            {badge}
          </div>
        )}
      </div>
    </div>
  );
}
