import React, { useState } from 'react';

export default function QuickConsignModal({ isOpen, onClose, onSubmit }) {
  const [imgUrl, setImgUrl] = useState('https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=700&auto=format&fit=crop');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-forest/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-linen-300 max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8 animate-fadeIn">
        
        <div className="flex items-center justify-between border-b border-linen-200 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
              +
            </span>
            <div>
              <h3 className="font-serif text-2xl text-forest">Quick List Consignment Piece</h3>
              <p className="text-[11px] text-sage-600">Directly publish a curated piece into the live circular catalog</p>
            </div>
          </div>
          <button onClick={onClose} className="text-sage-400 hover:text-forest p-1 rounded-full text-base">
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold uppercase tracking-wider text-forest/80 mb-1">Garment Title</label>
            <input
              name="title"
              required
              placeholder="e.g. Sabyasachi Inspired Embroidered Velvet Lehenga"
              className="w-full px-3.5 py-2.5 rounded-xl border border-linen-300 bg-linen-50/50 text-forest focus:outline-none focus:border-sage-500 font-sans"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-forest/80 mb-1">Wardrobe Category</label>
              <select name="category" className="w-full px-3.5 py-2.5 rounded-xl border border-linen-300 bg-white text-forest focus:outline-none focus:border-sage-500 font-medium">
                <option value="lehenga">Heavy Lehenga (Rental / Bridal)</option>
                <option value="gown">Evening Gala Gown (Rental)</option>
                <option value="sharara">Heavy Sharara / Gharara (Rental)</option>
                <option value="saree">Heritage Silk Saree (Buy / Rent)</option>
                <option value="kurta">Kurta Set &amp; Semi-Heavy Ethnic</option>
                <option value="mens">Men's Wardrobe (Sherwani / Blazer / Shirt)</option>
                <option value="dress">Casual &amp; Midi Dress</option>
                <option value="top">Daily Top / Blouse</option>
                <option value="skirt">Pleated / Denim Skirt</option>
                <option value="blazer">Tailored &amp; Upcycled Blazer</option>
                <option value="occasion">Indo-Western Partywear</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold uppercase tracking-wider text-forest/80 mb-1">Listing Preference</label>
              <select name="listing_mode" defaultValue="both" className="w-full px-3.5 py-2.5 rounded-xl border border-linen-300 bg-white text-forest focus:outline-none focus:border-sage-500 font-medium">
                <option value="rent">Rent Only (Listed under Occasion Rentals)</option>
                <option value="buy">Sell Only (Listed under Buy Pre-Loved)</option>
                <option value="both">Both (Can be Bought OR Rented)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-forest/80 mb-1">Retail MRP (₹)</label>
              <input name="mrp" type="number" required defaultValue="45000" className="w-full px-3.5 py-2.5 rounded-xl border border-linen-300 bg-linen-50/50 text-forest focus:outline-none focus:border-sage-500 font-mono" />
            </div>
            <div>
              <label className="block font-semibold uppercase tracking-wider text-forest/80 mb-1">Resale Buy Price (₹)</label>
              <input name="price" type="number" defaultValue="4999" className="w-full px-3.5 py-2.5 rounded-xl border border-linen-300 bg-linen-50/50 text-forest focus:outline-none focus:border-sage-500 font-mono" />
            </div>
            <div>
              <label className="block font-semibold uppercase tracking-wider text-forest/80 mb-1">3-Day Rental Price (₹)</label>
              <input name="rental" type="number" defaultValue="2499" className="w-full px-3.5 py-2.5 rounded-xl border border-linen-300 bg-linen-50/50 text-forest focus:outline-none focus:border-sage-500 font-mono" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-forest/80 mb-1">Size</label>
              <input name="size" required defaultValue="M (Adjustable)" className="w-full px-3.5 py-2.5 rounded-xl border border-linen-300 bg-linen-50/50 text-forest focus:outline-none focus:border-sage-500" />
            </div>
            <div>
              <label className="block font-semibold uppercase tracking-wider text-forest/80 mb-1">Condition</label>
              <select name="condition" defaultValue="Pristine Consignment" className="w-full px-3.5 py-2.5 rounded-xl border border-linen-300 bg-white text-forest focus:outline-none focus:border-sage-500">
                <option value="Pristine Consignment">Pristine Consignment</option>
                <option value="Like New (Pristine)">Like New (Pristine)</option>
                <option value="Gently Loved">Gently Loved</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold uppercase tracking-wider text-forest/80 mb-1">Fabric</label>
              <input name="fabric" required defaultValue="Pure Silk &amp; Zardozi Embroidery" className="w-full px-3.5 py-2.5 rounded-xl border border-linen-300 bg-linen-50/50 text-forest focus:outline-none focus:border-sage-500" />
            </div>
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-forest/80 mb-1">Image URL</label>
            <input
              name="image"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-linen-300 bg-linen-50/50 text-forest focus:outline-none focus:border-sage-500 font-mono text-[11px]"
            />
            <div className="flex items-center gap-1.5 mt-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[10px] text-sage-600 font-semibold shrink-0">Presets:</span>
              <button type="button" onClick={() => setImgUrl('https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=700&auto=format&fit=crop')} className="px-2 py-0.5 rounded bg-linen-100 hover:bg-linen-200 text-[10px] text-forest shrink-0">Lehenga</button>
              <button type="button" onClick={() => setImgUrl('https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=700&auto=format&fit=crop')} className="px-2 py-0.5 rounded bg-linen-100 hover:bg-linen-200 text-[10px] text-forest shrink-0">Gala Gown</button>
              <button type="button" onClick={() => setImgUrl('https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=700&auto=format&fit=crop')} className="px-2 py-0.5 rounded bg-linen-100 hover:bg-linen-200 text-[10px] text-forest shrink-0">Sharara</button>
              <button type="button" onClick={() => setImgUrl('https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=700&auto=format&fit=crop')} className="px-2 py-0.5 rounded bg-linen-100 hover:bg-linen-200 text-[10px] text-forest shrink-0">Silk Saree</button>
              <button type="button" onClick={() => setImgUrl('https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=700&auto=format&fit=crop')} className="px-2 py-0.5 rounded bg-linen-100 hover:bg-linen-200 text-[10px] text-forest shrink-0">Men's Sherwani</button>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3 border-t border-linen-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-linen-100 hover:bg-linen-200 text-forest font-semibold rounded-xl text-xs transition-all border border-linen-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-forest hover:bg-sage-900 text-white font-semibold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              <span>Publish Directly to Store</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
