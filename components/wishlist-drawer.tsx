'use client';

import React, { useEffect } from 'react';
import { X, Heart, ShoppingBag, Trash2, MessageCircle, ArrowLeft } from 'lucide-react';
import { Product, ProductColor } from '@/lib/types';
import { WHATSAPP_PHONE } from '@/lib/products';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddToCart: (product: Product, color: ProductColor) => void;
  onRemoveFromWishlist: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  products,
  onAddToCart,
  onRemoveFromWishlist,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#120d18] border-l border-[#2b2133] flex flex-col justify-between shadow-2xl">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#231b28] flex items-center justify-between bg-[#150f1d]">
            <div className="flex items-center gap-2.5">
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-neutral-300 hover:text-white bg-[#22182d] border border-[#382a42] flex items-center gap-1 text-xs"
                aria-label="Back"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <h2 className="font-serif text-lg font-normal text-white">Wishlist</h2>
              <span className="px-2 py-0.5 rounded-full bg-[#1e1524] text-[#f4bac7] text-xs font-bold border border-[#382a42]">
                {products.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-[#1a1322] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List of Wishlist Products */}
          <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-4 divide-y divide-[#231b28]">
            {products.length > 0 ? (
              products.map((product) => {
                const price = product.salePrice ?? product.price;
                return (
                  <div key={product.id} className="pt-4 first:pt-0 flex gap-3.5">
                    <img
                      src={product.mainImage}
                      alt={product.name}
                      className="w-18 h-20 sm:w-20 sm:h-24 object-cover rounded-xl bg-neutral-900 border border-[#2b2133] shrink-0"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-xs sm:text-sm font-normal text-white font-serif line-clamp-1">
                            {product.name}
                          </h3>
                          <button
                            onClick={() => onRemoveFromWishlist(product)}
                            className="text-neutral-500 hover:text-rose-400 transition-colors p-1"
                            aria-label="Remove from wishlist"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-white mt-1">
                          KSh {price.toLocaleString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={() => {
                            onAddToCart(product, product.colors[0]);
                            onRemoveFromWishlist(product);
                          }}
                          className="flex-1 py-2 px-3 rounded-xl bg-[#b84663] hover:bg-[#c95372] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Bag</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16">
                <Heart className="w-10 h-10 text-neutral-600 mx-auto mb-2" />
                <p className="font-serif text-base text-white">No saved items</p>
                <p className="text-xs text-neutral-400 mt-1 max-w-xs mx-auto font-light">
                  Tap the heart icon on any product to save it.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          {products.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#231b28] bg-[#0e0a13]">
              <a
                href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hi Pink Pulse! I have items saved in my wishlist and would like to order.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-[#181120] hover:bg-[#22182d] border border-emerald-500/40 text-emerald-400 font-bold text-xs flex items-center justify-center gap-2 shadow transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
