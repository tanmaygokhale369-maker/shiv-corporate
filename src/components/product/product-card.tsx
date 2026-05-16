"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Eye, Star, Zap } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { formatPrice, calcDiscount } from "@/lib/utils";
import type { Product } from "@/types";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const { toggleItem, isInWishlist } = useWishlistStore();

  const discount = product.offer_price
    ? calcDiscount(product.price, product.offer_price)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    openCart();
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product.id);
    toast.success(
      isInWishlist(product.id)
        ? "Removed from wishlist"
        : "Added to wishlist"
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative bg-white dark:bg-dark-900/60 rounded-2xl border border-dark-200/50 dark:border-dark-700/50 overflow-hidden transition-all duration-500 hover:shadow-premium hover:-translate-y-2 hover:border-brand-500/30">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-dark-50 dark:bg-dark-800">
            {product.images?.[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ShoppingCart className="w-12 h-12 text-dark-300 dark:text-dark-600" />
              </div>
            )}

            {/* Overlay Actions */}
            <motion.div
              initial={false}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end justify-center pb-4 gap-2"
            >
              <motion.button
                initial={{ y: 20 }}
                animate={{ y: isHovered ? 0 : 20 }}
                transition={{ delay: 0 }}
                onClick={handleAddToCart}
                className="px-4 py-2.5 rounded-xl bg-brand-500 text-white text-sm font-medium flex items-center gap-2 hover:bg-brand-600 transition-colors shadow-lg"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </motion.button>
              <motion.button
                initial={{ y: 20 }}
                animate={{ y: isHovered ? 0 : 20 }}
                transition={{ delay: 0.05 }}
                className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Eye className="w-4 h-4" />
              </motion.button>
            </motion.div>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {discount > 0 && (
                <span className="px-2.5 py-1 rounded-lg bg-red-500 text-white text-xs font-bold shadow-lg">
                  -{discount}%
                </span>
              )}
              {product.featured && (
                <span className="px-2.5 py-1 rounded-lg bg-brand-500 text-white text-xs font-bold shadow-lg flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  Featured
                </span>
              )}
              {!product.in_stock && (
                <span className="px-2.5 py-1 rounded-lg bg-dark-800 text-white text-xs font-bold shadow-lg">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Wishlist */}
            <button
              onClick={handleWishlist}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 dark:bg-dark-800/80 backdrop-blur-md flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
            >
              <Heart
                className={`w-4 h-4 ${
                  isInWishlist(product.id)
                    ? "text-red-500 fill-red-500"
                    : "text-dark-600 dark:text-dark-300"
                }`}
              />
            </button>
          </div>

          {/* Info */}
          <div className="p-4">
            {product.category && (
              <p className="text-xs text-brand-500 font-medium uppercase tracking-wider mb-1">
                {product.category.name}
              </p>
            )}
            <h3 className="text-sm font-semibold text-dark-900 dark:text-white line-clamp-2 mb-2 group-hover:text-brand-500 transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400"
                />
              ))}
              <span className="text-xs text-dark-500 ml-1">(4.5)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-dark-900 dark:text-white">
                {formatPrice(product.offer_price || product.price)}
              </span>
              {product.offer_price && product.offer_price < product.price && (
                <span className="text-sm text-dark-400 line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
