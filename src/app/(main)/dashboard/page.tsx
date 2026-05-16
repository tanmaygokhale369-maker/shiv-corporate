"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  Settings,
  LogOut,
  Package,
  ChevronRight,
  Clock,
  Edit2,
} from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils";

const tabs = [
  { key: "orders", label: "My Orders", icon: ShoppingBag },
  { key: "wishlist", label: "Wishlist", icon: Heart },
  { key: "addresses", label: "Addresses", icon: MapPin },
  { key: "profile", label: "Profile", icon: User },
];

const demoOrders = [
  { id: "SC-A1B2C3", date: "2026-05-07", items: 3, total: 12500, status: "delivered" },
  { id: "SC-D4E5F6", date: "2026-05-05", items: 2, total: 4999, status: "shipped" },
  { id: "SC-G7H8I9", date: "2026-05-01", items: 5, total: 18700, status: "processing" },
];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-500",
  processing: "bg-indigo-500/10 text-indigo-500",
  shipped: "bg-purple-500/10 text-purple-500",
  delivered: "bg-green-500/10 text-green-500",
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="min-h-screen bg-white dark:bg-dark-950">
      <div className="bg-dark-50/50 dark:bg-dark-900/30 border-b border-dark-200/50 dark:border-dark-800/50">
        <div className="container-custom py-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-2xl font-bold shadow-glow">
              R
            </div>
            <div>
              <h1 className="text-xl font-bold font-display text-dark-900 dark:text-white">
                Welcome back, Rajesh
              </h1>
              <p className="text-sm text-dark-500">rajesh@company.com · Member since May 2026</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl bg-white dark:bg-dark-900/60 border border-dark-200/50 dark:border-dark-700/50 overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium transition-colors ${
                    activeTab === tab.key
                      ? "bg-brand-500/10 text-brand-500 border-r-2 border-brand-500"
                      : "text-dark-500 hover:bg-dark-50 dark:hover:bg-dark-800/30"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
              <Link
                href="/"
                className="w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-dark-400 hover:text-red-500 transition-colors border-t border-dark-200/50 dark:border-dark-800/50"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Link>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === "orders" && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold font-display text-dark-900 dark:text-white">My Orders</h2>
                {demoOrders.map((order) => (
                  <div key={order.id} className="p-5 rounded-2xl bg-white dark:bg-dark-900/60 border border-dark-200/50 dark:border-dark-700/50 hover:border-brand-500/30 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-dark-100 dark:bg-dark-800 flex items-center justify-center">
                          <Package className="w-5 h-5 text-dark-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-dark-900 dark:text-white text-sm">{order.id}</p>
                          <p className="text-xs text-dark-400">{formatDate(order.date)} · {order.items} items</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize ${statusColors[order.status]}`}>
                          {order.status}
                        </span>
                        <span className="text-sm font-bold text-dark-900 dark:text-white">{formatPrice(order.total)}</span>
                        <ChevronRight className="w-4 h-4 text-dark-400" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "profile" && (
              <div className="glass-premium p-6 max-w-lg space-y-4">
                <h2 className="text-lg font-bold font-display text-dark-900 dark:text-white">Profile Settings</h2>
                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Full Name</label>
                  <input type="text" defaultValue="Rajesh Sharma" className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-sm text-dark-900 dark:text-white focus:outline-none focus:border-brand-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Email</label>
                  <input type="email" defaultValue="rajesh@company.com" className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-sm text-dark-900 dark:text-white focus:outline-none focus:border-brand-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Phone</label>
                  <input type="tel" defaultValue="9876543210" className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-sm text-dark-900 dark:text-white focus:outline-none focus:border-brand-500" />
                </div>
                <button className="btn-premium text-sm">Save Changes</button>
              </div>
            )}

            {activeTab === "wishlist" && (
              <div>
                <h2 className="text-lg font-bold font-display text-dark-900 dark:text-white mb-4">My Wishlist</h2>
                <p className="text-dark-500">Your saved items will appear here.</p>
              </div>
            )}

            {activeTab === "addresses" && (
              <div>
                <h2 className="text-lg font-bold font-display text-dark-900 dark:text-white mb-4">Saved Addresses</h2>
                <div className="p-5 rounded-2xl bg-white dark:bg-dark-900/60 border border-dark-200/50 dark:border-dark-700/50">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-dark-900 dark:text-white text-sm">Home</p>
                      <p className="text-sm text-dark-500 mt-1">123, Tech Park, Andheri West<br />Mumbai, Maharashtra - 400058</p>
                    </div>
                    <button className="text-brand-500"><Edit2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
