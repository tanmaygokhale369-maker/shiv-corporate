"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Grid3X3, LayoutList, X } from "lucide-react";
import { SectionHeading } from "@/components/ui/animations";
import { DEFAULT_CATEGORIES, CORPORATE_GIFT_SUBCATEGORIES } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import { WHATSAPP_NUMBER } from "@/lib/constants";

type SortOption = "newest" | "price-low" | "price-high" | "name";

function getWhatsAppLink(number: string, msg: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [gridView, setGridView] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category");
    const sub = params.get("subcategory");
    if (cat) setSelectedCategory(cat);
    if (sub) setSelectedSubcategory(sub);
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });
    setProducts(data || []);
    setLoading(false);
  }

  const filtered = useMemo(() => {
    let p = [...products];
    if (searchQuery) p = p.filter(x => x.name?.toLowerCase().includes(searchQuery.toLowerCase()) || x.description?.toLowerCase().includes(searchQuery.toLowerCase()));
    if (selectedCategory) p = p.filter(x => x.category === selectedCategory);
    if (selectedSubcategory) p = p.filter(x => x.subcategory === selectedSubcategory);
    switch (sortBy) {
      case "price-low": p.sort((a, b) => (a.price || 0) - (b.price || 0)); break;
      case "price-high": p.sort((a, b) => (b.price || 0) - (a.price || 0)); break;
      case "name": p.sort((a, b) => a.name?.localeCompare(b.name)); break;
    }
    return p;
  }, [products, searchQuery, selectedCategory, selectedSubcategory, sortBy]);

  const activeSubcategories = selectedCategory === "corporate-gifts" ? CORPORATE_GIFT_SUBCATEGORIES : [];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative py-16 bg-dark-50/50 dark:bg-dark-900/30">
        <div className="container-custom">
          <SectionHeading badge="Our Collection" title="All Products" subtitle="Browse our complete collection of premium corporate products." />
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between max-w-4xl mx-auto">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
              <input type="text" placeholder="Search products..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white placeholder:text-dark-400 focus:outline-none focus:border-brand-500" />
            </div>
            <div className="flex gap-2">
              <select value={sortBy} onChange={e => setSortBy(e.target.value as SortOption)}
                className="px-4 py-3 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-sm text-dark-900 dark:text-white focus:outline-none focus:border-brand-500">
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
              <button onClick={() => setShowFilters(!showFilters)}
                className={`p-3 rounded-xl border transition-colors ${showFilters ? "bg-brand-500 text-white border-brand-500" : "bg-white dark:bg-dark-800 border-dark-200 dark:border-dark-700 text-dark-600 dark:text-dark-300"}`}>
                <SlidersHorizontal className="w-5 h-5" />
              </button>
              <button onClick={() => setGridView(!gridView)}
                className="p-3 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-600 dark:text-dark-300 hidden md:block">
                {gridView ? <LayoutList className="w-5 h-5" /> : <Grid3X3 className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      {showFilters && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
          className="border-b border-dark-200 dark:border-dark-800 bg-white dark:bg-dark-950">
          <div className="container-custom py-6 space-y-4">
            {/* Main Categories */}
            <div className="flex flex-wrap gap-2">
              <button onClick={() => { setSelectedCategory(null); setSelectedSubcategory(null); }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${!selectedCategory ? "bg-brand-500 text-white" : "bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300"}`}>
                All Categories
              </button>
              {DEFAULT_CATEGORIES.map(cat => (
                <button key={cat.slug} onClick={() => { setSelectedCategory(selectedCategory === cat.slug ? null : cat.slug); setSelectedSubcategory(null); }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${selectedCategory === cat.slug ? "bg-brand-500 text-white" : "bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300"}`}>
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>

            {/* Subcategories — show only when Corporate Gifts selected */}
            {activeSubcategories.length > 0 && (
              <div className="flex flex-wrap gap-2 pl-2 border-l-2 border-brand-500/30">
                <button onClick={() => setSelectedSubcategory(null)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${!selectedSubcategory ? "bg-brand-500/20 text-brand-600" : "bg-dark-100 dark:bg-dark-800 text-dark-500"}`}>
                  All
                </button>
                {activeSubcategories.map(sub => (
                  <button key={sub.slug} onClick={() => setSelectedSubcategory(selectedSubcategory === sub.slug ? null : sub.slug)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedSubcategory === sub.slug ? "bg-brand-500/20 text-brand-600" : "bg-dark-100 dark:bg-dark-800 text-dark-500"}`}>
                    {sub.icon} {sub.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Products Grid */}
      <div className="container-custom py-12">
        {/* Active filters */}
        {(selectedCategory || selectedSubcategory) && (
          <div className="mb-6 flex items-center gap-2 flex-wrap">
            <span className="text-sm text-dark-500">Filtered by:</span>
            {selectedCategory && (
              <span className="px-3 py-1 rounded-lg bg-brand-500/10 text-brand-500 text-sm font-medium flex items-center gap-1">
                {DEFAULT_CATEGORIES.find(c => c.slug === selectedCategory)?.name || selectedCategory}
                <button onClick={() => { setSelectedCategory(null); setSelectedSubcategory(null); }}><X className="w-3 h-3" /></button>
              </span>
            )}
            {selectedSubcategory && (
              <span className="px-3 py-1 rounded-lg bg-brand-500/10 text-brand-500 text-sm font-medium flex items-center gap-1">
                {CORPORATE_GIFT_SUBCATEGORIES.find(s => s.slug === selectedSubcategory)?.name || selectedSubcategory}
                <button onClick={() => setSelectedSubcategory(null)}><X className="w-3 h-3" /></button>
              </span>
            )}
          </div>
        )}

        {loading ? (
          <div className={`grid ${gridView ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-1 md:grid-cols-2"} gap-6`}>
            {[...Array(8)].map((_, i) => (
              <div key={i} className="rounded-2xl bg-dark-100 dark:bg-dark-800 animate-pulse h-72" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-dark-500 text-lg mb-4">No products found</p>
            <button onClick={() => { setSearchQuery(""); setSelectedCategory(null); setSelectedSubcategory(null); }} className="btn-secondary text-sm">Clear Filters</button>
          </div>
        ) : (
          <div className={gridView ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "grid grid-cols-1 md:grid-cols-2 gap-6"}>
            {filtered.map((product, i) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="group rounded-2xl bg-white dark:bg-dark-900/60 border border-dark-200/50 dark:border-dark-700/50 hover:border-brand-500/30 hover:shadow-premium transition-all duration-300 overflow-hidden">
                <div className="relative aspect-square overflow-hidden bg-dark-50 dark:bg-dark-800">
                  {product.images?.[0] ? (
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-dark-300">
                      <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                  )}
                  {product.is_featured && (
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded-lg bg-brand-500 text-white text-xs font-semibold">Featured</span>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs text-brand-500 font-medium uppercase tracking-wider mb-1 capitalize">
                    {product.subcategory ? product.subcategory.replace(/-/g, " ") : product.category?.replace(/-/g, " ")}
                  </p>
                  <h3 className="font-semibold text-dark-900 dark:text-white text-sm mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    {product.price > 0 ? (
                      <>
                        <span className="text-lg font-bold text-dark-900 dark:text-white">₹{product.price}</span>
                        {product.original_price > product.price && (
                          <span className="text-sm text-dark-400 line-through">₹{product.original_price}</span>
                        )}
                      </>
                    ) : (
                      <span className="text-sm font-medium text-brand-500">Price on Request</span>
                    )}
                  </div>
                  <a href={getWhatsAppLink(WHATSAPP_NUMBER, `Hi, I'm interested in *${product.name}*. Please share pricing and bulk order details.`)}
                    target="_blank" rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-[#25D366] text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#1fb855] transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.54 5.877L0 24l6.317-1.518A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.502-5.2-1.378l-.373-.22-3.743.9.934-3.643-.242-.388A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                    WhatsApp Enquiry
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}