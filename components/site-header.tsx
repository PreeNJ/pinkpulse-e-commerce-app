'use client';

import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, MessageCircle, ShieldCheck, Phone, AtSign, Mail } from 'lucide-react';
import { WHATSAPP_PHONE, WHATSAPP_DISPLAY, EMAIL_ADDRESS, INSTAGRAM_HANDLE, INSTAGRAM_URL, TIKTOK_HANDLE, TIKTOK_URL } from '@/lib/products';
import { PinkPulseLogo } from './pink-pulse-logo';
import { ProductCategory } from '@/lib/types';

interface SiteHeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectCategory: (cat: ProductCategory) => void;
  activeCategory: ProductCategory;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  searchQuery,
  onSearchChange,
  onSelectCategory,
  activeCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Uncluttered, spacious essential categories for top bar
  const navCategories: { id: ProductCategory; label: string }[] = [
    { id: 'ladies-toys', label: 'Ladies Toys' },
    { id: 'men-toys', label: 'Men Toys' },
    { id: 'lovense', label: 'Couples' },
    { id: 'lubricants', label: 'Lubes & Care' },
    { id: 'dildos', label: 'Dildos & Glass' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0d0b10]/95 backdrop-blur-md border-b border-[#28212e]">
      {/* Top Utility Contact Bar */}
      <div className="bg-[#150f1a] px-4 py-1.5 text-xs text-neutral-300 border-b border-[#28212e]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4 text-[11px]">
            <a
              href={`tel:${WHATSAPP_PHONE}`}
              className="flex items-center gap-1.5 text-[#f4bac7] hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-[#f47293]" />
              <span>{WHATSAPP_DISPLAY}</span>
            </a>
            <span className="hidden sm:inline text-neutral-600">•</span>
            <a
              href={`mailto:${EMAIL_ADDRESS}`}
              className="hidden sm:flex items-center gap-1 text-neutral-400 hover:text-white transition-colors"
            >
              <Mail className="w-3 h-3 text-[#f47293]" />
              <span>{EMAIL_ADDRESS}</span>
            </a>
            <span className="hidden md:inline text-neutral-600">•</span>
            <div className="hidden md:flex items-center gap-1 text-neutral-400">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>100% Plain Discreet Packaging</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-[#f4bac7] flex items-center gap-1 transition-colors"
            >
              <span>TikTok</span>
            </a>
            <span className="text-neutral-600">|</span>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-[#f4bac7] flex items-center gap-1 transition-colors"
            >
              <AtSign className="w-3 h-3" />
              <span className="hidden md:inline">{INSTAGRAM_HANDLE}</span>
            </a>
            <span className="text-neutral-600">|</span>
            <a
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hi Pink Pulse! I would like to place an order or make an inquiry.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-300 hover:text-rose-300 hover:bg-neutral-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Official Pink Pulse Brand Logo */}
          <a href="#top" className="flex items-center">
            <PinkPulseLogo size="md" variant="horizontal" />
          </a>

          {/* Desktop Navigation Links - Spacious and Uncluttered */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase transition-colors rounded-md ${
                activeCategory === 'all'
                  ? 'text-[#f4bac7] font-semibold border-b border-[#b84663]'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              Shop
            </button>
            {navCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase transition-colors rounded-md ${
                  activeCategory === cat.id
                    ? 'text-[#f4bac7] font-semibold border-b border-[#b84663]'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
            <a
              href="#categories"
              className="px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase text-neutral-300 hover:text-white transition-colors"
            >
              Categories
            </a>
            <a
              href="#reviews"
              className="px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase text-neutral-300 hover:text-white transition-colors"
            >
              Reviews
            </a>
            <a
              href="#discreet-delivery"
              className="px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase text-neutral-300 hover:text-white transition-colors"
            >
              Shipping
            </a>
          </nav>

          {/* Right Action Icons & Search */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Input */}
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center bg-[#181320] border border-[#d9778e]/50 rounded-full px-3 py-1.5 w-44 sm:w-60 transition-all">
                  <Search className="w-3.5 h-3.5 text-[#f47293] shrink-0 mr-2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search Rose, Wand, Lube..."
                    className="bg-transparent text-xs text-white placeholder:text-neutral-400 focus:outline-none w-full"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      onSearchChange('');
                      setSearchOpen(false);
                    }}
                    className="text-neutral-400 hover:text-white text-xs ml-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2.5 rounded-full text-neutral-300 hover:text-rose-300 hover:bg-[#1b1524] transition-colors"
                  aria-label="Search products"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 rounded-full text-neutral-300 hover:text-rose-300 hover:bg-[#1b1524] transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#b84663] text-[10px] font-bold text-white flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-[#b84663] to-[#99344d] hover:from-[#c95372] hover:to-[#aa3d56] text-white shadow-md shadow-rose-950/40 transition-all active:scale-95"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-bold">{cartCount}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#28212e] bg-[#110d17] px-4 py-5 space-y-4">
          <p className="text-[11px] uppercase tracking-widest text-[#f4bac7] font-semibold px-2">
            Shop By Collection
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onSelectCategory('all');
                setMobileMenuOpen(false);
              }}
              className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeCategory === 'all'
                  ? 'bg-[#b84663] text-white font-bold'
                  : 'text-neutral-300 hover:bg-[#1b1524]'
              }`}
            >
              All Items
            </button>
            {navCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-[#b84663] text-white font-bold'
                    : 'text-neutral-300 hover:bg-[#1b1524]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-neutral-800/80 flex flex-col gap-2">
            <a
              href="#categories"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-xs text-neutral-300 hover:text-white"
            >
              🛍️ All Categories Gallery
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-xs text-neutral-300 hover:text-white"
            >
              ⭐ Customer Reviews
            </a>
            <a
              href="#discreet-delivery"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-xs text-neutral-300 hover:text-white"
            >
              📦 Discreet Packaging & Kenya Delivery
            </a>
            <a
              href={`mailto:${EMAIL_ADDRESS}`}
              className="px-3 py-2 text-xs text-neutral-300 hover:text-white flex items-center gap-2"
            >
              <Mail className="w-3.5 h-3.5 text-[#f47293]" />
              <span>Email Us: {EMAIL_ADDRESS}</span>
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hi Pink Pulse! I am ready to place an order.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-md transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
