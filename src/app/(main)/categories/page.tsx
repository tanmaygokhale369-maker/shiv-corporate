"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { SectionHeading, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { CORPORATE_GIFT_SUBCATEGORIES } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

const mainCategories = [
  { name: "Corporate Gifts", slug: "corporate-gifts", icon: "🎁", description: "Premium branded gifts for clients, partners, employees and events.", color: "from-purple-500/10 to-pink-500/10", border: "border-purple-500/20 hover:border-purple-500/40", hasSubcategories: true },
  { name: "Housekeeping Products", slug: "housekeeping", icon: "🧹", description: "Professional cleaning supplies, mops, detergents, and maintenance tools.", color: "from-blue-500/10 to-cyan-500/10", border: "border-blue-500/20 hover:border-blue-500/40", hasSubcategories: false },
  { name: "Office Products", slug: "office-products", icon: "🏢", description: "Essential office supplies, stationery, and workspace accessories.", color: "from-amber-500/10 to-orange-500/10", border: "border-amber-500/20 hover:border-amber-500/40", hasSubcategories: false },
  { name: "Combo Kits", slug: "combo-kits", icon: "📦", description: "Value-packed product bundles for offices, events, and corporate needs.", color: "from-green-500/10 to-emerald-500/10", border: "border-green-500/20 hover:border-green-500/40", hasSubcategories: false },
  { name: "Utility Products", slug: "utility-products", icon: "🔧", description: "Everyday utility items for offices, warehouses, and corporate spaces.", color: "from-red-500/10 to-rose-500/10", border: "border-red-500/20 hover:border-red-500/40", hasSubcategories: false },
  { name: "Promotional Products", slug: "promotional", icon: "📣", description: "Custom branded merchandise for marketing, events, and brand promotion.", color: "from-indigo-500/10 to-violet-500/10", border: "border-indigo-500/20 hover:border-indigo-500/40", hasSubcategories: false },
];

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [productCounts, setProductCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchCounts();
  }, []);

  async function fetchCounts() {
    const counts: Record<string, number> = {};
    for (const cat of mainCategories) {
      const { count } = await supabase.from("products").select("*", { count: "exact", head: true }).eq("category", cat.slug).eq("is_active", true);
      counts[cat.slug] = count || 0;
    }
    for (const sub of CORPORATE_GIFT_SUBCATEGORIES) {
      const { count } = await supabase.from("products").select("*", { count: "exact", head: true }).eq("subcategory", sub.slug).eq("is_active", true);
      counts[sub.slug] = count || 0;
    }
    setProductCounts(counts);
  }

  return (
    <div className="min-h-screen">
      <div className="relative py-20 bg-dark-50/50 dark:bg-dark-900/30 overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="container-custom relative z-10">
          <SectionHeading
            badge="Categories"
            title="Browse by Category"
            subtitle="Find exactly what you need from our organized product categories."
          />
        </div>
      </div>

      <div className="section-padding">
        <div className="container-custom">

          {/* Main Categories */}
          {!selectedCategory && (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mainCategories.map((cat) => (
                <StaggerItem key={cat.slug}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => cat.hasSubcategories ? setSelectedCategory(cat.slug) : window.location.href = `/products?category=${cat.slug}`}
                    className={`group relative p-8 rounded-2xl border ${cat.border} bg-gradient-to-br ${cat.color} backdrop-blur-sm transition-all duration-300 cursor-pointer overflow-hidden h-full`}
                  >
                    <div className="absolute inset-0 bg-white/70 dark:bg-dark-900/70 rounded-2xl" />
                    <div className="relative z-10">
                      <span className="text-5xl mb-6 block">{cat.icon}</span>
                      <h3 className="text-xl font-bold font-display text-dark-900 dark:text-white mb-2 group-hover:text-brand-500 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-sm text-dark-500 dark:text-dark-400 mb-4 leading-relaxed">
                        {cat.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-dark-400">{productCounts[cat.slug] || 0} Products</span>
                        <div className="flex items-center gap-1 text-sm font-medium text-brand-500 group-hover:gap-2 transition-all">
                          {cat.hasSubcategories ? "View Sub-categories" : "Browse"}
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}

          {/* Corporate Gifts Subcategories */}
          {selectedCategory === "corporate-gifts" && (
            <div>
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm mb-8">
                <button onClick={() => setSelectedCategory(null)} className="text-brand-500 hover:underline">Categories</button>
                <ChevronRight className="w-4 h-4 text-dark-400" />
                <span className="text-dark-900 dark:text-white font-medium">Corporate Gifts</span>
              </div>

              <h2 className="text-2xl font-bold font-display text-dark-900 dark:text-white mb-6">Corporate Gift Sub-categories</h2>

              <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {/* All Corporate Gifts */}
                <StaggerItem>
                  <Link href="/products?category=corporate-gifts">
                    <motion.div whileHover={{ y: -5 }} className="group p-5 rounded-2xl border border-brand-500/30 bg-brand-500/5 hover:bg-brand-500/10 transition-all cursor-pointer text-center">
                      <span className="text-4xl mb-3 block">🎁</span>
                      <h3 className="font-semibold text-dark-900 dark:text-white text-sm group-hover:text-brand-500 transition-colors">All Gifts</h3>
                      <p className="text-xs text-dark-400 mt-1">{productCounts["corporate-gifts"] || 0} products</p>
                    </motion.div>
                  </Link>
                </StaggerItem>

                {CORPORATE_GIFT_SUBCATEGORIES.map((sub) => (
                  <StaggerItem key={sub.slug}>
                    <Link href={`/products?category=corporate-gifts&subcategory=${sub.slug}`}>
                      <motion.div whileHover={{ y: -5 }} className="group p-5 rounded-2xl border border-dark-200/50 dark:border-dark-700/50 bg-white dark:bg-dark-900/60 hover:border-brand-500/30 hover:shadow-lg transition-all cursor-pointer text-center">
                        <span className="text-4xl mb-3 block">{sub.icon}</span>
                        <h3 className="font-semibold text-dark-900 dark:text-white text-sm group-hover:text-brand-500 transition-colors">{sub.name}</h3>
                        <p className="text-xs text-dark-400 mt-1">{productCounts[sub.slug] || 0} products</p>
                      </motion.div>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}