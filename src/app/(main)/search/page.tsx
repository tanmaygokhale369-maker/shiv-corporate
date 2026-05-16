"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search as SearchIcon, X, TrendingUp } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/types";

const allProducts: Product[] = [
  { id: "1", name: "Premium Glass Cleaner 500ml", slug: "premium-glass-cleaner", description: "", short_description: "Professional glass cleaner", price: 299, offer_price: 199, category_id: "1", images: [], variants: [], in_stock: true, stock_quantity: 100, featured: true, tags: [], created_at: "", updated_at: "", category: { id: "1", name: "Housekeeping", slug: "housekeeping", description: "", image: "", parent_id: null, display_order: 1, created_at: "" } },
  { id: "2", name: "Executive Leather Diary Set", slug: "executive-leather-diary-set", description: "", short_description: "Premium diary with pen set", price: 1499, offer_price: 999, category_id: "2", images: [], variants: [], in_stock: true, stock_quantity: 50, featured: true, tags: [], created_at: "", updated_at: "", category: { id: "2", name: "Corporate Gifts", slug: "corporate-gifts", description: "", image: "", parent_id: null, display_order: 2, created_at: "" } },
  { id: "3", name: "Branded Metal Water Bottle", slug: "branded-metal-water-bottle", description: "", short_description: "Insulated stainless steel bottle", price: 599, offer_price: 449, category_id: "3", images: [], variants: [], in_stock: true, stock_quantity: 200, featured: true, tags: [], created_at: "", updated_at: "", category: { id: "3", name: "Office Products", slug: "office-products", description: "", image: "", parent_id: null, display_order: 3, created_at: "" } },
  { id: "4", name: "Complete Housekeeping Kit", slug: "complete-housekeeping-kit", description: "", short_description: "12-piece cleaning essentials", price: 2999, offer_price: 1999, category_id: "4", images: [], variants: [], in_stock: true, stock_quantity: 30, featured: true, tags: [], created_at: "", updated_at: "", category: { id: "4", name: "Combo Kits", slug: "combo-kits", description: "", image: "", parent_id: null, display_order: 4, created_at: "" } },
];

const trendingSearches = ["Corporate gifts", "Cleaning supplies", "Office accessories", "Gift sets", "Bulk orders", "Water bottles"];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const results = query.length >= 2
    ? allProducts.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.short_description.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div className="min-h-screen">
      <div className="relative py-16 bg-dark-50/50 dark:bg-dark-900/30">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold font-display text-dark-900 dark:text-white text-center mb-8">
              Search Products
            </h1>
            <div className="relative">
              <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-14 pr-12 py-4 rounded-2xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white text-lg placeholder:text-dark-400 focus:outline-none focus:border-brand-500 focus:shadow-glow transition-all"
                placeholder="Search for products..."
                autoFocus
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-5 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-600">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        {query.length < 2 ? (
          <div className="max-w-2xl mx-auto">
            <h3 className="text-sm font-semibold text-dark-500 dark:text-dark-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Trending Searches
            </h3>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-4 py-2 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-sm text-dark-600 dark:text-dark-300 hover:border-brand-500 hover:text-brand-500 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-dark-500 text-lg">No products found for &ldquo;{query}&rdquo;</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-dark-500 mb-6">{results.length} results for &ldquo;{query}&rdquo;</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {results.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
