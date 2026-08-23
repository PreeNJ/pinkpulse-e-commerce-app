'use client';

import React, { useEffect } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, MessageCircle, ShieldCheck, ArrowLeft } from 'lucide-react';
import { CartItem } from '@/lib/types';
import { WHATSAPP_PHONE } from '@/lib/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, colorName: string, delta: number) => void;
  onRemoveItem: (productId: string, colorName: string) => void;
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
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

  const subtotal = items.reduce((sum, item) => {
    const price = item.product.salePrice ?? item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const formattedItemsText = items
    .map(
      (item, i) =>
        `${i + 1}. *${item.product.name}* (${item.selectedColor.name}) x${item.quantity} = KSh ${(
          (item.product.salePrice ?? item.product.price) * item.quantity
        ).toLocaleString()}`
    )
    .join('\n');

  const whatsappCheckoutMessage = `Hi Pink Pulse, I would like to order:

${formattedItemsText}

*Total: KSh ${subtotal.toLocaleString()}*
Please confirm delivery.`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
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
              <h2 className="font-serif text-lg font-normal text-white">Your Bag</h2>
              <span className="px-2 py-0.5 rounded-full bg-[#1e1524] text-[#f4bac7] text-xs font-bold border border-[#382a42]">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-[#1a1322] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-4 divide-y divide-[#231b28]">
            {items.length > 0 ? (
              items.map((item, idx) => {
                const price = item.product.salePrice ?? item.product.price;
                return (
                  <div key={`${item.product.id}-${item.selectedColor.name}-${idx}`} className="pt-4 first:pt-0 flex gap-3.5">
                    <img
                      src={item.selectedColor.imageUrl || item.product.mainImage}
                      alt={item.product.name}
                      className="w-18 h-20 sm:w-20 sm:h-24 object-cover rounded-xl bg-neutral-900 border border-[#2b2133] shrink-0"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-xs sm:text-sm font-normal text-white line-clamp-1 font-serif">
                            {item.product.name}
                          </h3>
                          <button
                            onClick={() => onRemoveItem(item.product.id, item.selectedColor.name)}
                            className="text-neutral-500 hover:text-rose-400 transition-colors p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-1.5 mt-0.5 text-xs text-neutral-400">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span>{item.selectedColor.name}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-[#382a42] rounded-lg bg-[#0e0a13] px-2 py-0.5 text-xs">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.selectedColor.name, -1)}
                            className="text-neutral-400 hover:text-white px-1 font-bold"
                          >
                            -
                          </button>
                          <span className="w-6 text-center font-bold text-white">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.selectedColor.name, 1)}
                            className="text-neutral-400 hover:text-white px-1 font-bold"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-xs sm:text-sm font-bold text-white">
                          KSh {(price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16">
                <ShoppingBag className="w-10 h-10 text-[#f47293]/30 mx-auto mb-2" />
                <p className="font-serif text-base text-white">Your bag is empty</p>
                <p className="text-xs text-neutral-400 mt-1 max-w-xs mx-auto font-light">
                  Browse our discreet collection.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-5 py-2 rounded-xl bg-[#b84663] hover:bg-[#c95372] text-white text-xs font-bold transition-colors"
                >
                  Shop Now
                </button>
              </div>
            )}
          </div>

          {/* Footer Subtotal & Action Buttons */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#231b28] bg-[#0e0a13] space-y-3">
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">KSh {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Packaging</span>
                  <span className="text-emerald-400 font-medium">Free & Discreet</span>
                </div>
                <div className="flex items-center justify-between text-sm font-bold text-white pt-1.5 border-t border-[#231b28]">
                  <span>Total</span>
                  <span className="text-base sm:text-lg font-bold text-white">
                    KSh {subtotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(whatsappCheckoutMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 rounded-xl bg-[#181120] hover:bg-[#22182d] border border-emerald-500/40 text-emerald-400 font-bold text-xs flex items-center justify-center gap-1.5 shadow transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    onClose();
                    onOpenCheckout();
                  }}
                  className="py-3 rounded-xl bg-[#b84663] hover:bg-[#c95372] text-white font-bold text-xs flex items-center justify-center gap-1 shadow transition-all"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-1 text-[11px] text-neutral-400 pt-1">
                <ShieldCheck className="w-3 h-3 text-[#f47293]" />
                <span>100% Plain Unbranded Box</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
