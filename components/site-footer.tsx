'use client';

import React from 'react';
import { ShieldCheck, MessageCircle, Phone, Mail, MapPin, Truck, AtSign } from 'lucide-react';
import { WHATSAPP_PHONE, WHATSAPP_DISPLAY, EMAIL_ADDRESS, TIKTOK_HANDLE, TIKTOK_URL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from '@/lib/products';
import { PinkPulseLogo } from './pink-pulse-logo';
import { ProductCategory } from '@/lib/types';

interface SiteFooterProps {
  onSelectCategory: (cat: ProductCategory) => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ onSelectCategory }) => {
  return (
    <footer className="bg-[#0a080d] border-t border-[#231b29] text-neutral-400 text-xs">
      {/* Top Value Reassurance Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-[#1c1522] grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-3">
          <div className="w-10 h-10 rounded-full bg-[#181120] border border-[#3d2c47] text-[#f4bac7] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-white text-sm">Discreet Packaging Always</p>
            <p className="text-[11px] text-neutral-400">Plain unbranded packaging with zero adult labeling</p>
          </div>
        </div>

        <div className="flex items-center justify-center md:justify-start gap-3">
          <div className="w-10 h-10 rounded-full bg-[#181120] border border-[#3d2c47] text-emerald-400 flex items-center justify-center shrink-0">
            <span className="text-sm font-black">KSh</span>
          </div>
          <div>
            <p className="font-bold text-white text-sm">Discreet M-Pesa Payment</p>
            <p className="text-[11px] text-neutral-400">Fast, confidential Kenyan mobile payment</p>
          </div>
        </div>

        <div className="flex items-center justify-center md:justify-start gap-3">
          <div className="w-10 h-10 rounded-full bg-[#181120] border border-[#3d2c47] text-[#f47293] flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-white text-sm">Fast Kenya Dispatch</p>
            <p className="text-[11px] text-neutral-400">Same-day Nairobi riders & countrywide parcel couriers</p>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Brand Info, Contacts & Redirects */}
          <div className="lg:col-span-2 space-y-4">
            <PinkPulseLogo size="md" variant="horizontal" />
            
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm font-light">
              Kenya’s premier intimate wellness brand offering body-safe, luxurious, and reliable adult novelties. Fast discreet delivery countrywide.
            </p>

            <div className="pt-1 space-y-2 text-neutral-300 text-xs">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#f47293]" />
                <span>Call: <strong className="text-white">{WHATSAPP_DISPLAY}</strong></span>
              </p>
              <a
                href={`mailto:${EMAIL_ADDRESS}`}
                className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#f47293]" />
                <span>Email: <strong className="text-white underline">{EMAIL_ADDRESS}</strong></span>
              </a>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#f47293]" />
                <span>Nairobi, Kenya • Nationwide Delivery</span>
              </p>
            </div>

            {/* Pure Single WhatsApp + Direct Social Channels */}
            <div className="pt-2">
              <p className="text-[11px] text-neutral-400 uppercase tracking-wider font-semibold mb-2">
                Connect With Us
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hi Pink Pulse! I would like to make an inquiry.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow transition-all"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={TIKTOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-[#140e1b] hover:bg-[#20182b] border border-[#2c2035] text-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <span>TikTok ({TIKTOK_HANDLE})</span>
                </a>

                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-[#140e1b] hover:bg-[#20182b] border border-[#2c2035] text-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <AtSign className="w-3.5 h-3.5 text-[#f47293]" />
                  <span>Instagram</span>
                </a>

                <a
                  href={`mailto:${EMAIL_ADDRESS}`}
                  className="px-3.5 py-2 rounded-xl bg-[#140e1b] hover:bg-[#20182b] border border-[#2c2035] text-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#f47293]" />
                  <span>Email Us</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Collections */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-white font-bold font-serif">
              Collections
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectCategory('ladies-toys')}
                  className="hover:text-[#f4bac7] transition-colors"
                >
                  Ladies Toys & Roses
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('men-toys')}
                  className="hover:text-[#f4bac7] transition-colors"
                >
                  Men Pleasure Sleeves
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('lovense')}
                  className="hover:text-[#f4bac7] transition-colors"
                >
                  App Control & Remote
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('bondage')}
                  className="hover:text-[#f4bac7] transition-colors"
                >
                  Bondage & Couples
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('lubricants')}
                  className="hover:text-[#f4bac7] transition-colors"
                >
                  Flavored Lubes & Care
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('dildos')}
                  className="hover:text-[#f4bac7] transition-colors"
                >
                  Glass Wand & Dildos
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Customer Care & Delivery */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-white font-bold font-serif">
              Customer Support
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#discreet-delivery" className="hover:text-[#f4bac7] transition-colors">
                  Discreet Packaging Guide
                </a>
              </li>
              <li>
                <a href="#discreet-delivery" className="hover:text-[#f4bac7] transition-colors">
                  Kenya Delivery & Rates
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#f4bac7] transition-colors">
                  Client Reviews & Proof
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL_ADDRESS}?subject=Pink%20Pulse%20Inquiry`} className="hover:text-[#f4bac7] transition-colors">
                  Email Customer Support
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hi Pink Pulse, how do I clean and care for my silicone toy?')}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#f4bac7] transition-colors">
                  Toy Cleaning & Care Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Confidentiality Notice */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-white font-bold font-serif">
              18+ Disclaimer
            </h4>
            <p className="text-[11px] text-neutral-400 leading-relaxed font-light">
              Pink Pulse products are intended solely for consenting adults aged 18 and older. All products undergo rigorous quality inspection and are crafted with 100% body-safe materials.
            </p>
            <div className="pt-2 flex items-center gap-2 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Anonymous Delivery</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar with PRAIRIE Agency Credits */}
        <div className="mt-16 pt-8 pb-24 sm:pb-16 border-t border-[#1c1522] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <p>© {new Date().getFullYear()} Pink Pulse Kenya. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-neutral-300">
            <span>Made with love by</span>
            <span className="font-bold text-[#f4bac7] tracking-wider uppercase">PRAIRIE</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
