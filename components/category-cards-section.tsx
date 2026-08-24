'use client';

import React from 'react';
import { CATEGORY_CARDS } from '@/lib/products';
import { ProductCategory } from '@/lib/types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CategoryCardsSectionProps {
  onSelectCategory: (cat: ProductCategory) => void;
  activeCategory: ProductCategory;
}

export const CategoryCardsSection: React.FC<CategoryCardsSectionProps> = ({
  onSelectCategory,
  activeCategory,
}) => {
  return (
    <section id="categories" className="py-16 md:py-20 bg-[#0d0b11] border-b border-[#241c2b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title matching the elegant cursive styling */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <p className="font-serif italic text-3xl sm:text-4xl text-[#fbd1da] tracking-wide">
            Shop by Categories
          </p>
          <div className="w-16 h-0.5 bg-[#b84663] mx-auto mt-3 rounded-full" />
          <p className="text-xs text-neutral-400 mt-2 font-light">
            Select a collection to filter our body-safe intimate objects & essentials.
          </p>
        </div>

        {/* Categories Grid (4 columns desktop, 2 columns mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORY_CARDS.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  const shopEl = document.getElementById('shop');
                  if (shopEl) {
                    shopEl.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`group relative aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden text-left transition-all duration-300 transform active:scale-95 border ${
                  isSelected
                    ? 'border-[#b84663] ring-2 ring-[#b84663]/40 shadow-xl shadow-rose-950/40'
                    : 'border-[#28212e] hover:border-[#b84663]/60 hover:shadow-lg'
                }`}
              >
                {/* Image Background */}
                <img
                  src={cat.imageUrl}
                  alt={cat.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay for high-contrast legible white text */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c12]/90 via-[#0e0c12]/40 to-black/20 group-hover:from-[#0e0c12]/80 transition-colors" />

                {/* Card Text Content */}
                <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#f4bac7] opacity-90 mb-1">
                    {cat.subtitle}
                  </span>
                  <h3 className="font-sans font-black text-base sm:text-xl md:text-2xl text-white tracking-wider uppercase drop-shadow-md group-hover:text-rose-200 transition-colors">
                    {cat.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-neutral-300 font-medium mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Browse Collection</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#f47293]" />
                  </div>
                </div>

                {/* Selected Indicator Pill */}
                {isSelected && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#b84663] text-white text-[10px] font-bold shadow-md">
                    Active
                  </div>
                )}
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
