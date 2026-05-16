"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Heart,
  Minus,
  Plus,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Share2,
  MessageCircle,
  ChevronRight,
  Package,
} from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { formatPrice, calcDiscount, getWhatsAppLink } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { ScrollReveal, SectionHeading } from "@/components/ui/animations";
import { ProductCard } from "@/components/product/product-card";
import toast from "react-hot-toast";
import type { Product } from "@/types";

// Demo product detail
const product: Product = {
  id: "1",
  name: "Premium Glass Cleaner 500ml",
  slug: "premium-glass-cleaner",
  description: `
    <p>Our Premium Glass Cleaner is designed for professional-grade cleaning, providing a streak-free shine on all glass surfaces. Perfect for offices, corporate buildings, and commercial spaces.</p>
    <h3>Features:</h3>
    <ul>
      <li>Professional-grade formula</li>
      <li>Streak-free shine</li>
      <li>Anti-static technology</li>
      <li>Pleasant fresh fragrance</li>
      <li>Safe for tinted glass</li>
      <li>500ml spray bottle</li>
    </ul>
    <h3>Applications:</h3>
    <p>Windows, glass doors, mirrors, display cases, computer screens, and all glass surfaces. Ideal for office maintenance and housekeeping departments.</p>
  `,
  short_description: "Professional grade glass cleaner for streak-free shine on all surfaces.",
  price: 299,
  offer_price: 199,
  category_id: "1",
  images: [],
  variants: [
    { id: "v1", name: "Size", value: "500ml", price_modifier: 0 },
    { id: "v2", name: "Size", value: "1 Litre", price_modifier: 120 },
    { id: "v3", name: "Size", value: "5 Litre", price_modifier: 500 },
  ],
  in_stock: true,
  stock_quantity: 100,
  featured: true,
  tags: ["cleaning", "housekeeping", "glass"],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  category: { id: "1", name: "Housekeeping", slug: "housekeeping", description: "", image: "", parent_id: null, display_order: 1, created_at: "" },
};

const relatedProducts: Product[] = [
  {
    id: "9", name: "Hand Sanitizer Bulk Pack", slug: "hand-sanitizer-bulk", description: "", short_description: "500ml x 12 pack", price: 1899, offer_price: 1499, category_id: "1", images: [], variants: [], in_stock: true, stock_quantity: 100, featured: false, tags: [], created_at: "", updated_at: "",
    category: { id: "1", name: "Housekeeping", slug: "housekeeping", description: "", image: "", parent_id: null, display_order: 1, created_at: "" },
  },
  {
    id: "7", name: "Floor Mop with Bucket Set", slug: "floor-mop-bucket-set", description: "", short_description: "Professional spin mop set", price: 1299, offer_price: 899, category_id: "1", images: [], variants: [], in_stock: true, stock_quantity: 40, featured: false, tags: [], created_at: "", updated_at: "",
    category: { id: "1", name: "Housekeeping", slug: "housekeeping", description: "", image: "", parent_id: null, display_order: 1, created_at: "" },
  },
  {
    id: "4", name: "Complete Housekeeping Kit", slug: "complete-housekeeping-kit", description: "", short_description: "12-piece cleaning essentials", price: 2999, offer_price: 1999, category_id: "1", images: [], variants: [], in_stock: true, stock_quantity: 30, featured: true, tags: [], created_at: "", updated_at: "",
    category: { id: "4", name: "Combo Kits", slug: "combo-kits", description: "", image: "", parent_id: null, display_order: 4, created_at: "" },
  },
  {
    id: "6", name: "Desk Organizer Set", slug: "desk-organizer-set", description: "", short_description: "Modern 3-in-1 desk organizer", price: 799, offer_price: 599, category_id: "3", images: [], variants: [], in_stock: true, stock_quantity: 60, featured: false, tags: [], created_at: "", updated_at: "",
    category: { id: "3", name: "Office Products", slug: "office-products", description: "", image: "", parent_id: null, display_order: 3, created_at: "" },
  },
];

