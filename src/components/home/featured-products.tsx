"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/animations";
import { supabase } from "@/lib/supabase";
import { WHATSAPP_NUMBER } from "@/lib/constants";

function getWhatsAppLink(number: string, msg: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
}

export function FeaturedProductsSection() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .eq("is_featured", true)
        .order("created_at", { ascending: false })
        .limit(8);
      setProducts(data || []);
      setLoading(false);
    }
    fetch();
  }, []);

  // fallback: if no featured, show latest 8
  useEffect(() => {
    if (!loading && products.length === 0) {
      async function fetchLatest() {
        const { data } = await supabase
          .from("products")
          .select("*")
          .eq("is_active", true)
          .order("created_at", { ascending: false })
          .limit(8);
        setProducts(data || []);
      }
      fetchLatest();
    }
  }, [loading, products]);

  return (
    <section className="section-padding relative bg-dark-50/50 dark:bg-dark-900/30">
      <div className="container-custom">
        <SectionHeading
          badge="Featured Products"
          title="Best Selling Products"
          subtitle="Discover our most popular corporate products trusted by businesses across India."
        />

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="rounded-2xl bg-dark-100 dark:bg-dark-800 animate-pulse h-72" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-dark-400">No products yet. Add products from the admin panel.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <motion.div key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group rounded-2xl bg-white dark:bg-dark-900/60 border border-dark-200/50 dark:border-dark-700/50 hover:border-brand-500/30 hover:shadow-premium transition-all duration-300 overflow-hidden">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-dark-50 dark:bg-dark-800">
                  {product.images?.[0] ? (
                    <img src={product.images[0]} alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-dark-300">
                      <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  {product.is_featured && (
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded-lg bg-brand-500 text-white text-xs font-semibold">Featured</span>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="text-xs text-brand-500 font-medium uppercase tracking-wider mb-1 capitalize">
                    {product.category?.replace(/-/g, " ")}
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
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.54 5.877L0 24l6.317-1.518A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.502-5.2-1.378l-.373-.22-3.743.9.934-3.643-.242-.388A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                    </svg>
                    WhatsApp Enquiry
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/products" className="btn-secondary inline-flex items-center gap-2">
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}