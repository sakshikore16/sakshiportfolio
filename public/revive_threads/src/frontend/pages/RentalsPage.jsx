import React, { useState } from 'react';

export default function RentalsPage({ products, onViewProduct, onAddToBag }) {
  const [rentalCategory, setRentalCategory] = useState('all');

  const rentalTabs = [
    { id: 'all', label: 'All Occasion Rentals' },
    { id: 'lehenga', label: '👑 Heavy Bridal Lehengas' },
    { id: 'gown', label: '✨ Evening & Gala Gowns' },
    { id: 'sharara', label: '🪡 Heavy Shararas & Ghararas' },
    { id: 'saree', label: '🥻 Heritage Silk Sarees' },
    { id: 'mens', label: "👔 Men's Sherwanis & Indo-Western" },
    { id: 'occasion', label: '🎉 Partywear & Cape Sets' }
  ];

  const rentalItems = products.filter((p) => {
    const isRental = p.listing_mode === 'rent' || p.listing_mode === 'both' || (p.rental_price_3_day > 0) || ['lehenga', 'gown', 'sharara', 'saree', 'occasion'].includes(p.category);
    if (!isRental) return false;
    if (rentalCategory !== 'all') {
      if (rentalCategory === 'lehenga') return p.category === 'lehenga';
      if (rentalCategory === 'gown') return p.category === 'gown';
      if (rentalCategory === 'sharara') return p.category === 'sharara';
      if (rentalCategory === 'saree') return p.category === 'saree';
      if (rentalCategory === 'mens') return p.category === 'mens' && (p.listing_mode === 'rent' || p.rental_price_3_day > 0);
      if (rentalCategory === 'occasion') return p.category === 'occasion';
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-forest to-sage-900 text-white p-8 sm:p-14 rounded-3xl shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-terracotta-500/30 border border-terracotta-400 text-terracotta-200 text-xs font-bold rounded-full uppercase">
          <span>Luxury Festive &amp; Bridal Rental Boutique</span>
        </div>
        <h1 className="font-cormorant text-4xl sm:text-5xl font-light leading-tight">
          Wear Designer Wedding Elegance at 90% Less Than MRP.
        </h1>
        <p className="text-sage-200 text-xs sm:text-sm max-w-2xl leading-relaxed">
          Why spend ₹40,000 to ₹75,000 on a heavy bridal lehenga, cocktail gown, or velvet sherwani worn for just 6 hours? Reserve authenticated designer pieces for 3 to 7 days, complete with dry cleaning and return courier kit.
        </p>
      </div>

      {/* Interactive Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-linen-300 no-scrollbar">
        {rentalTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setRentalCategory(tab.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              rentalCategory === tab.id
                ? 'bg-forest text-white shadow-xs'
                : 'bg-white text-forest border border-linen-300 hover:border-sage-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Rental Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rentalItems.map((p) => (
          <div key={p.id} className="bg-white rounded-3xl border border-linen-300 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
            <div className="relative overflow-hidden cursor-pointer" onClick={() => onViewProduct(p)}>
              <img src={p.image} alt={p.title} className="w-full h-80 object-cover object-top hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 left-3 bg-forest text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
                👑 RENTAL EXCLUSIVE
              </div>
            </div>

            <div className="p-5 space-y-3">
              <div className="text-[10px] uppercase font-bold text-terracotta-600">{p.condition}</div>
              <h3 onClick={() => onViewProduct(p)} className="font-cormorant text-2xl text-forest hover:text-terracotta-600 cursor-pointer">
                {p.title}
              </h3>
              <p className="text-xs text-sage-600 line-clamp-2">{p.description}</p>
              
              <div className="p-3 bg-linen-50 rounded-xl text-xs space-y-1 text-sage-700">
                <div>• <strong>3-Day Booking Fee:</strong> ₹{(p.rental_price_3_day || p.price).toLocaleString('en-IN')}</div>
                <div>• <strong>Original MRP:</strong> <span className="line-through">₹{p.mrp.toLocaleString('en-IN')}</span></div>
                <div>• <strong>Dry Cleaning:</strong> Ozone steam sanitized (included)</div>
              </div>

              <button
                onClick={() => onAddToBag(p)}
                className="w-full py-3 bg-forest hover:bg-sage-900 text-white font-semibold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Reserve Rental Dates →</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
