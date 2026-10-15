# REVIVE THREADS — India's Unified Circular Fashion Ecosystem

> **A Complete Full-Stack Platform (User Storefront & Management Admin Portal) & Executive Canva-Style Venture Documentation Suite.**
>
> **Project Authors (Group Submission):**  
> 🌟 **Sakshi Kore** | **Arpita Jadhav** | **Yashika Thakur**

---

## 🌟 Executive Overview & Platform Concept

**Revive Threads** is India's first unified circular wardrobe lifecycle platform designed to end fast-fashion waste by turning closets into living, circular assets. The platform integrates:
1. **Thrift (Re-Wear)**: Peer-to-peer and managed resale of everyday apparel (tops, skirts, dresses, shirts, blazers) at 60–85% off retail with escrow buyer protection.
2. **Rent (Re-Live)**: 3- to 7-day insured rental of heavy festive and bridal couture (lehengas, sherwanis, anarkalis) at 10% of retail price with guaranteed medical-grade steam sanitization.
3. **Revive Atelier (Re-Invent)**: On-demand upcycling studio connecting consumers' heirloom textiles (vintage Kanjeevarams, Banarasis, worn denim) with vetted local master tailors and pattern-makers.
4. **Donate (Re-Give)**: Doorstep collection partnered with verified NGOs (**Goonj**, **Clothes Box Foundation**) providing instant 80G tax receipts and "Green Thread" loyalty points.

---

## 🏗️ Full-Stack Two-Platform Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        REVIVE THREADS ECOSYSTEM                         │
├───────────────────────────────────┬────────────────────────────────────┤
│       1. USER PLATFORM            │       2. MANAGEMENT PLATFORM       │
│         (index.html)              │          (admin.html)              │
├───────────────────────────────────┼────────────────────────────────────┤
│ • Browse & search daily & festive │ • Review pending seller listings   │
│ • Filter: Buy, Rent, or Both      │ • Verify photos, fabric & condition│
│ • Sell wizard (submits to Admin)  │ • Calibrate/negotiate final prices │
│ • Escrow bag & mock checkout      │ • 1-Click "Approve & Publish Live" │
│ • Upcycle atelier quote requests  │ • Order fulfillment (QC & sanitize)│
│ • NGO doorstep pickup scheduling  │ • Real-time GMV & revenue metrics  │
└───────────────────────────────────┴────────────────────────────────────┘
                                     │
                     REST API & Persistent JSON Store
                     (server.js  <--->  data/db.json)
```

---

## 🔄 The Listing, Review & Approval Workflow

1. **User Submits a Garment**:
   - The user selects whether to list the item for **Selling Only (Buy)**, **Renting Only**, or **Both (Can Buy or Rent)**.
   - User inputs size, measurements (bust, waist, length in inches), condition checklist, retail MRP, and asked price.
   - **Crucial Feature**: The product does **not** go directly to the public store. It enters the **Management Pending Review Queue**.
2. **Management Inspects & Negotiates**:
   - The Management team opens the **Management Platform** (`/admin`).
   - Staff inspects uploaded photos, fabric condition, and sizes.
   - Management can adjust/negotiate the approved selling price or rental price and add quality control notes.
3. **1-Click Live Publication**:
   - Clicking **"Approve & List Live"** instantly publishes the item to the live **User Storefront** under its designated mode (**Buy**, **Rent**, or **Both**)!

---

## 🎨 Official Canva-Style Document Suite (`documents.html`)

Designed as an executive, Canva-grade publication deck featuring the **official Revive Threads letterhead** on every section and group credits:
**Prepared by: Sakshi Kore | Arpita Jadhav | Yashika Thakur**.

Includes:
1. **Brand Identity & Design Specification Manual**: Vector SVG logos, typography rules (*Cormorant Garamond* & *Plus Jakarta Sans*), and the sustainable color palette:
   - 🌿 `Sage Whisper` (`#6B8572`) &bull; 🏺 `Terracotta Blossom` (`#D48B77`) &bull; 🌾 `Linen Oatmeal` (`#FAF7F2`)
   - 🌲 `Deep Forest Ink` (`#203126`) &bull; 🧵 `Gilded Jute` (`#C8A97E`) &bull; 🌊 `Indigo Mist` (`#E2EAE6`)
2. **Product Requirements Document (PRD)**: 4 user personas, functional epics across both platforms, 5-point QC reverse logistics, and SQL/ER data models.
3. **Market Strategy, Research & Scalability Study**: In-depth research answering *"Is this business scalable in India?"*, TAM ($110B) / SAM ($5.2B) / SOM ($145M) sizing, and defensive moats.
4. **Business Analytics & 3-Year Financial Projections**: Granular unit economics per transaction, 5.8x Net LTV/CAC ratio, and quarterly P&L projections breaking even at Month 16.
5. **Executive Investor Pitch Presentation**: 12-slide presentation deck.

> 🖨️ **Print / Export to PDF**: Simply open `documents.html` in your browser and click **"Save as PDF / Print"** for a vector-sharp, professional presentation.

---

## 🚀 How to Run the Application

### Method 1: Run with Full-Stack Node Server (Recommended)
```bash
cd /Users/sakshikore/Downloads/revive_threads
npm start
```
Then visit:
- **User Storefront:** `http://localhost:8000/`
- **Management Operations Portal:** `http://localhost:8000/admin`
- **Canva-Style Executive Documents:** `http://localhost:8000/documents`

### Method 2: Direct Browser Viewing (Static Mode)
Double-click or open directly in your browser:
- [index.html](file:///Users/sakshikore/Downloads/revive_threads/index.html) — User Storefront
- [admin.html](file:///Users/sakshikore/Downloads/revive_threads/admin.html) — Management Operations Portal
- [documents.html](file:///Users/sakshikore/Downloads/revive_threads/documents.html) — Executive Canva Document Suite
