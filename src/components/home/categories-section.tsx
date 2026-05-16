"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading, StaggerContainer, StaggerItem } from "@/components/ui/animations";

const categories = [
  {
    name: "Housekeeping Products",
    slug: "housekeeping",
    description: "Professional cleaning supplies & tools for every workspace",
    icon: "🧹",
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/20 hover:border-blue-500/50",
    image: "/images/categories/housekeeping.jpg",
  },
  {
    name: "Corporate Gifts",
    slug: "corporate-gifts",
    description: "Premium branded gifts for clients, partners & employees",
    icon: "🎁",
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/20 hover:border-purple-500/50",
    image: "/images/categories/corporate-gifts.jpg",
  },
  {
    name: "Office Products",
    slug: "office-products",
    description: "Essential office supplies for peak productivity",
    icon: "🏢",
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/20 hover:border-amber-500/50",
    image: "/images/categories/office.jpg",
  },
  {
    name: "Combo Kits",
    slug: "combo-kits",
    description: "Curated product bundles at special bulk pricing",
    icon: "📦",
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/20 hover:border-green-500/50",
    image: "/images/categories/combo.jpg",
  },
  {
    name: "Utility Products",
    slug: "utility-products",
    description: "Everyday utility items for offices and corporate spaces",
    icon: "🔧",
    color: "from-red-500/20 to-rose-500/20",
    borderColor: "border-red-500/20 hover:border-red-500/50",
    image: "/images/categories/utility.jpg",
  },
  {
    name: "Promotional Products",
    slug: "promotional",
    description: "Custom branded merchandise for marketing campaigns",
    icon: "📣",
    color: "from-indigo-500/20 to-violet-500/20",
    borderColor: "border-indigo-500/20 hover:border-indigo-500/50",
    image: "/images/categories/promotional.jpg",
  },
];

export function CategoriesSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-custom">
        <SectionHeading
          badge="Our Categories"
          title="Explore Our Product Range"
          subtitle="From housekeeping essentials to premium corporate gifts, we have everything your business needs."
        />

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <StaggerItem key={category.slug}>
              <Link href={`/products?category=${category.slug}`}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className={`group relative p-6 rounded-2xl border ${category.borderColor} bg-gradient-to-br ${category.color} backdrop-blur-sm transition-all duration-300 cursor-pointer overflow-hidden`}
                >
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-white/60 dark:bg-dark-900/60 rounded-2xl" />

                  <div className="relative z-10">
                    <span className="text-4xl mb-4 block">{category.icon}</span>
                    <h3 className="text-lg font-bold font-display text-dark-900 dark:text-white mb-2 group-hover:text-brand-500 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-dark-500 dark:text-dark-400 mb-4 line-clamp-2">
                      {category.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-medium text-brand-500">
                      Browse Products
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
