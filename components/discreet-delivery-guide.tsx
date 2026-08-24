'use client';

import React, { useState } from 'react';
import { Package, Shield, Truck, CreditCard, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { KENYA_LOCATIONS, FAQS } from '@/lib/products';

export const DiscreetDeliveryGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const steps = [
    {
      number: '01',
      icon: Package,
      title: 'Customised & White Bags',
      description: 'Your item is safely packed in pretty customised or plain white gift bags with zero product indicators, logos, or adult descriptions.',
    },
    {
      number: '02',
      icon: CreditCard,
      title: 'Discreet Payment & Name',
      description: 'Pay safely via M-Pesa. Your transaction confirmation will never contain any adult novelty words or sensitive product details.',
    },
    {
      number: '03',
      icon: Truck,
      title: 'Direct Discreet Delivery',
      description: 'Nairobi parcels are dispatched with private riders (Bolt / Sendy). Countrywide orders travel via reliable parcel couriers.',
    },
  ];

  return (
    <section id="discreet-delivery" className="bg-[#0b080e] py-16 md:py-24 border-t border-[#231b28]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1b1422] border border-[#382b42] text-[#f4bac7] text-xs font-bold uppercase tracking-wider mb-3">
            <Shield className="w-3.5 h-3.5 text-[#f47293]" />
            <span>Complete Discretion Guaranteed</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white">
            How Discreet Delivery Works
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm mt-3 font-light">
            We understand privacy is essential. From packaging to doorstep handover, your order is 100% confidential.
          </p>
        </div>

        {/* 3 Steps Process */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative p-6 rounded-3xl bg-[#130e1a] border border-[#2b2133] hover:border-[#b84663]/50 transition-all space-y-4 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#1c1524] border border-[#382a42] flex items-center justify-center text-[#f4bac7]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-serif text-3xl font-light text-[#4a3656]">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  {step.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Kenya Delivery Rates Table & FAQs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Shipping Rates Table */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-[#130e1a] border border-[#2b2133] shadow-lg">
            <div className="flex items-center gap-2 text-[#f4bac7] text-xs font-bold uppercase tracking-wider mb-4">
              <MapPin className="w-4 h-4 text-[#f47293]" />
              <span>Kenya Shipping Zones & Timelines</span>
            </div>
            
            <div className="space-y-3">
              {KENYA_LOCATIONS.map((loc, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0e0a13] border border-[#241c2b] text-xs"
                >
                  <div>
                    <p className="font-semibold text-white">{loc.name}</p>
                    <p className="text-[11px] text-neutral-400 font-light">{loc.eta}</p>
                  </div>
                  <span className="font-bold text-[#f4bac7]">
                    KSh {loc.fee}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-neutral-400 mt-4 italic font-light">
              * Same-day delivery available for orders placed before 4:00 PM in Nairobi.
            </p>
          </div>

          {/* Privacy & Shopping FAQs */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-[#130e1a] border border-[#2b2133] shadow-lg">
            <h3 className="text-lg font-serif font-normal text-white mb-4">
              Frequently Asked Privacy Questions
            </h3>

            <div className="space-y-3">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-[#241c2b] bg-[#0e0a13] overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-medium text-neutral-200 hover:text-white"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#f47293] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="p-4 pt-0 text-xs text-neutral-300 leading-relaxed font-light border-t border-[#1e1724]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
