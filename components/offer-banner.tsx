'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles, Send } from 'lucide-react';

export const OfferBanner: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-14 bg-gradient-to-r from-[#170f1e] via-[#21142a] to-[#170f1e] border-y border-[#342440] relative overflow-hidden">
      {/* Decorative ambient elements */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#b84663]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2b1a36] text-[#f4bac7] text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#f47293]" />
          <span>Exclusive VIP Kenyan Club</span>
        </div>

        <h2 className="font-serif italic text-3xl sm:text-4xl text-white font-normal tracking-wide">
          Sign Up for the Offer Updates
        </h2>
        
        <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-md mx-auto font-light">
          Get notified first when new viral TikTok stock lands in Nairobi, plus secret discount codes.
        </p>

        {submitted ? (
          <div className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-medium animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Thank you! You're on the VIP list for upcoming secret drops.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
            <div className="relative w-full">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0f0b14] border border-[#3b2b45] text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#b84663] transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#b84663] hover:bg-[#c95372] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg shrink-0 flex items-center justify-center gap-1.5"
            >
              <span>Subscribe</span>
              <Send className="w-3 h-3" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
