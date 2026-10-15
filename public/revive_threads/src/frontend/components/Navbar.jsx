import React from 'react';

export default function Navbar({
  activePage,
  setActivePage,
  cartCount,
  onOpenCart,
  searchQuery,
  setSearchQuery,
  mobileMenuOpen,
  setMobileMenuOpen
}) {
  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-forest text-linen-100 text-xs py-2.5 px-4 border-b border-sage-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] sm:text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">🌿 India's 1st Unified Circular Wardrobe Lifecycle Platform:</span>
            <span className="text-sage-200 hidden md:inline">100% Escrow Protected • Ozone Steam Sanitized • Free Reverse Logistics</span>
          </div>
          <div className="flex items-center gap-4 text-sage-300">
            <button onClick={() => setActivePage('donate')} className="hover:text-white transition-colors">Donate to NGO</button>
            <span>•</span>
            <button onClick={() => setActivePage('atelier')} className="hover:text-white transition-colors">Redesign Saree (Atelier)</button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-linen-100/95 backdrop-blur-md sticky top-0 z-40 border-b border-linen-300 shadow-xs">
        <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between gap-4 xl:gap-8">
          
          {/* Brand Logo & Lockup */}
          <div 
            onClick={() => { setActivePage('home'); setSearchQuery(''); setMobileMenuOpen(false); }}
            className="flex items-center gap-3.5 cursor-pointer group select-none shrink-0"
          >
            <div className="w-12 h-12 rounded-full bg-linen-200 border border-sage-300 flex items-center justify-center p-1.5 shadow-sm group-hover:border-sage-500 transition-all">
              <svg viewBox="0 0 100 100" className="w-full h-full transform group-hover:rotate-12 transition-transform duration-500">
                <circle cx="50" cy="50" r="46" fill="none" stroke="#6B8572" strokeWidth="2" strokeDasharray="3 3"/>
                <path d="M 50 50 C 40 32, 22 32, 22 50 C 22 66, 36 70, 50 50 C 64 30, 78 34, 78 50 C 78 68, 60 68, 50 50 Z" fill="none" stroke="#6B8572" strokeWidth="4.5" strokeLinecap="round"/>
                <path d="M 50 50 C 38 66, 28 62, 28 50 C 28 40, 40 38, 50 50 C 60 62, 72 58, 72 50 C 72 38, 60 38, 50 50 Z" fill="none" stroke="#B86F5C" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl tracking-widest text-forest font-normal">
                REVIVE <span className="font-semibold text-terracotta-600">THREADS</span>
              </div>
              <div className="text-[10px] tracking-[0.25em] text-sage-600 font-semibold uppercase">
                CIRCULAR FASHION COLLECTIVE
              </div>
            </div>
          </div>

          {/* Central Navigation Links Pill (Strictly single instance of Sell) */}
          <nav className="hidden xl:flex items-center gap-1 bg-white/80 p-1.5 rounded-full border border-linen-300 text-xs shadow-2xs font-medium">
            {[
              { id: 'home', label: 'Home' },
              { id: 'shop', label: 'Shop Pre-Loved' },
              { id: 'rent', label: 'Occasion Rentals' },
              { id: 'atelier', label: 'Revive Atelier' },
              { id: 'donate', label: 'Donate to NGO' }
            ].map(page => (
              <button
                key={page.id}
                onClick={() => { setActivePage(page.id); setMobileMenuOpen(false); }}
                className={`px-3.5 2xl:px-4 py-2 2xl:py-2.5 rounded-full whitespace-nowrap transition-all duration-200 ${
                  activePage === page.id 
                    ? 'bg-forest text-white font-semibold shadow-xs' 
                    : 'text-sage-700 hover:text-forest hover:bg-linen-100/80'
                }`}
              >
                {page.label}
              </button>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Search Pill */}
            <div className="hidden md:flex items-center relative w-32 sm:w-36 lg:w-44 xl:w-48">
              <span className="absolute left-3 text-sage-500">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activePage !== 'shop') setActivePage('shop');
                }}
                placeholder="Search wardrobe..."
                className="w-full pl-8 pr-2.5 py-2 text-xs bg-white border border-linen-300 rounded-full focus:outline-none focus:border-sage-500 font-sans"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-2.5 text-sage-400 hover:text-forest">
                  ✕
                </button>
              )}
            </div>

            {/* Shopping Bag Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-white hover:bg-linen-200 text-forest border border-linen-300 transition-all shadow-xs shrink-0"
              title="View Circular Bag"
            >
              <span className="text-sm">🛍️</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-terracotta-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Prominent Sell Clothes CTA Button */}
            <button
              onClick={() => { setActivePage('sell'); setMobileMenuOpen(false); }}
              className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-forest hover:bg-sage-900 text-white font-semibold text-xs transition-all shadow-xs hover:scale-105 active:scale-95 shrink-0"
            >
              <span>+ Sell Clothes</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2.5 rounded-full bg-white border border-linen-300 text-forest"
            >
              ☰
            </button>

          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-linen-100 border-t border-linen-300 px-4 pt-3 pb-6 space-y-4 shadow-xl animate-fadeIn">
            <div className="md:hidden relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activePage !== 'shop') setActivePage('shop');
                }}
                placeholder="Search lehengas, gowns, kurtas..."
                className="w-full px-4 py-2.5 text-xs bg-white border border-linen-300 rounded-full focus:outline-none focus:border-sage-500 font-sans"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'home', label: 'Home' },
                { id: 'shop', label: 'Shop Pre-Loved' },
                { id: 'rent', label: 'Occasion Rentals' },
                { id: 'atelier', label: 'Revive Atelier' },
                { id: 'donate', label: 'Donate to NGO' },
                { id: 'sell', label: 'Sell Clothes' }
              ].map(page => (
                <button
                  key={page.id}
                  onClick={() => { setActivePage(page.id); setMobileMenuOpen(false); }}
                  className={`px-4 py-3 rounded-2xl text-left text-xs font-semibold transition-all ${
                    activePage === page.id ? 'bg-forest text-white shadow-xs' : 'bg-white text-forest hover:bg-linen-200 border border-linen-200'
                  }`}
                >
                  {page.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
