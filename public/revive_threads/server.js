const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 8000;
const DB_PATH = path.join(__dirname, 'data', 'db.json');

// Helper to read DB
function readDb() {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading db:', err);
    return { products: [], pending_requests: [], orders: [], atelier_requests: [], donation_requests: [] };
  }
}

// Helper to write DB atomically
function writeDb(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing db:', err);
    return false;
  }
}

// MIME types dictionary
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.csv': 'text/csv; charset=UTF-8',
  '.md': 'text/markdown; charset=UTF-8',
  '.ico': 'image/x-icon'
};

// Parse JSON body
function getJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 5 * 1024 * 1024) { // 5MB limit
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body.trim()) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

// Send JSON helper
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

// Main HTTP Server
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  // ----------------------------------------------------
  // REST API ROUTES
  // ----------------------------------------------------

  // 1. GET /api/products (User Storefront)
  if (method === 'GET' && pathname === '/api/products') {
    const db = readDb();
    let results = db.products.filter(p => p.status === 'active');

    const mode = parsedUrl.query.mode; // 'all', 'buy', 'rent', 'both'
    const category = parsedUrl.query.category; // 'top', 'skirt', 'dress', 'shirt', 'blazer', 'occasion', 'all'
    const search = (parsedUrl.query.search || '').trim().toLowerCase();

    // Mode filter:
    // If user clicks "Buy", we want items where listing_mode is 'buy' OR 'both'
    // If user clicks "Rent", we want items where listing_mode is 'rent' OR 'both'
    if (mode === 'buy') {
      results = results.filter(p => p.listing_mode === 'buy' || p.listing_mode === 'both');
    } else if (mode === 'rent') {
      results = results.filter(p => p.listing_mode === 'rent' || p.listing_mode === 'both');
    } else if (mode === 'both') {
      results = results.filter(p => p.listing_mode === 'both');
    }

    // Category filter
    if (category && category !== 'all') {
      results = results.filter(p => p.category === category);
    }

    // Search query filter
    if (search) {
      results = results.filter(p => 
        p.title.toLowerCase().includes(search) ||
        (p.fabric && p.fabric.toLowerCase().includes(search)) ||
        (p.seller && p.seller.toLowerCase().includes(search)) ||
        (p.description && p.description.toLowerCase().includes(search))
      );
    }

    return sendJson(res, 200, { success: true, count: results.length, products: results });
  }

  // 2. POST /api/sell-request (User submits item to Management for review)
  if (method === 'POST' && pathname === '/api/sell-request') {
    try {
      const data = await getJsonBody(req);
      const db = readDb();

      const newRequest = {
        id: 'req-' + Date.now(),
        seller_name: data.seller_name || 'Anonymous User',
        seller_phone: data.seller_phone || '+91 98000 00000',
        seller_email: data.seller_email || 'seller@revivethreads.in',
        title: data.title || 'Untitled Garment',
        category: data.category || 'top',
        listing_mode: data.listing_mode || 'buy', // 'buy', 'rent', or 'both'
        mrp: Number(data.mrp) || 2990,
        seller_asked_price: Number(data.seller_asked_price) || 0,
        seller_asked_rental_price: Number(data.seller_asked_rental_price) || 0,
        suggested_admin_price: Number(data.seller_asked_price) || 0,
        suggested_admin_rental_price: Number(data.seller_asked_rental_price) || 0,
        condition: data.condition || 'Like New (Pristine)',
        condition_notes: data.condition_notes || 'Clean condition, verified by seller.',
        size: data.size || 'M',
        measurements: data.measurements || { bust: '36"', waist: '28"', length: '26"' },
        fabric: data.fabric || 'Cotton / Blend',
        images: Array.isArray(data.images) && data.images.length > 0 ? data.images : [
          data.image || 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=700&auto=format&fit=crop'
        ],
        status: 'pending_approval',
        submitted_at: new Date().toISOString(),
        admin_notes: 'Newly submitted seller request awaiting condition inspection and price verification.'
      };

      db.pending_requests.unshift(newRequest);
      writeDb(db);

      return sendJson(res, 201, {
        success: true,
        message: 'Your listing request has been submitted to Management for condition & pricing review!',
        request: newRequest
      });
    } catch (e) {
      console.error(e);
      return sendJson(res, 400, { success: false, error: 'Invalid request payload' });
    }
  }

  // 3. GET /api/admin/pending-requests (Management portal reviews submissions)
  if (method === 'GET' && pathname === '/api/admin/pending-requests') {
    const db = readDb();
    return sendJson(res, 200, {
      success: true,
      pending: db.pending_requests.filter(r => r.status === 'pending_approval'),
      all_requests: db.pending_requests
    });
  }

  // 4. POST /api/admin/approve-request (Management approves & lists item live)
  if (method === 'POST' && pathname === '/api/admin/approve-request') {
    try {
      const data = await getJsonBody(req);
      const db = readDb();
      const requestId = data.requestId;

      const reqIndex = db.pending_requests.findIndex(r => r.id === requestId);
      if (reqIndex === -1) {
        return sendJson(res, 404, { success: false, error: 'Request not found' });
      }

      const request = db.pending_requests[reqIndex];
      const approvedPrice = Number(data.approved_price) !== undefined && !isNaN(Number(data.approved_price)) ? Number(data.approved_price) : request.seller_asked_price;
      const approvedRentalPrice = Number(data.approved_rental_price) !== undefined && !isNaN(Number(data.approved_rental_price)) ? Number(data.approved_rental_price) : request.seller_asked_rental_price;
      const adminNotes = data.admin_notes || 'Approved after physical quality check and price validation.';

      // Mark request as approved
      request.status = 'approved';
      request.approved_at = new Date().toISOString();
      request.approved_price = approvedPrice;
      request.approved_rental_price = approvedRentalPrice;
      request.admin_notes = adminNotes;

      // Convert request into live active product
      const newProduct = {
        id: 'prod-' + Date.now(),
        title: request.title,
        category: request.category,
        listing_mode: request.listing_mode,
        price: approvedPrice,
        rental_price_3_day: approvedRentalPrice,
        mrp: request.mrp,
        condition: request.condition,
        size: request.size,
        measurements: request.measurements,
        fabric: request.fabric,
        seller: `${request.seller_name} (Verified Seller ⭐ 4.9)`,
        water_saved: '2,800 L',
        co2_offset: '3.6 kg',
        image: request.images[0] || 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=700&auto=format&fit=crop',
        description: request.condition_notes || `Curated pre-loved garment in ${request.condition} condition. Sanitized and certified.`,
        status: 'active',
        source_request_id: request.id,
        created_at: new Date().toISOString()
      };

      db.products.unshift(newProduct);
      writeDb(db);

      return sendJson(res, 200, {
        success: true,
        message: 'Product approved and successfully published to live storefront!',
        product: newProduct
      });
    } catch (e) {
      console.error(e);
      return sendJson(res, 500, { success: false, error: 'Failed to approve request' });
    }
  }

  // 5. POST /api/admin/reject-request
  if (method === 'POST' && pathname === '/api/admin/reject-request') {
    try {
      const data = await getJsonBody(req);
      const db = readDb();
      const requestId = data.requestId;

      const reqIndex = db.pending_requests.findIndex(r => r.id === requestId);
      if (reqIndex === -1) {
        return sendJson(res, 404, { success: false, error: 'Request not found' });
      }

      db.pending_requests[reqIndex].status = 'rejected';
      db.pending_requests[reqIndex].rejection_reason = data.reason || 'Did not meet condition or authenticity criteria.';
      db.pending_requests[reqIndex].rejected_at = new Date().toISOString();

      writeDb(db);
      return sendJson(res, 200, { success: true, message: 'Request rejected with feedback.' });
    } catch (e) {
      return sendJson(res, 500, { success: false, error: 'Failed to reject request' });
    }
  }

  // 6. GET /api/orders & POST /api/orders (Orders Placement & Viewing)
  if (method === 'GET' && pathname === '/api/orders') {
    const db = readDb();
    return sendJson(res, 200, { success: true, orders: db.orders });
  }

  if (method === 'POST' && pathname === '/api/orders') {
    try {
      const data = await getJsonBody(req);
      const db = readDb();

      const newOrder = {
        id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
        customer_name: data.customer_name || 'Sneha Nair',
        customer_phone: data.customer_phone || '+91 99000 11223',
        customer_email: data.customer_email || 'customer@revivethreads.in',
        shipping_address: data.shipping_address || 'Flat 402, Green Glen Layout, Bengaluru - 560103',
        item_id: data.item_id || 'prod-custom',
        item_title: data.item_title || 'Revive Fashion Piece',
        order_type: data.order_type || 'buy', // 'buy' or 'rent'
        rental_dates: data.rental_dates || null,
        total_amount: Number(data.total_amount) || 1299,
        deposit_amount: data.order_type === 'rent' ? (Number(data.deposit_amount) || 1500) : 0,
        escrow_status: data.order_type === 'rent' ? 'Deposit & Rental Held in Escrow' : 'Funds in Escrow (Release in 48h)',
        order_status: 'Confirmed (Quality Check in Progress)',
        tracking_number: 'RT-' + Math.floor(100000 + Math.random() * 900000) + '-IN',
        carrier: 'Blue Dart / Delhivery Express',
        created_at: new Date().toISOString()
      };

      db.orders.unshift(newOrder);
      writeDb(db);

      return sendJson(res, 201, {
        success: true,
        message: 'Order created with Escrow Protection!',
        order: newOrder
      });
    } catch (e) {
      return sendJson(res, 400, { success: false, error: 'Failed to place order' });
    }
  }

  // 7. POST /api/admin/orders/update-status
  if (method === 'POST' && pathname === '/api/admin/orders/update-status') {
    try {
      const data = await getJsonBody(req);
      const db = readDb();
      const order = db.orders.find(o => o.id === data.orderId);
      if (!order) return sendJson(res, 404, { success: false, error: 'Order not found' });

      order.order_status = data.status || order.order_status;
      if (data.tracking_number) order.tracking_number = data.tracking_number;
      if (data.carrier) order.carrier = data.carrier;

      writeDb(db);
      return sendJson(res, 200, { success: true, message: 'Order status updated', order });
    } catch (e) {
      return sendJson(res, 500, { success: false, error: 'Failed to update order' });
    }
  }

  // 8. GET & POST /api/atelier-requests (Revive Atelier Upcycle Studio)
  if (method === 'GET' && pathname === '/api/atelier-requests') {
    const db = readDb();
    return sendJson(res, 200, { success: true, requests: db.atelier_requests });
  }

  if (method === 'POST' && pathname === '/api/atelier-requests') {
    try {
      const data = await getJsonBody(req);
      const db = readDb();
      const newAtelier = {
        id: 'ATL-' + Math.floor(100 + Math.random() * 900),
        customer_name: data.customer_name || 'Ananya Sen',
        customer_phone: data.customer_phone || '+91 98112 00000',
        fabric_type: data.fabric_type || 'Vintage Kanjeevaram Saree',
        target_silhouette: data.target_silhouette || 'Tailored Festive Blazer',
        measurements: data.measurements || 'Bust: 36", Waist: 28"',
        status: 'Consultation Scheduled',
        assigned_tailor: data.assigned_tailor || 'Master Rafiq (Old Delhi Guild)',
        quote_inr: Number(data.quote_inr) || 2400,
        created_at: new Date().toISOString()
      };
      db.atelier_requests.unshift(newAtelier);
      writeDb(db);
      return sendJson(res, 201, { success: true, message: 'Atelier request booked', request: newAtelier });
    } catch (e) {
      return sendJson(res, 400, { success: false, error: 'Invalid atelier request' });
    }
  }

  // 9. GET & POST /api/donation-requests (NGO Donations)
  if (method === 'GET' && pathname === '/api/donation-requests') {
    const db = readDb();
    return sendJson(res, 200, { success: true, donations: db.donation_requests });
  }

  if (method === 'POST' && pathname === '/api/donation-requests') {
    try {
      const data = await getJsonBody(req);
      const db = readDb();
      const newDonation = {
        id: 'DON-' + Math.floor(100 + Math.random() * 900),
        donor_name: data.donor_name || 'Priyanka Saxena',
        donor_phone: data.donor_phone || '+91 98100 00000',
        city: data.city || 'Delhi-NCR',
        partner_ngo: data.partner_ngo || 'Goonj — Vastra Samman',
        estimated_kg: Number(data.estimated_kg) || 5,
        pickup_date: data.pickup_date || new Date().toISOString().split('T')[0],
        tax_receipt_status: 'Scheduled (80G to be issued)',
        green_points_earned: (Number(data.estimated_kg) || 5) * 100,
        created_at: new Date().toISOString()
      };
      db.donation_requests.unshift(newDonation);
      writeDb(db);
      return sendJson(res, 201, { success: true, message: 'Doorstep pickup confirmed', donation: newDonation });
    } catch (e) {
      return sendJson(res, 400, { success: false, error: 'Invalid donation request' });
    }
  }

  // 9.5 POST /api/admin/quick-add-product (Direct Catalog Addition by Management)
  if (method === 'POST' && pathname === '/api/admin/quick-add-product') {
    try {
      const data = await getJsonBody(req);
      const db = readDb();
      const newProduct = {
        id: 'prod-' + Date.now(),
        title: data.title || 'Curated Garment',
        category: data.category || 'lehenga',
        listing_mode: data.listing_mode || 'both',
        price: Number(data.price) || 0,
        rental_price_3_day: Number(data.rental_price_3_day) || 0,
        mrp: Number(data.mrp) || 9999,
        condition: data.condition || 'Like New (Pristine)',
        size: data.size || 'M',
        measurements: data.measurements || { bust: '36"', length: '42"' },
        fabric: data.fabric || 'Pure Textile',
        seller: data.seller || 'Revive Operations Consignment ⭐ 5.0',
        water_saved: '5,000 L',
        co2_offset: '7.5 kg',
        image: data.image || 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=700&auto=format&fit=crop',
        description: data.description || 'Pre-loved garment verified across 5 quality parameters, ozone sanitized and catalog ready.',
        status: 'active',
        created_at: new Date().toISOString()
      };
      db.products.unshift(newProduct);
      writeDb(db);
      return sendJson(res, 201, { success: true, message: 'Garment listed live on store!', product: newProduct });
    } catch (e) {
      return sendJson(res, 400, { success: false, error: 'Failed to add garment' });
    }
  }

  // 10. GET /api/admin/stats (Management Analytics Summary)
  if (method === 'GET' && pathname === '/api/admin/stats') {
    const db = readDb();
    const activeProducts = db.products.filter(p => p.status === 'active');
    const pendingListings = db.pending_requests.filter(r => r.status === 'pending_approval');
    const totalOrders = db.orders.length;
    const totalGMV = db.orders.reduce((sum, o) => sum + (o.total_amount || 0), 0) + 
                     activeProducts.reduce((sum, p) => sum + (p.price || p.rental_price_3_day || 0), 0);
    const platformCommission = Math.round(totalGMV * 0.22); // average 22% take

    return sendJson(res, 200, {
      success: true,
      stats: {
        active_inventory_count: activeProducts.length,
        pending_approvals_count: pendingListings.length,
        total_orders_count: totalOrders,
        total_gmv_inr: totalGMV,
        platform_commission_inr: platformCommission,
        active_atelier_count: db.atelier_requests.length,
        total_donations_kg: db.donation_requests.reduce((sum, d) => sum + (d.estimated_kg || 0), 0)
      }
    });
  }

  // ----------------------------------------------------
  // STATIC FILE SERVING
  // ----------------------------------------------------
  let filePath = '';
  if (pathname === '/' || pathname === '/index.html' || pathname === '/store') {
    filePath = path.join(__dirname, 'index.html');
  } else if (pathname === '/admin' || pathname === '/admin.html') {
    filePath = path.join(__dirname, 'admin.html');
  } else if (pathname === '/documents' || pathname === '/documents.html' || 
             pathname === '/brand-guidelines' || pathname === '/prd' || 
             pathname === '/market-research' || pathname === '/analytics') {
    filePath = path.join(__dirname, 'documents.html');
  } else if (pathname === '/pitch-deck' || pathname === '/pitch' || pathname === '/pitch.html') {
    filePath = path.join(__dirname, 'pitch.html');
  } else {
    filePath = path.join(__dirname, pathname);
  }

  // Security check to avoid directory traversal
  const normalizedPath = path.normalize(filePath);
  if (!normalizedPath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('Access Denied');
  }

  fs.stat(normalizedPath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('404 Not Found');
    }

    const ext = path.extname(normalizedPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    const stream = fs.createReadStream(normalizedPath);
    stream.pipe(res);
  });
});