export default function ProductDetailPage() {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const { toggleItem, isInWishlist } = useWishlistStore();

  const currentPrice = (product.offer_price || product.price) + (selectedVariant?.price_modifier || 0);
  const originalPrice = product.price + (selectedVariant?.price_modifier || 0);
  const discount = calcDiscount(originalPrice, currentPrice);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariant);
    openCart();
    toast.success(`${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    addItem(product, quantity, selectedVariant);
    // Navigate to checkout
    window.location.href = "/checkout";
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-dark-50/50 dark:bg-dark-900/30 border-b border-dark-200/50 dark:border-dark-800/50">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 text-sm text-dark-500">
            <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products" className="hover:text-brand-500 transition-colors">Products</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-dark-900 dark:text-white">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <ScrollReveal direction="left">
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square rounded-2xl bg-dark-100 dark:bg-dark-800 overflow-hidden border border-dark-200/50 dark:border-dark-700/50 flex items-center justify-center">
                <div className="text-center">
                  <Package className="w-20 h-20 text-dark-300 dark:text-dark-600 mx-auto mb-4" />
                  <p className="text-sm text-dark-400">Product Image</p>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                {[0, 1, 2, 3].map((i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIndex(i)}
                    className={`w-20 h-20 rounded-xl bg-dark-100 dark:bg-dark-800 border-2 transition-colors flex items-center justify-center ${
                      selectedImageIndex === i
                        ? "border-brand-500"
                        : "border-transparent hover:border-dark-300 dark:hover:border-dark-600"
                    }`}
                  >
                    <Package className="w-8 h-8 text-dark-300 dark:text-dark-600" />
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Product Info */}
          <ScrollReveal direction="right">
            <div className="space-y-6">
              {/* Category */}
              <Link
                href={`/products?category=${product.category?.slug}`}
                className="inline-block px-3 py-1 rounded-lg bg-brand-500/10 text-brand-500 text-xs font-semibold uppercase tracking-wider hover:bg-brand-500/20 transition-colors"
              >
                {product.category?.name}
              </Link>

              {/* Name */}
              <h1 className="text-3xl md:text-4xl font-bold font-display text-dark-900 dark:text-white">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-dark-500">(4.8 / 5.0 · 124 reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-dark-900 dark:text-white">
                  {formatPrice(currentPrice)}
                </span>
                {discount > 0 && (
                  <>
                    <span className="text-lg text-dark-400 line-through">
                      {formatPrice(originalPrice)}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-semibold">
                      {discount}% OFF
                    </span>
                  </>
                )}
              </div>

              <p className="text-dark-500 dark:text-dark-400 leading-relaxed">
                {product.short_description}
              </p>

              {/* Variants */}
              {product.variants.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-dark-900 dark:text-white mb-3">
                    Size
                  </p>
                  <div className="flex gap-2">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                          selectedVariant?.id === variant.id
                            ? "bg-brand-500 text-white border-brand-500 shadow-glow"
                            : "bg-white dark:bg-dark-800 text-dark-600 dark:text-dark-300 border-dark-200 dark:border-dark-700 hover:border-brand-500"
                        }`}
                      >
                        {variant.value}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <p className="text-sm font-semibold text-dark-900 dark:text-white mb-3">
                  Quantity
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-xl bg-dark-100 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 flex items-center justify-center hover:border-brand-500 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-lg font-semibold text-dark-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-xl bg-dark-100 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 flex items-center justify-center hover:border-brand-500 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <span className="text-sm text-dark-500">
                    {product.stock_quantity} in stock
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 btn-premium flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 btn-secondary flex items-center justify-center gap-2"
                >
                  Buy Now
                </button>
              </div>

              {/* Secondary Actions */}
              <div className="flex items-center gap-4 pt-2">
                <button
                  onClick={() => {
                    toggleItem(product.id);
                    toast.success(isInWishlist(product.id) ? "Removed from wishlist" : "Added to wishlist");
                  }}
                  className="flex items-center gap-2 text-sm text-dark-500 hover:text-brand-500 transition-colors"
                >
                  <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                  {isInWishlist(product.id) ? "In Wishlist" : "Add to Wishlist"}
                </button>
                <a
                  href={getWhatsAppLink(WHATSAPP_NUMBER, `Hi, I'm interested in ${product.name}. Can you share more details?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-dark-500 hover:text-[#25D366] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Enquire on WhatsApp
                </a>
                <button className="flex items-center gap-2 text-sm text-dark-500 hover:text-brand-500 transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-dark-200 dark:border-dark-800">
                {[
                  { icon: Truck, text: "Free Delivery\nabove ₹999" },
                  { icon: ShieldCheck, text: "Quality\nGuaranteed" },
                  { icon: RotateCcw, text: "7 Day\nReturns" },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-2 p-3 rounded-xl bg-dark-50 dark:bg-dark-800/50 border border-dark-200/50 dark:border-dark-700/50"
                  >
                    <Icon className="w-5 h-5 text-brand-500 shrink-0" />
                    <span className="text-xs text-dark-600 dark:text-dark-400 whitespace-pre-line leading-tight">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Description */}
        <div className="mt-16 max-w-4xl">
          <h2 className="text-2xl font-bold font-display text-dark-900 dark:text-white mb-6">
            Product Description
          </h2>
          <div
            className="prose prose-lg dark:prose-invert max-w-none text-dark-600 dark:text-dark-400"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <SectionHeading
            badge="You May Also Like"
            title="Related Products"
            align="left"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
