import React from 'react';
import CustomSelect from '../components/CustomSelect';
import ProductCard from '../components/ProductCard';

export default function ShopPage({
  products,
  filteredProducts,
  filterCategory,
  setFilterCategory,
  filterMode,
  setFilterMode,
  filterSize,
  setFilterSize,
  filterCondition,
  setFilterCondition,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  viewProduct,
  addToBag
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Catalog Title Banner */}
      <div className="mb-8 border-b border-linen-300 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-sage-600">Curated Circular Wardrobe</span>
          <h1 className="font-cormorant text-3xl sm:text-4xl text-forest font-normal">
            {filterCategory !== 'all' ? `Category: ${filterCategory.toUpperCase()}` : 'All Wardrobe Pieces'}
          </h1>
          <p className="text-xs text-sage-600 mt-1">
            Showing {filteredProducts.length} authenticated garment{filteredProducts.length === 1 ? '' : 's'} with 100% Escrow Protection.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-xs text-sage-600 font-semibold uppercase tracking-wider shrink-0">Sort By:</span>
          <CustomSelect
            value={sortBy}
            onChange={setSortBy}
            className="w-48 sm:w-52"
            buttonClassName="py-2 px-3.5 rounded-xl bg-white border-linen-300 text-xs shadow-2xs font-semibold"
            options={[
              { value: 'featured', label: 'Featured First' },
              { value: 'price-low', label: 'Price: Low to High' },
              { value: 'price-high', label: 'Price: High to Low' },
              { value: 'savings', label: 'Highest Savings %' }
            ]}
          />
        </div>
      </div>

      {/* 2-Column Layout: Sidebar Filters + Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar Filter Column */}
        <div className="lg:col-span-3 bg-white p-6 rounded-3xl border border-linen-300 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-linen-200 pb-3">
            <div className="font-semibold text-xs text-forest flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>Filter Wardrobe</span>
            </div>
            <button
              onClick={() => {
                setFilterCategory('all');
                setFilterMode('all');
                setFilterSize('all');
                setFilterCondition('all');
                setSearchQuery('');
              }}
              className="text-[11px] text-terracotta-600 hover:underline font-medium"
            >
              Reset All
            </button>
          </div>

          {/* Listing Mode */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-sage-600">Listing Type</div>
            <div className="flex flex-col gap-1.5 text-xs">
              {[
                { id: 'all', label: 'All Items' },
                { id: 'buy', label: '🛒 Buy Only (Thrift)' },
                { id: 'rent', label: '👑 Rent Only (Occasion)' },
                { id: 'both', label: '🔄 Dual Mode (Buy or Rent)' }
              ].map(m => (
                <label key={m.id} className="flex items-center gap-2 cursor-pointer text-sage-800 hover:text-forest">
                  <input
                    type="radio"
                    name="filter_mode"
                    checked={filterMode === m.id}
                    onChange={() => setFilterMode(m.id)}
                    className="text-forest focus:ring-sage-500 accent-forest"
                  />
                  <span>{m.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Garment Categories */}
          <div className="space-y-2 border-t border-linen-200 pt-4">
            <div className="text-[11px] font-bold uppercase tracking-wider text-sage-600">Categories</div>
            <div className="flex flex-col gap-1 text-xs">
              {[
                { id: 'all', label: 'All Categories' },
                { id: 'lehenga', label: '👑 Heavy Lehengas (Rent)' },
                { id: 'gown', label: '✨ Heavy Gowns (Rent)' },
                { id: 'sharara', label: '🪡 Heavy Shararas & Ghararas (Rent)' },
                { id: 'saree', label: '🥻 Heritage Silk Sarees' },
                { id: 'kurta', label: '🌿 Kurta Sets & Semi-Heavy' },
                { id: 'mens', label: "👔 Men's Wardrobe" },
                { id: 'dress', label: '👗 Casual Dresses' },
                { id: 'top', label: '👚 Daily Tops & Blouses' },
                { id: 'skirt', label: '🧵 Pleated & Denim Skirts' },
                { id: 'blazer', label: '🧥 Tailored & Upcycled Blazers' },
                { id: 'occasion', label: '🎉 Heavy Occasion Partywear' }
              ].map(c => (
                <button
                  key={c.id}
                  onClick={() => setFilterCategory(c.id)}
                  className={`text-left px-2 py-1.5 rounded-lg transition-all ${
                    filterCategory === c.id
                      ? 'bg-linen-100 font-bold text-forest'
                      : 'text-sage-700 hover:text-forest hover:bg-linen-50'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-2 border-t border-linen-200 pt-4">
            <div className="text-[11px] font-bold uppercase tracking-wider text-sage-600">Size</div>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              {['all', 'XS', 'S', 'M', 'L', 'XL'].map(sz => (
                <button
                  key={sz}
                  onClick={() => setFilterSize(sz)}
                  className={`py-1.5 rounded-lg border text-center transition-all ${
                    filterSize === sz
                      ? 'bg-forest text-white border-forest font-semibold'
                      : 'bg-linen-50 border-linen-300 text-forest hover:border-sage-400'
                  }`}
                >
                  {sz.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Condition Grade */}
          <div className="space-y-2 border-t border-linen-200 pt-4">
            <div className="text-[11px] font-bold uppercase tracking-wider text-sage-600">Condition Grade</div>
            <CustomSelect
              value={filterCondition}
              onChange={setFilterCondition}
              buttonClassName="py-2.5 px-3.5 rounded-xl bg-linen-50 border-linen-300 text-xs shadow-2xs font-medium"
              options={[
                { value: 'all', label: 'All Conditions' },
                { value: 'Brand New With Tags', label: 'Brand New With Tags' },
                { value: 'Like New (Pristine)', label: 'Like New (Pristine)' },
                { value: 'Gently Loved', label: 'Gently Loved' }
              ]}
            />
          </div>

        </div>

        {/* Main Catalog Grid */}
        <div className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center space-y-3 bg-white rounded-3xl border border-linen-300 p-8 shadow-xs">
              <div className="w-16 h-16 rounded-full bg-linen-200 mx-auto flex items-center justify-center text-sage-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="font-cormorant text-2xl text-forest">No garments matched your criteria</h3>
              <p className="text-xs text-sage-600 max-w-sm mx-auto">
                Try resetting filters or adjusting search keywords to explore all available pieces in our circular wardrobe.
              </p>
              <button
                onClick={() => {
                  setFilterCategory('all');
                  setFilterMode('all');
                  setFilterSize('all');
                  setFilterCondition('all');
                  setSearchQuery('');
                }}
                className="px-5 py-2.5 bg-forest text-white text-xs font-semibold rounded-full shadow-xs hover:bg-sage-900 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onView={viewProduct}
                  onAddToBag={addToBag}
                />
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
