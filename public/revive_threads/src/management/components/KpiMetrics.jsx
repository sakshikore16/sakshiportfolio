import React from 'react';

export default function KpiMetrics({ stats }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-3xl border border-linen-300 shadow-xs hover:border-sage-400 transition-all">
          <div className="flex items-center justify-between text-xs text-sage-600 font-semibold mb-2">
            <span>Pending Approvals</span>
            <span className="w-7 h-7 rounded-full bg-terracotta-50 text-terracotta-600 flex items-center justify-center font-bold text-xs">
              ⏳
            </span>
          </div>
          <div className="text-3xl font-bold text-forest font-serif">
            {stats.pending_approvals_count ?? 3}
          </div>
          <div className="text-[11px] text-terracotta-700 font-medium mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500 animate-pulse"></span>
            <span>Requires condition &amp; pricing review</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-linen-300 shadow-xs hover:border-sage-400 transition-all">
          <div className="flex items-center justify-between text-xs text-sage-600 font-semibold mb-2">
            <span>Active Store Inventory</span>
            <span className="w-7 h-7 rounded-full bg-sage-50 text-sage-600 flex items-center justify-center font-bold text-xs">
              👗
            </span>
          </div>
          <div className="text-3xl font-bold text-forest font-serif">
            {stats.active_inventory_count ?? 24}
          </div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Live across Buy &amp; Occasion Rent</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-linen-300 shadow-xs hover:border-sage-400 transition-all">
          <div className="flex items-center justify-between text-xs text-sage-600 font-semibold mb-2">
            <span>Total Platform GMV</span>
            <span className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
              📈
            </span>
          </div>
          <div className="text-3xl font-bold text-forest font-serif">
            ₹{(stats.total_gmv_inr ?? 48250).toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1">
            Pre-loved sale &amp; rental combined
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-linen-300 shadow-xs hover:border-sage-400 transition-all">
          <div className="flex items-center justify-between text-xs text-sage-600 font-semibold mb-2">
            <span>Net Take Revenue</span>
            <span className="w-7 h-7 rounded-full bg-sage-50 text-sage-600 flex items-center justify-center font-bold text-xs">
              💼
            </span>
          </div>
          <div className="text-3xl font-bold text-forest font-serif">
            ₹{(stats.platform_commission_inr ?? 10615).toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-sage-600 font-medium mt-1">
            22% average circular take-rate
          </div>
        </div>

      </div>
    </section>
  );
}
