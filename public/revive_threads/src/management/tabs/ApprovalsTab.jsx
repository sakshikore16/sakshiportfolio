import React, { useState } from 'react';

export default function ApprovalsTab({
  pendingRequests,
  pendingFilterMode,
  setPendingFilterMode,
  pendingSearch,
  setPendingSearch,
  onRefresh,
  onApprove,
  onOpenRejectModal,
  onOpenQuickConsign
}) {
  // Local state for calibrated prices per card
  const [calibratedPrices, setCalibratedPrices] = useState({});
  const [calibratedRentals, setCalibratedRentals] = useState({});
  const [calibratedNotes, setCalibratedNotes] = useState({});
  const [activeImgIndex, setActiveImgIndex] = useState({});

  const handlePriceChange = (id, val) => {
    setCalibratedPrices(prev => ({ ...prev, [id]: Number(val) }));
  };

  const handleRentalChange = (id, val) => {
    setCalibratedRentals(prev => ({ ...prev, [id]: Number(val) }));
  };

  const handleNotesChange = (id, val) => {
    setCalibratedNotes(prev => ({ ...prev, [id]: val }));
  };

  return (
    <section className="space-y-6">
      
      {/* Header Bar with Search & Mode Filter */}
      <div className="bg-white p-6 rounded-3xl border border-linen-300 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-terracotta-50 text-terracotta-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-1">
              <span>5-Point Physical Inspection Engine</span>
            </div>
            <h2 className="font-serif text-3xl text-forest font-normal">Pending Seller Submissions</h2>
            <p className="text-xs text-sage-600 mt-0.5">
              Review seller photos, inspect condition, calibrate live selling/rental pricing, and approve for instant customer listing.
            </p>
          </div>
          
          <div className="flex items-center gap-2 self-start md:self-center">
            <button
              onClick={onRefresh}
              className="px-4 py-2 bg-linen-100 hover:bg-linen-200 text-forest rounded-full text-xs font-semibold flex items-center gap-2 border border-linen-300 transition-all shadow-2xs"
            >
              <span>Refresh</span>
            </button>
            <button
              onClick={onOpenQuickConsign}
              className="px-4 py-2 bg-forest hover:bg-sage-900 text-white rounded-full text-xs font-semibold flex items-center gap-2 transition-all shadow-2xs"
            >
              <span>+ Direct Add Garment</span>
            </button>
          </div>
        </div>

        {/* Search & Mode Filter Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-linen-200">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={pendingSearch}
              onChange={(e) => setPendingSearch(e.target.value)}
              placeholder="Search by seller, title, phone..."
              className="w-full px-4 py-2 text-xs bg-linen-50/70 border border-linen-300 rounded-full focus:outline-none focus:border-sage-500 font-sans"
            />
          </div>
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto no-scrollbar">
            {['all', 'buy', 'rent', 'both'].map((m) => (
              <button
                key={m}
                onClick={() => setPendingFilterMode(m)}
                className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                  pendingFilterMode === m
                    ? 'bg-forest text-white font-bold'
                    : 'text-sage-700 bg-linen-100 hover:bg-linen-200 font-semibold'
                }`}
              >
                {m === 'all' ? 'All Modes' : m === 'buy' ? 'Buy Only' : m === 'rent' ? 'Rent Only' : 'Dual Mode'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards List */}
      <div className="space-y-6">
        {pendingRequests.length === 0 ? (
          <div className="bg-white p-14 text-center rounded-3xl border border-linen-300 space-y-3">
            <div className="text-3xl">✅</div>
            <h3 className="font-serif text-3xl text-forest">All submissions reviewed!</h3>
            <p className="text-xs text-sage-600 max-w-sm mx-auto">
              No seller requests match this criteria. New incoming submissions will appear here automatically.
            </p>
          </div>
        ) : (
          pendingRequests.map((r) => {
            const isRent = r.listing_mode === 'rent';
            const isBoth = r.listing_mode === 'both';

            const activePrice = calibratedPrices[r.id] ?? (r.suggested_admin_price || r.seller_asked_price || 0);
            const activeRental = calibratedRentals[r.id] ?? (r.suggested_admin_rental_price || r.seller_asked_rental_price || 0);
            const activeNote = calibratedNotes[r.id] ?? (r.admin_notes || 'Condition verified across 5 parameters. Sanitized and approved.');

            const sellerPayout = Math.round(activePrice * 0.82);
            const platformMargin = Math.round(activePrice * 0.18);

            const selectedImgIdx = activeImgIndex[r.id] ?? 0;
            const currentImg = r.images && r.images[selectedImgIdx] ? r.images[selectedImgIdx] : (r.image || '');

            return (
              <div key={r.id} className="bg-white rounded-3xl border border-linen-300 shadow-sm overflow-hidden p-6 sm:p-8 transition-all hover:border-sage-400">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Photo Gallery Column */}
                  <div className="lg:col-span-4 space-y-3">
                    <div className="relative rounded-2xl overflow-hidden border border-linen-300 bg-linen-100">
                      <img src={currentImg} alt={r.title} className="w-full h-72 object-cover object-top" />
                      <div className="absolute top-3 left-3 flex flex-col gap-1">
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs ${
                          isRent ? 'bg-purple-900 text-white' : isBoth ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-forest text-white'
                        }`}>
                          {isBoth ? '🔄 BUY & RENT' : isRent ? '👑 RENT ONLY' : '🛒 BUY ONLY'}
                        </span>
                      </div>
                    </div>

                    {r.images && r.images.length > 1 && (
                      <div className="flex gap-2 overflow-x-auto pb-1">
                        {r.images.map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            onClick={() => setActiveImgIndex(prev => ({ ...prev, [r.id]: idx }))}
                            alt="thumbnail"
                            className={`w-14 h-14 object-cover rounded-xl border cursor-pointer shrink-0 transition-all ${
                              selectedImgIdx === idx ? 'border-forest ring-2 ring-forest/30 scale-105' : 'border-linen-300 hover:border-sage-500'
                            }`}
                          />
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-[11px] text-sage-600 bg-linen-50 p-2.5 rounded-xl border border-linen-200">
                      <span>{(r.images || []).length} verification photo(s)</span>
                      <span className="font-semibold text-emerald-700">✓ High-Res Evidence</span>
                    </div>
                  </div>

                  {/* Garment Details & Seller Statements */}
                  <div className="lg:col-span-4 space-y-4">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-sage-500 flex items-center gap-1.5 mb-1">
                        <span className="px-2 py-0.5 rounded bg-linen-200 text-forest font-semibold">{r.category.toUpperCase()}</span>
                        <span>&bull;</span>
                        <span>Submitted: {new Date(r.submitted_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                      </div>
                      <h3 className="font-serif text-2xl text-forest font-medium leading-snug">{r.title}</h3>
                    </div>

                    <div className="p-3 bg-linen-50 rounded-2xl border border-linen-200 text-xs space-y-1">
                      <div className="font-semibold text-forest">Seller Condition Statement:</div>
                      <div className="text-terracotta-700 font-bold">{r.condition}</div>
                      <p className="text-sage-700 italic">"{r.condition_notes || 'Clean, intact garment.'}"</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-sage-700">
                      <div className="p-2.5 bg-white rounded-xl border border-linen-200">
                        <div className="text-[10px] uppercase font-bold text-sage-500">Fabric</div>
                        <div className="font-medium text-forest truncate">{r.fabric || 'Pure Cotton'}</div>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-linen-200">
                        <div className="text-[10px] uppercase font-bold text-sage-500">Size</div>
                        <div className="font-medium text-forest">{r.size}</div>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-linen-200">
                        <div className="text-[10px] uppercase font-bold text-sage-500">Retail MRP</div>
                        <div className="font-bold text-forest">₹{r.mrp.toLocaleString('en-IN')}</div>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-linen-200">
                        <div className="text-[10px] uppercase font-bold text-sage-500">Seller Asking</div>
                        <div className="font-bold text-terracotta-700">
                          {isRent ? 'Rent ₹' + r.seller_asked_rental_price : 'Buy ₹' + r.seller_asked_price}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-linen-100/80 rounded-2xl text-xs space-y-1 border border-linen-200">
                      <div className="font-bold text-forest">Seller Contact:</div>
                      <div className="text-forest font-medium">{r.seller_name} &bull; <span className="text-emerald-700 font-bold">{r.seller_phone}</span></div>
                      <div className="text-sage-600 text-[11px]">{r.seller_email}</div>
                    </div>
                  </div>

                  {/* Calibration & Approval Form */}
                  <div className="lg:col-span-4 bg-linen-50/90 p-6 rounded-3xl border border-linen-300 space-y-4">
                    <div className="border-b border-linen-200 pb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta-700">Operations Calibration</span>
                      <div className="text-xs font-semibold text-forest">Calibrate Live Selling Prices</div>
                    </div>

                    {!isRent && (
                      <div>
                        <label className="block text-[11px] font-semibold text-forest mb-1">
                          Approved Resale Price (₹) <span className="text-sage-500 font-normal">(Seller asked ₹{r.seller_asked_price})</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-2.5 text-xs font-bold text-sage-600">₹</span>
                          <input
                            type="number"
                            value={activePrice}
                            onChange={(e) => handlePriceChange(r.id, e.target.value)}
                            className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-linen-300 rounded-xl font-bold text-forest focus:outline-none focus:border-sage-500 shadow-2xs font-mono"
                          />
                        </div>
                        <div className="text-[10px] text-sage-600 mt-1 flex justify-between">
                          <span>Seller Payout (82%): <strong>₹{sellerPayout}</strong></span>
                          <span>Revive (18%): <strong>₹{platformMargin}</strong></span>
                        </div>
                      </div>
                    )}

                    {(isRent || isBoth) && (
                      <div>
                        <label className="block text-[11px] font-semibold text-forest mb-1">
                          Approved 3-Day Rental Price (₹) <span className="text-sage-500 font-normal">(Seller asked ₹{r.seller_asked_rental_price})</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-2.5 text-xs font-bold text-sage-600">₹</span>
                          <input
                            type="number"
                            value={activeRental}
                            onChange={(e) => handleRentalChange(r.id, e.target.value)}
                            className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-linen-300 rounded-xl font-bold text-forest focus:outline-none focus:border-sage-500 shadow-2xs font-mono"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-[11px] font-semibold text-forest mb-1">QC Verification Notes</label>
                      <input
                        type="text"
                        value={activeNote}
                        onChange={(e) => handleNotesChange(r.id, e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-linen-300 rounded-xl text-sage-800 focus:outline-none focus:border-sage-500 font-sans shadow-2xs"
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => onApprove(r.id, activePrice, activeRental, activeNote)}
                        className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span>✓ Approve &amp; List Live</span>
                      </button>
                      <button
                        onClick={() => onOpenRejectModal(r)}
                        className="px-3.5 py-3 bg-white hover:bg-red-50 text-red-700 border border-red-200 text-xs rounded-xl font-semibold transition-all"
                      >
                        Reject
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            );
          })
        )}
      </div>

    </section>
  );
}