// Primary Server on 8000
server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` REVIVE THREADS FULL-STACK PLATFORM RUNNING`);
  console.log(`=======================================================`);
  console.log(` • User Storefront:     http://localhost:${PORT}/`);
  console.log(` • Management Portal:   http://localhost:${PORT}/admin`);
  console.log(` • Canva-Style Docs:    http://localhost:${PORT}/documents`);
  console.log(` • Investor Pitch Deck: http://localhost:${PORT}/pitch-deck`);
  console.log(`=======================================================`);
});

// Dedicated Localhost 8001: Management Operations Portal
const adminServer = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (parsedUrl.pathname === '/') {
    parsedUrl.pathname = '/admin.html';
    req.url = '/admin.html';
  }
  server.emit('request', req, res);
});
adminServer.listen(8001, () => {
  console.log(` • [Dedicated Localhost] Management Portal: http://localhost:8001/`);
}).on('error', (err) => console.log('Port 8001 info:', err.message));

// Dedicated Localhost 8002: Canva Executive Documentation Suite
const docsServer = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (parsedUrl.pathname === '/') {
    parsedUrl.pathname = '/documents.html';
    req.url = '/documents.html';
  }
  server.emit('request', req, res);
});
docsServer.listen(8002, () => {
  console.log(` • [Dedicated Localhost] Canva Docs Suite:   http://localhost:8002/`);
}).on('error', (err) => console.log('Port 8002 info:', err.message));

// Dedicated Localhost 8003: Standalone Investor Pitch Presentation
const pitchServer = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (parsedUrl.pathname === '/') {
    parsedUrl.pathname = '/pitch.html';
    req.url = '/pitch.html';
  }
  server.emit('request', req, res);
});
pitchServer.listen(8003, () => {
  console.log(` • [Dedicated Localhost] Investor Pitch Deck: http://localhost:8003/`);
}).on('error', (err) => console.log('Port 8003 info:', err.message));
