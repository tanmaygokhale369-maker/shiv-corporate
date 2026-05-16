// Site-wide constants
export const SITE_NAME = "Shiv Corporate";
export const SITE_FULL_NAME = "Shiv Corporate Solution";
export const SITE_DESCRIPTION = "Premium corporate gifts, housekeeping products, and office utility solutions for businesses across India.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://shivcorporate.com";

// Contact
export const PHONE_NUMBERS = ["9930469954", "8591639892"];
export const WHATSAPP_NUMBER = "919930469954";
export const EMAIL = "shivcorporate93@gmail.com";
export const UPI_ID = "suresh.patel11244@okicici";

// Address
export const ADDRESS = "Mumbai, Maharashtra, India";

// Social
export const SOCIAL_LINKS = {
  facebook: "#",
  instagram: "#",
  twitter: "#",
  linkedin: "#",
};

// Categories
export const DEFAULT_CATEGORIES = [
  { name: "Housekeeping Products", slug: "housekeeping", icon: "🧹" },
  { name: "Corporate Gifts", slug: "corporate-gifts", icon: "🎁" },
  { name: "Office Products", slug: "office-products", icon: "🏢" },
  { name: "Combo Kits", slug: "combo-kits", icon: "📦" },
  { name: "Utility Products", slug: "utility-products", icon: "🔧" },
  { name: "Promotional Products", slug: "promotional", icon: "📣" },
];

export const CORPORATE_GIFT_SUBCATEGORIES = [
  { name: "Keychains", slug: "keychains", icon: "🔑" },
  { name: "Gift Sets", slug: "gift-sets", icon: "🎁" },
  { name: "Notebook Diary", slug: "notebook-diary", icon: "📓" },
  { name: "Leather Bags", slug: "leather-bags", icon: "👜" },
  { name: "Metal Pens", slug: "metal-pens", icon: "🖊️" },
  { name: "Plastic Pens", slug: "plastic-pens", icon: "✏️" },
  { name: "Bottles & Mugs", slug: "bottles-mugs", icon: "🍶" },
  { name: "Cardholder", slug: "cardholder", icon: "💳" },
  { name: "Hand Bags", slug: "hand-bags", icon: "👝" },
  { name: "Organizers", slug: "organizers", icon: "🗂️" },
  { name: "Trophies", slug: "trophies", icon: "🏆" },
  { name: "Powerbank & Diaries", slug: "powerbank-diaries", icon: "🔋" },
  { name: "Mobile Stand", slug: "mobile-stand", icon: "📱" },
  { name: "Pendrive", slug: "pendrive", icon: "💾" },
  { name: "Jute Folders", slug: "jute-folders", icon: "📁" },
];

// Order statuses with labels and colors
export const ORDER_STATUSES = {
  pending: { label: "Pending", color: "bg-yellow-500", textColor: "text-yellow-500" },
  confirmed: { label: "Confirmed", color: "bg-blue-500", textColor: "text-blue-500" },
  processing: { label: "Processing", color: "bg-indigo-500", textColor: "text-indigo-500" },
  shipped: { label: "Shipped", color: "bg-purple-500", textColor: "text-purple-500" },
  delivered: { label: "Delivered", color: "bg-green-500", textColor: "text-green-500" },
  cancelled: { label: "Cancelled", color: "bg-red-500", textColor: "text-red-500" },
  returned: { label: "Returned", color: "bg-gray-500", textColor: "text-gray-500" },
};

// Payment methods
export const PAYMENT_METHODS = {
  razorpay: { label: "Razorpay (Cards/UPI/Netbanking)", icon: "💳" },
  upi: { label: "UPI Payment", icon: "📱" },
  cod: { label: "Cash on Delivery", icon: "💰" },
};

// Shipping
export const FREE_SHIPPING_THRESHOLD = 999;
export const SHIPPING_CHARGE = 99;
export const TAX_RATE = 0.18; // 18% GST

// Razorpay
export const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";
export const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "";

// Indian states
export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh", "Puducherry",
  "Chandigarh", "Andaman & Nicobar", "Dadra & Nagar Haveli", "Lakshadweep",
];
