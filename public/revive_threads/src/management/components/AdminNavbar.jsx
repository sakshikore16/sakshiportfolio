import React from 'react';

export default function AdminNavbar({ activeTab, setActiveTab, pendingCount, ordersCount, inventoryCount, onOpenQuickConsign }) {
  return (
    <header className="bg-forest text-linen-100 border-b border-sage-800 sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-22 flex items-center justify-between gap-4">
        
        {/* Brand & Monogram Lockup */}
        <div className="flex items-center gap-3.5 shrink-0 select-none">
          <div className="w-11 h-11 rounded-full bg-sage-800 border border-sage-500 flex items-center justify-center p-2 shadow-inner">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="46" fill="none" stroke="#8FA895" strokeWidth="3" strokeDasharray="3 3"/>
              <path d="M 50 50 C 40 32, 22 32, 22 50 C 22 66, 36 70, 50 50 C 64 30, 78 34, 78 50 C 78 68, 60 68, 50 50 Z" fill="none" stroke="#8FA895" strokeWidth="4.5" strokeLinecap="round"/>
              <path d="M 50 50 C 38 66, 28 62, 28 50 C 28 40, 40 38, 50 50 C 60 62, 72 58, 72 50 C 72 38, 60 38, 50 50 Z" fill="none" stroke="#D48B77" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div className="font-serif text-xl sm:text-2xl tracking-wider text-white flex items-center gap-2">
              <span>REVIVE</span>
              <span className="font-bold text-sage-200">THREADS</span>
              <span className="hidden sm:inline-block text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-sage-800 border border-sage-600 text-sage-300 font-semibold font-sans">
                OPS PORTAL
              </span>
            </div>
            <div className="text-[10px] uppercase tracking-widest text-sage-300 font-semibold hidden sm:block">
              Management, Approvals &amp; Logistics Hub
            </div>
          </div>
        </div>

        {/* Central Nav Tabs Pill */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-sage-900/90 p-1.5 rounded-full border border-sage-700/80 text-xs shadow-inner">
          <button
            onClick={() => setActiveTab('approvals')}
            className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
              activeTab === 'approvals' 
                ? 'bg-white text-forest shadow-sm font-semibold' 
                : 'text-sage-300 hover:text-white font-medium'
            }`}
          >
            <span>Seller Requests</span>
            <span className="bg-terracotta-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
              {pendingCount}
            </span>
          </button>
          
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
              activeTab === 'orders' 
                ? 'bg-white text-forest shadow-sm font-semibold' 
                : 'text-sage-300 hover:text-white font-medium'
            }`}
          >
            <span>Live Orders</span>
            <span className="bg-sage-700 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
              {ordersCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
              activeTab === 'inventory' 
                ? 'bg-white text-forest shadow-sm font-semibold' 
                : 'text-sage-300 hover:text-white font-medium'
            }`}
          >
            <span>Store Catalog</span>
            <span className="bg-sage-800 text-sage-300 text-[10px] px-2 py-0.5 rounded-full font-bold">
              {inventoryCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('atelier')}
            className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
              activeTab === 'atelier' 
                ? 'bg-white text-forest shadow-sm font-semibold' 
                : 'text-sage-300 hover:text-white font-medium'
            }`}
          >
            <span>Atelier &amp; Donations</span>
          </button>
        </nav>

        {/* Action Shortcuts */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs shrink-0">
          <button
            onClick={onOpenQuickConsign}
            className="px-3.5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-1.5 shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            <span>+ Quick List Garment</span>
          </button>

          <a 
            href="http://localhost:8000/" 
            target="_blank" 
            rel="noreferrer"
            className="px-3 py-2 rounded-full bg-sage-800/90 hover:bg-sage-700 text-sage-100 flex items-center gap-1.5 border border-sage-600/60 transition-all"
          >
            <span className="hidden md:inline font-medium">User Store ↗</span>
          </a>

          <a 
            href="http://localhost:8002/" 
            target="_blank" 
            rel="noreferrer"
            className="px-3 py-2 rounded-full bg-terracotta-600 hover:bg-terracotta-500 text-white font-medium flex items-center gap-1.5 shadow-2xs transition-all"
          >
            <span className="hidden md:inline">Canva Docs ↗</span>
          </a>
        </div>

      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden flex items-center gap-1 px-4 py-2 bg-sage-900 border-t border-sage-800 overflow-x-auto no-scrollbar text-xs">
        <button
          onClick={() => setActiveTab('approvals')}
          className={`px-3 py-1.5 rounded-full whitespace-nowrap ${
            activeTab === 'approvals' ? 'bg-white text-forest font-semibold' : 'text-sage-300 font-medium'
          }`}
        >
          Approvals ({pendingCount})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-3 py-1.5 rounded-full whitespace-nowrap ${
            activeTab === 'orders' ? 'bg-white text-forest font-semibold' : 'text-sage-300 font-medium'
          }`}
        >
          Orders ({ordersCount})
        </button>
        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-3 py-1.5 rounded-full whitespace-nowrap ${
            activeTab === 'inventory' ? 'bg-white text-forest font-semibold' : 'text-sage-300 font-medium'
          }`}
        >
          Catalog ({inventoryCount})
        </button>
        <button
          onClick={() => setActiveTab('atelier')}
          className={`px-3 py-1.5 rounded-full whitespace-nowrap ${
            activeTab === 'atelier' ? 'bg-white text-forest font-semibold' : 'text-sage-300 font-medium'
          }`}
        >
          Atelier &amp; NGO
        </button>
      </div>
    </header>
  );
}
