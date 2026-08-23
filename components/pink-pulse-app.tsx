'use client';

import React, { useState, useEffect } from 'react';
import { SiteHeader } from '@/components/site-header';
import { HeroSection } from '@/components/hero';
import { TrustBadges } from '@/components/trust-badges';
import { ProductGrid } from '@/components/product-grid';
import { ProductQuickView } from '@/components/product-quick-view';
import { TikTokReviews } from '@/components/tiktok-reviews';
import { DiscreetDeliveryGuide } from '@/components/discreet-delivery-guide';
import { CartDrawer } from '@/components/cart-drawer';
import { WishlistDrawer } from '@/components/wishlist-drawer';
import { CheckoutModal } from '@/components/checkout-modal';
import { AgeGate } from '@/components/age-gate';
import { WhatsAppFloatingButton } from '@/components/whatsapp-floating-button';
import { SiteFooter } from '@/components/site-footer';
import { PRODUCTS } from '@/lib/products';
import { Product, ProductColor, CartItem, ProductCategory } from '@/lib/types';
import { Check, Heart, ShoppingBag } from 'lucide-react';

export default function PinkPulseApp() {
  const [products] = useState<Product[]>(PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Cart state persisted to localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('pinkpulse_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted to localStorage
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('pinkpulse_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals and Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Device & Browser Back Button navigation support for all modals
  const isAnyModalOpen = Boolean(isCartOpen || isWishlistOpen || isCheckoutOpen || quickViewProduct);

  useEffect(() => {
    if (!isAnyModalOpen) return;

    window.history.pushState({ pinkPulseModal: true }, '');

    const handlePopState = () => {
      setIsCartOpen(false);
      setIsWishlistOpen(false);
      setIsCheckoutOpen(false);
      setQuickViewProduct(null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isAnyModalOpen]);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<{ text: string; icon: 'cart' | 'wishlist' | 'success' } | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('pinkpulse_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('pinkpulse_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  const showToast = (text: string, icon: 'cart' | 'wishlist' | 'success' = 'cart') => {
    setToastMessage({ text, icon });
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (product: Product, color: ProductColor, quantity = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor.name === color.name
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, selectedColor: color, quantity }];
      }
    });

    showToast(`Added "${product.name}" (${color.name.split(' ')[0]}) to bag!`, 'cart');
  };

  const handleUpdateQuantity = (productId: string, colorName: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId && item.selectedColor.name === colorName) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveFromCart = (productId: string, colorName: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedColor.name === colorName)
      )
    );
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from favorites`, 'wishlist');
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to favorites!`, 'wishlist');
        return [...prev, product.id];
      }
    });
  };

  const handleExploreClick = () => {
    const shopEl = document.getElementById('shop');
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickOrderHero = () => {
    const heroProduct = products.find((p) => p.id === 'the-original-rose-toy') || products[0];
    if (heroProduct) {
      setQuickViewProduct(heroProduct);
    }
  };

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="pinkpulse-app min-h-screen bg-[#09080b] text-[#f4f2f4] flex flex-col font-sans relative selection:bg-pink-600 selection:text-white">
      {/* 18+ Age Gate Protection */}
      <AgeGate />

      {/* Global Navigation Header */}
      <SiteHeader
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          handleExploreClick();
        }}
        activeCategory={selectedCategory}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Seductive Hero Section */}
        <HeroSection
          onExploreClick={handleExploreClick}
          onQuickOrderHero={handleQuickOrderHero}
        />

        {/* 4 Pillars Trust Badges */}
        <TrustBadges />

        {/* Catalog & Filter Section */}
        <ProductGrid
          products={products}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onAddToCart={handleAddToCart}
          onQuickView={setQuickViewProduct}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
        />

        {/* TikTok & WhatsApp Social Proof Wall */}
        <TikTokReviews />

        {/* Discreet Delivery Guarantee & Kenya FAQ */}
        <DiscreetDeliveryGuide />
      </main>

      {/* Footer */}
      <SiteFooter
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          handleExploreClick();
        }}
      />

      {/* Persistent Floating WhatsApp Contact Icon */}
      <WhatsAppFloatingButton />

      {/* Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Shopping Bag Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Wishlist Slide-Over Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        products={wishlistProducts}
        onAddToCart={(p, c) => handleAddToCart(p, c, 1)}
        onRemoveFromWishlist={handleToggleWishlist}
      />

      {/* Discreet Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderCompleted={() => {
          setCartItems([]);
          showToast('Order placed successfully! We will contact you shortly.', 'success');
        }}
      />

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#140e1d] border border-pink-500/40 text-white text-xs shadow-2xl shadow-pink-950/80 animate-in fade-in slide-in-from-top-2">
          {toastMessage.icon === 'cart' && (
            <ShoppingBag className="w-4 h-4 text-pink-400 shrink-0" />
          )}
          {toastMessage.icon === 'wishlist' && (
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400 shrink-0" />
          )}
          {toastMessage.icon === 'success' && (
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span className="font-medium">{toastMessage.text}</span>
        </div>
      )}
    </div>
  );
}
