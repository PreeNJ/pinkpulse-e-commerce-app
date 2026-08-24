'use client';

import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, MessageCircle, Star } from 'lucide-react';
import { Product, ProductColor } from '@/lib/types';
import { WHATSAPP_PHONE } from '@/lib/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, color: ProductColor) => void;
  onQuickView: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  viewMode?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  isWishlisted,
  onToggleWishlist,
  viewMode = 'grid',
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [currentImage, setCurrentImage] = useState<string>(product.mainImage);

  const handleColorChange = (color: ProductColor) => {
    setSelectedColor(color);
    if (color.imageUrl) {
      setCurrentImage(color.imageUrl);
    }
  };

  const price = product.salePrice ?? product.price;
  const discountPercent = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : null;

  const whatsappMessage = `Hi Pink Pulse, I would like to order:
*${product.name}*
• Color: ${selectedColor.name}
• Price: KSh ${price.toLocaleString()}
Please confirm delivery.`;

  if (viewMode === 'list') {
    return (
      <article className="group flex flex-col sm:flex-row bg-[#130e1a] rounded-2xl border border-[#2b2133] hover:border-[#b84663]/60 transition-all duration-300 overflow-hidden shadow-lg p-4 gap-5 items-center">
        {/* List Image */}
        <div className="relative w-full sm:w-44 aspect-square sm:aspect-square bg-neutral-900 rounded-xl overflow-hidden shrink-0">
          <img
            src={currentImage}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          {discountPercent && (
            <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-[#b84663] text-white">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* List Info */}
        <div className="flex-1 space-y-2 text-left w-full">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#f4bac7]">
              {product.categoryLabel}
            </span>
            <div className="flex items-center gap-1 text-amber-400 text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-neutral-400">({product.reviewCount})</span>
            </div>
          </div>

          <h3
            onClick={() => onQuickView(product)}
            className="font-serif text-lg sm:text-xl font-normal text-white hover:text-[#f4bac7] transition-colors cursor-pointer"
          >
            {product.name}
          </h3>

          <p className="text-xs text-neutral-400 line-clamp-2 font-light">
            {product.description}
          </p>

          {/* Color swatches */}
          {product.colors.length > 1 && (
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[11px] text-neutral-400">Color:</span>
              <div className="flex items-center gap-1.5">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleColorChange(color)}
                    style={{ backgroundColor: color.hex }}
                    className={`w-3.5 h-3.5 rounded-full border border-white/20 transition-transform ${
                      selectedColor.name === color.name ? 'ring-2 ring-[#b84663] scale-125' : 'opacity-70'
                    }`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* List Actions */}
        <div className="w-full sm:w-56 shrink-0 flex flex-col justify-between sm:border-l sm:border-[#28212e] sm:pl-5 space-y-3">
          <div>
            <span className="text-xl font-bold text-white tracking-tight">
              KSh {price.toLocaleString()}
            </span>
            {product.salePrice && (
              <span className="text-xs text-neutral-400 line-through ml-2">
                KSh {product.price.toLocaleString()}
              </span>
            )}
            <p className="text-[11px] text-emerald-400 mt-0.5">Discreet Same-Day Delivery</p>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => onAddToCart(product, selectedColor)}
              className="w-full py-2.5 px-3 rounded-xl bg-[#b84663] hover:bg-[#c95372] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => onQuickView(product)}
                className="flex-1 py-2 rounded-xl bg-[#1b1422] hover:bg-[#231a2c] border border-[#382a42] text-neutral-300 text-xs flex items-center justify-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Specs</span>
              </button>
              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-2 rounded-xl border border-[#382a42] transition-colors ${
                  isWishlisted ? 'bg-[#b84663] text-white' : 'bg-[#1b1422] text-neutral-300'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-white' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Grid Mode
  return (
    <article className="group flex flex-col bg-[#130e1a] rounded-2xl border border-[#2b2133] hover:border-[#b84663]/60 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl hover:shadow-black/40">
      {/* Top Image Container */}
      <div className="relative aspect-[4/5] bg-neutral-900 overflow-hidden">
        <img
          src={currentImage}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&auto=format&fit=crop&q=80';
          }}
        />

        {/* Subtle Dark Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#130e1a] via-transparent to-transparent opacity-60 pointer-events-none" />

        {/* Badges Top Left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestseller && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#b84663] text-white shadow-md">
              Bestseller 🔥
            </span>
          )}
          {product.isRestocked && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#1d1624]/90 border border-[#3d2c47] text-[#f4bac7] shadow-md">
              Restocked
            </span>
          )}
          {discountPercent && (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#f4bac7] text-[#130e1a]">
              Save {discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button Top Right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all z-10 ${
            isWishlisted
              ? 'bg-[#b84663] text-white shadow-md'
              : 'bg-black/60 text-neutral-300 hover:text-[#f4bac7] hover:bg-black/80'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
        </button>

        {/* Quick View Specs Hover Button */}
        <div className="absolute inset-x-3 bottom-3 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <button
            onClick={() => onQuickView(product)}
            className="flex-1 py-2 rounded-xl bg-[#130e1a]/95 hover:bg-[#20182a] text-neutral-200 text-xs font-medium backdrop-blur-md border border-[#382a42] flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#f4bac7]" />
            <span>Quick Specs</span>
          </button>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
            <span className="uppercase tracking-wider text-[10px] font-bold text-[#f4bac7]">
              {product.categoryLabel}
            </span>
            <div className="flex items-center gap-1 text-amber-400 font-medium">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-neutral-400 text-[11px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-serif text-base sm:text-lg font-normal text-white group-hover:text-[#f4bac7] transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed font-light">
            {product.tagline}
          </p>

          {/* Color Switcher Swatches */}
          {product.colors.length > 1 && (
            <div className="flex items-center gap-2 mt-3 pt-2 border-t border-[#231b2a]">
              <span className="text-[11px] text-neutral-400 font-light">Color:</span>
              <div className="flex items-center gap-1.5">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleColorChange(color)}
                    style={{ backgroundColor: color.hex }}
                    className={`w-3.5 h-3.5 rounded-full transition-transform ${
                      selectedColor.name === color.name
                        ? 'ring-2 ring-[#b84663] scale-125'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    title={color.name}
                    aria-label={`Select ${color.name}`}
                  />
                ))}
              </div>
              <span className="text-[10px] text-neutral-300 ml-auto font-light truncate max-w-[90px]">
                {selectedColor.name.split(' ')[0]}
              </span>
            </div>
          )}
        </div>

        {/* Pricing & CTA Buttons */}
        <div className="pt-2 border-t border-[#231b2a] space-y-3">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-white tracking-tight">
                KSh {price.toLocaleString()}
              </span>
              {product.salePrice && (
                <span className="text-xs text-neutral-400 line-through">
                  KSh {product.price.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-400 font-medium bg-emerald-950/40 border border-emerald-500/20 px-1.5 py-0.5 rounded">
              In Stock
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onAddToCart(product, selectedColor)}
              className="py-2.5 px-3 rounded-xl bg-[#b84663] hover:bg-[#c95372] text-white text-xs font-bold shadow-md shadow-rose-950/30 flex items-center justify-center gap-1.5 transition-all active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>

            <a
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-[#181120] hover:bg-[#22182d] border border-[#3d2c47] text-emerald-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              title="Order directly on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};
