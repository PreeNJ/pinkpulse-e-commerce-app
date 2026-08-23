'use client';

import React from 'react';
import { Star, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';
import { TESTIMONIALS, TIKTOK_HANDLE, TIKTOK_URL, WHATSAPP_PHONE } from '@/lib/products';
import { PinkPulseLogo } from './pink-pulse-logo';

export const TikTokReviews: React.FC = () => {
  return (
    <section id="reviews" className="bg-[#0b090e] py-16 md:py-24 border-t border-[#231b28] relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#b84663]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1b1422] border border-[#382b42] text-[#f4bac7] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#f47293]" />
            <span>Community Love • Verified Client Feedback</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white">
            Real Reviews, Real Pleasure.
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm mt-3 font-light">
            Genuine feedback from our WhatsApp client family and TikTok community across Kenya.
          </p>
        </div>

        {/* Discreet Community Banner */}
        <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-[#140f1c] border border-[#342440] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <PinkPulseLogo variant="emblem-only" size="md" className="w-13 h-13 shrink-0" />
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h3 className="text-sm font-bold text-white">Pink Pulse Kenya</h3>
                <a
                  href={TIKTOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#271930] hover:bg-[#341f40] text-[#f4bac7] border border-[#3d2c47] transition-colors"
                >
                  {TIKTOK_HANDLE}
                </a>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5 font-light">
                Discreet packaging nationwide • 100% confidential
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-center shrink-0">
            <div className="px-3 py-1.5 rounded-xl bg-[#0e0a13] border border-[#2b2133]">
              <p className="text-xs font-bold text-[#f4bac7]">100% Confidential</p>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-[#0e0a13] border border-[#2b2133]">
              <p className="text-xs font-bold text-emerald-400">Fast Kenya Dispatch</p>
            </div>
          </div>
        </div>

        {/* WhatsApp & TikTok Chat Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="p-5 rounded-2xl bg-[#120d18] border border-[#2b2133] hover:border-[#b84663]/40 transition-all flex flex-col justify-between shadow-lg"
            >
              <div>
                {/* Header with Source Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    <MessageCircle className="w-2.5 h-2.5" />
                    <span>Verified</span>
                  </span>
                </div>

                {/* Quote Bubble */}
                <div className="relative p-3.5 rounded-xl bg-[#0d0912] border border-[#221929] mb-4 text-xs text-neutral-200 leading-relaxed font-light italic">
                  "{review.comment}"
                </div>
              </div>

              {/* Author & Location */}
              <div className="pt-3 border-t border-[#221929] flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white flex items-center gap-1">
                    {review.customerName}
                    <CheckCircle2 className="w-3 h-3 text-[#f47293]" />
                  </p>
                  <p className="text-[10px] text-neutral-400 font-light">{review.location}</p>
                </div>
                <span className="text-[10px] text-neutral-400 font-light">
                  {review.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Callout action */}
        <div className="mt-12 text-center">
          <p className="text-xs text-neutral-400 font-light">
            Have questions before ordering?
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hi Pink Pulse! I saw your reviews and would like to ask a few questions before ordering.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#181120] hover:bg-[#22182d] border border-emerald-500/40 text-emerald-400 text-xs font-semibold shadow transition-all"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
