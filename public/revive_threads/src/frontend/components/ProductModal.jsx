import React from 'react';

export default function ProductModal({
  product,
  onBack,
  onAddToBag
}) {
  if (!product) return null;

  const priceToPay = product.price || product.rental_price_3_day || 0;
  const savingsPct = product.mrp > priceToPay ? Math.round(((product.mrp - priceToPay) / product.mrp) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button
        onClick={onBack}
        className="mb-6 text-xs font-semibold text-sage-700 hover:text-forest flex items-center gap-1.5 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Back to Wardrobe Catalog</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start bg-white p-8 sm:p-12 rounded-3xl border border-linen-300 shadow-sm">
        
        <div className="lg:col-span-6 rounded-2xl overflow-hidden bg-linen-100 border border-linen-200">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[520px] object-cover object-top hover:scale-105 transition-transform duration-700"
          />
        </div>

        <div className="lg:col-span-6 space-y-6 text-xs">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sage-100 text-sage-800">
                {product.listing_mode === 'both' ? 'Buy or Rent' : product.listing_mode === 'rent' ? 'Occasion Rental' : 'Thrift Resale'}
              </span>
              <span className="text-sage-600 font-semibold">• {product.condition}</span>
            </div>

            <h1 className="font-cormorant text-3xl sm:text-4xl text-forest font-normal leading-tight">
              {product.title}
            </h1>

            <div className="flex items-baseline gap-3 mt-3">
              <span className="text-3xl font-bold text-forest">₹{priceToPay.toLocaleString('en-IN')}</span>
              {product.listing_mode === 'rent' && <span className="text-xs text-sage-600">/ 3-day rental</span>}
              <span className="text-base text-sage-500 line-through">MRP ₹{product.mrp.toLocaleString('en-IN')}</span>
              {savingsPct > 0 && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Save {savingsPct}%
                </span>
              )}
            </div>
          </div>

          <p className="text-sm text-sage-700 leading-relaxed">
            {product.description}
          </p>

          <div className="p-4 bg-linen-50 rounded-2xl border border-linen-200 space-y-2 text-sage-800">
            <div className="font-bold text-forest text-xs">Verified Garment Specifications:</div>
            <div>• <strong>Fabric:</strong> {product.fabric}</div>
            <div>• <strong>Size:</strong> {product.size}</div>
            <div>• <strong>Seller:</strong> {product.seller}</div>
            {product.condition_notes && <div>• <strong>Condition Notes:</strong> {product.condition_notes}</div>}
          </div>

          <div className="grid grid-cols-2 gap-3 text-emerald-900">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <div>
                <div className="font-bold text-xs">{product.water_saved || '2,400 L'}</div>
                <div className="text-[10px] text-emerald-700">Freshwater Conserved</div>
              </div>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div>
                <div className="font-bold text-xs">100% Escrow</div>
                <div className="text-[10px] text-emerald-700">Payment Protected</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onAddToBag(product)}
            className="w-full py-4 bg-forest hover:bg-sage-900 text-white font-semibold rounded-2xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4 text-sage-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span>Add to Circular Bag →</span>
          </button>
        </div>

      </div>
    </div>
  );
}
