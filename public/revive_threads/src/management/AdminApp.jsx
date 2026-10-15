import React, { useState, useEffect, useMemo } from 'react';

/**
 * Revive Threads — Management & Operations Platform (React App)
 * Author Attribution: Sakshi Kore | Arpita Jadhav | Yashika Thakur
 */
export default function AdminApp() {
  const [activeTab, setActiveTab] = useState('approvals');
  const [pendingRequests, setPendingRequests] = useState([]);
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [atelierRequests, setAtelierRequests] = useState([]);
  const [donationRequests, setDonationRequests] = useState([]);
  const [stats, setStats] = useState({
    active_inventory_count: 0,
    pending_approvals_count: 0,
    total_orders_count: 0,
    total_gmv_inr: 0,
    platform_commission_inr: 0
  });

  // Search & Filter State
  const [pendingSearch, setPendingSearch] = useState('');
  const [pendingFilterMode, setPendingFilterMode] = useState('all');
  const [orderSearch, setOrderSearch] = useState('');
  const [inventorySearch, setInventorySearch] = useState('');
  const [inventoryCategory, setInventoryCategory] = useState('all');

  // Modals & Toast State
  const [isQuickConsignOpen, setIsQuickConsignOpen] = useState(false);
  const [rejectingItem, setRejectingItem] = useState(null); // { id, title, seller_name }
  const [rejectReasonPreset, setRejectReasonPreset] = useState('Fabric damage / tear / unrepairable stains detected');
  const [rejectNotes, setRejectNotes] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Data Fetching
  const fetchAllData = async () => {
    try {
      const [resPend, resOrd, resInv, resAtl, resDon, resStat] = await Promise.all([
        fetch('/api/admin/pending-requests').then(r => r.json()).catch(() => ({ pending: [] })),
        fetch('/api/orders').then(r => r.json()).catch(() => ({ orders: [] })),
        fetch('/api/products?mode=all').then(r => r.json()).catch(() => ({ products: [] })),
        fetch('/api/atelier-requests').then(r => r.json()).catch(() => ({ requests: [] })),
        fetch('/api/donation-requests').then(r => r.json()).catch(() => ({ donations: [] })),
        fetch('/api/admin/stats').then(r => r.json()).catch(() => ({ stats: {} }))
      ]);

      if (resPend.pending) setPendingRequests(resPend.pending);
      if (resOrd.orders) setOrders(resOrd.orders);
      if (resInv.products) setInventory(resInv.products);
      if (resAtl.requests) setAtelierRequests(resAtl.requests);
      if (resDon.donations) setDonationRequests(resDon.donations);
      if (resStat.stats) setStats(resStat.stats);
    } catch (e) {
      console.error('Error fetching admin data:', e);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Approve Seller Request
  const handleApprove = async (requestId, approvedPrice, approvedRental, adminNotes) => {
    try {
      const res = await fetch('/api/admin/approve-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId,
          approved_price: approvedPrice,
          approved_rental_price: approvedRental,
          admin_notes: adminNotes
        })
      });
      const data = await res.json();
      if (data.success) {
        showToast('Approved & published live to customer storefront!');
        fetchAllData();
      } else {
        showToast('Error: ' + data.error);
      }
    } catch (err) {
      showToast('Error approving request: ' + err.message);
    }
  };

  // Confirm Rejection
  const handleConfirmRejection = async () => {
    if (!rejectingItem) return;
    const finalReason = rejectNotes.trim() ? `${rejectReasonPreset} — Note: ${rejectNotes.trim()}` : rejectReasonPreset;
    try {
      const res = await fetch('/api/admin/reject-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId: rejectingItem.id, reason: finalReason })
      });
      const data = await res.json();
      if (data.success) {
        showToast('Submission rejected and archived.');
        setRejectingItem(null);
        setRejectNotes('');
        fetchAllData();
      } else {
        showToast('Error: ' + data.error);
      }
    } catch (err) {
      showToast('Failed to reject submission');
    }
  };

  // Quick Consign Garment Submit
  const handleQuickConsignSubmit = async (e) => {
    e.preventDefault();
    const f = e.target;
    const payload = {
      title: f.title.value,
      category: f.category.value,
      listing_mode: f.listing_mode.value,
      mrp: Number(f.mrp.value),
      price: Number(f.price.value || 0),
      rental_price_3_day: Number(f.rental.value || 0),
      size: f.size.value,
      condition: f.condition.value,
      fabric: f.fabric.value,
      image: f.image.value,
      seller: 'Revive Operations Consignment ⭐ 5.0'
    };

    try {
      const res = await fetch('/api/admin/quick-add-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        showToast('Garment directly listed live to storefront!');
        setIsQuickConsignOpen(false);
        fetchAllData();
      } else {
        showToast('Failed: ' + data.error);
      }
    } catch (err) {
      showToast('Error listing garment');
    }
  };

  // Update Order Status
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch('/api/admin/orders/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        showToast('Order status updated: ' + newStatus);
        fetchAllData();
      }
    } catch (err) {
      showToast('Failed to update status');
    }
  };

  // Filtered views
  const filteredPending = useMemo(() => {
    return pendingRequests.filter(r => {
      if (pendingFilterMode !== 'all' && r.listing_mode !== pendingFilterMode) return false;
      if (pendingSearch.trim()) {
        const q = pendingSearch.toLowerCase();
        return r.title.toLowerCase().includes(q) || r.seller_name.toLowerCase().includes(q) || r.seller_phone.includes(q);
      }
      return true;
    });
  }, [pendingRequests, pendingFilterMode, pendingSearch]);

  const filteredOrders = useMemo(() => {
    if (!orderSearch.trim()) return orders;
    const q = orderSearch.toLowerCase();
    return orders.filter(o => 
      o.id.toLowerCase().includes(q) || 
      o.customer_name.toLowerCase().includes(q) || 
      o.customer_phone.includes(q) ||
      o.item_title.toLowerCase().includes(q)
    );
  }, [orders, orderSearch]);

  const filteredInventory = useMemo(() => {
    return inventory.filter(p => {
      if (inventoryCategory !== 'all') {
        if (inventoryCategory === 'top') {
          if (p.category !== 'top' && p.category !== 'skirt') return false;
        } else if (p.category !== inventoryCategory) {
          return false;
        }
      }
      if (inventorySearch.trim()) {
        const q = inventorySearch.toLowerCase();
        return p.title.toLowerCase().includes(q) || (p.fabric && p.fabric.toLowerCase().includes(q)) || (p.seller && p.seller.toLowerCase().includes(q));
      }
      return true;
    });
  }, [inventory, inventoryCategory, inventorySearch]);

  return {
    activeTab,
    setActiveTab,
    stats,
    pendingRequests: filteredPending,
    orders: filteredOrders,
    inventory: filteredInventory,
    atelierRequests,
    donationRequests,
    pendingFilterMode,
    setPendingFilterMode,
    pendingSearch,
    setPendingSearch,
    orderSearch,
    setOrderSearch,
    inventoryCategory,
    setInventoryCategory,
    inventorySearch,
    setInventorySearch,
    isQuickConsignOpen,
    setIsQuickConsignOpen,
    rejectingItem,
    setRejectingItem,
    rejectReasonPreset,
    setRejectReasonPreset,
    rejectNotes,
    setRejectNotes,
    toastMessage,
    handleApprove,
    handleConfirmRejection,
    handleQuickConsignSubmit,
    handleUpdateOrderStatus,
    fetchAllData
  };
}
