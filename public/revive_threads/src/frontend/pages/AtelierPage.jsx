import React, { useState } from 'react';

export default function AtelierPage({ triggerToast, setActivePage }) {
  const [selectedFabric, setSelectedFabric] = useState('Vintage Silk Saree');
  const [selectedSilhouette, setSelectedSilhouette] = useState({
    name: 'Tailored Festive Blazer',
    quote: 2400
  });

  const fabrics = [
    { title: 'Vintage Silk Saree', desc: 'Kanjeevaram, Banarasi, Paithani, or Chanderi silk' },
    { title: 'Worn Denim Pieces', desc: '2–3 pairs of old rigid or washed denim jeans' },
    { title: 'Handloom Cotton / Khadi', desc: 'Pure handspun sarees or traditional dhotis' },
    { title: 'Heirloom Dupatta / Shawl', desc: 'Heavy zardozi or phulkari embroidered dupattas' }
  ];

  const silhouettes = [
    { name: 'Tailored Festive Blazer', quote: 2400, est: '₹2,400', desc: 'Structured shoulder pads, peak lapels, contrast satin lining' },
    { name: 'Corset Top & Co-ord Set', quote: 1950, est: '₹1,950', desc: 'Structured boning bodice with matching wrap skirt' },
    { name: 'Pre-Stitched Contemporary Anarkali', quote: 2600, est: '₹2,600', desc: 'Modern flared silhouette ready to zip and wear' },
    { name: 'Quilted Denim Laptop Tote', quote: 1400, est: '₹1,400', desc: 'Reinforced leather handles and padded laptop compartment' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    try {
      await fetch('/api/atelier-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: form.cust_name.value,
          customer_phone: form.cust_phone.value,
          fabric_type: selectedFabric,
          target_silhouette: selectedSilhouette.name,
          quote_inr: selectedSilhouette.quote
        })
      });
    } catch (err) {
      console.log('Error submitting atelier request:', err);
    }
    triggerToast('Atelier consultation request confirmed! Master Rafiq will contact you via WhatsApp.');
    setActivePage('home');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-terracotta-100 border border-terracotta-200 text-terracotta-800 text-xs font-bold rounded-full uppercase tracking-wider">
          <svg className="w-3.5 h-3.5 text-terracotta-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879a3 3 0 11-4.242-4.242L9.88 9.88" />
          </svg>
          <span>Revive Atelier Bespoke Redesign Studio</span>
        </div>
        <h1 className="font-cormorant text-4xl sm:text-5xl text-forest">Redesign Your Sentimental Clothes</h1>
        <p className="text-sm text-sage-700 leading-relaxed">
          Have vintage silk sarees or unworn denim jeans sitting in trunks? Transform them into bespoke modern tailored blazers, corset tops, or structured tote bags with master pattern-makers.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-linen-300 p-8 sm:p-14 shadow-lg space-y-10 text-sm">
        
        {/* Step 1: Fabric Selection */}
        <div className="space-y-4">
          <div className="font-bold text-base text-forest flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-forest text-white text-xs flex items-center justify-center font-bold">1</span>
            <span>Select Your Raw Textile</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fabrics.map((item, idx) => (
              <label
                key={idx}
                className={`p-5 border rounded-2xl flex items-start gap-4 cursor-pointer transition-all shadow-2xs ${
                  selectedFabric === item.title ? 'bg-linen-50 border-forest' : 'border-linen-300 hover:bg-linen-50/50'
                }`}
              >
                <input
                  type="radio"
                  name="atelier_fabric"
                  checked={selectedFabric === item.title}
                  onChange={() => setSelectedFabric(item.title)}
                  className="mt-1 accent-forest"
                />
                <div>
                  <div className="font-bold text-forest">{item.title}</div>
                  <div className="text-xs text-sage-600 mt-0.5">{item.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Step 2: Silhouette Selection */}
        <div className="space-y-4 pt-4 border-t border-linen-200">
          <div className="font-bold text-base text-forest flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-forest text-white text-xs flex items-center justify-center font-bold">2</span>
            <span>Select Your Target Modern Silhouette</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {silhouettes.map((sil, idx) => (
              <label
                key={idx}
                className={`p-5 border rounded-2xl flex items-start justify-between gap-4 cursor-pointer transition-all shadow-2xs ${
                  selectedSilhouette.name === sil.name ? 'bg-linen-50 border-forest' : 'border-linen-300 hover:bg-linen-50/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="atelier_silhouette"
                    checked={selectedSilhouette.name === sil.name}
                    onChange={() => setSelectedSilhouette({ name: sil.name, quote: sil.quote })}
                    className="mt-1 accent-forest"
                  />
                  <div>
                    <div className="font-bold text-forest">{sil.name}</div>
                    <div className="text-xs text-sage-600 mt-0.5">{sil.desc}</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-forest bg-linen-100 px-3 py-1.5 rounded-lg shrink-0 border border-linen-200">
                  {sil.est}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Step 3: Measurement & Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6 pt-4 border-t border-linen-200">
          <div className="font-bold text-base text-forest flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-forest text-white text-xs flex items-center justify-center font-bold">3</span>
            <span>Artisan Consultation & Doorstep Fabric Pickup</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-forest/80 mb-2">Your Full Name</label>
              <input
                name="cust_name"
                required
                defaultValue="Ananya Sen"
                className="w-full px-4 py-3 text-sm bg-linen-50/50 border border-linen-300 rounded-xl focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500 shadow-2xs font-sans"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-forest/80 mb-2">WhatsApp Phone Number</label>
              <input
                name="cust_phone"
                required
                defaultValue="+91 98112 45890"
                className="w-full px-4 py-3 text-sm bg-linen-50/50 border border-linen-300 rounded-xl focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500 shadow-2xs font-sans"
              />
            </div>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-950 text-xs sm:text-sm flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879a3 3 0 11-4.242-4.242L9.88 9.88" />
            </svg>
            <div>
              <strong>Transparent Pricing Guarantee:</strong> Total estimate ₹{selectedSilhouette.quote.toLocaleString('en-IN')}. Includes doorstep raw fabric pickup, master tailor video consultation, pattern drafting, and delivery within 10 days.
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-forest hover:bg-sage-900 text-white font-semibold rounded-2xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4 text-sage-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879a3 3 0 11-4.242-4.242L9.88 9.88" />
            </svg>
            <span>Confirm Artisan Consultation & Fabric Pickup →</span>
          </button>
        </form>

      </div>

    </div>
  );
}
