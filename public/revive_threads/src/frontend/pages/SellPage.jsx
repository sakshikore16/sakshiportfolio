import React from 'react';
import CustomSelect from '../components/CustomSelect';

export default function SellPage({
  sellCategory,
  setSellCategory,
  sellMode,
  setSellMode,
  sellSize,
  setSellSize,
  sellCondition,
  setSellCondition,
  sellPhotos,
  handlePhotoUpload,
  removePhoto,
  addPresetPhoto,
  triggerToast,
  setActivePage
}) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const primaryImg = sellPhotos.length > 0 ? sellPhotos[0].url : 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=700&auto=format&fit=crop';
    const allImgs = sellPhotos.map(p => p.url);

    const payload = {
      seller_name: form.name.value,
      seller_phone: form.phone.value,
      seller_email: form.email.value,
      title: form.title.value,
      category: form.category.value,
      listing_mode: form.mode.value,
      mrp: Number(form.mrp.value),
      seller_asked_price: Number(form.price.value || 0),
      seller_asked_rental_price: Number(form.rental.value || 0),
      size: form.size.value,
      condition: form.condition.value,
      condition_notes: form.notes.value,
      fabric: form.fabric.value || '100% Linen Blend',
      image: primaryImg,
      images: allImgs
    };

    try {
      await fetch('/api/sell-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.log('Error submitting sell request:', err);
    }

    triggerToast('Listing and photos submitted! Sent to Management Portal for review & approval.');
    setActivePage('home');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-sage-100 border border-sage-200 text-sage-800 text-xs font-bold rounded-full uppercase tracking-wider">
          <svg className="w-3.5 h-3.5 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          <span>Circular Consignment & Resale Portal</span>
        </div>
        <h1 className="font-cormorant text-4xl sm:text-5xl text-forest">List Your Wardrobe for Sale or Rent</h1>
        <p className="text-sm text-sage-700 leading-relaxed">
          Give your unworn clothes a new home. List for outright purchase, 3-day rental bookings, or both. We handle doorstep courier pickup, 5-point quality check, ozone sanitization, and automated bank payouts.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-linen-300 p-8 sm:p-14 shadow-lg space-y-10">
        
        <form onSubmit={handleSubmit} className="space-y-10 text-sm">
          
          {/* Section 1: Seller Details */}
          <div className="p-6 sm:p-8 bg-linen-50/70 rounded-3xl border border-linen-200 space-y-4">
            <div className="font-bold text-base text-forest flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-forest text-white text-xs flex items-center justify-center font-bold">1</span>
              <span>Seller Contact Information</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-forest/80 mb-2">Full Name</label>
                <input name="name" required defaultValue="Sakshi Sharma" className="w-full px-4 py-3 text-sm bg-white border border-linen-300 rounded-xl focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500 transition-all shadow-2xs font-sans" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-forest/80 mb-2">WhatsApp Phone</label>
                <input name="phone" required defaultValue="+91 98112 77410" className="w-full px-4 py-3 text-sm bg-white border border-linen-300 rounded-xl focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500 transition-all shadow-2xs font-sans" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-forest/80 mb-2">Email Address</label>
                <input name="email" type="email" required defaultValue="sakshi.sharma@gmail.com" className="w-full px-4 py-3 text-sm bg-white border border-linen-300 rounded-xl focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500 transition-all shadow-2xs font-sans" />
              </div>
            </div>
          </div>

          {/* Section 2: Garment Details */}
          <div className="space-y-6">
            <div className="font-bold text-base text-forest flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-forest text-white text-xs flex items-center justify-center font-bold">2</span>
              <span>Garment Details & Listing Preference</span>
            </div>
            
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-forest/80 mb-2">Garment Title</label>
              <input name="title" required defaultValue="Zara Smocked Linen Puff Sleeve Crop Top" placeholder="e.g. Zara Floral Wrap Dress" className="w-full px-4 py-3 text-sm bg-linen-50/50 border border-linen-300 rounded-xl focus:outline-none focus:border-sage-500 transition-all shadow-2xs font-sans" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <CustomSelect
                name="category"
                label="Wardrobe Category"
                value={sellCategory}
                onChange={setSellCategory}
                options={[
                  { value: 'top', label: 'Top / Blouse (Casual / Daily)' },
                  { value: 'skirt', label: 'Pleated / A-Line Skirt' },
                  { value: 'dress', label: 'Midi / Maxi Dress' },
                  { value: 'kurta', label: 'Kurta Set / Semi-Heavy Ethnic' },
                  { value: 'mens', label: "Men's Wear (Shirt / Blazer / Sherwani)" },
                  { value: 'lehenga', label: 'Heavy Lehenga (Bridal / Sangeet)' },
                  { value: 'gown', label: 'Heavy Gown / Evening Wear' },
                  { value: 'sharara', label: 'Heavy Sharara / Gharara' },
                  { value: 'saree', label: 'Heritage Silk Saree' },
                  { value: 'blazer', label: 'Tailored Blazer' },
                  { value: 'occasion', label: 'Heavy Partywear / Cape Set' }
                ]}
              />
              <CustomSelect
                name="mode"
                label="How would you like to list it?"
                value={sellMode}
                onChange={setSellMode}
                options={[
                  { value: 'buy', label: 'Sell Only (Listed under Buy)' },
                  { value: 'rent', label: 'Rent Only (Listed under Rent)' },
                  { value: 'both', label: 'Both (Can be Bought OR Rented)' }
                ]}
              />
            </div>
          </div>

          {/* Section 3: Interactive Garment Photo Upload */}
          <div className="space-y-6 pt-4 border-t border-linen-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="font-bold text-base text-forest flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-forest text-white text-xs flex items-center justify-center font-bold">3</span>
                  <span>Garment Photography & Visual Evidence</span>
                </div>
                <p className="text-xs text-sage-600 mt-1">Upload clear photos showing the front, back, size/brand label, and fabric texture.</p>
              </div>
              <span className="self-start sm:self-center text-xs font-semibold px-3 py-1 bg-sage-100 text-sage-800 rounded-full border border-sage-200">
                {sellPhotos.length} {sellPhotos.length === 1 ? 'photo' : 'photos'} attached
              </span>
            </div>

            {/* Dropzone Box */}
            <div 
              onClick={() => document.getElementById('garment-photos-upload-input').click()}
              className="border-2 border-dashed border-sage-300 hover:border-forest rounded-3xl p-8 sm:p-10 bg-linen-50/70 hover:bg-white text-center cursor-pointer transition-all duration-300 group shadow-xs"
            >
              <input
                type="file"
                id="garment-photos-upload-input"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-sage-100 group-hover:bg-forest text-sage-700 group-hover:text-white flex items-center justify-center transition-colors shadow-sm">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="text-base font-bold text-forest group-hover:text-forest transition-colors">
                Click to Upload Garment Photos or Drag & Drop
              </div>
              <p className="text-xs text-sage-600 mt-1 max-w-md mx-auto">
                Upload PNG, JPG, or WEBP photos (Front view, back view, brand label, flaws if any).
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-terracotta-600 bg-terracotta-50 px-4 py-2 rounded-full border border-terracotta-200 shadow-2xs">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <span>Browse Device Files</span>
              </div>
            </div>

            {/* Instant Sample Presets for Demoing */}
            <div className="p-4 bg-linen-100/70 rounded-2xl border border-linen-300 space-y-2">
              <div className="text-xs font-bold text-forest flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-terracotta-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span>Quick demo photo presets (Click to test instantly):</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: '+ Zara Crop Top', url: 'https://images.unsplash.com/photo-1534126511673-b6899657816a?q=80&w=700&auto=format&fit=crop' },
                  { label: '+ Pure Silk Saree / Dress', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=700&auto=format&fit=crop' },
                  { label: '+ Tailored Blazer', url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=700&auto=format&fit=crop' },
                  { label: '+ Men\'s Linen Shirt', url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=700&auto=format&fit=crop' },
                  { label: '+ Pleated Denim Skirt', url: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=700&auto=format&fit=crop' }
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => addPresetPhoto(preset.url, preset.label.replace('+ ', ''))}
                    className="text-xs px-3 py-1.5 bg-white hover:bg-forest hover:text-white text-forest border border-linen-300 rounded-lg transition-all shadow-2xs font-medium"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Thumbnail Grid Preview */}
            {sellPhotos.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-forest/80 flex items-center justify-between">
                  <span>Uploaded Photos ({sellPhotos.length})</span>
                  <span className="text-[11px] text-sage-600 font-normal">First photo is used as main catalog cover</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {sellPhotos.map((photo, idx) => (
                    <div key={photo.id} className="relative rounded-2xl overflow-hidden border border-linen-300 bg-white group shadow-sm">
                      <img src={photo.url} alt={photo.label} className="w-full h-40 object-cover object-center" />
                      <div className="absolute top-2 left-2 bg-forest/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs backdrop-blur-xs">
                        {idx === 0 ? 'Primary Cover' : `Photo #${idx + 1}`}
                      </div>
                      <button
                        type="button"
                        onClick={() => removePhoto(photo.id)}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-600 text-white hover:bg-red-700 flex items-center justify-center transition-all shadow-md"
                        title="Remove photo"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <div className="p-2 text-[11px] font-medium text-forest truncate bg-linen-50 border-t border-linen-200">
                        {photo.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section 4: Valuation & Sizing */}
          <div className="space-y-6 pt-4 border-t border-linen-200">
            <div className="font-bold text-base text-forest flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-forest text-white text-xs flex items-center justify-center font-bold">4</span>
              <span>Valuation, Sizing & Fabric Composition</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-forest/80 mb-2">Original MRP (₹)</label>
                <input name="mrp" type="number" required defaultValue="2990" className="w-full px-4 py-3 text-sm bg-linen-50/50 border border-linen-300 rounded-xl focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500 shadow-2xs font-sans" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-forest/80 mb-2">Asking Resale Price (₹)</label>
                <input name="price" type="number" defaultValue="799" className="w-full px-4 py-3 text-sm bg-linen-50/50 border border-linen-300 rounded-xl focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500 shadow-2xs font-sans" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-forest/80 mb-2">3-Day Rental Fee (₹)</label>
                <input name="rental" type="number" defaultValue="299" className="w-full px-4 py-3 text-sm bg-linen-50/50 border border-linen-300 rounded-xl focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500 shadow-2xs font-sans" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <CustomSelect
                name="size"
                label="Garment Size"
                value={sellSize}
                onChange={setSellSize}
                options={[
                  { value: 'XS', label: 'XS (Bust 32" / Waist 26")' },
                  { value: 'S', label: 'S (Bust 34" / Waist 28")' },
                  { value: 'M', label: 'M (Bust 36" / Waist 30")' },
                  { value: 'L', label: 'L (Bust 38" / Waist 32")' },
                  { value: 'XL', label: 'XL (Bust 40" / Waist 34")' },
                  { value: 'Free Size', label: 'Free Size (Adjustable)' }
                ]}
              />
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-forest/80 mb-2">Fabric Composition</label>
                <input name="fabric" defaultValue="100% European Linen" className="w-full px-4 py-3 text-sm bg-linen-50/50 border border-linen-300 rounded-xl focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500 shadow-2xs font-sans" />
              </div>
            </div>
          </div>

          {/* Section 5: Condition & Care */}
          <div className="space-y-6 pt-4 border-t border-linen-200">
            <div className="font-bold text-base text-forest flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-forest text-white text-xs flex items-center justify-center font-bold">5</span>
              <span>Condition Rating & Authenticity Notes</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <CustomSelect
                name="condition"
                label="Condition Rating"
                value={sellCondition}
                onChange={setSellCondition}
                options={[
                  { value: 'Brand New With Tags', label: 'Brand New With Tags (Unworn)' },
                  { value: 'Like New (Pristine)', label: 'Like New (Pristine, Worn 1-2 times)' },
                  { value: 'Gently Loved', label: 'Gently Loved (Clean, no defects)' }
                ]}
              />
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-forest/80 mb-2">Wear & Care Notes</label>
                <input name="notes" defaultValue="Worn once for a family dinner, steam sanitized, immaculate condition." className="w-full px-4 py-3 text-sm bg-linen-50/50 border border-linen-300 rounded-xl focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500 shadow-2xs font-sans" />
              </div>
            </div>
          </div>

          {/* Section 6: Escrow Protection Notice */}
          <div className="p-5 bg-sage-50 border border-sage-200 rounded-2xl text-sage-900 text-xs sm:text-sm flex items-start gap-3">
            <svg className="w-5 h-5 text-sage-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div>
              <strong>Physical Quality Check & Escrow Payout:</strong> Every garment is collected by courier and inspected across 5 quality parameters before going live. You receive 82% of sale proceeds safely deposited into your bank account within 24 hours of delivery.
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-forest hover:bg-sage-900 text-white font-semibold rounded-2xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Submit Garment for Listing Approval →</span>
          </button>

        </form>

      </div>

    </div>
  );
}
