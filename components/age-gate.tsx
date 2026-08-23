'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
import { PinkPulseLogo } from './pink-pulse-logo';

export const AgeGate: React.FC = () => {
  const [isVerified, setIsVerified] = useState(true);

  useEffect(() => {
    const verified = sessionStorage.getItem('pinkpulse_age_verified');
    if (!verified) {
      setIsVerified(false);
    }
  }, []);

  const handleConfirm = () => {
    sessionStorage.setItem('pinkpulse_age_verified', 'true');
    setIsVerified(true);
  };

  if (isVerified) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="w-full max-w-md bg-[#120d18] border border-[#3d2c47] rounded-3xl p-8 text-center shadow-2xl space-y-6">
        
        {/* Brand Logo Circular Emblem */}
        <PinkPulseLogo size="lg" variant="circle" showTagline={true} />

        <p className="text-xs text-neutral-300 leading-relaxed font-light">
          This site contains intimate wellness objects and adult novelties intended strictly for consenting adults. Please confirm you are <strong>18 years of age or older</strong> to enter.
        </p>

        <div className="space-y-3 pt-2">
          <button
            onClick={handleConfirm}
            className="w-full py-3.5 rounded-xl bg-[#b84663] hover:bg-[#c95372] text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-rose-950/50 transition-all active:scale-95"
          >
            I am 18 or older — Enter Boutique
          </button>

          <a
            href="https://www.google.com"
            className="block w-full py-3 rounded-xl bg-[#1a1322] hover:bg-[#231a2c] text-neutral-400 hover:text-white text-xs font-semibold transition-colors"
          >
            Exit Site
          </a>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-400 pt-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#f47293]" />
          <span>100% Confidential & Secure Experience</span>
        </div>

      </div>
    </div>
  );
};
