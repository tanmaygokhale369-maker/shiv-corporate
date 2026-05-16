"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_CHARGE } from "@/lib/constants";

export function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, clearCart } =
    useCartStore();

  const currentSubtotal = subtotal();
  const shipping = currentSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_CHARGE;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-dark-950 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-dark-200 dark:border-dark-800">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-brand-500" />
                <h2 className="text-lg font-bold font-display text-dark-900 dark:text-white">
                  Your Cart
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-500 text-xs font-medium">
                  {items.length} items
                </span>
              </div>
              <button
                onClick={closeCart}
                className="w-10 h-10 rounded-xl bg-dark-100 dark:bg-dark-800 flex items-center justify-center hover:bg-dark-200 dark:hover:bg-dark-700 transition-colors"
              >
                <X className="w-5 h-5 text-dark-500" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-dark-300 dark:text-dark-600 mb-4" />
                  <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-sm text-dark-500 mb-6">
                    Add products to your cart to get started.
                  </p>
                  <button onClick={closeCart} className="btn-premium text-sm">
                    Browse Products
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => {
                    const price = item.product.offer_price || item.product.price;
                    return (
                      <motion.div
                        key={`${item.product.id}-${item.variant?.id || ""}`}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="flex gap-4 p-3 rounded-xl bg-dark-50 dark:bg-dark-900/50 border border-dark-200/50 dark:border-dark-700/50"
                      >
                        {/* Image */}
                        <div className="w-20 h-20 rounded-lg bg-dark-100 dark:bg-dark-800 overflow-hidden flex-shrink-0">
                          {item.product.images?.[0] ? (
                            <Image
                              src={item.product.images[0]}
                              alt={item.product.name}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-dark-400">
                              <ShoppingBag className="w-8 h-8" />
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-dark-900 dark:text-white truncate">
                            {item.product.name}
                          </h4>
                          {item.variant && (
                            <p className="text-xs text-dark-500 mt-0.5">
                              {item.variant.name}: {item.variant.value}
                            </p>
                          )}
                          <p className="text-sm font-bold text-brand-500 mt-1">
                            {formatPrice(price)}
                          </p>

                          {/* Quantity */}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity - 1,
                                    item.variant?.id
                                  )
                                }
                                className="w-7 h-7 rounded-lg bg-dark-200 dark:bg-dark-700 flex items-center justify-center hover:bg-dark-300 dark:hover:bg-dark-600 transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center text-sm font-medium text-dark-900 dark:text-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity + 1,
                                    item.variant?.id
                                  )
                                }
                                className="w-7 h-7 rounded-lg bg-dark-200 dark:bg-dark-700 flex items-center justify-center hover:bg-dark-300 dark:hover:bg-dark-600 transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <button
                              onClick={() =>
                                removeItem(item.product.id, item.variant?.id)
                              }
                              className="text-dark-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}

                  {items.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="text-xs text-dark-400 hover:text-red-500 transition-colors"
                    >
                      Clear all items
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-dark-200 dark:border-dark-800 p-6 space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-dark-600 dark:text-dark-400">
                    <span>Subtotal</span>
                    <span>{formatPrice(currentSubtotal)}</span>
                  </div>
                  <div className="flex justify-between text-dark-600 dark:text-dark-400">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-500">Free</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-dark-500">
                      Free shipping on orders above {formatPrice(FREE_SHIPPING_THRESHOLD)}
                    </p>
                  )}
                  <div className="flex justify-between text-dark-900 dark:text-white font-bold text-base pt-2 border-t border-dark-200 dark:border-dark-700">
                    <span>Total</span>
                    <span>{formatPrice(currentSubtotal + shipping)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="btn-premium w-full text-center"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>

                <button
                  onClick={closeCart}
                  className="w-full text-center text-sm text-dark-500 hover:text-dark-900 dark:hover:text-white transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
