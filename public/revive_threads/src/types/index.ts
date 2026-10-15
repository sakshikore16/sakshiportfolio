/**
 * Revive Threads — Circular Fashion Platform
 * Core TypeScript Definitions & Domain Models
 * Authors: Sakshi Kore | Arpita Jadhav | Yashika Thakur
 */

export type GarmentCategory = 
  | 'lehenga'
  | 'gown'
  | 'sharara'
  | 'saree'
  | 'kurta'
  | 'mens'
  | 'dress'
  | 'top'
  | 'skirt'
  | 'blazer'
  | 'occasion';

export type ListingMode = 'buy' | 'rent' | 'both';

export type ConditionGrade = 
  | 'Brand New With Tags'
  | 'Pristine Consignment'
  | 'Like New (Pristine)'
  | 'Gently Loved'
  | 'Bespoke Atelier Creation';

export interface GarmentMeasurements {
  bust?: string;
  waist?: string;
  length?: string;
  chest?: string;
  lehengaLength?: string;
  blouseBust?: string;
  sareeLength?: string;
  dhotiWaist?: string;
  [key: string]: string | undefined;
}

export interface Product {
  id: string;
  title: string;
  category: GarmentCategory;
  listing_mode: ListingMode;
  price: number;
  rental_price_3_day: number;
  mrp: number;
  condition: ConditionGrade;
  size: string;
  measurements?: GarmentMeasurements;
  fabric: string;
  seller: string;
  water_saved: string;
  co2_offset: string;
  image: string;
  images?: string[];
  description: string;
  status: 'active' | 'rented' | 'sold' | 'archived';
  source_request_id?: string;
  created_at: string;
}

export interface SellerRequest {
  id: string;
  seller_name: string;
  seller_phone: string;
  seller_email: string;
  title: string;
  category: GarmentCategory;
  listing_mode: ListingMode;
  mrp: number;
  seller_asked_price: number;
  seller_asked_rental_price: number;
  suggested_admin_price?: number;
  suggested_admin_rental_price?: number;
  condition: ConditionGrade;
  condition_notes: string;
  size: string;
  measurements?: GarmentMeasurements;
  fabric: string;
  images: string[];
  status: 'pending_approval' | 'approved' | 'rejected';
  submitted_at: string;
  approved_at?: string;
  rejected_at?: string;
  rejection_reason?: string;
  admin_notes?: string;
}

export interface OrderRentalDates {
  start: string;
  end: string;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  shipping_address: string;
  item_id: string;
  item_title: string;
  order_type: 'buy' | 'rent';
  rental_dates?: OrderRentalDates | null;
  total_amount: number;
  deposit_amount?: number;
  escrow_status: string;
  order_status: 
    | 'Confirmed (Quality Check in Progress)'
    | 'Ozone Steam Sanitized & Boxed'
    | 'Dispatched via Blue Dart'
    | 'Delivered to Customer'
    | 'Return Courier Scheduled'
    | 'Completed & Escrow Released';
  tracking_number: string;
  carrier: string;
  created_at: string;
}

export interface AtelierRequest {
  id: string;
  customer_name: string;
  customer_phone: string;
  fabric_type: string;
  target_silhouette: string;
  measurements: string;
  status: string;
  assigned_tailor: string;
  quote_inr: number;
  created_at: string;
}

export interface DonationRequest {
  id: string;
  donor_name: string;
  donor_phone: string;
  city: string;
  partner_ngo: string;
  estimated_kg: number;
  pickup_date: string;
  tax_receipt_status: string;
  green_points_earned?: number;
  created_at: string;
}

export interface AdminStats {
  active_inventory_count: number;
  pending_approvals_count: number;
  total_orders_count: number;
  total_gmv_inr: number;
  platform_commission_inr: number;
  active_atelier_count: number;
  total_donations_kg: number;
}
