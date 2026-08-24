'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, X, ShoppingBag, MessageCircle, ShieldCheck, Zap, Droplets, Volume2, Star, Check } from 'lucide-react';
import { Product, ProductColor } from '@/lib/types';
import { WHATSAPP_PHONE } from '@/lib/products';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, color: ProductColor, quantity: number) => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(
    product ? product.colors[0] : null
  );
  const [selectedImage, setSelectedImage] = useState<string>(
    product ? product.mainImage : ''
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  // Sync state whenever product prop updates
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedImage(product.mainImage);
      setQuantity(1);
    }
  }, [product]);

  // Close on Escape key press
  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const activeColor = selectedColor || product.colors[0];
  const activeImage = selectedImage || product.mainImage;
  const price = product.salePrice ?? product.price;

  const handleColorSelect = (color: ProductColor) => {
    setSelectedColor(color);
    if (color.imageUrl) {
      setSelectedImage(color.imageUrl);
    }
  };

  const handleAdd = () => {
    onAddToCart(product, activeColor, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 600);
  };

  const whatsappMessage = `Hi Pink Pulse, I would like to order:
*${product.name}*
• Color: ${activeColor.name}
• Quantity: ${quantity}
• Total: KSh ${(price * quantity).toLocaleString()}
Please confirm delivery.`;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl bg-[#120d18] border border-[#382b42] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        
        {/* Sticky Mobile/Desktop Top Header with Clear Back Button */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-[#16101f]/95 backdrop-blur-md border-b border-[#282030]">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-semibold text-neutral-300 hover:text-white bg-[#22182d] hover:bg-[#2e203c] px-3 py-1.5 rounded-xl border border-[#3d2c47] transition-colors"
            aria-label="Go back to products"
          >
            <ArrowLeft className="w-4 h-4 text-[#f47293]" />
            <span>Back</span>
          </button>

          <span className="text-xs font-serif font-medium text-neutral-300 truncate max-w-[200px] sm:max-w-xs">
            {product.name}
          </span>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 overflow-y-auto flex-1">
          {/* Left: Gallery */}
          <div className="p-4 sm:p-6 bg-[#0d0912] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#231b28]">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900 border border-[#2b2133]">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#140f1a]/90 border border-[#382a42] text-[#f4bac7] text-[11px] font-bold">
                {product.categoryLabel}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {product.galleryImages.length > 1 && (
              <div className="flex items-center gap-2.5 mt-3 overflow-x-auto pb-1">
                {product.galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImage === img
                        ? 'border-[#b84663] scale-105'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="p-5 sm:p-6 flex flex-col justify-between space-y-5">
            <div>
              {/* Rating & Bestseller */}
              <div className="flex items-center gap-2 mb-1.5">
                <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-neutral-400 text-xs font-light">({product.reviewCount} reviews)</span>
                {product.isBestseller && (
                  <span className="ml-auto text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#b84663] text-white">
                    Bestseller 🔥
                  </span>
                )}
              </div>

              <h2 className="font-serif text-xl sm:text-2xl font-normal text-white">
                {product.name}
              </h2>
              <p className="text-xs text-[#f4bac7] font-medium mt-0.5">
                {product.tagline}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-2.5 my-3">
                <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  KSh {price.toLocaleString()}
                </span>
                {product.salePrice && (
                  <span className="text-xs text-neutral-400 line-through font-light">
                    KSh {product.price.toLocaleString()}
                  </span>
                )}
                <span className="text-xs text-emerald-400 font-medium ml-auto">
                  In Stock ({product.stockQuantity})
                </span>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed font-light">
                {product.description}
              </p>

              {/* Color Options */}
              {product.colors.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-semibold text-neutral-300">
                    Color: <span className="text-[#f4bac7]">{activeColor.name}</span>
                  </p>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleColorSelect(c)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition-all ${
                          activeColor.name === c.name
                            ? 'border-[#b84663] bg-[#221729] text-white font-bold'
                            : 'border-[#282030] bg-[#16101d] text-neutral-400 hover:border-[#382a42]'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Specs */}
              <div className="mt-4 pt-4 border-t border-[#231b28]">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-xl bg-[#0e0a13] border border-[#241c2b]">
                    <span className="text-neutral-400 text-[11px]">Material</span>
                    <p className="text-neutral-200 font-medium truncate">{product.specs.material}</p>
                  </div>
                  <div className="p-2 rounded-xl bg-[#0e0a13] border border-[#241c2b]">
                    <span className="text-neutral-400 text-[11px]">Modes</span>
                    <p className="text-neutral-200 font-medium truncate">{product.specs.vibrationModes}</p>
                  </div>
                  <div className="p-2 rounded-xl bg-[#0e0a13] border border-[#241c2b]">
                    <span className="text-neutral-400 text-[11px]">Waterproof</span>
                    <p className="text-neutral-200 font-medium truncate">{product.specs.waterproof}</p>
                  </div>
                  <div className="p-2 rounded-xl bg-[#0e0a13] border border-[#241c2b]">
                    <span className="text-neutral-400 text-[11px]">Sound</span>
                    <p className="text-neutral-200 font-medium truncate">{product.specs.noiseLevel}</p>
                  </div>
                </div>
              </div>

              {/* Discreet Packaging Note */}
              <div className="mt-3 p-2.5 rounded-xl bg-[#1a1222] border border-[#342440] text-xs text-[#f4bac7] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#f47293] shrink-0" />
                <span>100% Plain packaging. Zero novelty labels.</span>
              </div>
            </div>

            {/* Actions: Quantity + Add to Bag + WhatsApp */}
            <div className="pt-3 border-t border-[#231b28] space-y-2.5">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex items-center border border-[#382a42] rounded-xl bg-[#140f1a] px-2.5 py-1.5 text-xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-neutral-400 hover:text-white px-1.5 font-bold"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-bold text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-neutral-400 hover:text-white px-1.5 font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={addedAnimation}
                  className="flex-1 py-3 rounded-xl bg-[#b84663] hover:bg-[#c95372] text-white font-bold text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag • KSh {(price * quantity).toLocaleString()}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-[#1e1727] hover:bg-[#2a1f36] border border-[#3d2c47] text-neutral-300 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <a
                  href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-[#16101d] hover:bg-[#20182a] border border-emerald-500/30 text-emerald-400 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
