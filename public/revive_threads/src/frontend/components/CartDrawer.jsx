import React, { useState } from 'react';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  removeFromBag,
  clearCart,
  triggerToast,
  setActivePage
}) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price || item.rental_price_3_day || 0), 0);
  const cartTotal = cartSubtotal > 0 ? cartSubtotal + 50 : 0;

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: form.name.value,
          customer_phone: form.phone.value,
          customer_email: form.email.value,
          shipping_address: form.address.value,
          item_id: cart[0]?.id || 'prod-101',
          item_title: cart[0]?.title || 'Circular Garment Order',
          order_type: 'buy',
          total_amount: cartTotal,
          deposit_amount: 0
        })
      });
    } catch (err) {
      console.log('Error creating order:', err);
    }

    setIsCheckoutOpen(false);
    onClose();
    clearCart();
    triggerToast('Order confirmed with Escrow Protection! Tracking link dispatched via SMS.');
    setActivePage('home');
  };

  if (!isOpen && !isCheckoutOpen) return null;

  return (
    <>
      {/* Slide-Over Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-forest/40 backdrop-blur-xs" onClick={onClose}></div>
          <div className="relative ml-auto max-w-md w-full bg-white shadow-2xl flex flex-col justify-between p-6 z-10 animate-fadeIn">
            <div>
              <div className="flex items-center justify-between border-b border-linen-200 pb-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <h3 className="font-cormorant text-2xl text-forest">Your Circular Bag</h3>
                </div>
                <button onClick={onClose} className="text-sage-500 hover:text-forest p-1 rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="py-4 space-y-3 max-h-[60vh] overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="text-center py-10 text-sage-500 space-y-2">
                    <svg className="w-8 h-8 mx-auto text-sage-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <p className="text-xs">Your circular bag is empty.</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-linen-50 rounded-2xl border border-linen-200">
                      <img src={item.image} alt={item.title} className="w-14 h-14 object-cover rounded-xl" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-xs text-forest line-clamp-1">{item.title}</h4>
                        <div className="text-[10px] text-sage-600">Size: {item.size} • {item.condition}</div>
                        <div className="text-xs font-bold text-forest mt-0.5">₹{(item.price || item.rental_price_3_day).toLocaleString('en-IN')}</div>
                      </div>
                      <button
                        onClick={() => removeFromBag(item.id)}
                        className="text-sage-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-white transition-colors"
                        title="Remove item"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="border-t border-linen-200 pt-4 space-y-2.5 text-xs">
              <div className="flex justify-between text-sage-700">
                <span>Subtotal:</span>
                <span className="font-mono font-semibold text-forest">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sage-700">
                <span>Escrow Protection:</span>
                <span className="font-mono text-emerald-700 font-semibold">FREE (Guaranteed)</span>
              </div>
              <div className="flex justify-between text-sage-700">
                <span>Eco Shipping & Sanitization:</span>
                <span className="font-mono text-forest">₹50</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-forest border-t border-linen-200 pt-2">
                <span>Total Payable:</span>
                <span className="font-mono text-base text-forest">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>

              <button
                disabled={cart.length === 0}
                onClick={() => { onClose(); setIsCheckoutOpen(true); }}
                className="w-full py-3 bg-forest hover:bg-sage-900 disabled:opacity-50 text-white font-semibold rounded-xl transition-all shadow-md mt-2 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 text-sage-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Proceed to Escrow Checkout →</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-forest/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-linen-300 shadow-2xl p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto animate-fadeIn">
            <div className="flex items-center justify-between border-b border-linen-200 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sage-600">Secure Escrow Checkout</span>
                <h3 className="font-cormorant text-2xl text-forest">Delivery & Payment</h3>
              </div>
              <button onClick={() => setIsCheckoutOpen(false)} className="text-sage-500 hover:text-forest p-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-forest mb-1">Full Name</label>
                <input
                  name="name"
                  required
                  defaultValue="Sneha Nair"
                  className="w-full px-3 py-2 border border-linen-300 rounded-xl focus:outline-none focus:border-sage-500 font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-forest mb-1">Phone Number</label>
                  <input
                    name="phone"
                    required
                    defaultValue="+91 99201 33451"
                    className="w-full px-3 py-2 border border-linen-300 rounded-xl focus:outline-none focus:border-sage-500 font-sans"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-forest mb-1">Email</label>
                  <input
                    name="email"
                    type="email"
                    required
                    defaultValue="sneha.nair@gmail.com"
                    className="w-full px-3 py-2 border border-linen-300 rounded-xl focus:outline-none focus:border-sage-500 font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-forest mb-1">Delivery Address</label>
                <textarea
                  name="address"
                  required
                  rows="2"
                  defaultValue="Flat 402, Green Glen Layout, Bellandur, Bengaluru - 560103"
                  className="w-full px-3 py-2 border border-linen-300 rounded-xl focus:outline-none focus:border-sage-500 font-sans"
                ></textarea>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-[11px] leading-snug">
                <strong>100% Escrow Protection:</strong> Funds are held securely in Escrow until you receive and inspect your items. Payout to seller is only released once you confirm satisfaction.
              </div>

              <div className="flex items-center justify-between text-sm font-bold text-forest pt-2 border-t border-linen-200">
                <span>Total Amount:</span>
                <span className="font-mono text-base">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-forest hover:bg-sage-900 text-white font-semibold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Authorize Escrow Order (₹{cartTotal.toLocaleString('en-IN')})</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
