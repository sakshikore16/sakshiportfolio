import React from 'react';

export default function OrdersTab({ orders, search, onSearchChange, onRefresh, onUpdateStatus }) {
  return (
    <section className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-linen-300 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-semibold uppercase tracking-wider mb-1">
            <span>Doorstep Logistics &amp; Escrow Security</span>
          </div>
          <h2 className="font-serif text-3xl text-forest font-normal">Customer Orders &amp; Fulfillment</h2>
          <p className="text-xs text-sage-600 mt-0.5">
            Track buy orders, rental reservations, escrow deposit holds, sanitization status, and reverse courier pickups.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Filter by customer, ID, city..."
              className="w-full px-4 py-2 text-xs bg-linen-50/70 border border-linen-300 rounded-full focus:outline-none focus:border-sage-500"
            />
          </div>
          <button
            onClick={onRefresh}
            className="px-4 py-2 bg-linen-100 hover:bg-linen-200 text-forest rounded-full text-xs font-semibold flex items-center gap-2 border border-linen-300 transition-all shadow-2xs"
          >
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-linen-300 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-linen-100/80 border-b border-linen-200 text-forest font-semibold uppercase tracking-wider text-[10px]">
                <th className="p-4">Order ID &amp; Date</th>
                <th className="p-4">Customer &amp; Shipping Address</th>
                <th className="p-4">Garment &amp; Rental Dates</th>
                <th className="p-4">Type &amp; Escrow Status</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Logistics Status</th>
                <th className="p-4">Fulfillment Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-linen-200">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-10 text-center text-sage-500">
                    No orders match your search query.
                  </td>
                </tr>
              ) : (
                orders.map((o) => (
                  <tr key={o.id} className="hover:bg-linen-50/80 transition-all text-xs">
                    <td className="p-4 font-mono font-bold text-forest">
                      <div>{o.id}</div>
                      <div className="text-[10px] text-sage-500 font-normal font-sans">
                        {new Date(o.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-forest">{o.customer_name}</div>
                      <div className="text-[11px] text-emerald-700 font-medium">{o.customer_phone}</div>
                      <div className="text-[10px] text-sage-500 max-w-xs truncate mt-0.5">{o.shipping_address}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-forest">{o.item_title}</div>
                      {o.rental_dates && (
                        <div className="text-[10px] font-bold text-purple-800 bg-purple-50 px-2 py-0.5 rounded inline-block mt-0.5">
                          Rental: {o.rental_dates.start} to {o.rental_dates.end}
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        o.order_type === 'rent'
                          ? 'bg-purple-100 text-purple-800 border border-purple-200'
                          : 'bg-sage-100 text-sage-800 border border-sage-200'
                      }`}>
                        {o.order_type.toUpperCase()}
                      </span>
                      <div className="text-[10px] text-emerald-700 font-semibold mt-1">
                        🔒 {o.escrow_status}
                      </div>
                    </td>
                    <td className="p-4 font-bold font-mono text-sm text-forest">
                      ₹{o.total_amount.toLocaleString('en-IN')}
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-linen-200 text-forest border border-linen-300">
                        {o.order_status}
                      </span>
                      <div className="text-[10px] text-sage-600 mt-1 font-mono">{o.carrier}: {o.tracking_number}</div>
                    </td>
                    <td className="p-4">
                      <select
                        defaultValue=""
                        onChange={(e) => {
                          if (e.target.value) onUpdateStatus(o.id, e.target.value);
                        }}
                        className="text-[11px] bg-white border border-linen-300 rounded-xl px-2.5 py-1.5 text-forest font-medium focus:outline-none focus:border-sage-500 shadow-2xs"
                      >
                        <option value="" disabled>Update Fulfillment...</option>
                        <option value="Confirmed (Quality Check in Progress)">Confirmed (QC in progress)</option>
                        <option value="Ozone Steam Sanitized & Boxed">Steam Sanitized &amp; Boxed</option>
                        <option value="Dispatched via Blue Dart">Dispatched (Out for Delivery)</option>
                        <option value="Delivered to Customer">Delivered to Customer</option>
                        <option value="Return Courier Scheduled">Return Courier Scheduled</option>
                        <option value="Completed & Escrow Released">Completed &amp; Escrow Released</option>
                      </select>
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
