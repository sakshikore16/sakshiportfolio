import React from 'react';

export default function AtelierDonationsTab({ atelierRequests, donationRequests }) {
  return (
    <section className="space-y-8">
      
      {/* Atelier Rework Orders */}
      <div className="space-y-4">
        <div className="bg-white p-6 rounded-3xl border border-linen-300 shadow-xs flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-terracotta-50 text-terracotta-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-1">
              <span>Circular Remaking Guild</span>
            </div>
            <h2 className="font-serif text-3xl text-forest font-normal">Revive Atelier: Heirloom Upcycle Orders</h2>
            <p className="text-xs text-sage-600 mt-0.5">
              Customer vintage silk sarees and worn denims assigned to vetted Master Tailors.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-linen-300 shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-linen-100/80 border-b border-linen-200 text-forest font-semibold uppercase tracking-wider text-[10px]">
                <th className="p-4">Project ID</th>
                <th className="p-4">Customer &amp; Contact</th>
                <th className="p-4">Raw Textile Submitted</th>
                <th className="p-4">Target Modern Silhouette</th>
                <th className="p-4">Assigned Master Artisan</th>
                <th className="p-4">Remake Quote (₹)</th>
                <th className="p-4">Atelier Stage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-linen-200">
              {atelierRequests.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-sage-500">No atelier requests found.</td>
                </tr>
              ) : (
                atelierRequests.map((a) => (
                  <tr key={a.id} className="hover:bg-linen-50/80 transition-all text-xs">
                    <td className="p-4 font-mono font-bold text-forest">{a.id}</td>
                    <td className="p-4">
                      <strong>{a.customer_name}</strong>
                      <br />
                      <span className="text-emerald-700 text-[11px] font-medium">{a.customer_phone}</span>
                    </td>
                    <td className="p-4 max-w-xs font-medium text-forest">{a.fabric_type}</td>
                    <td className="p-4 font-bold text-terracotta-700">{a.target_silhouette}</td>
                    <td className="p-4 text-sage-700 font-semibold">{a.assigned_tailor}</td>
                    <td className="p-4 font-bold font-mono text-sm text-forest">₹{a.quote_inr.toLocaleString('en-IN')}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* NGO Donations Scheduled */}
      <div className="space-y-4">
        <div className="bg-white p-6 rounded-3xl border border-linen-300 shadow-xs flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-semibold uppercase tracking-wider mb-1">
              <span>Social Impact &amp; 80G Tax Receipts</span>
            </div>
            <h2 className="font-serif text-3xl text-forest font-normal">NGO Clothes Donation Doorstep Pickups</h2>
            <p className="text-xs text-sage-600 mt-0.5">
              Bulk wardrobe clearance coordinated with Goonj &amp; Clothes Box Foundation.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-linen-300 shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-linen-100/80 border-b border-linen-200 text-forest font-semibold uppercase tracking-wider text-[10px]">
                <th className="p-4">Donation ID</th>
                <th className="p-4">Donor Name &amp; Contact</th>
                <th className="p-4">City</th>
                <th className="p-4">Beneficiary NGO</th>
                <th className="p-4">Estimated Weight</th>
                <th className="p-4">Pickup Date</th>
                <th className="p-4">80G Tax Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-linen-200">
              {donationRequests.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-sage-500">No donation requests recorded.</td>
                </tr>
              ) : (
                donationRequests.map((d) => (
                  <tr key={d.id} className="hover:bg-linen-50/80 transition-all text-xs">
                    <td className="p-4 font-mono font-bold text-forest">{d.id}</td>
                    <td className="p-4">
                      <strong>{d.donor_name}</strong>
                      <br />
                      <span className="text-emerald-700 text-[11px] font-medium">{d.donor_phone}</span>
                    </td>
                    <td className="p-4 font-medium">{d.city}</td>
                    <td className="p-4 font-bold text-forest">{d.partner_ngo}</td>
                    <td className="p-4 font-bold font-mono text-sm text-forest">{d.estimated_kg} kg</td>
                    <td className="p-4 font-medium">{d.pickup_date}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        {d.tax_receipt_status}
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
