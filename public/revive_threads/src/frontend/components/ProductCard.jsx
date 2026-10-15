import React from 'react';

export default function ProductCard({ product, onView, onAddToBag }) {
  const isRent = product.listing_mode === 'rent' || product.type === 'rental';
  const isBoth = product.listing_mode === 'both';

  return (
    <div className="bg-white rounded-2xl border border-linen-300 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
      
      {/* Product Image & Badges */}
      <div className="relative overflow-hidden cursor-pointer bg-linen-100" onClick={() => onView(product)}>
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-72 object-cover object-top group-hover:scale-105 transition-all duration-500" 
        />
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          {isBoth ? (
            <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase shadow-xs">
              🔄 BUY OR RENT
            </span>
          ) : isRent ? (
            <span className="bg-forest text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase shadow-xs">
              👑 RENT ONLY
            </span>
          ) : (
            <span className="bg-sage-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase shadow-xs">
              🛒 FOR SALE
            </span>
          )}
          <span className="bg-white/95 backdrop-blur-xs text-forest text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs">
            Size: {product.size}
          </span>
        </div>
      </div>

      {/* Info Container */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <div className="text-[10px] uppercase font-bold text-sage-600 tracking-wider mb-1">
            {product.condition}
          </div>
          <h3 
            onClick={() => onView(product)} 
            className="font-cormorant text-xl text-forest line-clamp-1 hover:text-terracotta-600 cursor-pointer"
          >
            {product.title}
          </h3>
          <div className="text-[11px] text-sage-600 mt-1 line-clamp-1">
            {product.fabric}
          </div>
        </div>

        <div className="pt-3 border-t border-linen-200 mt-3 flex items-center justify-between">
          <div>
            {isBoth ? (
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base font-bold text-forest">₹{product.price.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-sage-600">to buy</span>
                </div>
                <div className="text-[11px] text-purple-700 font-semibold">
                  or ₹{product.rental_price_3_day} / 3-day rent
                </div>
              </div>
            ) : isRent ? (
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base font-bold text-forest">₹{(product.rental_price_3_day || product.price).toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-sage-600">/ 3-day rent</span>
                </div>
                <div className="text-[10px] text-sage-500 line-through">MRP ₹{product.mrp.toLocaleString('en-IN')}</div>
              </div>
            ) : (
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base font-bold text-forest">₹{product.price.toLocaleString('en-IN')}</span>
                  <span className="text-xs text-sage-500 line-through">₹{product.mrp.toLocaleString('en-IN')}</span>
                </div>
                <div className="text-[10px] text-emerald-700 font-semibold">
                  Save {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% off MRP
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => onAddToBag(product)}
            className="p-2 rounded-full bg-linen-100 hover:bg-forest hover:text-white text-forest transition-all shadow-xs"
            title="Add to Circular Bag"
          >
            +
          </button>
        </div>
      </div>

    </div>
  );
}
