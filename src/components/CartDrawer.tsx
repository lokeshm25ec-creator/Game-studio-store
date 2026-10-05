import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Key, CheckCircle, CreditCard, Sparkles, Copy, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartSubtotal, checkoutOrder, setActiveTab } = useStore();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [email, setEmail] = useState('operative.player@aeonforge.net');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet' | 'crypto'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{ orderId: string; activationKeys: string[] } | null>(null);
  const [copiedKeyIndex, setCopiedKeyIndex] = useState<number | null>(null);

  if (!isCartOpen) return null;

  const discountAmount = promoApplied ? cartSubtotal * 0.15 : 0;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'AEON15' || promoCode.trim().toUpperCase() === 'FORGE') {
      setPromoApplied(true);
    } else {
      alert('Invalid promo code. Try "AEON15" for 15% off your studio order.');
    }
  };

  const handleCheckout = () => {
    if (!email || !email.includes('@')) {
      alert('Please provide a valid email address for digital license delivery.');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      const order = checkoutOrder(email, paymentMethod === 'card' ? 'Credit Card' : paymentMethod === 'wallet' ? 'Studio Wallet' : 'Direct Crypto');
      setIsProcessing(false);
      setCompletedOrder(order);
    }, 900);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyIndex(index);
    setTimeout(() => setCopiedKeyIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0e111a] border-l border-white/[0.08] shadow-2xl flex flex-col justify-between z-10">
          {/* Header */}
          <div className="px-6 py-5 border-b border-white/[0.08] flex items-center justify-between bg-[#0b0d14]">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-lg text-white">
                {completedOrder ? 'Order Confirmed' : 'Your Shopping Bag'}
              </span>
              {!completedOrder && (
                <span className="text-xs font-mono text-slate-400">
                  ({cart.length} items)
                </span>
              )}
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                setCompletedOrder(null);
              }}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {completedOrder ? (
              /* Success / Order Confirmation View */
              <div className="space-y-6 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Thank You For Your Order!
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Order confirmation #{completedOrder.orderId} sent to <span className="text-amber-400 font-mono">{email}</span>.
                  </p>
                </div>

                {completedOrder.activationKeys.length > 0 && (
                  <div className="text-left space-y-3 p-4 rounded-xl bg-black/50 border border-white/10">
                    <div className="flex items-center gap-2 text-xs font-mono text-amber-300 uppercase">
                      <Key className="w-4 h-4" />
                      <span>Your Digital Activation Keys:</span>
                    </div>

                    <div className="space-y-2">
                      {completedOrder.activationKeys.map((key, i) => (
                        <div key={i} className="flex items-center justify-between p-2.5 rounded bg-white/[0.04] border border-white/[0.08]">
                          <span className="font-mono text-xs text-white tracking-widest selection:bg-amber-400 selection:text-black">
                            {key}
                          </span>
                          <button
                            onClick={() => copyToClipboard(key, i)}
                            className="p-1.5 rounded hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                            title="Copy key"
                          >
                            {copiedKeyIndex === i ? (
                              <Check className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-400">
                      These titles have automatically been registered into your <strong className="text-white">Studio Vault</strong>.
                    </p>
                  </div>
                )}

                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setCompletedOrder(null);
                      setActiveTab('library');
                    }}
                    className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm transition-colors cursor-pointer"
                  >
                    Open In My Library
                  </button>

                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setCompletedOrder(null);
                    }}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
                  >
                    Continue Browsing Store
                  </button>
                </div>
              </div>
            ) : cart.length === 0 ? (
              /* Empty Cart */
              <div className="h-full flex flex-col items-center justify-center text-center py-16 text-slate-400 space-y-4">
                <div className="w-14 h-14 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-slate-500">
                  <Key className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-base font-medium text-slate-200">Your bag is empty</p>
                  <p className="text-xs text-slate-400 mt-1">Explore our games, DLCs, and studio gear.</p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-4 py-2 rounded-lg bg-amber-400 text-black font-semibold text-xs transition-colors cursor-pointer"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              /* Itemized Cart List */
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.cartId}
                    className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07] flex gap-3 items-center justify-between"
                  >
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-black shrink-0 border border-white/10">
                      <img src={item.image} alt={item.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 min-w-0 pr-2">
                      <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                      {item.editionName && (
                        <p className="text-[11px] text-amber-300/80 truncate">{item.editionName}</p>
                      )}
                      {item.platform && (
                        <p className="text-[10px] text-slate-400 font-mono">{item.platform}</p>
                      )}
                      <p className="text-xs font-mono font-semibold tabular-nums text-white mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => removeFromCart(item.cartId)}
                        className="text-slate-400 hover:text-rose-400 transition-colors cursor-pointer p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-1.5 bg-black/40 rounded px-1.5 py-0.5 border border-white/10 text-xs">
                        <button
                          onClick={() => updateQuantity(item.cartId, -1)}
                          className="text-slate-400 hover:text-white cursor-pointer px-1"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono tabular-nums text-white text-xs">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartId, 1)}
                          className="text-slate-400 hover:text-white cursor-pointer px-1"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Promo Code Input */}
                <form onSubmit={applyPromo} className="pt-2 flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code (e.g. AEON15)"
                    disabled={promoApplied}
                    className="flex-1 bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 uppercase font-mono"
                  />
                  <button
                    type="submit"
                    disabled={promoApplied}
                    className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white font-medium transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {promoApplied ? 'Applied' : 'Apply'}
                  </button>
                </form>

                {promoApplied && (
                  <p className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>15% Studio Launch discount applied!</span>
                  </p>
                )}

                {/* Account Delivery Binding */}
                <div className="pt-2 space-y-2">
                  <label className="block text-xs font-medium text-slate-400">
                    License Delivery Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    placeholder="you@email.com"
                  />
                </div>

                {/* Payment Method Selector */}
                <div className="pt-2 space-y-2">
                  <label className="block text-xs font-medium text-slate-400">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2 rounded-lg border text-xs text-center transition-all cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'bg-amber-400/15 border-amber-400 text-white font-medium'
                          : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      Credit Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('wallet')}
                      className={`p-2 rounded-lg border text-xs text-center transition-all cursor-pointer ${
                        paymentMethod === 'wallet'
                          ? 'bg-amber-400/15 border-amber-400 text-white font-medium'
                          : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      Studio Wallet
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('crypto')}
                      className={`p-2 rounded-lg border text-xs text-center transition-all cursor-pointer ${
                        paymentMethod === 'crypto'
                          ? 'bg-amber-400/15 border-amber-400 text-white font-medium'
                          : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      Crypto (USDC)
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer (if not completed and cart has items) */}
          {!completedOrder && cart.length > 0 && (
            <div className="p-6 border-t border-white/[0.08] bg-[#0b0d14] space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-slate-200">${cartSubtotal.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount (15%)</span>
                    <span className="font-mono tabular-nums">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>Digital Taxes & Processing</span>
                  <span className="font-mono tabular-nums text-slate-400">$0.00</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/[0.08]">
                  <span>Total Amount</span>
                  <span className="font-mono tabular-nums text-amber-400">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm transition-all shadow-lg hover:shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Processing Secure Order...</span>
                ) : (
                  <>
                    <span>Confirm Order & Activate</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant key delivery · Zero platform fees</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
