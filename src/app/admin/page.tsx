"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, ShoppingCart, IndianRupee, MessageSquare, TrendingUp, ArrowUpRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  confirmed: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  processing: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  shipped: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  delivered: "bg-green-500/10 text-green-600 dark:text-green-400",
  cancelled: "bg-red-500/10 text-red-600 dark:text-red-400",
};

export default function AdminDashboard() {
  const [stats, setStats] = useState({ revenue: 0, orders: 0, products: 0, enquiries: 0 });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchAll(); }, []);

  async function fetchAll() {
    setLoading(true);
    const [{ count: productCount }, { count: enquiryCount }, { data: orders }, { data: products }] = await Promise.all([
      supabase.from("products").select("*", { count: "exact", head: true }),
      supabase.from("enquiries").select("*", { count: "exact", head: true }),
      supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(5),
      supabase.from("products").select("name, price").limit(5),
    ]);

    const allOrders = orders || [];
    const totalRevenue = allOrders.reduce((sum: number, o: any) => sum + (o.total || 0), 0);

    setStats({
      revenue: totalRevenue,
      orders: allOrders.length,
      products: productCount || 0,
      enquiries: enquiryCount || 0,
    });
    setRecentOrders(allOrders);
    setTopProducts(products || []);
    setLoading(false);
  }

  const statCards = [
    { title: "Total Revenue", value: `₹${stats.revenue.toLocaleString()}`, icon: IndianRupee, color: "from-green-500 to-emerald-500" },
    { title: "Total Orders", value: stats.orders.toString(), icon: ShoppingCart, color: "from-blue-500 to-cyan-500" },
    { title: "Products", value: stats.products.toString(), icon: Package, color: "from-purple-500 to-violet-500" },
    { title: "Enquiries", value: stats.enquiries.toString(), icon: MessageSquare, color: "from-orange-500 to-amber-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-dark-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-dark-500 mt-1">Welcome back! Here's what's happening with your business.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="p-5 rounded-2xl bg-white dark:bg-dark-900/60 border border-dark-200/50 dark:border-dark-700/50 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <span className="flex items-center gap-1 text-xs font-medium text-green-500">
                <ArrowUpRight className="w-3 h-3" /> Live
              </span>
            </div>
            <p className="text-2xl font-bold font-display text-dark-900 dark:text-white">
              {loading ? "..." : stat.value}
            </p>
            <p className="text-xs text-dark-500 mt-1">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-dark-900/60 border border-dark-200/50 dark:border-dark-700/50 overflow-hidden">
          <div className="p-5 border-b border-dark-200/50 dark:border-dark-800/50 flex items-center justify-between">
            <h3 className="font-bold font-display text-dark-900 dark:text-white">Recent Orders</h3>
            <a href="/admin/orders" className="text-xs text-brand-500 hover:text-brand-600 font-medium">View All →</a>
          </div>
          <div className="divide-y divide-dark-200/50 dark:divide-dark-800/50">
            {loading ? (
              <p className="text-center py-8 text-dark-400 text-sm">Loading...</p>
            ) : recentOrders.length === 0 ? (
              <p className="text-center py-8 text-dark-400 text-sm">No orders yet.</p>
            ) : recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 hover:bg-dark-50 dark:hover:bg-dark-800/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-dark-100 dark:bg-dark-800 flex items-center justify-center">
                    <ShoppingCart className="w-4 h-4 text-dark-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-dark-900 dark:text-white">{order.customer_name || "Customer"}</p>
                    <p className="text-xs text-dark-400">{order.order_number} · {new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize ${statusColors[order.status] || ""}`}>
                    {order.status}
                  </span>
                  <span className="text-sm font-semibold text-dark-900 dark:text-white">₹{order.total?.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="rounded-2xl bg-white dark:bg-dark-900/60 border border-dark-200/50 dark:border-dark-700/50">
          <div className="p-5 border-b border-dark-200/50 dark:border-dark-800/50">
            <h3 className="font-bold font-display text-dark-900 dark:text-white">Products</h3>
          </div>
          <div className="p-4 space-y-3">
            {loading ? (
              <p className="text-center py-4 text-dark-400 text-sm">Loading...</p>
            ) : topProducts.length === 0 ? (
              <p className="text-center py-4 text-dark-400 text-sm">No products yet.</p>
            ) : topProducts.map((product, i) => (
              <div key={product.name} className="flex items-center gap-3">
                <span className="text-xs font-bold text-dark-400 w-5">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-dark-900 dark:text-white truncate">{product.name}</p>
                  <p className="text-xs text-dark-400">₹{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Add Product", href: "/admin/products", icon: Package, color: "from-brand-500 to-brand-600" },
          { label: "View Orders", href: "/admin/orders", icon: ShoppingCart, color: "from-green-500 to-emerald-500" },
          { label: "Enquiries", href: "/admin/enquiries", icon: MessageSquare, color: "from-orange-500 to-amber-500" },
          { label: "Analytics", href: "/admin/analytics", icon: TrendingUp, color: "from-purple-500 to-violet-500" },
        ].map((action) => (
          <a key={action.label} href={action.href}
            className="group p-4 rounded-2xl bg-white dark:bg-dark-900/60 border border-dark-200/50 dark:border-dark-700/50 hover:border-brand-500/30 hover:shadow-lg transition-all flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center shrink-0`}>
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-dark-900 dark:text-white group-hover:text-brand-500 transition-colors">{action.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}