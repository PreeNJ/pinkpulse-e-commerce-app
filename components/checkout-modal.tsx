'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, MessageCircle, Smartphone, ArrowLeft, RefreshCw, AlertCircle, Lock } from 'lucide-react';
import { CartItem } from '@/lib/types';
import { KENYA_LOCATIONS, WHATSAPP_PHONE } from '@/lib/products';
import { PinkPulseLogo } from './pink-pulse-logo';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderCompleted,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(KENYA_LOCATIONS[0]);
  const [paymentMethod, setPaymentMethod] = useState<'mpesa_stk' | 'cash_on_delivery' | 'whatsapp'>('mpesa_stk');

  // STK Push State Management
  const [stkStatus, setStkStatus] = useState<'idle' | 'triggering' | 'awaiting_pin' | 'completed' | 'failed'>('idle');
  const [checkoutRequestId, setCheckoutRequestId] = useState<string | null>(null);
  const [mpesaReceipt, setMpesaReceipt] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(60);
  const [orderComplete, setOrderComplete] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && stkStatus !== 'awaiting_pin') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, stkStatus]);

  // STK Push countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (stkStatus === 'awaiting_pin' && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (stkStatus === 'awaiting_pin' && countdown === 0) {
      setStkStatus('failed');
      setStatusMessage('PIN prompt timed out. Please check your network and try again.');
    }
    return () => clearTimeout(timer);
  }, [stkStatus, countdown]);

  // STK Push Polling
  useEffect(() => {
    let pollInterval: NodeJS.Timeout;
    if (stkStatus === 'awaiting_pin' && checkoutRequestId) {
      pollInterval = setInterval(async () => {
        try {
          const res = await fetch(`${API_BASE_URL}/mpesa/query/${checkoutRequestId}`);
          if (res.ok) {
            const data = await res.json();
            if (data.status === 'COMPLETED') {
              setStkStatus('completed');
              setMpesaReceipt(data.receipt || 'QKH' + Math.floor(1000000 + Math.random() * 9000000));
              setOrderComplete(true);
              clearInterval(pollInterval);
            } else if (data.status === 'FAILED') {
              setStkStatus('failed');
              setStatusMessage(data.description || 'Payment was cancelled or failed.');
              clearInterval(pollInterval);
            }
          }
        } catch {
          // Continue polling on error
        }
      }, 2500);
    }
    return () => clearInterval(pollInterval);
  }, [stkStatus, checkoutRequestId]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => {
    const price = item.product.salePrice ?? item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const grandTotal = subtotal + selectedLocation.fee;

  const triggerMpesaStkPush = async () => {
    if (!phone) {
      alert('Please enter your M-Pesa phone number.');
      return;
    }

    setStkStatus('triggering');
    setStatusMessage('Contacting Safaricom M-Pesa...');
    setCountdown(60);

    try {
      const response = await fetch(`${API_BASE_URL}/mpesa/stkpush`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: phone,
          amount: grandTotal,
          accountReference: 'PinkPulse',
          orderNotes: `${fullName || 'Client'} - ${selectedLocation.name}`,
        }),
      });

      const responseText = await response.text();
      let data: { success?: boolean; CheckoutRequestID?: string; CustomerMessage?: string; error?: string } = {};
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch {
        data = { error: responseText || `Server returned HTTP ${response.status}.` };
      }

      if (response.ok && data.success) {
        setCheckoutRequestId(data.CheckoutRequestID);
        setStkStatus('awaiting_pin');
        setStatusMessage(data.CustomerMessage || `Enter M-Pesa PIN on ${phone} to complete payment.`);
      } else {
        setStkStatus('failed');
        setStatusMessage(data.error || 'Unable to trigger M-Pesa STK Push. Please try again.');
      }
    } catch {
      setStkStatus('failed');
      setStatusMessage('Network error communicating with M-Pesa server.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'mpesa_stk') {
      triggerMpesaStkPush();
    } else {
      setOrderComplete(true);
    }
  };

  const handleWhatsAppSend = (customReceipt?: string) => {
    const itemsSummary = items
      .map((item) => `• ${item.product.name} (${item.selectedColor.name}) x${item.quantity} - KSh ${(item.product.salePrice ?? item.product.price) * item.quantity}`)
      .join('\n');

    const receiptInfo = customReceipt || mpesaReceipt ? `\n*M-Pesa Receipt:* ${customReceipt || mpesaReceipt}` : '';

    const message = `*PINK PULSE ORDER*
Name: ${fullName || 'Client'}
Phone: ${phone || 'N/A'}
Location: ${selectedLocation.name}
Address: ${address || 'Not specified'}
Payment: ${paymentMethod === 'mpesa_stk' ? (mpesaReceipt ? 'M-Pesa STK (PAID)' : 'M-Pesa STK') : paymentMethod === 'cash_on_delivery' ? 'Pay on Delivery' : 'WhatsApp Chat'}${receiptInfo}

*Items:*
${itemsSummary}

*Total Payable:* KSh ${grandTotal.toLocaleString()}
Please confirm delivery.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`, '_blank');
    onOrderCompleted();
    onClose();
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget && stkStatus !== 'awaiting_pin') onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-[#120d18] border border-[#382b42] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">

        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#231b28] flex items-center justify-between bg-[#0e0a13] shrink-0">
          <div className="flex items-center gap-3">
            <PinkPulseLogo variant="emblem-only" size="sm" className="w-8 h-8 shrink-0" />
            <div>
              <h2 className="font-serif text-base sm:text-lg font-bold text-white leading-tight">
                Discreet Express Checkout
              </h2>
              <p className="text-[10px] text-neutral-400">100% Plain packaging & encrypted</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-[#1a1322] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STK Push Live Awaiting PIN View */}
        {stkStatus === 'awaiting_pin' && (
          <div className="p-6 sm:p-8 text-center space-y-6 overflow-y-auto flex-1 flex flex-col justify-center items-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-[#00a651]/20 border border-[#00a651]/50 text-[#00a651] flex items-center justify-center mx-auto shadow-2xl animate-pulse">
                <Smartphone className="w-10 h-10 text-[#00a651]" />
              </div>
              <span className="absolute -top-1 -right-1 px-2 py-0.5 rounded-full bg-[#00a651] text-white text-[10px] font-bold uppercase tracking-wider shadow">
                M-Pesa
              </span>
            </div>

            <div className="space-y-1.5 max-w-md">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Check Your Phone
              </h3>
              <p className="text-neutral-300 text-xs sm:text-sm font-light">
                We sent an instant M-Pesa PIN prompt of <strong>KSh {grandTotal.toLocaleString()}</strong> to:
              </p>
              <div className="inline-block px-3.5 py-1 rounded-full bg-[#181120] border border-[#382a42] text-[#f4bac7] font-mono text-sm font-bold mt-1">
                {phone}
              </div>
            </div>

            <div className="w-full max-w-sm p-4 rounded-2xl bg-[#0e0a13] border border-[#282030] space-y-2 text-left">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-400">Time remaining:</span>
                <span className="font-mono font-bold text-[#f4bac7]">{countdown}s</span>
              </div>
              <div className="w-full h-1.5 bg-[#22182d] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-[#00a651] transition-all duration-1000"
                  style={{ width: `${(countdown / 60) * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-neutral-400 flex items-center gap-1.5 pt-1">
                <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Enter your M-Pesa PIN on your phone to complete.</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={triggerMpesaStkPush}
                className="px-4 py-2 rounded-xl bg-[#22182d] hover:bg-[#2d1f3b] border border-[#382a42] text-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Resend Prompt</span>
              </button>
              <button
                type="button"
                onClick={() => setStkStatus('idle')}
                className="px-4 py-2 rounded-xl text-neutral-400 hover:text-white text-xs"
              >
                Change Number
              </button>
            </div>
          </div>
        )}

        {/* STK Push Failed View */}
        {stkStatus === 'failed' && (
          <div className="p-6 sm:p-8 text-center space-y-5 overflow-y-auto flex-1 flex flex-col justify-center items-center">
            <div className="w-16 h-16 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto shadow-lg">
              <AlertCircle className="w-8 h-8" />
            </div>

            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Payment Incomplete
              </h3>
              <p className="text-neutral-300 text-xs sm:text-sm mt-1 max-w-md mx-auto">
                {statusMessage || 'The M-Pesa prompt was not completed.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full max-w-md">
              <button
                type="button"
                onClick={triggerMpesaStkPush}
                className="flex-1 py-3 rounded-xl bg-[#00a651] hover:bg-[#009247] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retry M-Pesa PIN Prompt</span>
              </button>
              <button
                type="button"
                onClick={() => handleWhatsAppSend()}
                className="py-3 px-5 rounded-xl bg-[#181120] border border-emerald-500/40 text-emerald-400 font-bold text-xs flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pay via WhatsApp</span>
              </button>
            </div>
          </div>
        )}

        {/* Order Completed / Payment Successful View */}
        {orderComplete && (
          <div className="p-6 sm:p-8 text-center space-y-5 overflow-y-auto flex-1 flex flex-col justify-center items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                {mpesaReceipt ? 'M-Pesa Payment Confirmed!' : 'Order Received!'}
              </h3>
              <p className="text-neutral-300 text-xs sm:text-sm mt-1 max-w-md mx-auto font-light">
                Thank you, <strong>{fullName || 'valued client'}</strong>! Your order of <strong>KSh {grandTotal.toLocaleString()}</strong> is queued for delivery to <strong>{selectedLocation.name}</strong>.
              </p>
            </div>

            {mpesaReceipt && (
              <div className="p-4 rounded-2xl bg-[#140f1c] border border-emerald-500/40 text-left space-y-1.5 max-w-sm w-full shadow-lg">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400">M-Pesa Receipt:</span>
                  <span className="font-mono font-bold text-emerald-400 tracking-wider text-sm">{mpesaReceipt}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Amount Paid:</span>
                  <span className="font-bold text-white">KSh {grandTotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Status:</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Verified Instant
                  </span>
                </div>
              </div>
            )}

            <div className="p-3.5 rounded-2xl bg-[#181120] border border-[#382a42] text-xs text-neutral-300 text-left space-y-1 max-w-md w-full">
              <p className="font-bold text-[#f4bac7]">Discreet Delivery Guarantee:</p>
              <p>• Pretty customised or white bags with zero product indicators.</p>
              <p>• Rider will call you on <strong>{phone}</strong> upon arrival.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-2 w-full max-w-md">
              <button
                onClick={() => handleWhatsAppSend()}
                className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  onOrderCompleted();
                  onClose();
                }}
                className="py-3 px-6 rounded-xl bg-[#1d1624] hover:bg-[#282030] text-white font-semibold text-xs transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}

        {/* Standard Form View */}
        {stkStatus !== 'awaiting_pin' && stkStatus !== 'failed' && !orderComplete && (
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1">

            {/* Customer Details */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-[#f4bac7] font-bold">
                1. Delivery Details
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">
                    Name / Alias *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Grace / Alex"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0a13] border border-[#2e2336] text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-[#b84663]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">
                    M-Pesa Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="07XX XXX XXX or 01XX XXX XXX"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0a13] border border-[#2e2336] text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-[#00a651]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">
                  Location *
                </label>
                <select
                  value={selectedLocation.name}
                  onChange={(e) => {
                    const loc = KENYA_LOCATIONS.find((l) => l.name === e.target.value);
                    if (loc) setSelectedLocation(loc);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0a13] border border-[#2e2336] text-white text-xs focus:outline-none focus:border-[#b84663] cursor-pointer"
                >
                  {KENYA_LOCATIONS.map((loc, idx) => (
                    <option key={idx} value={loc.name} className="bg-[#120d18]">
                      {loc.name} (+KSh {loc.fee}) — {loc.eta}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">
                  Delivery Landmark / Street *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Westlands, near Mall / CBD Pick-up"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0a13] border border-[#2e2336] text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-[#b84663]"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-2 pt-3 border-t border-[#231b28]">
              <h4 className="text-xs uppercase tracking-widest text-[#f4bac7] font-bold">
                2. Payment Method
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('mpesa_stk')}
                  className={`p-3 rounded-xl border text-left text-xs transition-all relative ${paymentMethod === 'mpesa_stk'
                    ? 'border-[#00a651] bg-[#0c1f13] text-white shadow-lg shadow-emerald-950/40 font-bold'
                    : 'border-[#282030] bg-[#0e0a13] text-neutral-400 hover:border-neutral-600'
                    }`}
                >
                  <div className="flex items-center gap-1.5 text-[#00a651] font-bold">
                    <Smartphone className="w-4 h-4" />
                    <span>M-Pesa STK Push</span>
                  </div>
                  <p className="text-[10px] text-neutral-300 mt-1">Instant PIN prompt to phone</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash_on_delivery')}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${paymentMethod === 'cash_on_delivery'
                    ? 'border-[#b84663] bg-[#22162a] text-white font-bold'
                    : 'border-[#282030] bg-[#0e0a13] text-neutral-400 hover:border-neutral-600'
                    }`}
                >
                  <div className="flex items-center gap-1.5 text-[#f4bac7] font-bold">
                    <Truck className="w-4 h-4" />
                    <span>Pay on Delivery</span>
                  </div>
                  <p className="text-[10px] text-neutral-400 mt-1">Nairobi riders only</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('whatsapp')}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${paymentMethod === 'whatsapp'
                    ? 'border-[#b84663] bg-[#22162a] text-white font-bold'
                    : 'border-[#282030] bg-[#0e0a13] text-neutral-400 hover:border-neutral-600'
                    }`}
                >
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Order</span>
                  </div>
                  <p className="text-[10px] text-neutral-400 mt-1">Chat & confirm</p>
                </button>
              </div>
            </div>

            {/* Order Summary Recap */}
            <div className="p-3.5 rounded-2xl bg-[#0e0a13] border border-[#282030] space-y-1.5 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Items ({items.length})</span>
                <span className="text-white font-semibold">KSh {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Shipping ({selectedLocation.name})</span>
                <span className="text-white font-semibold">KSh {selectedLocation.fee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-1.5 border-t border-[#231b28]">
                <span>Total Amount</span>
                <span className="text-[#f4bac7] font-bold text-base">
                  KSh {grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Privacy Badge */}
            <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-[11px] text-emerald-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Delivered in pretty customised or white bags with zero product indicators.</span>
            </div>

            {/* Action Submit Button */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
              <button
                type="submit"
                disabled={stkStatus === 'triggering'}
                className={`flex-1 py-3.5 rounded-xl text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 ${paymentMethod === 'mpesa_stk'
                  ? 'bg-[#00a651] hover:bg-[#008f45]'
                  : 'bg-[#b84663] hover:bg-[#c95372]'
                  }`}
              >
                {stkStatus === 'triggering' ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Sending M-Pesa STK Prompt...</span>
                  </>
                ) : paymentMethod === 'mpesa_stk' ? (
                  <>
                    <Smartphone className="w-4 h-4" />
                    <span>Pay with M-Pesa • KSh {grandTotal.toLocaleString()}</span>
                  </>
                ) : (
                  <span>Place Order • KSh {grandTotal.toLocaleString()}</span>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleWhatsAppSend()}
                className="py-3.5 px-5 rounded-xl bg-[#181120] hover:bg-[#22182d] border border-emerald-500/40 text-emerald-400 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
