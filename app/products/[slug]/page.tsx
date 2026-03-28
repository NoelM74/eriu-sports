"use client";

import { use, useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/products';
import { ShoppingCart, Heart, ShieldCheck, Truck } from 'lucide-react';

export default function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [activeImage, setActiveImage] = useState<number>(0);

  if (!product) {
    notFound();
  }

  const sizes = ['S', 'M', 'L', 'XL'];

  return (
    <div className="bg-white min-h-screen text-[var(--color-foreground)]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
          
          {/* Image Gallery */}
          <div className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, idx) => (
                  <button
                    key={idx}
                    className={`relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-zinc-100 text-sm font-medium uppercase text-gray-900 overflow-hidden outline-none ${
                        activeImage === idx ? 'ring-2 ring-[var(--color-eriu-emerald)] ring-offset-2' : ''
                    }`}
                    onClick={() => setActiveImage(idx)}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} view ${idx + 1}`}
                      fill
                      className="object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Main Image */}
            <div className="aspect-[4/5] w-full bg-zinc-100 rounded-lg overflow-hidden group shadow-md p-4 bg-gradient-to-t from-zinc-200 to-white">
              <Image
                src={product.images[activeImage] || '/placeholder.png'}
                alt={product.title}
                width={800}
                height={1000}
                className="h-full w-full object-contain object-center sm:rounded-lg"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-10 px-4 sm:px-0 lg:mt-0">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 uppercase">
              {product.title}
            </h1>
            
            <div className="mt-4 flex items-center gap-4">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl font-bold tracking-tight text-gray-900">
                €{product.price.toFixed(2)}
              </p>
              <div className="bg-red-100 text-red-800 text-xs px-2 py-1 uppercase font-bold tracking-wider rounded-sm animate-pulse">
                Selling Fast
              </div>
            </div>

            <div className="mt-8">
              <h3 className="sr-only">Description</h3>
              <div className="space-y-4 text-base text-[var(--color-heather-grey)] leading-relaxed font-light whitespace-pre-line">
                {product.description}
              </div>
            </div>

            {/* Size Selector */}
            <form className="mt-10">
              <div className="mt-6 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-widest">
                  Size
                </h3>
              </div>

              <div className="mt-4 grid grid-cols-4 gap-4">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`group relative flex items-center justify-center rounded-sm border px-4 py-4 text-sm font-medium uppercase transition-colors sm:flex-1 ${
                      selectedSize === size
                        ? 'bg-[var(--color-atlantic-teal)] border-transparent text-white shadow-xl transform scale-105'
                        : 'bg-white border-zinc-200 text-zinc-900 hover:bg-zinc-50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              
              {!selectedSize && (
                <p className="text-sm text-red-500 font-medium mt-3 italic">
                  * Please select a size
                </p>
              )}

              {/* Add to Cart CTA */}
              <div className="mt-10 flex border-t border-zinc-200 pt-8 gap-x-4">
                <button
                  type="button"
                  disabled={!selectedSize}
                  className={`flex max-w-xs flex-1 items-center justify-center rounded-sm border border-transparent px-8 py-4 text-base font-extrabold uppercase text-white shadow-lg transition-all ${
                    !selectedSize 
                      ? 'bg-zinc-400 cursor-not-allowed' 
                      : 'bg-[var(--color-eriu-emerald)] hover:bg-[var(--color-midnight-navy)] hover:scale-105 hover:shadow-2xl'
                  } sm:w-full`}
                >
                  {selectedSize ? `Add to Bag - €${product.price.toFixed(2)}` : 'Select Size'}
                </button>
                <button
                  type="button"
                  className="ml-4 flex items-center justify-center rounded-sm px-4 py-3 text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Heart className="h-8 w-8 flex-shrink-0" aria-hidden="true" />
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
            </form>

            {/* Trust Signals */}
            <div className="mt-8 border-t border-zinc-200 pt-8 flex flex-col gap-4">
              <div className="flex items-center text-sm text-[var(--color-heather-grey)]">
                <Truck className="h-5 w-5 mr-3 text-[var(--color-atlantic-teal)]" />
                <span>Ready to dispatch. Fast delivery worldwide.</span>
              </div>
              <div className="flex items-center text-sm text-[var(--color-heather-grey)]">
                <ShieldCheck className="h-5 w-5 mr-3 text-[var(--color-atlantic-teal)]" />
                <span>Authenticity Guaranteed. Quality verified retro classics.</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
