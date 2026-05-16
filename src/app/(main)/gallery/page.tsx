"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Search } from "lucide-react";
import { SectionHeading } from "@/components/ui/animations";
import { supabase } from "@/lib/supabase";

const SUBCATEGORY_LABELS: Record<string, string> = {
  "keychains": "Keychains",
  "gift-sets": "Gift Sets",
  "notebook-diary": "Notebook Diary",
  "leather-bags": "Leather Bags",
  "metal-pens": "Metal Pens",
  "plastic-pens": "Plastic Pens",
  "bottles-mugs": "Bottles & Mugs",
  "cardholder": "Cardholder",
  "hand-bags": "Hand Bags",
  "organizers": "Organizers",
  "trophies": "Trophies",
  "powerbank-diaries": "Powerbank & Diaries",
  "mobile-stand": "Mobile Stand",
  "pendrive": "Pendrive",
  "jute-folders": "Jute Folders",
};

export default function GalleryPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState<any | null>(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(function() {
    async function fetchProducts() {
      setLoading(true);
      const { data } = await supabase
        .from("products")
        .select("id, name, images, category, subcategory")
        .eq("is_active", true)
        .not("images", "eq", "{}")
        .order("created_at", { ascending: false });
      setProducts((data || []).filter(function(p) { return p.images && p.images.length > 0; }));
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const subcategories = Object.keys(SUBCATEGORY_LABELS);

  const filtered = products.filter(function(p) {
    const matchCat = filter === "all" || p.subcategory === filter || p.category === filter;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const heights = ["h-56", "h-72", "h-64", "h-80", "h-56", "h-72", "h-80", "h-64", "h-56", "h-72"];

  return (
    <div className="min-h-screen">
      <div className="relative py-20 bg-dark-50/50 dark:bg-dark-900/30 overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="container-custom relative z-10">
          <SectionHeading
            badge="Gallery"
            title="Our Product Gallery"
            subtitle="Explore our complete collection of premium corporate products."
          />
        </div>
      </div>

      <div className="section-padding">
        <div className="container-custom">

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={function(e) { setSearch(e.target.value); }}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white text-sm focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={function() { setFilter("all"); }}
              className={"px-4 py-1.5 rounded-xl text-sm font-medium transition-colors " + (filter === "all" ? "bg-brand-500 text-white" : "bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-500")}
            >
              All ({products.length})
            </button>
            {subcategories.map(function(sub) {
              const count = products.filter(function(p) { return p.subcategory === sub; }).length;
              if (count === 0) return null;
              return (
                <button
                  key={sub}
                  onClick={function() { setFilter(sub); }}
                  className={"px-4 py-1.5 rounded-xl text-sm font-medium transition-colors " + (filter === sub ? "bg-brand-500 text-white" : "bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-500")}
                >
                  {SUBCATEGORY_LABELS[sub]} ({count})
                </button>
              );
            })}
          </div>

          {loading ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {Array.from({ length: 12 }).map(function(_, i) {
                return <div key={i} className="h-64 rounded-2xl bg-dark-100 dark:bg-dark-800 animate-pulse break-inside-avoid" />;
              })}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-dark-400 text-lg">No products found.</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {filtered.map(function(product, index) {
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (index % 12) * 0.04 }}
                    onClick={function() { setPreview(product); }}
                    className={"group relative " + heights[index % heights.length] + " rounded-2xl overflow-hidden border border-dark-200/50 dark:border-dark-700/50 break-inside-avoid cursor-pointer bg-dark-50 dark:bg-dark-800"}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-4">
                      <div>
                        <p className="text-white font-semibold text-xs">{product.name}</p>
                        {product.subcategory && (
                          <p className="text-white/60 text-xs capitalize">{SUBCATEGORY_LABELS[product.subcategory] || product.subcategory}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {filtered.length > 0 && (
            <p className="text-center text-sm text-dark-400 mt-8">{filtered.length} products shown</p>
          )}
        </div>
      </div>

      {preview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={function() { setPreview(null); }}
        >
          <div className="relative max-w-2xl w-full" onClick={function(e) { e.stopPropagation(); }}>
            <button onClick={function() { setPreview(null); }} className="absolute -top-10 right-0 text-white/70 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            <img src={preview.images[0]} alt={preview.name} className="w-full rounded-2xl shadow-2xl max-h-[80vh] object-contain" />
            <p className="text-white/70 text-sm text-center mt-3">{preview.name}</p>
            {preview.subcategory && (
              <p className="text-white/40 text-xs text-center mt-1 capitalize">{SUBCATEGORY_LABELS[preview.subcategory] || preview.subcategory}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
