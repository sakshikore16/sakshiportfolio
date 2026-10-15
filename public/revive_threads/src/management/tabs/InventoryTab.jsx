import React from 'react';

export default function InventoryTab({
  inventory,
  search,
  onSearchChange,
  category,
  onCategoryChange,
  onOpenQuickConsign
}) {
  const categories = [
    { id: 'all', label: 'All Pieces' },
    { id: 'lehenga', label: '👑 Lehengas' },
    { id: 'gown', label: '✨ Gowns' },
    { id: 'sharara', label: '🪡 Shararas' },
    { id: 'saree', label: '🥻 Sarees' },
    { id: 'kurta', label: '🌿 Kurta Sets' },
    { id: 'mens', label: "👔 Men's" },
    { id: 'dress', label: '👗 Dresses' },
    { id: 'top', label: '👚 Tops & Skirts' }
  ];

  return (
    <section className="space-y-6">
      
      <div className="bg-white p-6 rounded-3xl border border-linen-300 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sage-100 text-sage-800 rounded-full text-xs font-semibold uppercase tracking-wider mb-1">
              <span>Live Active Inventory Engine</span>
            </div>
            <h2 className="font-serif text-3xl text-forest font-normal">Active Store Catalog</h2>
            <p className="text-xs text-sage-600 mt-0.5">
              All garments currently active on the customer storefront. Filter by category, listing mode, or search title.
            </p>
          </div>
          
          <button
            onClick={onOpenQuickConsign}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-xs font-bold flex items-center gap-2 self-start md:self-center shadow-xs transition-all"
          >
            <span>+ Add New Garment</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 pt-3 border-t border-linen-200">
          <div className="relative w-full lg:w-96">
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search active catalog by title, fabric, seller..."
              className="w-full px-4 py-2 text-xs bg-linen-50/70 border border-linen-300 rounded-full focus:outline-none focus:border-sage-500 font-sans"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full lg:w-auto overflow-x-auto no-scrollbar pb-1">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => onCategoryChange(c.id)}
                className={`px-3 py-1.5 rounded-full text-xs transition-all whitespace-nowrap ${
                  category === c.id
                    ? 'bg-forest text-white font-bold'
                    : 'text-sage-700 bg-linen-100 hover:bg-linen-200 font-semibold'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-linen-300 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-linen-100/80 border-b border-linen-200 text-forest font-semibold uppercase tracking-wider text-[10px]">
                <th className="p-4">Item &amp; Fabric</th>
                <th className="p-4">Category</th>
                <th className="p-4">Listing Mode</th>
                <th className="p-4">Buy Price</th>
                <th className="p-4">3-Day Rental</th>
                <th className="p-4">Condition</th>
                <th className="p-4">Consignor / Seller</th>
                <th className="p-4">Live Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-linen-200">
              {inventory.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-10 text-center text-sage-500">
                    No active items found matching this filter.
                  </td>
                </tr>
              ) : (
                inventory.map((p) => (
                  <tr key={p.id} className="hover:bg-linen-50/80 transition-all text-xs">
                    <td className="p-4 flex items-center gap-3">
                      <img src={p.image} alt={p.title} className="w-12 h-14 object-cover object-top rounded-xl border border-linen-300 shadow-2xs" />
                      <div>
                        <div className="font-bold text-forest leading-snug">{p.title}</div>
                        <div className="text-[11px] text-sage-600 mt-0.5">{p.fabric} &bull; <strong className="text-forest">Size {p.size}</strong></div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-linen-200 text-forest">
                        {p.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        p.listing_mode === 'rent'
                          ? 'bg-purple-100 text-purple-800'
                          : p.listing_mode === 'both'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-sage-100 text-sage-800'
                      }`}>
                        {p.listing_mode}
                      </span>
                    </td>
                    <td className="p-4 font-mono font-bold text-sm text-forest">
                      {p.price ? '₹' + p.price.toLocaleString('en-IN') : '-'}
                    </td>
                    <td className="p-4 font-mono font-bold text-sm text-purple-800">
                      {p.rental_price_3_day ? '₹' + p.rental_price_3_day.toLocaleString('en-IN') : '-'}
                    </td>
                    <td className="p-4 text-sage-700 font-medium">{p.condition}</td>
                    <td className="p-4 text-sage-600 text-[11px]">{p.seller}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1 w-max">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        <span>Active Live</span>
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </section>
  );
}
