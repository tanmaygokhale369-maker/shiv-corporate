"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  CreditCard,
  Truck,
  ChevronRight,
  ShieldCheck,
  ArrowLeft,
  Minus,
  Plus,
  Trash2,
  Package,
} from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_CHARGE, TAX_RATE, INDIAN_STATES, PAYMENT_METHODS } from "@/lib/constants";
import toast from "react-hot-toast";

type Step = "cart" | "shipping" | "payment";

export default function CheckoutPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCartStore();
  const [step, setStep] = useState<Step>("cart");
  const [paymentMethod, setPaymentMethod] = useState<string>("razorpay");
  const [shippingAddress, setShippingAddress] = useState({
    full_name: "",
    phone: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const currentSubtotal = subtotal();
  const shipping = currentSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_CHARGE;
  const tax = Math.round(currentSubtotal * TAX_RATE);
  const total = currentSubtotal + shipping + tax;

  const handlePlaceOrder = async () => {
    toast.success("Order placed successfully! 🎉");
    clearCart();
  };

  if (items.length === 0 && step === "cart") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-20 h-20 text-dark-300 dark:text-dark-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold font-display text-dark-900 dark:text-white mb-4">
            Your cart is empty
          </h2>
          <p className="text-dark-500 mb-8">Add some products to get started.</p>
          <Link href="/products" className="btn-premium">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark-950">
      {/* Header */}
      <div className="bg-dark-50/50 dark:bg-dark-900/30 border-b border-dark-200/50 dark:border-dark-800/50">
        <div className="container-custom py-6">
          <div className="flex items-center justify-between">
            <Link href="/products" className="flex items-center gap-2 text-sm text-dark-500 hover:text-brand-500 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>

            {/* Steps */}
            <div className="hidden md:flex items-center gap-4">
              {[
                { key: "cart", label: "Cart", icon: ShoppingBag },
                { key: "shipping", label: "Shipping", icon: Truck },
                { key: "payment", label: "Payment", icon: CreditCard },
              ].map(({ key, label, icon: Icon }, i) => (
                <div key={key} className="flex items-center gap-2">
                  {i > 0 && <ChevronRight className="w-4 h-4 text-dark-400" />}
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${
                    step === key
                      ? "bg-brand-500/10 text-brand-500"
                      : "text-dark-400"
                  }`}>
                    <Icon className="w-4 h-4" />
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === "cart" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-xl font-bold font-display text-dark-900 dark:text-white mb-6">
                  Your Cart ({items.length} items)
                </h2>
                <div className="space-y-4">
                  {items.map((item) => {
                    const price = item.product.offer_price || item.product.price;
                    return (
                      <div
                        key={`${item.product.id}-${item.variant?.id || ""}`}
                        className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-dark-900/60 border border-dark-200/50 dark:border-dark-700/50"
                      >
                        <div className="w-24 h-24 rounded-xl bg-dark-100 dark:bg-dark-800 flex items-center justify-center shrink-0">
                          <Package className="w-10 h-10 text-dark-300 dark:text-dark-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-dark-900 dark:text-white">{item.product.name}</h3>
                          {item.variant && <p className="text-xs text-dark-500 mt-0.5">{item.variant.name}: {item.variant.value}</p>}
                          <p className="text-brand-500 font-bold mt-1">{formatPrice(price)}</p>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <button onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.variant?.id)} className="w-8 h-8 rounded-lg bg-dark-100 dark:bg-dark-700 flex items-center justify-center">
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.variant?.id)} className="w-8 h-8 rounded-lg bg-dark-100 dark:bg-dark-700 flex items-center justify-center">
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="font-bold text-dark-900 dark:text-white">{formatPrice(price * item.quantity)}</span>
                              <button onClick={() => removeItem(item.product.id, item.variant?.id)} className="text-dark-400 hover:text-red-500">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button onClick={() => setStep("shipping")} className="mt-6 btn-premium w-full md:w-auto">
                  Continue to Shipping
                  <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              </motion.div>
            )}

            {step === "shipping" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-xl font-bold font-display text-dark-900 dark:text-white mb-6">
                  Shipping Address
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 glass-premium p-6">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Full Name *</label>
                    <input type="text" value={shippingAddress.full_name} onChange={(e) => setShippingAddress({...shippingAddress, full_name: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white focus:outline-none focus:border-brand-500" placeholder="Full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Phone *</label>
                    <input type="tel" value={shippingAddress.phone} onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white focus:outline-none focus:border-brand-500" placeholder="10-digit number" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Address Line 1 *</label>
                    <input type="text" value={shippingAddress.address_line_1} onChange={(e) => setShippingAddress({...shippingAddress, address_line_1: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white focus:outline-none focus:border-brand-500" placeholder="Street address" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Address Line 2</label>
                    <input type="text" value={shippingAddress.address_line_2} onChange={(e) => setShippingAddress({...shippingAddress, address_line_2: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white focus:outline-none focus:border-brand-500" placeholder="Apartment, suite, etc." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">City *</label>
                    <input type="text" value={shippingAddress.city} onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white focus:outline-none focus:border-brand-500" placeholder="City" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">State *</label>
                    <select value={shippingAddress.state} onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white focus:outline-none focus:border-brand-500">
                      <option value="">Select state</option>
                      {INDIAN_STATES.map((state) => <option key={state} value={state}>{state}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Pincode *</label>
                    <input type="text" value={shippingAddress.pincode} onChange={(e) => setShippingAddress({...shippingAddress, pincode: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white focus:outline-none focus:border-brand-500" placeholder="6-digit pincode" />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep("cart")} className="btn-secondary">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </button>
                  <button onClick={() => setStep("payment")} className="btn-premium">
                    Continue to Payment <ChevronRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === "payment" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-xl font-bold font-display text-dark-900 dark:text-white mb-6">
                  Payment Method
                </h2>
                <div className="space-y-3">
                  {Object.entries(PAYMENT_METHODS).map(([key, { label, icon }]) => (
                    <button
                      key={key}
                      onClick={() => setPaymentMethod(key)}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                        paymentMethod === key
                          ? "border-brand-500 bg-brand-500/5 shadow-glow"
                          : "border-dark-200 dark:border-dark-700 bg-white dark:bg-dark-900/60 hover:border-brand-500/30"
                      }`}
                    >
                      <span className="text-2xl">{icon}</span>
                      <div className="text-left">
                        <p className="font-semibold text-dark-900 dark:text-white">{label}</p>
                        <p className="text-xs text-dark-500">
                          {key === "cod" ? "Pay when you receive" : "Secure online payment"}
                        </p>
                      </div>
                      <div className={`ml-auto w-5 h-5 rounded-full border-2 ${
                        paymentMethod === key ? "border-brand-500 bg-brand-500" : "border-dark-300 dark:border-dark-600"
                      }`}>
                        {paymentMethod === key && <div className="w-full h-full rounded-full flex items-center justify-center"><div className="w-2 h-2 bg-white rounded-full" /></div>}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep("shipping")} className="btn-secondary">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </button>
                  <button onClick={handlePlaceOrder} className="btn-premium flex-1">
                    <ShieldCheck className="w-5 h-5 mr-2" />
                    Place Order · {formatPrice(total)}
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 glass-premium p-6">
              <h3 className="text-lg font-bold font-display text-dark-900 dark:text-white mb-4">
                Order Summary
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-dark-600 dark:text-dark-400">
                  <span>Subtotal ({items.length} items)</span>
                  <span>{formatPrice(currentSubtotal)}</span>
                </div>
                <div className="flex justify-between text-dark-600 dark:text-dark-400">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="text-green-500">Free</span> : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-dark-600 dark:text-dark-400">
                  <span>Tax (18% GST)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-dark-900 dark:text-white font-bold text-base pt-3 border-t border-dark-200 dark:border-dark-700">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  Secure checkout powered by Razorpay
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
