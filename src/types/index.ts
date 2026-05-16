// ===== DATABASE TYPES =====

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  offer_price: number | null;
  category_id: string;
  images: string[];
  variants: ProductVariant[];
  in_stock: boolean;
  stock_quantity: number;
  featured: boolean;
  tags: string[];
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  price_modifier: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  parent_id: string | null;
  display_order: number;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  variant?: ProductVariant;
}

export interface Order {
  id: string;
  user_id: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  payment_id: string | null;
  shipping_address: Address;
  billing_address: Address;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  product_id: string;
  product_name: string;
  product_image: string;
  variant: string | null;
  quantity: number;
  price: number;
  total: number;
}

export type OrderStatus = 
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned";

export type PaymentMethod = "razorpay" | "upi" | "cod";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface Address {
  full_name: string;
  phone: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  avatar_url: string | null;
  role: "customer" | "admin";
  addresses: Address[];
  wishlist: string[];
  created_at: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  product_id: string | null;
  status: "new" | "contacted" | "resolved";
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
  created_at: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  cta_text: string;
  cta_link: string;
  display_order: number;
  active: boolean;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: string;
  display_order: number;
}

export interface SiteSettings {
  id: string;
  whatsapp_number: string;
  phone_numbers: string[];
  email: string;
  address: string;
  about_text: string;
  social_links: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  display_order: number;
}

// ===== ANALYTICS =====

export interface DashboardStats {
  total_products: number;
  total_orders: number;
  total_revenue: number;
  total_enquiries: number;
  recent_orders: Order[];
  monthly_revenue: { month: string; revenue: number }[];
}
