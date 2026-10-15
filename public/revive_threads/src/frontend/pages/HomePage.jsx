import React from 'react';
import ProductCard from '../components/ProductCard';

export default function HomePage({
  products,
  setActivePage,
  setFilterCategory,
  setFilterMode,
  viewProduct,
  addToBag
}) {
  return (
    <div className="space-y-16">
      
      {/* Hero Section */}
      <section className="hero-mesh border-b border-linen-300 py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-100 border border-sage-200 text-sage-800 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-sage-500"></span>
              <span>CIRCULAR FASHION REVOLUTION • EST. 2024</span>
            </div>

            <h1 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-light text-forest leading-[1.08] tracking-tight">
              Wear the clothes you love.<br/>
              <span className="italic font-normal text-terracotta-600">Give every thread a second life.</span>
            </h1>

            <p className="text-sage-700 text-sm sm:text-base leading-relaxed max-w-xl">
              Discover pre-loved everyday Zara tops, pleated skirts & linen shirts, rent luxury wedding lehengas for 3–7 day celebrations, redesign vintage sarees with master tailors, or schedule doorstep NGO pickups.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => { setFilterMode('buy'); setActivePage('shop'); }}
                className="px-6 py-3 bg-forest hover:bg-sage-900 text-white font-semibold text-xs rounded-full transition-all shadow-md flex items-center gap-2"
              >
                <span>Shop Pre-Loved</span>
                <svg className="w-4 h-4 text-sage-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              <button
                onClick={() => setActivePage('rent')}
                className="px-6 py-3 bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-xs rounded-full transition-all shadow-md flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <span>Rent for Weddings</span>
              </button>
              <button
                onClick={() => setActivePage('sell')}
                className="px-6 py-3 bg-white hover:bg-linen-100 text-forest font-semibold text-xs rounded-full transition-all border border-linen-300 shadow-xs"
              >
                Sell Your Clothes
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-sage-600">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-sage-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                100% Escrow Protection
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-sage-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                Free Reverse Courier
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-terracotta-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Ozone Steam Sanitized
              </span>
            </div>
          </div>

          {/* Right Spotlight Card */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white p-6 rounded-3xl border border-linen-300 shadow-xl relative overflow-hidden space-y-4">
              <div className="flex items-center justify-between border-b border-linen-200 pb-3">
                <div>
                  <div className="text-[10px] uppercase font-bold text-sage-500 tracking-wider">Collective Impact Ledger</div>
                  <div className="text-xs font-semibold text-forest">Verified Wardrobe Diversion</div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Live Counter
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center bg-linen-50 p-3 rounded-2xl border border-linen-200">
                <div>
                  <div className="text-lg font-bold text-forest">14,280+</div>
                  <div className="text-[9px] text-sage-600">Garments Saved</div>
                </div>
                <div className="border-x border-linen-200">
                  <div className="text-lg font-bold text-sage-700">18.5M L</div>
                  <div className="text-[9px] text-sage-600">Water Saved</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-terracotta-700">38.2 T</div>
                  <div className="text-[9px] text-sage-600">CO2 Cut</div>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-linen-300 group">
                <img
                  src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop"
                  alt="Saree Upcycled into Modern Festive Blazer"
                  className="w-full h-56 object-cover group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="inline-block bg-terracotta-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider mb-1">
                    Atelier Spotlight
                  </div>
                  <div className="text-sm font-semibold">1982 Vintage Kanjeevaram Saree → Festive Blazer</div>
                  <div className="flex justify-between items-center text-xs text-linen-200 mt-1">
                    <span>Handcrafted by Master Rafiq, Delhi</span>
                    <button onClick={() => setActivePage('atelier')} className="underline hover:text-white font-medium text-[11px]">
                      Redesign Yours →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Categories Showcase Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-sage-600">Curated Daily & Occasion</span>
          <h2 className="font-cormorant text-3xl text-forest">Explore By Wardrobe Category</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {[
            { cat: 'lehenga', mode: 'rent', label: 'Heavy Lehengas', tag: 'Rental', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=400&auto=format&fit=crop' },
            { cat: 'gown', mode: 'rent', label: 'Evening Gowns', tag: 'Rental', img: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=400&auto=format&fit=crop' },
            { cat: 'sharara', mode: 'rent', label: 'Heavy Shararas', tag: 'Rental', img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=400&auto=format&fit=crop' },
            { cat: 'saree', mode: 'all', label: 'Heritage Sarees', tag: 'Buy / Rent', img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=400&auto=format&fit=crop' },
            { cat: 'kurta', mode: 'buy', label: 'Kurta Sets', tag: 'Buy Pre-Loved', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=400&auto=format&fit=crop' },
            { cat: 'mens', mode: 'all', label: "Men's Wardrobe", tag: 'Buy & Rent', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=400&auto=format&fit=crop' },
            { cat: 'dress', mode: 'buy', label: 'Casual Dresses', tag: 'Buy Pre-Loved', img: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=400&auto=format&fit=crop' },
            { cat: 'top', mode: 'buy', label: 'Daily Tops & Skirts', tag: 'Buy Pre-Loved', img: 'https://images.unsplash.com/photo-1534126511673-b6899657816a?q=80&w=400&auto=format&fit=crop' }
          ].map(item => (
            <div
              key={item.cat}
              onClick={() => { setFilterCategory(item.cat); setFilterMode(item.mode); setActivePage('shop'); }}
              className="bg-white p-2.5 rounded-2xl border border-linen-300 hover:border-sage-400 cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-xs group text-center"
            >
              <div className="w-full h-28 rounded-xl overflow-hidden mb-2 bg-linen-100 relative">
                <img src={item.img} alt={item.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <span className="absolute bottom-1 right-1 text-[8px] font-bold bg-white/90 backdrop-blur-xs text-forest px-1.5 py-0.5 rounded shadow-2xs">
                  {item.tag}
                </span>
              </div>
              <div className="font-semibold text-xs text-forest group-hover:text-terracotta-600 truncate">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 border-b border-linen-300 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-sage-600">Handpicked Quality</span>
            <h2 className="font-cormorant text-3xl sm:text-4xl text-forest">Featured Pre-Loved Arrivals</h2>
          </div>
          <button
            onClick={() => setActivePage('shop')}
            className="text-xs font-semibold text-terracotta-600 hover:text-terracotta-700 flex items-center gap-1"
          >
            <span>View All Pieces</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.slice(0, 4).map(p => (
            <ProductCard
              key={p.id}
              product={p}
              onView={viewProduct}
              onAddToBag={addToBag}
            />
          ))}
        </div>
      </section>

      {/* Revive Atelier Teaser Banner */}
      <section className="bg-linen-100 py-16 border-t border-linen-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-sage-900 to-forest rounded-3xl p-8 sm:p-12 text-linen-100 shadow-xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-block px-3 py-1 bg-terracotta-500/30 border border-terracotta-400 text-terracotta-200 text-[10px] font-bold rounded-full uppercase tracking-wider">
                  Revive Atelier Studio
                </span>
                <h2 className="font-cormorant text-3xl sm:text-5xl font-light text-white leading-tight">
                  Don't let your grandmother's vintage silk saree sit locked in a trunk.
                </h2>
                <p className="text-sage-200 text-xs sm:text-sm leading-relaxed max-w-xl">
                  Connect directly with India's most skilled master tailors. Transform heirloom Kanjeevarams, Banarasi dupattas, or worn denim jeans into contemporary tailored blazers, corset tops, or structured tote bags.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setActivePage('atelier')}
                    className="px-6 py-3 bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-xs rounded-full transition-all shadow-md flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879a3 3 0 11-4.242-4.242L9.88 9.88" />
                    </svg>
                    <span>Explore Atelier Redesign Studio →</span>
                  </button>
                </div>
              </div>
              <div className="lg:col-span-5">
                <img
                  src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=700&auto=format&fit=crop"
                  alt="Atelier Creation"
                  className="w-full h-64 object-cover rounded-2xl shadow-lg border border-white/20"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
