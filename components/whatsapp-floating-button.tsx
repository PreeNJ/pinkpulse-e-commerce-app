'use client';

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { WHATSAPP_PHONE } from '@/lib/products';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2.5">
      {showTooltip && (
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#140f1d] border border-emerald-500/40 text-neutral-200 text-xs shadow-2xl shadow-black/80 animate-in fade-in slide-in-from-right-2 duration-300">
          <span className="w-2 h-2 rounded-full bg-[#25D366] shrink-0" />
          <span className="font-medium whitespace-nowrap">WhatsApp support</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-neutral-400 hover:text-white ml-0.5 p-0.5 rounded-full transition-colors"
            aria-label="Close tooltip"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      <a
        href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hi Pink Pulse, I would like to place an order or make an inquiry.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-2xl shadow-emerald-950/70 hover:scale-105 active:scale-95 transition-all shrink-0"
        aria-label="WhatsApp Pink Pulse"
      >
        <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
      </a>
    </div>
  );
};

