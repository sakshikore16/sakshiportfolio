import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import ProductModal from './components/ProductModal';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import RentalsPage from './pages/RentalsPage';
import AtelierPage from './pages/AtelierPage';
import DonatePage from './pages/DonatePage';
import SellPage from './pages/SellPage';

export default function App() {
  // Navigation Router State: 'home' | 'shop' | 'rent' | 'atelier' | 'donate' | 'sell' | 'product'
  const [activePage, setActivePage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Inventory Data
  const [products, setProducts] = useState([]);

  // Global Filters
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterMode, setFilterMode] = useState('all');
  const [filterSize, setFilterSize] = useState('all');
  const [filterCondition, setFilterCondition] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [rentalCategory, setRentalCategory] = useState('all');

  // Cart State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Toast Feedback
  const [toast, setToast] = useState(null);

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // Sell Page Custom Dropdowns State
  const [sellCategory, setSellCategory] = useState('top');
  const [sellMode, setSellMode] = useState('both');
  const [sellSize, setSellSize] = useState('M');
  const [sellCondition, setSellCondition] = useState('Like New (Pristine)');

  // Donate Page Custom Dropdowns State
  const [donateCity, setDonateCity] = useState('DELHI-NCR');
  const [donatePartner, setDonatePartner] = useState('Goonj — Vastra Samman');

  // Sell Page Interactive Photo Upload State & Handlers
  const [sellPhotos, setSellPhotos] = useState([
    {
      id: 'photo-default-1',
      url: 'https://images.unsplash.com/photo-1534126511673-b6899657816a?q=80&w=700&auto=format&fit=crop',
      label: 'Front View (Primary)'
    },
    {
      id: 'photo-default-2',
      url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=700&auto=format&fit=crop',
      label: 'Care / Brand Label'
    }
  ]);

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    files.forEach((file, idx) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSellPhotos(prev => [
          ...prev,
          {
            id: 'upload-' + Date.now() + '-' + idx,
            url: event.target.result,
            label: `Uploaded Photo #${prev.length + 1}`
          }
        ]);
      };
      reader.readAsDataURL(file);
    });
    triggerToast(`Attached ${files.length} garment photo(s)!`);
  };

  const removePhoto = (id) => {
    if (sellPhotos.length <= 1) {
      triggerToast('Please keep at least 1 photo for listing verification.');
      return;
    }
    setSellPhotos(prev => prev.filter(p => p.id !== id));
  };

  const addPresetPhoto = (url, label) => {
    setSellPhotos(prev => [
      ...prev,
      {
        id: 'preset-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
        url: url,
        label: label
      }
    ]);
    triggerToast(`Added preset: ${label}`);
  };

  // Load products from backend API
  useEffect(() => {
    async function fetchLiveInventory() {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          if (data.products && Array.isArray(data.products) && data.products.length > 0) {
            setProducts(data.products);
            if (cart.length === 0 && data.products.length >= 2) {
              setCart([data.products[0], data.products[2]]);
            }
          }
        }
      } catch (e) {
        console.log('Error fetching live inventory:', e);
      }
    }
    fetchLiveInventory();
  }, []);

  // Scroll to top on page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  // Cart management
  const addToBag = (garment) => {
    if (!cart.some(item => item.id === garment.id)) {
      setCart(prev => [...prev, garment]);
      triggerToast(`Added "${garment.title}" to your circular bag!`);
    } else {
      triggerToast(`"${garment.title}" is already in your bag!`);
    }
  };

  const removeFromBag = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Filtered catalog
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (filterCategory !== 'all' && p.category !== filterCategory) return false;
      if (filterMode === 'buy') {
        if (p.listing_mode !== 'buy' && p.listing_mode !== 'both' && p.type !== 'thrift') return false;
      } else if (filterMode === 'rent') {
        if (p.listing_mode !== 'rent' && p.listing_mode !== 'both' && p.type !== 'rental') return false;
      } else if (filterMode === 'both') {
        if (p.listing_mode !== 'both') return false;
      }
      if (filterSize !== 'all' && !p.size.includes(filterSize)) return false;
      if (filterCondition !== 'all' && p.condition !== filterCondition) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match = p.title.toLowerCase().includes(q) ||
                      (p.fabric && p.fabric.toLowerCase().includes(q)) ||
                      (p.seller && p.seller.toLowerCase().includes(q));
        if (!match) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return (a.price || a.rental_price_3_day || 0) - (b.price || b.rental_price_3_day || 0);
      if (sortBy === 'price-high') return (b.price || b.rental_price_3_day || 0) - (a.price || a.rental_price_3_day || 0);
      if (sortBy === 'savings') {
        const savA = (a.mrp - (a.price || a.rental_price_3_day || 0)) / a.mrp;
        const savB = (b.mrp - (b.price || b.rental_price_3_day || 0)) / b.mrp;
        return savB - savA;
      }
      return 0;
    });
  }, [products, filterCategory, filterMode, filterSize, filterCondition, searchQuery, sortBy]);

  // View product details
  const viewProduct = (p) => {
    setSelectedProduct(p);
    setActivePage('product');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-linen-50 font-sans text-forest">
      
      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-forest text-white px-5 py-3 rounded-2xl shadow-2xl border border-sage-700 flex items-center gap-3 transition-all animate-bounce">
          <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs font-medium">{toast}</span>
        </div>
      )}

      {/* Top Announcement Bar */}
      <div className="bg-forest text-linen-100 text-xs py-2.5 px-4 border-b border-sage-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] sm:text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-white">🌿 India's 1st Unified Wardrobe Lifecycle Platform:</span>
            <span className="text-sage-200 hidden md:inline">100% Escrow Protected • Ozone Steam Sanitized • Free Reverse Courier</span>
          </div>
          <div className="flex items-center gap-4 text-sage-300">
            <button onClick={() => setActivePage('donate')} className="hover:text-white transition-colors">Donate to NGO</button>
            <span>•</span>
            <button onClick={() => setActivePage('atelier')} className="hover:text-white transition-colors">Redesign Saree (Atelier)</button>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        cartCount={cart.length}
        setIsCartOpen={setIsCartOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setFilterCategory={setFilterCategory}
        setFilterMode={setFilterMode}
      />

      {/* Dynamic React Router Pages */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            products={products}
            setActivePage={setActivePage}
            setFilterCategory={setFilterCategory}
            setFilterMode={setFilterMode}
            viewProduct={viewProduct}
            addToBag={addToBag}
          />
        )}

        {activePage === 'shop' && (
          <ShopPage
            products={products}
            filteredProducts={filteredProducts}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            filterMode={filterMode}
            setFilterMode={setFilterMode}
            filterSize={filterSize}
            setFilterSize={setFilterSize}
            filterCondition={filterCondition}
            setFilterCondition={setFilterCondition}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortBy={sortBy}
            setSortBy={setSortBy}
            viewProduct={viewProduct}
            addToBag={addToBag}
          />
        )}

        {activePage === 'rent' && (
          <RentalsPage
            products={products}
            rentalCategory={rentalCategory}
            setRentalCategory={setRentalCategory}
            viewProduct={viewProduct}
            addToBag={addToBag}
            setIsCartOpen={setIsCartOpen}
          />
        )}

        {activePage === 'atelier' && (
          <AtelierPage
            triggerToast={triggerToast}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'donate' && (
          <DonatePage
            donateCity={donateCity}
            setDonateCity={setDonateCity}
            donatePartner={donatePartner}
            setDonatePartner={setDonatePartner}
            triggerToast={triggerToast}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'sell' && (
          <SellPage
            sellCategory={sellCategory}
            setSellCategory={setSellCategory}
            sellMode={sellMode}
            setSellMode={setSellMode}
            sellSize={sellSize}
            setSellSize={setSellSize}
            sellCondition={sellCondition}
            setSellCondition={setSellCondition}
            sellPhotos={sellPhotos}
            handlePhotoUpload={handlePhotoUpload}
            removePhoto={removePhoto}
            addPresetPhoto={addPresetPhoto}
            triggerToast={triggerToast}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'product' && (
          <ProductModal
            product={selectedProduct}
            onBack={() => setActivePage('shop')}
            onAddToBag={(p) => { addToBag(p); setIsCartOpen(true); }}
          />
        )}
      </main>

      {/* Shopping Bag Drawer & Checkout Modal */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        removeFromBag={removeFromBag}
        clearCart={clearCart}
        triggerToast={triggerToast}
        setActivePage={setActivePage}
      />

      {/* Footer with Student Attribution */}
      <footer className="bg-forest text-linen-100 py-12 px-4 sm:px-6 lg:px-8 border-t border-sage-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-sage-300">
          <div className="space-y-1 text-center md:text-left">
            <div className="font-cormorant text-2xl text-white font-medium tracking-wider">REVIVE THREADS</div>
            <div>Circular Wardrobe Ecosystem • Buy • Sell • Rent • Redesign • Donate</div>
          </div>

          <div className="text-center md:text-right space-y-1">
            <div className="text-white font-semibold">Founding Team:</div>
            <div className="text-sage-200">Sakshi Kore • Arpita Jadhav • Yashika Thakur</div>
            <div className="text-[10px] text-sage-400">Ideated & Developed in 2024 • Academic & Portfolio Project</div>
          </div>
        </div>
      </footer>

    </div>
  );
}
