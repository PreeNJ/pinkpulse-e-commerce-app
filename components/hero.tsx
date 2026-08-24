'use client';

import React from 'react';
import { Shield, Sparkles, MessageCircle, ArrowRight, Truck, CheckCircle2, Heart } from 'lucide-react';
import { WHATSAPP_PHONE, WHATSAPP_DISPLAY } from '@/lib/products';
const originalRoseImg = '/products/the_original_rose_toy_1787511082867.jpg';
import { PinkPulseLogo } from './pink-pulse-logo';

interface HeroSectionProps {
  onExploreClick: () => void;
  onQuickOrderHero: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, onQuickOrderHero }) => {
  return (
    <section id="top" className="relative overflow-hidden bg-[#0c0a0e] border-b border-[#241d2a]">
      {/* Subtle Warm Silk Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#b84663]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#83263b]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Editorial Content Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Brand Tagline */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-[#1b1422] border border-[#3d2c47] text-[#f4bac7] text-xs font-semibold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f47293]" />
              <span>Intimate Wellness Kenya</span>
            </div>

            {/* Headline inspired by high-fashion editorial aesthetic */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.08]">
              Pleasure, designed <br className="hidden sm:inline" />
              <span className="italic text-[#f4bac7]">
                with intention.
              </span>
            </h1>

            {/* Subheading / Bio description */}
            <p className="text-neutral-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              Premium body-safe intimate toys in Kenya. 100% discreet packaging and fast countrywide delivery.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-white hover:bg-neutral-100 text-[#0c0a0e] font-semibold text-xs tracking-wider uppercase shadow-xl transition-all"
              >
                <span>Shop Collection</span>
              </button>

              <a
                href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hi Pink Pulse! I would like to place an order.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#16101d] hover:bg-[#20182a] border border-[#3d2c47] text-neutral-200 font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all hover:border-[#b84663]"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Micro Trust Strip */}
            <div className="pt-6 border-t border-[#231a28] grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#181120] border border-[#3d2c47] flex items-center justify-center text-[#f4bac7] shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">100% Discreet</p>
                  <p className="text-[11px] text-neutral-400">Plain unbranded box</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#181120] border border-[#3d2c47] flex items-center justify-center text-[#f4bac7] shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Same-Day Delivery</p>
                  <p className="text-[11px] text-neutral-400">Nairobi & Counties</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <div className="w-8 h-8 rounded-lg bg-[#181120] border border-[#3d2c47] flex items-center justify-center text-[#f4bac7] shrink-0">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">M-Pesa Verified</p>
                  <p className="text-[11px] text-neutral-400">Pay on delivery (NRB)</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Visual Imagery with warm sand / silk aesthetic */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Image Frame */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#382a42] shadow-2xl shadow-black/60 group bg-[#16121c]">
                <img
                  src={originalRoseImg}
                  alt="Pink Pulse Original Rose Toy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a0e] via-transparent to-transparent opacity-80" />

                {/* Floating Product Highlight Card */}
                <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-[#130e1a]/95 backdrop-blur-md border border-[#3d2c47] shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#b84663] text-white uppercase tracking-wider mb-1">
                        Viral Bestseller 🔥
                      </span>
                      <h2 className="text-sm font-serif font-bold text-white">
                        The Rose
                      </h2>
                      <p className="text-xs text-[#f4bac7] font-semibold mt-0.5">
                        KSh 2,000 <span className="text-neutral-400 line-through text-[11px]">KSh 2,500</span>
                      </p>
                    </div>

                    <button
                      onClick={onQuickOrderHero}
                      className="px-4 py-2 rounded-xl bg-[#b84663] hover:bg-[#c95372] text-white text-xs font-bold transition-colors shrink-0 flex items-center gap-1 shadow-md shadow-rose-950/40"
                    >
                      <span>Order Now</span>
                    </button>
                  </div>
                </div>

                {/* Top Badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-[#3d2c47] text-white text-xs font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#f4bac7]" />
                  <span>3 Colors In Stock</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
