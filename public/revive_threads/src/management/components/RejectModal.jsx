import React from 'react';

export default function RejectModal({
  isOpen,
  item,
  preset,
  setPreset,
  notes,
  setNotes,
  onClose,
  onConfirm
}) {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-forest/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-linen-300 max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-fadeIn">
        
        <div className="flex items-center justify-between border-b border-linen-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-sm">
              ⚠️
            </span>
            <h3 className="font-serif text-2xl text-forest">Reject Seller Submission</h3>
          </div>
          <button onClick={onClose} className="text-sage-400 hover:text-forest p-1 rounded-full text-base">
            ✕
          </button>
        </div>

        <div className="text-xs text-sage-700 space-y-1">
          <div><strong>Item:</strong> <span className="text-forest font-semibold">{item.title}</span></div>
          <div><strong>Seller:</strong> <span className="text-forest font-semibold">{item.seller_name}</span></div>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold uppercase tracking-wider text-forest/80 mb-1.5">Primary Rejection Reason</label>
            <select
              value={preset}
              onChange={(e) => setPreset(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-linen-300 bg-linen-50/50 text-forest font-medium focus:outline-none focus:border-sage-500"
            >
              <option value="Fabric damage / tear / unrepairable stains detected">Fabric damage / tear / unrepairable stains detected</option>
              <option value="Condition below platform standard (heavy wear / pilling)">Condition below platform standard (heavy wear / pilling)</option>
              <option value="Missing authenticity, brand, or care label">Missing authenticity, brand, or care label</option>
              <option value="Seller asking price significantly exceeds secondary market value">Seller asking price significantly exceeds secondary market value</option>
              <option value="Incomplete or blurry photographic evidence">Incomplete or blurry photographic evidence</option>
              <option value="Other / Custom operational reason">Other / Custom operational reason</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-forest/80 mb-1.5">Detailed Operational Feedback (Sent to Seller)</label>
            <textarea
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Minor fabric fraying noted near neckline seam. We recommend our Revive Atelier repair service."
              className="w-full px-3.5 py-2.5 rounded-xl border border-linen-300 bg-white text-forest focus:outline-none focus:border-sage-500 font-sans"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-linen-100 hover:bg-linen-200 text-forest font-semibold rounded-xl text-xs transition-all border border-linen-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 bg-red-700 hover:bg-red-800 text-white font-semibold rounded-xl text-xs transition-all shadow-xs flex items-center justify-center gap-1.5"
          >
            <span>Confirm Rejection</span>
          </button>
        </div>

      </div>
    </div>
  );
}
