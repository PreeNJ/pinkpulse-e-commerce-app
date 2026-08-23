'use client';

import React from 'react';
import { Package, ShieldCheck, HeartHandshake, Zap } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const guarantees = [
    {
      icon: Package,
      title: 'Discreet by Default',
      description: 'Delivered in pretty customised or white gift bags with zero indication of contents or adult items. Total peace of mind.',
    },
    {
      icon: Zap,
      title: 'Swift Kenya Delivery',
      description: 'Same-day 1–3 hr delivery in Nairobi via discreet rider. Reliable next-day parcel delivery across Kenya.',
    },
    {
      icon: ShieldCheck,
      title: 'Medical-Grade Body Safe',
      description: '100% Non-porous, hypoallergenic silicone. Velvet-touch finish, phthalate-free, and waterproof.',
    },
    {
      icon: HeartHandshake,
      title: '100% Confidential Support',
      description: 'Friendly, judgment-free customer advice on WhatsApp. Discreet payment via M-Pesa.',
    },
  ];

  return (
    <section className="bg-[#0e0b12] border-y border-[#231b28] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-5 rounded-2xl bg-[#140f1a] border border-[#2b2033] hover:border-[#b84663]/40 transition-colors shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1d1624] border border-[#382a42] flex items-center justify-center text-[#f4bac7] shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
