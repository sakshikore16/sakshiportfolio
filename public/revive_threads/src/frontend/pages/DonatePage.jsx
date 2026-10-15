import React from 'react';
import CustomSelect from '../components/CustomSelect';

export default function DonatePage({
  donateCity,
  setDonateCity,
  donatePartner,
  setDonatePartner,
  triggerToast,
  setActivePage
}) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    try {
      await fetch('/api/donation-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donor_name: form.donor_name.value,
          donor_phone: form.donor_phone.value,
          city: donateCity,
          partner_ngo: donatePartner,
          estimated_kg: Number(form.weight.value),
          pickup_date: form.date.value
        })
      });
    } catch (err) {
      console.log('Error submitting donation request:', err);
    }
    triggerToast('Donation pickup scheduled! Your 80G tax receipt will be emailed.');
    setActivePage('home');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider">
          <svg className="w-3.5 h-3.5 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span>Verified Charity Program • 80G Tax Deductible</span>
        </div>
        <h1 className="font-cormorant text-4xl sm:text-5xl text-forest">Donate Clothes with Conscience</h1>
        <p className="text-sm text-sage-700 leading-relaxed">
          Schedule a free doorstep collection. We partner directly with <strong>Goonj (Vastra Samman)</strong> and <strong>Clothes Box Foundation</strong> to redistribute dignified clothing across rural India with 100% verified impact tracking.
        </p>
      </div>

      <div className="bg-white p-8 sm:p-14 rounded-3xl border border-linen-300 shadow-lg space-y-8 text-sm">
        <div className="flex items-center justify-between border-b border-linen-200 pb-4">
          <div>
            <h3 className="font-bold text-lg text-forest">Schedule Free Doorstep Pickup</h3>
            <p className="text-xs text-sage-600 mt-0.5">Our courier executive collects your packaged clothes directly from your address.</p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Zero Courier Fee
          </span>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-forest/80 mb-2">Donor Full Name</label>
              <input
                name="donor_name"
                required
                defaultValue="Priyanka Saxena"
                className="w-full px-4 py-3 text-sm bg-linen-50/50 border border-linen-300 rounded-xl focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500 shadow-2xs font-sans"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-forest/80 mb-2">WhatsApp Phone Number</label>
              <input
                name="donor_phone"
                required
                defaultValue="+91 98100 88210"
                className="w-full px-4 py-3 text-sm bg-linen-50/50 border border-linen-300 rounded-xl focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500 shadow-2xs font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <CustomSelect
              label="Service City"
              value={donateCity}
              onChange={setDonateCity}
              options={[
                { value: 'DELHI-NCR', label: 'Delhi-NCR (Same-Day Pickup)' },
                { value: 'MUMBAI', label: 'Mumbai & MMR' },
                { value: 'BENGALURU', label: 'Bengaluru Urban' },
                { value: 'PUNE', label: 'Pune & PCMC' }
              ]}
            />
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-forest/80 mb-2">Estimated Package Weight (kg)</label>
              <input
                name="weight"
                type="number"
                defaultValue="5"
                min="1"
                max="50"
                className="w-full px-4 py-3 text-sm bg-linen-50/50 border border-linen-300 rounded-xl focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500 shadow-2xs font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <CustomSelect
              label="Beneficiary Partner NGO"
              value={donatePartner}
              onChange={setDonatePartner}
              options={[
                { value: 'Goonj — Vastra Samman', label: 'Goonj — Vastra Samman (Rural Upliftment)' },
                { value: 'Clothes Box Foundation', label: 'Clothes Box Foundation (Shelter Blankets & Quilts)' }
              ]}
            />
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-forest/80 mb-2">Preferred Pickup Date</label>
              <input
                name="date"
                type="date"
                defaultValue="2026-10-18"
                className="w-full px-4 py-3 text-sm bg-linen-50/50 border border-linen-300 rounded-xl focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500 shadow-2xs font-sans"
              />
            </div>
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-950 text-xs sm:text-sm flex items-start gap-3">
            <svg className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div>
              <strong>80G Tax Exemption Receipt:</strong> Automatically issued within 48 hours to your registered email + 500 Green Thread reward points credited to your circular profile.
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-2xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4 text-emerald-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Confirm Free Doorstep Courier Pickup →</span>
          </button>
        </form>
      </div>

      {/* Partner NGO Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <div className="p-8 bg-linen-100 rounded-3xl border border-linen-300 space-y-3 flex flex-col justify-between shadow-xs">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm mb-3">
              GOONJ
            </div>
            <h4 className="font-bold text-base text-forest">Goonj: Vastra Samman</h4>
            <p className="text-xs sm:text-sm text-sage-700 leading-relaxed mt-2">
              Transforms discarded urban clothing into development resources for flood relief, village school infrastructure, and dignity kits across tribal belts. Over 4,000 tonnes diverted annually.
            </p>
          </div>
          <div className="pt-4 border-t border-linen-200 flex items-center justify-between text-xs text-sage-600">
            <span>Verified NGO Partner</span>
            <span className="font-semibold text-forest">Pan-India Reach</span>
          </div>
        </div>

        <div className="p-8 bg-linen-100 rounded-3xl border border-linen-300 space-y-3 flex flex-col justify-between shadow-xs">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-terracotta-100 text-terracotta-800 font-bold flex items-center justify-center text-sm mb-3">
              CBF
            </div>
            <h4 className="font-bold text-base text-forest">Clothes Box Foundation</h4>
            <p className="text-xs sm:text-sm text-sage-700 leading-relaxed mt-2">
              Recycles worn fabrics into heavy winter blankets and thermal quilts for homeless shelters and disaster-affected families across North India and Himalayan communities.
            </p>
          </div>
          <div className="pt-4 border-t border-linen-200 flex items-center justify-between text-xs text-sage-600">
            <span>Verified NGO Partner</span>
            <span className="font-semibold text-forest">Direct Shelter Distribution</span>
          </div>
        </div>
      </div>

    </div>
  );
}
